import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DiagramIcon from "@/components/content/DiagramIcon";
import EditorialImage from "@/components/content/EditorialImage";
import PageIntro from "@/components/content/PageIntro";
import SectionTitle from "@/components/content/SectionTitle";

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

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title="Thoughtful site sourcing. Practical feasibility support." summary="Global Study Sync provides focused business development support for organizations exploring clinical research sites and investigators in the United States." action="/contact?inquiry=sponsor#inquiry-form" actionLabel="Discuss a Study" secondaryAction="#service-details" secondaryLabel="Explore the services" />
      <section id="service-details" className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionTitle eyebrow="How we can support" title="A defined role at the start of the process." />
              <p className="mt-5 max-w-md text-sm leading-7 text-charcoal/70">Our work supports preliminary identification and communication. Each engagement is scoped around the study, the information available, and the parties involved.</p>
              <nav aria-label="Jump to a service" className="mt-8 hidden border-t border-forest/15 pt-3 lg:block">
                {serviceLinks.map((service) => <a key={service.id} href={`#${service.id}`} className="group flex items-center gap-3 border-b border-forest/10 py-3 text-sm text-charcoal/75 transition-colors hover:text-forest">
                  <span className="text-sm font-semibold tracking-[.12em] text-forest/70">{service.index}</span>
                  <span className="flex-1">{service.title}</span>
                  <ArrowRight size={14} aria-hidden="true" className="text-forest/50 transition-transform group-hover:translate-x-1" />
                </a>)}
              </nav>
            </div>
            <div className="divide-y divide-forest/15 border-y border-forest/15">
              {offerings.map((service, index) => <article id={service.id} key={service.id} className="scroll-mt-28 py-8 sm:py-10">
                <div className={`grid items-center gap-6 lg:gap-8 ${index % 2 === 1 ? "md:grid-cols-[.82fr_1fr]" : "md:grid-cols-[1fr_.82fr]"}`}>
                  <div className={`flex gap-5 sm:gap-8 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <span className="pt-1 text-xs font-medium tracking-[.16em] text-forest/70">{service.index}</span>
                    <div className="flex-1"><div className="flex items-center gap-3"><span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl border border-forest/10 bg-sage/40 p-1"><DiagramIcon kind={service.diagram} className="h-full w-full" /></span><h2 className="text-2xl font-semibold text-forest sm:text-3xl">{service.title}</h2></div><p className="mt-3 max-w-2xl text-sm leading-7 text-charcoal/70">{service.summary}</p><ul className="mt-6 grid gap-x-8 gap-y-3 text-sm leading-6 text-charcoal/80 sm:grid-cols-2">{service.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />{item}</li>)}</ul>
                      {service.id === "feasibility" && <p className="mt-5 border-l-2 border-champagne pl-4 text-xs leading-6 text-charcoal/70">Information is collected from available public sources and/or voluntarily supplied by sites. Global Study Sync does not independently validate or qualify submitted details unless a separate, defined process is agreed.</p>}
                    </div>
                  </div>
                  <EditorialImage src={service.image} alt={service.imageAlt} className={index % 2 === 1 ? "md:order-1" : ""} />
                </div>
              </article>)}
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-forest/10 bg-sage/55 py-14 sm:py-16"><div className="mx-auto grid max-w-[1280px] gap-7 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-forest/80">Before an engagement</p><h2 className="mt-3 text-2xl font-semibold text-forest sm:text-3xl">Clear scope, agreed in advance.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-charcoal/70">Scope of work, compensation, deliverables, confidentiality expectations, information handling, and each party’s responsibilities will be agreed before an engagement begins.</p></div><Link href="/contact?inquiry=sponsor#inquiry-form" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-forest px-6 text-sm font-semibold text-white hover:bg-forest/85">Start a conversation <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
    </>
  );
}
