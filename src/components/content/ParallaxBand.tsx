"use client";

import { animate, inView } from "motion/react";
import { useEffect, useState } from "react";
import DiagramIcon from "@/components/content/DiagramIcon";
import IntroductionFlowDiagram from "@/components/content/IntroductionFlowDiagram";
import SectionTitle from "@/components/content/SectionTitle";

const steps = [
  { title: "Understand the Study", text: "Review a synopsis, key eligibility requirements, therapeutic area, geography, and site-selection priorities.", diagram: "study" },
  { title: "Identify Potential Sites", text: "Develop a preliminary list of sites and investigators whose available information aligns with the requirements.", diagram: "sites" },
  { title: "Coordinate Feasibility", text: "Help collect and organize relevant site information and coordinate follow-up with interested parties.", diagram: "feasibility" },
  { title: "Facilitate Introductions", text: "Connect relevant parties for further evaluation, subject to their interest and approval.", diagram: "connections" },
] as const;

export default function ParallaxBand() {
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("#how-it-works [data-parallax-card]"));

    if (reduceMotion !== false) {
      cards.forEach((card) => {
        card.dataset.scrollReveal = "reduced";
        card.style.removeProperty("opacity");
        card.style.removeProperty("transform");
      });
      return;
    }

    const played = new WeakSet<Element>();
    const stops = cards.map((card, index) => {
      card.dataset.scrollReveal = "pending";
      return inView(card, () => {
        if (played.has(card)) return;
        played.add(card);
        card.dataset.scrollReveal = "revealed";

        const controls = animate(
          card,
          { opacity: [0, 1], y: [16, 0] },
          { duration: 0.65, delay: index * 0.07, ease: [0.22, 0.61, 0.36, 1] },
        );

        // When the card leaves the viewport mid-reveal, snap it to the final
        // visible state instead of freezing it at the current (possibly
        // still-invisible) frame. `played` already prevents a replay.
        return () => {
          controls.stop();
          card.style.opacity = "1";
          card.style.transform = "none";
        };
      }, { amount: 0.18 });
    });

    return () => stops.forEach((stop) => stop());
  }, [reduceMotion]);

  return (
    <section
      className="relative isolate overflow-hidden bg-forest bg-[url('/images/editorial/feasibility-review.webp')] bg-cover bg-center bg-fixed py-16 text-ivory sm:py-20 lg:py-24"
      id="how-it-works"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/82 to-forest/88" />
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-9 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:gap-16">
          <div className="lg:pt-1">
            <SectionTitle eyebrow="A practical process" title="A clear path to a useful conversation." light />
            <p className="mt-5 max-w-md text-base leading-8 text-ivory">A structured first pass keeps study requirements, site capabilities, and next steps clear for everyone involved.</p>
            <IntroductionFlowDiagram />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(({ title, text, diagram }, index) => (
              <article
                key={title}
                data-parallax-card
                className="rounded-2xl border border-white/20 bg-forest/95 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-md sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-[.16em] text-[#e3c49e]">0{index + 1}</span>
                  <DiagramIcon kind={diagram} light className="h-14 w-24" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ivory">{title}</h3>
                <p className="mt-3 text-base leading-7 text-ivory">{text}</p>
              </article>
            ))}
          </div>
        </div>
        <p className="mt-8 max-w-4xl border-t border-white/25 pt-5 text-sm leading-7 text-ivory/90">Sponsors and CROs retain responsibility for final site selection and qualification. Site information is preliminary and is reviewed by the relevant organizations before any decision.</p>
      </div>
    </section>
  );
}
