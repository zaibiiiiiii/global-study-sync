import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DiagramIcon from "@/components/content/DiagramIcon";
import HeroVideo from "@/components/content/HeroVideo";
import ParallaxBand from "@/components/content/ParallaxBand";
import SectionTitle from "@/components/content/SectionTitle";

export const metadata: Metadata = {
  title: "Clinical Trial Site Sourcing & Feasibility Coordination",
  description: "The right sites. The right studies. In sync. Global Study Sync connects research sites with sponsors and CROs through transparent site sourcing and feasibility coordination.",
  alternates: { canonical: "/" },
  openGraph: { title: "The right sites. The right studies. In sync.", description: "Transparent clinical research site sourcing, feasibility coordination, and business development.", url: "/", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Global Study Sync — connecting clinical research with suitable sites" }] },
};

const services = [
  { title: "Study Opportunity Matching", text: "We look for studies that fit your site’s therapeutic areas, investigators, patient access and capacity, so you only hear about relevant opportunities.", diagram: "study" },
  { title: "Sponsor & CRO Introductions", text: "We introduce your site to the right sponsors and CROs, with a clear and accurate profile of your capabilities.", diagram: "connections" },
  { title: "Feasibility Coordination", text: "We help you prepare for and respond to feasibility requests, and keep the information organized so the process moves faster.", diagram: "feasibility" },
  { title: "Ongoing Relationship Building", text: "We keep in touch with sponsors, CROs and sites over time, so the right opportunities reach you as they come up.", diagram: "network" },
] as const;

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[660px] overflow-hidden bg-forest text-ivory sm:min-h-[700px] lg:min-h-[calc(100svh-76px)]">
        <HeroVideo />
        <div className="mx-auto grid min-h-[660px] max-w-[1440px] items-center px-5 py-14 sm:min-h-[700px] sm:px-8 lg:min-h-[calc(100svh-76px)] lg:px-10 lg:py-20">
          <div className="relative z-10 max-w-[880px] py-5">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] text-ivory/85"><span className="h-px w-9 bg-champagne" />Independent clinical research site sourcing</p>
            <h1 className="max-w-[760px] text-balance text-[clamp(3rem,5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-.055em] text-ivory"><span className="md:whitespace-nowrap">The right sites.</span><br /><span className="md:whitespace-nowrap">The right studies.</span><br /><span className="font-normal">In sync.</span></h1>
            <p className="mt-7 max-w-[650px] text-pretty text-base leading-8 text-ivory/85 sm:text-lg">Global Study Sync connects research sites with sponsors and CROs through honest, transparent business development and site sourcing.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact?inquiry=sponsor#inquiry-form" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-champagne px-7 text-sm font-semibold text-forest transition hover:bg-[#d3ab7d]">Discuss a Study <ArrowRight size={17} aria-hidden="true" /></Link>
              <Link href="/services" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/50 px-7 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">Explore Our Services <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
            <p className="mt-7 text-xs text-ivory/75">Preliminary site identification and feasibility support · United States</p>
          </div>
        </div>
        <Link href="#services" aria-label="Scroll to explore services" className="absolute bottom-7 left-5 z-20 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-white/85 transition hover:text-white sm:left-8 lg:left-10">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35"><ArrowRight size={13} className="rotate-90" aria-hidden="true" /></span>
          <span className="hidden sm:inline">Scroll to explore</span>
        </Link>
      </section>

      <section className="py-16 sm:py-20 lg:py-24" id="services">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle eyebrow="What we do" title="Focused support from first look to introduction." />
            <Link href="/services" className="inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-forest underline decoration-champagne underline-offset-4 hover:text-forest/70">View all services <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => <Link href="/services" key={service.title} className="group flex h-full min-h-[220px] rounded-2xl border border-forest/10 bg-white/75 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-7">
              <div className="flex items-start justify-between gap-5">
                <div><span className="text-xs font-medium tracking-[.12em] text-forest/70">0{index + 1}</span><div className="mt-3 flex items-start gap-3"><span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl border border-forest/10 bg-sage/40 p-1"><DiagramIcon kind={service.diagram} className="h-full w-full" /></span><h3 className="flex min-h-12 flex-col justify-center text-xl font-semibold text-forest transition-colors group-hover:text-charcoal">{service.title}</h3></div><p className="mt-3 max-w-lg text-sm leading-7 text-charcoal/70">{service.text}</p></div>
                <ArrowRight size={18} className="mt-1 shrink-0 text-forest transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>)}
          </div>
        </div>
      </section>

      <ParallaxBand />

      <section className="border-y border-forest/10 bg-sage/40 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20 lg:px-10">
          <SectionTitle eyebrow="Work with us" title="Looking for the right clinical research sites?" />
          <div className="border-l border-champagne pl-6 sm:pl-8">
            <p className="max-w-xl text-[15px] leading-8 text-charcoal/75">Share your study requirements or tell us about your site’s capabilities. Let’s explore whether there is a suitable opportunity to connect.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact?inquiry=sponsor#inquiry-form" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-forest px-6 text-sm font-semibold text-white transition hover:bg-forest/85">Discuss a Study <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/for-sites#inquiry-form" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-forest/25 px-6 text-sm font-semibold text-forest transition hover:bg-sage">Register Site Interest <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
