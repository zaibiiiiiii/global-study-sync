import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import EditorialImage from "@/components/content/EditorialImage";
import PageIntro from "@/components/content/PageIntro";
import InquiryForm from "@/components/content/InquiryForm";
import SectionTitle from "@/components/content/SectionTitle";

export const metadata: Metadata = {
  title: "For Clinical Research Sites & Investigators",
  description: "Share your site's capabilities with Global Study Sync for consideration alongside relevant future clinical research opportunities.",
  alternates: { canonical: "/for-sites" },
  openGraph: { title: "For Clinical Research Sites & Investigators", description: "Share professional site capabilities and express interest in relevant future clinical research opportunities.", url: "/for-sites", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Global Study Sync — connecting clinical research with suitable sites" }] },
};

const profile = ["Organization or site name", "Location and service area", "Principal investigator and professional contact details", "Therapeutic areas and relevant trial experience", "Available patient populations at an aggregate level", "Facilities and operational capabilities", "Current site network or research organization affiliation, if applicable", "Interest in relevant future study opportunities"];

export default function SitesPage() {
  return (
    <>
      <PageIntro eyebrow="For research sites" title="Connect your site capabilities with relevant study opportunities." summary="Global Study Sync develops relationships with clinical research sites and investigators to identify potential alignment with future study opportunities. Share a site profile for consideration when relevant opportunities arise." action="#inquiry-form" actionLabel="Share Your Site Profile" secondaryAction="/services" secondaryLabel="Understand how we work" />
      <section className="bg-gradient-to-b from-sage/25 via-ivory to-ivory py-14 sm:py-20"><div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-10">
        <div><SectionTitle eyebrow="Share your site profile" title="Help us understand your experience and capabilities." /><ul className="mt-7 space-y-4">{profile.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-charcoal/75"><Check size={17} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />{item}</li>)}</ul>
          <div className="mt-8 border-l-2 border-champagne pl-5"><p className="text-sm font-semibold text-forest">A note about site interest</p><p className="mt-2 text-sm leading-7 text-charcoal/70">Submitting a profile does not guarantee study placement, sponsor introductions, site selection, or trial participation. Do not include patient names, medical records, or identifiable health information.</p></div>
          <p className="mt-7 text-xs leading-6 text-charcoal/70">Your profile details are only submitted when online delivery, spam protection, and a published privacy notice are configured. Consent to retain your professional contact details for relevant future opportunities is requested in the form.</p>
          <EditorialImage src="/images/editorial/site-capabilities.webp" alt="Two researchers sharing a microscope in a laboratory." className="mt-8" />
        </div>
        <div><InquiryForm kind="site" title="Share your site profile" intro="Provide professional and operational information only. Describe patient populations in aggregate; never include patient-identifiable information." /></div>
      </div></section>
      <section className="border-y border-forest/10 bg-sage/55 py-12"><div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10"><p className="max-w-3xl text-sm leading-7 text-charcoal/70">Questions before sharing a profile? <Link href="/contact" className="font-semibold text-forest underline decoration-champagne underline-offset-4">Contact Global Study Sync</Link> with a general business inquiry.</p><Link href="/for-sponsors" className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-forest">For sponsors and CROs <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
    </>
  );
}
