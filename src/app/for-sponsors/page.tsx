import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import EditorialImage from "@/components/content/EditorialImage";
import PageIntro from "@/components/content/PageIntro";
import InquiryForm from "@/components/content/InquiryForm";
import SectionTitle from "@/components/content/SectionTitle";

export const metadata: Metadata = {
  title: "For Sponsors & CROs | Site Sourcing & Feasibility",
  description: "Find potential clinical research sites aligned with your study requirements. Global Study Sync supports preliminary site sourcing and feasibility coordination in the United States.",
  alternates: { canonical: "/for-sponsors" },
  openGraph: { title: "For Sponsors & CROs | Site Sourcing & Feasibility", description: "Preliminary clinical research site sourcing and feasibility coordination for study teams in the United States.", url: "/for-sponsors", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Global Study Sync — connecting clinical research with suitable sites" }] },
};

const support = ["Identifying potential sites for a specific protocol", "Building preliminary site lists", "Mapping investigator experience and site capabilities", "Coordinating feasibility information", "Facilitating introductions with interested sites"];
const details = ["Therapeutic area and indication", "Phase of study, where applicable", "Study synopsis or non-confidential protocol summary", "Required investigator experience", "Target geography", "Patient population and recruitment considerations", "Site-selection timeline", "Relevant feasibility criteria"];

export default function SponsorsPage() {
  return (
    <>
      <PageIntro eyebrow="For sponsors & CROs" title="Find potential research sites aligned with your study requirements." summary="Global Study Sync supports preliminary site sourcing and feasibility coordination for organizations seeking potential clinical research sites in the United States." action="#study-inquiry" actionLabel="Submit a Study Inquiry" secondaryAction="/services" secondaryLabel="View our services" />
      <section className="bg-gradient-to-b from-sage/25 via-ivory to-ivory py-14 sm:py-20"><div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:px-10">
        <div><SectionTitle eyebrow="What we can help with" title="Focused support for early site conversations." /><ul className="mt-7 space-y-4">{support.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-charcoal/75"><Check size={17} className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />{item}</li>)}</ul><p className="mt-7 text-xs leading-6 text-charcoal/60">Any site list or information is preliminary and subject to sponsor or CRO review. Final selection and qualification remain with the sponsor or CRO.</p>
          <div className="mt-10 border-t border-forest/15 pt-7"><h2 className="text-lg font-semibold text-forest">Information we need</h2><ul className="mt-5 grid gap-x-7 gap-y-3 sm:grid-cols-2">{details.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-charcoal/70"><span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />{item}</li>)}</ul></div>
          <EditorialImage src="/images/editorial/feasibility-review.webp" alt="A small group of professionals reviewing notes together around a table." className="mt-8" />
        </div>
        <div id="study-inquiry" className="scroll-mt-28"><InquiryForm kind="sponsor" title="Tell us about the study" intro="A high-level, non-confidential overview is enough to start a conversation. Please do not send confidential protocols, patient names, or identifiable health information." /></div>
      </div></section>
      <section className="bg-sage/55 py-12"><div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10"><p className="max-w-3xl text-sm leading-7 text-charcoal/70">Need to clarify the fit before sharing details? Learn about <Link href="/services" className="font-semibold text-forest underline decoration-champagne underline-offset-4">our services</Link> or <Link href="/contact" className="font-semibold text-forest underline decoration-champagne underline-offset-4">send a general inquiry</Link>.</p><Link href="/for-sites" className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-forest">Are you a research site? <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
    </>
  );
}
