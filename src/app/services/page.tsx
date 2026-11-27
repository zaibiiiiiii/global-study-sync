import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDollarSign, Database, FileText, Handshake, ListChecks, Lock } from "lucide-react";
import DiagramIcon from "@/components/content/DiagramIcon";
import EditorialImage from "@/components/content/EditorialImage";
import PageIntro from "@/components/content/PageIntro";
import SectionTitle from "@/components/content/SectionTitle";
import ServiceNav from "@/components/content/ServiceNav";

export const metadata: Metadata = {
  title: "Clinical Research Site Sourcing & Feasibility Services",
  description: "Explore clinical trial site sourcing, preliminary feasibility coordination, investigator and site network development, and business development support.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Clinical Research Site Sourcing & Feasibility Services", description: "Explore preliminary site identification, feasibility coordination, site relationship development, and professional introductions.", url: "/services", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Global Study Sync — connecting clinical research with suitable sites" }] },
};

const offerings = [
  {
    id: "site-sourcing", index: "01", title: "Clinical Trial Site Sourcing", summary: "A focused preliminary view of sites and investigators to consider against a study’s requirements.",
    diagram: "sites",
    image: "/images/editorial/research-collaboration.webp", imageAlt: "Two researchers discussing their work beside a microscope.",
    items: ["Preliminary site identification based on study requirements", "Investigator and site capability mapping", "Geographic and therapeutic-area alignment", "Review of available public and voluntarily supplied site information", "Preliminary longlisting for sponsor or CRO consideration"],
  },
  {
    id: "feasibility", index: "02", title: "Feasibility Coordination", summary: "Practical coordination that helps organize early site input for sponsor or CRO review.",
    diagram: "feasibility",
    image: "/images/editorial/feasibility-review.webp", imageAlt: "Professionals discussing notes and working together around a laptop.",
    items: ["Coordination of feasibility questionnaires", "Collection of relevant investigator and site profiles", "Organization of site capability information", "Follow-up coordination with prospective sites", "Consolidation of preliminary feasibility information"],
  },
  {
    id: "network-development", index: "03", title: "Site and Investigator Network Development", summary: "Relationship development that keeps site interests and capabilities in view for relevant future opportunities.",
    diagram: "network",
    image: "/images/editorial/site-capabilities.webp", imageAlt: "Two researchers working together at a microscope.",
    items: ["Relationship development with clinical research sites", "Maintenance of an organized database of site capabilities and contact preferences voluntarily shared by sites", "Identification of investigators interested in relevant future opportunities", "Therapeutic-area and geographic mapping"],
  },
  {
    id: "introductions", index: "04", title: "Business Development and Introductions", summary: "Professional outreach and introductions where a potential study and site fit merits a closer conversation.",
    diagram: "connections",
    image: "/images/editorial/research-workspace.webp", imageAlt: "A healthcare professional reviewing work at a laptop.",
    items: ["Identification of relevant study opportunities", "Initial outreach and relationship coordination", "Introduction of potentially suitable sites to sponsors and CROs", "Follow-up coordination during preliminary discussions"],
  },
] as const;

const serviceLinks = offerings.map(({ id, index, title }) => ({ id, index, title }));

const commitments = [
  { icon: FileText, title: "Scope of work", text: "What the engagement covers, and what it does not." },
  { icon: CircleDollarSign, title: "Compensation", text: "Agreed fees or terms, confirmed before work begins." },
  { icon: ListChecks, title: "Deliverables", text: "What you will receive, and when." },
  { icon: Lock, title: "Confidentiality", text: "Clear expectations for protecting sensitive information." },
  { icon: Database, title: "Information handling", text: "How study and site details are stored and shared." },
  { icon: Handshake, title: "Responsibilities", text: "Each party’s role, documented for both sides." },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title="Thoughtful site sourcing. Practical feasibility support." summary="Global Study Sync provides focused business development support for organizations exploring clinical research sites and investigators in the United States." action="/contact?inquiry=sponsor#inquiry-form" actionLabel="Discuss a Study" secondaryAction="#service-details" secondaryLabel="Explore the services" />

      <section id="service-details" className="border-y border-forest/10 bg-sage/30 py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
            <div>
              <div className="lg:sticky lg:top-28">
                <SectionTitle eyebrow="How we can support" title="A defined role at the start of the process." />
                <p className="mt-5 max-w-md text-sm leading-7 text-charcoal/70">Our work supports preliminary identification and communication. Each engagement is scoped around the study, the information available, and the parties involved.</p>
                <ServiceNav items={serviceLinks} />
              </div>
            </div>
            <div className="min-w-0">
              <ServiceNav pills items={serviceLinks} />
              <div className="mt-6 grid gap-5 lg:mt-8 lg:gap-6">
                {offerings.map((service) => (
                  <article key={service.id} id={service.id} className="scroll-mt-40 rounded-2xl border border-forest/10 bg-white/80 p-6 shadow-sm sm:p-8">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                        <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl border border-forest/10 bg-sage/50 p-1.5">
                          <DiagramIcon kind={service.diagram} className="h-full w-full" />
                        </span>
                        <h2 className="flex min-h-14 flex-col justify-center text-2xl font-semibold leading-tight text-forest sm:text-[28px]">
                          <span className="sr-only">Service {service.index}: </span>
                          {service.title}
                        </h2>
                      </div>
                      <span aria-hidden="true" className="hidden shrink-0 select-none text-[64px] font-semibold leading-none text-forest/10 sm:block">{service.index}</span>
                    </div>
                    <p className="mt-5 max-w-2xl text-[15px] leading-8 text-charcoal/75">{service.summary}</p>
                    <div className="mt-7 grid gap-7 border-t border-forest/10 pt-7 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:gap-10">
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[.16em] text-forest/70">What this includes</h3>
                        <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {service.items.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-6 text-charcoal/80">
                              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-champagne" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        {service.id === "feasibility" && (
                          <p className="mt-5 rounded-xl border border-champagne/45 bg-champagne/10 p-4 text-xs leading-6 text-charcoal/75">
                            Information is collected from available public sources and/or voluntarily supplied by sites. Global Study Sync does not independently validate or qualify submitted details unless a separate, defined process is agreed.
                          </p>
                        )}
                      </div>
                      <EditorialImage src={service.image} alt={service.imageAlt} />
                    </div>
                    <div className="mt-7 flex justify-end border-t border-forest/10 pt-5">
                      <Link href="/contact?inquiry=sponsor#inquiry-form" className="inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-champagne underline-offset-4 transition-colors hover:text-forest/70">
                        Discuss this service <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-forest/80"><span className="h-px w-8 bg-champagne" />Before an engagement</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold text-forest sm:text-4xl">Clear scope, agreed in advance.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-charcoal/70">Every engagement begins with a written understanding of the points below, so expectations are settled before any work starts.</p>
              <Link href="/contact?inquiry=sponsor#inquiry-form" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-forest px-6 text-sm font-semibold text-white transition hover:bg-forest/85">Start a conversation <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:gap-4">
              {commitments.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-forest/10 bg-white/75 p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-forest/10 bg-sage/50 text-forest">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="mt-3.5 text-[15px] font-semibold text-forest">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-charcoal/70">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
