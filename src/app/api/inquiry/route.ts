type InquiryKind = "sponsor" | "site" | "general";

const fieldLabels: Record<InquiryKind, Record<string, string>> = {
  sponsor: {
    name: "Name",
    email: "Business email",
    company: "Company",
    jobTitle: "Job title",
    studyArea: "Study or therapeutic area",
    targetGeography: "Target geography",
    requirements: "Brief description of requirements",
  },
  site: {
    organization: "Organization or site name",
    location: "Location and service area",
    principalInvestigator: "Principal investigator",
    email: "Professional contact email",
    therapeuticAreas: "Therapeutic areas",
    trialExperience: "Relevant trial experience",
    aggregatePatients: "Available patient populations (aggregate only)",
    capabilities: "Facilities and operational capabilities",
    affiliation: "Site network or research organization affiliation",
    opportunityInterest: "Study opportunity interests or notes",
  },
  general: {
    name: "Full name",
    email: "Work email",
    organization: "Organization",
    subject: "Subject",
    message: "Message",
  },
};

const requiredFields: Record<InquiryKind, string[]> = {
  sponsor: ["name", "email", "company", "jobTitle", "studyArea", "targetGeography", "requirements"],
  site: ["organization", "location", "principalInvestigator", "email", "therapeuticAreas", "capabilities"],
  general: ["name", "email", "organization", "subject", "message"],
};

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0", Pragma: "no-cache" },
  });
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (!origin || origin !== requestOrigin) {
    return json({ error: "This inquiry could not be verified. Reload the page and try again." }, 403);
  }

  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return json({ error: "The inquiry could not be read. Please try again." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 24_000) {
    return json({ error: "This inquiry is too large. Please shorten the message and try again." }, 413);
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > 24_000) {
    return json({ error: "This inquiry is too large. Please shorten the message and try again." }, 413);
  }

  let body: {
    kind?: InquiryKind;
    fields?: Record<string, unknown>;
    consent?: boolean;
    website?: string;
    turnstileToken?: string;
  };
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "The inquiry could not be read. Please check your entries and try again." }, 400);
  }

  if (typeof body.website !== "string" || body.website.trim()) {
    return json({ error: "Your inquiry could not be processed. Please try again." }, 400);
  }

  const kind = body.kind;
  if (!kind || !Object.hasOwn(fieldLabels, kind)) {
    return json({ error: "Choose a valid inquiry type." }, 400);
  }
  if (body.consent !== true) {
    return json({ error: "Consent is required before an inquiry can be submitted." }, 400);
  }
  if (!body.fields || typeof body.fields !== "object" || Array.isArray(body.fields)) {
    return json({ error: "Please complete the inquiry form and try again." }, 400);
  }

  const allowed = fieldLabels[kind];
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(body.fields)) {
    if (!Object.hasOwn(allowed, key) || typeof value !== "string") {
      return json({ error: "The inquiry contains an invalid field." }, 400);
    }
    const trimmed = value.replaceAll("\u0000", "").trim();
    if (trimmed.length > 4_000) {
      return json({ error: "One of the entries is too long. Please shorten it and try again." }, 400);
    }
    fields[key] = trimmed;
  }

  for (const key of requiredFields[kind]) {
    if (!fields[key]) return json({ error: "Please complete all required fields." }, 400);
  }
  if (!validEmail(fields.email ?? "")) {
    return json({ error: "Enter a valid business email address." }, 400);
  }

  const enabled = process.env.INQUIRY_DELIVERY_ENABLED === "true";
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL?.trim();
  const sender = process.env.CONTACT_FROM_EMAIL;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const privacyNotice = process.env.PUBLISHED_PRIVACY_NOTICE_URL?.trim();
  const publicPrivacyNotice = process.env.NEXT_PUBLIC_PRIVACY_NOTICE_URL?.trim();

  if (!enabled || !apiKey || !recipient || !sender || !turnstileSecret || !privacyNotice || !publicPrivacyNotice) {
    return json({ error: "Your inquiry has not been sent or stored. Online delivery is not configured yet." }, 503);
  }
  if (!validEmail(recipient)) {
    return json({ error: "Your inquiry has not been sent. Online delivery is temporarily unavailable." }, 503);
  }

  let privacyUrl: URL;
  let publicPrivacyUrl: URL;
  let expectedHostname: string;
  try {
    privacyUrl = new URL(privacyNotice);
    publicPrivacyUrl = new URL(publicPrivacyNotice);
    expectedHostname = new URL(process.env.NEXT_PUBLIC_SITE_URL || requestOrigin).hostname;
  } catch {
    return json({ error: "Your inquiry has not been sent. Online delivery is temporarily unavailable." }, 503);
  }
  if (
    privacyUrl.protocol !== "https:" ||
    publicPrivacyUrl.protocol !== "https:" ||
    privacyUrl.username ||
    privacyUrl.password ||
    privacyUrl.href !== publicPrivacyUrl.href
  ) {
    return json({ error: "Your inquiry has not been sent. Online delivery is temporarily unavailable." }, 503);
  }

  const turnstileToken = body.turnstileToken;
  if (typeof turnstileToken !== "string" || !turnstileToken || turnstileToken.length > 2_048) {
    return json({ error: "Complete the spam-protection check and try again." }, 400);
  }

  try {
    const verification = new URLSearchParams({ secret: turnstileSecret, response: turnstileToken });
    const checkedResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verification,
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    const checked = await checkedResponse.json() as { success?: boolean; hostname?: string };
    if (!checkedResponse.ok || checked.success !== true || checked.hostname !== expectedHostname) {
      return json({ error: "The spam-protection check expired. Please complete it again." }, 400);
    }
  } catch {
    return json({ error: "Spam protection is temporarily unavailable. Your inquiry was not sent." }, 503);
  }

  const inquiryName = kind === "sponsor" ? "Sponsor or CRO study" : kind === "site" ? "Clinical research site" : "General business";
  const text = [
    `${inquiryName} inquiry submitted through the Global Study Sync website.`,
    `Contact email: ${fields.email}`,
    `Consent to follow up: Yes`,
    `Privacy notice: ${privacyUrl.href}`,
    "",
    ...Object.entries(fields).map(([key, value]) => `${allowed[key]}:\n${value || "(not provided)"}`),
  ].join("\n\n");

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: fields.email,
        subject: `Website inquiry — ${inquiryName}`,
        text,
      }),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });
    if (!delivery.ok) {
      return json({ error: "Your inquiry could not be delivered. It was not stored by this website. Please try again later." }, 502);
    }
    return json({ message: "Your inquiry was delivered. Thank you for getting in touch." }, 200);
  } catch {
    return json({ error: "Your inquiry could not be delivered. It was not stored by this website. Please try again later." }, 502);
  }
}
