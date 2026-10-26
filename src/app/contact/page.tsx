import type { Metadata } from "next";
import { ArrowRight, Building2, MessagesSquare, Microscope } from "lucide-react";
import EditorialImage from "@/components/content/EditorialImage";
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
      <PageIntro eyebrow="Contact" title="Let’s discuss your study or site requirements." summary="Choose the inquiry that best fits. A concise, non-confidential summary is enough to begin a conversation." />
      <section className="bg-sage/25 py-12 sm:py-16"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {paths.map(({ icon: Icon, label, text, href }) => <a key={label} href={href} className="group flex min-h-48 flex-col items-start rounded-2xl border border-forest/10 bg-white/80 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:p-7">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/70"><Icon size={19} className="text-forest" aria-hidden="true" /></span><h2 className="mt-4 text-lg font-semibold text-forest">{label}</h2><p className="mt-2 text-sm leading-6 text-charcoal/75">{text}</p><span className="mt-auto flex items-center gap-2 pt-5 text-xs font-semibold text-forest">Choose this inquiry <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
          </a>)}
        </div>
      </div></section>
      <section className="pb-16 sm:pb-20"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-20 lg:px-10">
        <div className="max-w-md"><p className="text-xs font-semibold uppercase tracking-[.16em] text-forest/80">A note on contact</p><h2 className="mt-4 text-2xl font-semibold text-forest">Start with the right inquiry.</h2><p className="mt-4 text-sm leading-7 text-charcoal/70">Choose an inquiry type below and share only the professional details needed to begin. Online delivery will remain inactive until secure email delivery, spam protection, and a final privacy notice are configured.</p>{validEmail ? <p className="mt-5 text-sm text-charcoal/75">Prefer direct email? <a className="font-semibold text-forest underline decoration-champagne underline-offset-4" href={`mailto:${validEmail}`}>{validEmail}</a></p> : <p className="mt-5 text-sm text-charcoal/75">Direct email contact has not been published yet.</p>}<p className="mt-4 text-xs leading-6 text-charcoal/70">Do not submit confidential protocols, patient names, medical records, or other identifiable health information.</p><EditorialImage src="/images/editorial/research-workspace.webp" alt="A healthcare professional working at a laptop." className="mt-7" /></div>
        <div><InquiryForm kind="general" allowKindChange title="Send an inquiry" intro="Choose a contact option above or select the type of inquiry here. The form reports clearly if it is not yet able to deliver your message." /></div>
      </div></section>
    </>
  );
}
