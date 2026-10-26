"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArrowRight, CheckCircle2, Info, LoaderCircle } from "lucide-react";

type InquiryKind = "sponsor" | "site" | "general";
type FieldName = string;
type FieldSpec = { name: FieldName; label: string; required?: boolean; multiline?: boolean; options?: string[]; placeholder?: string; help?: string };

const fieldGroups: Record<InquiryKind, FieldSpec[]> = {
  sponsor: [
    { name: "name", label: "Name", required: true, placeholder: "Your full name" },
    { name: "email", label: "Business email", required: true, placeholder: "you@organization.com" },
    { name: "company", label: "Company", required: true, placeholder: "Sponsor or CRO" },
    { name: "jobTitle", label: "Job title", required: true, placeholder: "Your role" },
    { name: "studyArea", label: "Study or therapeutic area", required: true, placeholder: "Indication or area" },
    { name: "targetGeography", label: "Target geography", required: true, placeholder: "States, regions, or US-wide" },
    { name: "requirements", label: "Brief description of requirements", required: true, multiline: true, placeholder: "Share high-level feasibility criteria and timing. Please do not include confidential protocols or patient information." },
  ],
  site: [
    { name: "organization", label: "Organization or site name", required: true },
    { name: "location", label: "Location and service area", required: true, placeholder: "City, state, and service area" },
    { name: "principalInvestigator", label: "Principal investigator name", required: true },
    { name: "email", label: "Professional contact email", required: true, placeholder: "you@research-site.com" },
    { name: "therapeuticAreas", label: "Therapeutic areas", required: true, multiline: true },
    { name: "trialExperience", label: "Relevant trial experience", multiline: true },
    { name: "aggregatePatients", label: "Available patient populations (aggregate only)", multiline: true, placeholder: "Describe at an aggregate level only. Do not include names, records, or identifiable health information." },
    { name: "capabilities", label: "Facilities and operational capabilities", required: true, multiline: true },
    { name: "affiliation", label: "Site network or research organization affiliation", placeholder: "If applicable" },
    { name: "opportunityInterest", label: "Study opportunity interests or notes", multiline: true },
  ],
  general: [
    { name: "name", label: "Full name", required: true },
    { name: "email", label: "Work email", required: true, placeholder: "you@organization.com" },
    { name: "organization", label: "Organization", required: true },
    { name: "subject", label: "Subject", required: true },
    { name: "message", label: "Message", required: true, multiline: true, placeholder: "How can we help? Do not include confidential protocols or patient information." },
  ],
};

function getSecurePrivacyNotice(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: { sitekey: string; theme: "light"; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export default function InquiryForm({ kind: initialKind = "general", allowKindChange = false, title = "Send an inquiry", intro }: { kind?: InquiryKind; allowKindChange?: boolean; title?: string; intro?: string }) {
  const [kind, setKind] = useState<InquiryKind>(initialKind);
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const challengeRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const privacyUrl = getSecurePrivacyNotice(process.env.NEXT_PUBLIC_PRIVACY_NOTICE_URL?.trim() ?? "");
  const deliveryReady = process.env.NEXT_PUBLIC_INQUIRY_DELIVERY_ENABLED === "true" && !!siteKey && !!privacyUrl;

  const renderChallenge = useCallback(() => {
    if (!deliveryReady || !window.turnstile || !challengeRef.current || widgetRef.current) return;
    widgetRef.current = window.turnstile.render(challengeRef.current, {
      sitekey: siteKey,
      theme: "light",
      callback: setToken,
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
  }, [deliveryReady, siteKey]);

  const removeChallenge = useCallback(() => {
    const widgetId = widgetRef.current;
    widgetRef.current = null;
    if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
  }, []);

  useEffect(() => {
    renderChallenge();
    return removeChallenge;
  }, [renderChallenge, removeChallenge]);

  useEffect(() => {
    if (status === "idle" || status === "error") renderChallenge();
  }, [renderChallenge, status]);

  useEffect(() => {
    if (initialKind !== "general") return;
    const inquiry = new URLSearchParams(window.location.search).get("inquiry");
    if (inquiry === "sponsor" || inquiry === "site" || inquiry === "general") setKind(inquiry);
  }, [initialKind]);

  const specs = fieldGroups[kind];
  const resetKind = (value: InquiryKind) => {
    setKind(value); setValues({}); setErrors({}); setMessage(""); setStatus("idle"); setConsent(false); setToken("");
  };

  const updateField = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  function validate() {
    const next: Record<string, string> = {};
    for (const field of specs) if (field.required && !values[field.name]?.trim()) next[field.name] = "Please complete this field.";
    const email = specs.find((field) => field.name === "email");
    if (email && values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid business email address.";
    if (!consent) next.consent = "Please confirm consent before submitting.";
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      requestAnimationFrame(() => document.getElementById(firstInvalid === "consent" ? "consent" : `field-${firstInvalid}`)?.focus());
    }
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) { setStatus("idle"); setMessage("Check the highlighted fields and try again."); return; }
    setStatus("submitting"); setMessage("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, fields: values, consent, website: (new FormData(event.currentTarget).get("website") as string) ?? "", turnstileToken: token }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your inquiry could not be sent. Please try again later.");
      setStatus("success"); setValues({}); setConsent(false); setToken(""); setErrors({}); setMessage(result.message || "Thank you. Your inquiry has been received.");
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Your inquiry has not been sent. Please try again later.");
    } finally {
      setToken("");
      removeChallenge();
    }
  }

  const fieldClass = (name: string) => `w-full rounded-sm border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/65 transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15 ${errors[name] ? "border-red-700" : "border-forest/20"}`;

  return (
    <section className="scroll-mt-28" id="inquiry-form" aria-labelledby="inquiry-form-title">
      <div className="rounded-3xl border border-forest/10 bg-white/80 p-5 shadow-[0_18px_50px_rgba(25,54,75,0.08)] sm:p-8 lg:p-10">
        <h2 id="inquiry-form-title" className="text-2xl font-semibold text-forest sm:text-3xl">{title}</h2>
        {intro && <p className="mt-3 max-w-2xl text-sm leading-7 text-charcoal/70">{intro}</p>}
        {!deliveryReady ? (
          <div data-inquiry-unavailable role="status" className="mt-7 flex gap-4 rounded-2xl border border-champagne/35 bg-sage/45 p-5 text-sm leading-7 text-charcoal/80">
            <Info size={19} className="mt-1 shrink-0 text-forest" aria-hidden="true" />
            <p><span className="font-semibold text-forest">Online inquiries are temporarily unavailable.</span> Please don’t enter contact or study details here; submissions cannot be sent. Please check back later.</p>
          </div>
        ) : status === "success" ? (
          <div role="status" className="mt-8 border border-forest/20 bg-sage/60 p-6 text-forest">
            <CheckCircle2 size={22} aria-hidden="true" />
            <p className="mt-3 font-semibold">Inquiry received</p>
            <p className="mt-1 text-sm">{message}</p>
            <button className="mt-5 text-sm font-semibold underline underline-offset-4" onClick={() => { setStatus("idle"); setMessage(""); }}>Send another inquiry</button>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            {allowKindChange && <div>
              <label className="mb-2 block text-sm font-medium text-charcoal" htmlFor="kind-select">Inquiry type</label>
              <select id="kind-select" value={kind} disabled={status === "submitting"} onChange={(event) => resetKind(event.target.value as InquiryKind)} className={fieldClass("kind")}>
                <option value="general">General business inquiry</option>
                <option value="sponsor">Sponsor or CRO</option>
                <option value="site">Clinical research site or investigator</option>
              </select>
            </div>}
            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
              {specs.map((field) => <div className={field.multiline || field.name === "aggregatePatients" ? "sm:col-span-2" : ""} key={`${kind}-${field.name}`}>
                <label htmlFor={`field-${field.name}`} className="mb-2 block text-sm font-medium text-charcoal">{field.label}{field.required && <span aria-hidden="true" className="ml-1 text-forest">*</span>}</label>
                {field.options ? <select id={`field-${field.name}`} name={field.name} required={field.required} value={values[field.name] ?? ""} onChange={(event) => updateField(field.name, event.target.value)} className={fieldClass(field.name)} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined}>
                  <option value="">Choose an option</option>{field.options.map((option) => <option key={option}>{option}</option>)}
                </select> : field.multiline ? <textarea id={`field-${field.name}`} name={field.name} required={field.required} maxLength={4000} rows={4} placeholder={field.placeholder} value={values[field.name] ?? ""} onChange={(event) => updateField(field.name, event.target.value)} className={`${fieldClass(field.name)} resize-y`} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} /> : <input id={`field-${field.name}`} name={field.name} required={field.required} maxLength={4000} type={field.name.toLowerCase().includes("email") ? "email" : "text"} autoComplete={field.name === "email" ? "email" : field.name === "name" ? "name" : field.name === "organization" || field.name === "company" ? "organization" : undefined} placeholder={field.placeholder} value={values[field.name] ?? ""} onChange={(event) => updateField(field.name, event.target.value)} className={fieldClass(field.name)} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} />}
                {field.help && <p className="mt-1 text-xs text-charcoal/70">{field.help}</p>}
                {errors[field.name] && <p id={`error-${field.name}`} className="mt-1 text-xs text-red-800" role="alert">{errors[field.name]}</p>}
              </div>)}
            </div>

            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Leave this field blank</label><input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {deliveryReady ? <>
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={renderChallenge} />
              <div ref={challengeRef} aria-label="Spam protection verification" />
            </> : null}

            <div>
              <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-charcoal/75">
                <input id="consent" name="consent" type="checkbox" required checked={consent} onChange={(event) => { setConsent(event.target.checked); if (event.target.checked) setErrors((previous) => ({ ...previous, consent: "" })); }} className="mt-1 h-4 w-4 accent-forest" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "error-consent" : undefined} />
                <span>{kind === "site" ? "I consent to Global Study Sync retaining these business contact details to consider relevant future study opportunities and follow up about this profile." : "I consent to Global Study Sync using these business contact details to respond to this inquiry."}{" "}
                  {privacyUrl ? <>Read the <a className="text-forest underline underline-offset-2" href={privacyUrl}>privacy notice</a>.</> : <span className="font-medium text-charcoal">The final privacy notice is not published yet, so inquiries cannot be accepted.</span>}
                </span>
              </label>
              {errors.consent && <p id="error-consent" className="mt-1 text-xs text-red-800" role="alert">{errors.consent}</p>}
            </div>
            {kind === "site" && <p className="text-xs leading-5 text-charcoal/70">Submitting a site profile does not guarantee placement, sponsor introductions, selection, or participation. Do not submit patient names, records, or identifiable health information.</p>}
            {kind === "sponsor" && <p className="text-xs leading-5 text-charcoal/70">Please share only non-confidential study details. Do not upload or send confidential protocols or patient information through this form.</p>}
            <button type="submit" disabled={status === "submitting"} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-forest px-6 text-sm font-semibold text-white transition hover:bg-forest/85 disabled:cursor-wait disabled:opacity-60">
              {status === "submitting" ? <>Submitting <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /></> : <>Submit {kind === "sponsor" ? "a Study Inquiry" : kind === "site" ? "Site Interest" : "Inquiry"}<ArrowRight size={16} aria-hidden="true" /></>}
            </button>
            {message && <p role={status === "error" ? "alert" : "status"} className={`text-sm ${status === "error" ? "text-red-800" : "text-charcoal/70"}`}>{message}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
