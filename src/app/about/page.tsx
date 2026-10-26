import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EditorialImage from "@/components/content/EditorialImage";
import PageIntro from "@/components/content/PageIntro";
import SectionTitle from "@/components/content/SectionTitle";

export const metadata: Metadata = {
  title: "About | Practical Clinical Research Connections",
  description: "Learn about Global Study Sync's independent approach to clinical research site sourcing, feasibility coordination, and professional introductions.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Global Study Sync", description: "An independent site-sourcing and business development partner focused on relevant, transparent, relationship-driven connections.", url: "/about", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Global Study Sync — connecting clinical research with suitable sites" }] },
};

const principles = [
  { number: "01", title: "Relevance", text: "Prioritize alignment between study requirements and available site capabilities." },
  { number: "02", title: "Transparency", text: "Communicate clearly about scope, information sources, expectations, and limitations." },
  { number: "03", title: "Partnership", text: "Build professional relationships that support appropriate opportunities for sponsors, CROs, and research sites." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About Global Study Sync" title="Building practical connections across clinical research." summary="Global Study Sync is an independent clinical research business development and site-sourcing company focused on connecting study opportunities with potentially suitable research sites and investigators." action="/contact" actionLabel="Start a conversation" />
      <section className="py-14 sm:py-20"><div className="mx-auto grid max-w-[1280px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-[.8fr_1fr_1fr] lg:gap-12 lg:px-10"><SectionTitle eyebrow="Our focus" title="Make early-stage site identification more organized, focused, and relationship-driven." /><div className="max-w-2xl space-y-5 text-[15px] leading-8 text-charcoal/75"><p>Our work centers on structured site identification, feasibility coordination, investigator and site relationship development, and professional introductions between organizations involved in clinical research.</p><p>Global Study Sync supports preliminary business development conversations. It is not a CRO, clinical trial sponsor, recruitment agency, or established multinational site network.</p></div><EditorialImage src="/images/editorial/research-collaboration.webp" alt="Research staff sharing a microscope in a laboratory." /></div></section>
      <section className="border-y border-forest/10 bg-sage/40 py-14 sm:py-20"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10"><SectionTitle eyebrow="How we work" title="Principles for a thoughtful working relationship." /><div className="mt-10 grid gap-0 border-y border-forest/15 md:grid-cols-3 md:divide-x md:divide-forest/15">{principles.map((item) => <article key={item.number} className="border-b border-forest/15 py-7 last:border-0 md:border-0 md:px-7 md:first:pl-0 md:last:pr-0"><span className="text-xs tracking-[.15em] text-forest/70">{item.number}</span><h3 className="mt-5 text-xl font-semibold text-forest">{item.title}</h3><p className="mt-3 text-sm leading-7 text-charcoal/70">{item.text}</p></article>)}</div></div></section>
      <section className="py-14 sm:py-20"><div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-forest/80">Explore a fit</p><h2 className="mt-3 text-3xl font-semibold text-forest">Start with a clear conversation.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-charcoal/70">Every engagement is shaped around the actual study requirements, available information, and responsibilities agreed by the parties.</p></div><Link href="/contact" className="inline-flex min-h-12 items-center gap-3 self-start rounded-full bg-forest px-6 text-sm font-semibold text-white hover:bg-forest/85 lg:self-center">Contact us <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
    </>
  );
}
