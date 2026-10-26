import type { Metadata } from "next";
import { ArrowRight, Building2, ExternalLink, MapPin, MessagesSquare, Microscope } from "lucide-react";
import PageIntro from "@/components/content/PageIntro";
import InquiryForm from "@/components/content/InquiryForm";

export const metadata: Metadata = {
  title: "Contact | Sponsor, CRO & Site Inquiries",
  description: "Contact Global Study Sync about sponsor and CRO site sourcing, clinical research site capabilities, or general business inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Global Study Sync",
    description: "Choose a sponsor, CRO, research site, investigator, or general business inquiry.",
    url: "/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Global Study Sync — connecting clinical research with suitable sites" }],
  },
};

const configuredEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const validEmail = configuredEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredEmail) ? configuredEmail : undefined;

const paths = [
  { icon: Building2, label: "Sponsors and CROs", text: "Share high-level study needs and target geography.", href: "/contact?inquiry=sponsor#inquiry-form" },
  { icon: Microscope, label: "Sites and investigators", text: "Tell us about your research experience and site capabilities.", href: "/contact?inquiry=site#inquiry-form" },
  { icon: MessagesSquare, label: "General business inquiries", text: "For questions and other professional inquiries.", href: "/contact?inquiry=general#inquiry-form" },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Let’s discuss your study or site requirements." summary="Choose the inquiry that best fits and share a concise, non-confidential summary to start the conversation." action="#inquiry-form" actionLabel="Start an inquiry" />
      <section className="bg-sage/25 py-12 sm:py-16"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {paths.map(({ icon: Icon, label, text, href }) => <a key={label} href={href} className="group flex min-h-48 flex-col items-start rounded-2xl border border-forest/10 bg-white/80 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:p-7">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/70"><Icon size={19} className="text-forest" aria-hidden="true" /></span><h2 className="mt-4 text-lg font-semibold text-forest">{label}</h2><p className="mt-2 text-sm leading-6 text-charcoal/75">{text}</p><span className="mt-auto flex items-center gap-2 pt-5 text-xs font-semibold text-forest">Choose this inquiry <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
          </a>)}
        </div>
      </div></section>
      <section className="pb-16 sm:pb-20"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-20 lg:px-10">
        <div className="order-2 max-w-md lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-forest/80">A note on contact</p>
          <h2 className="mt-4 text-2xl font-semibold text-forest">Start with the right inquiry.</h2>
          <p className="mt-4 text-sm leading-7 text-charcoal/70">Choose an inquiry type and share only the professional details needed to begin. Online delivery will be enabled when a verified email sender, spam protection, and a final privacy notice are configured.</p>
          {validEmail ? <p className="mt-5 text-sm text-charcoal/75">Prefer direct email? <a className="font-semibold text-forest underline decoration-champagne underline-offset-4" href={`mailto:${validEmail}`}>{validEmail}</a></p> : <p className="mt-5 text-sm text-charcoal/75">Direct email contact has not been published yet.</p>}
          <p className="mt-4 text-xs leading-6 text-charcoal/70">Do not submit confidential protocols, patient names, medical records, or other identifiable health information.</p>
          <div className="mt-8 overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-sm">
            <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/70"><MapPin size={19} className="text-forest" aria-hidden="true" /></span>
              <div>
                <h3 className="font-semibold text-forest">Map preview</h3>
                <p className="text-sm text-charcoal/70">Boston, Massachusetts</p>
              </div>
            </div>
            <iframe
              title="Google Maps preview of Boston, Massachusetts, an illustrative location only"
              src="https://maps.google.com/maps?q=Boston%2C%20Massachusetts&t=&z=11&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-[4/3] w-full border-0"
            />
            <div className="flex flex-col gap-2 bg-sage/35 px-5 py-4 text-sm sm:px-6">
              <p className="leading-6 text-charcoal/75">Google Maps preview; the location is illustrative only. Global Study Sync does not have a public office address here.</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Boston%2C%20Massachusetts" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 self-start font-semibold text-forest underline decoration-champagne underline-offset-4">
                Open map <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <InquiryForm kind="general" allowKindChange title="Send an inquiry" intro="Choose a contact option above or select your inquiry type here. Online submissions are only accepted when secure email delivery is fully configured." />
        </div>
      </div></section>
    </>
  );
}
