"use client";

import { animate, inView } from "motion/react";
import { useEffect, useState } from "react";

const HEADING_SELECTOR = "h1, h2, h3";

export default function ScrollTextMotion() {
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("#main-content");
    if (!main) return;

    const stops = new Map<Element, VoidFunction>();
    const played = new WeakSet<Element>();

    function watchHeading(heading: Element) {
      if (stops.has(heading)) return;

      const element = heading as HTMLElement;
      if (reduceMotion !== false) {
        element.dataset.scrollReveal = "reduced";
        return;
      }

      element.dataset.scrollReveal = "pending";
      const stop = inView(element, () => {
        if (played.has(element)) return;
        played.add(element);
        element.dataset.scrollReveal = "revealed";

        const controls = animate(
          element,
          { opacity: [0.72, 1], y: [22, 0] },
          { duration: 0.68, ease: [0.22, 0.61, 0.36, 1] },
        );

        return () => controls.stop();
      }, { amount: 0.2 });

      stops.set(heading, stop);
    }

    function scan(node: Node) {
      if (!(node instanceof Element)) return;
      if (node.matches(HEADING_SELECTOR)) watchHeading(node);
      node.querySelectorAll(HEADING_SELECTOR).forEach(watchHeading);
    }

    function clear(node: Node) {
      if (!(node instanceof Element)) return;
      const headings = [
        ...(node.matches(HEADING_SELECTOR) ? [node] : []),
        ...node.querySelectorAll(HEADING_SELECTOR),
      ];

      for (const heading of headings) {
        stops.get(heading)?.();
        stops.delete(heading);
      }
    }

    scan(main);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.removedNodes.forEach(clear);
        record.addedNodes.forEach(scan);
      }
    });
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      stops.forEach((stop) => stop());
      stops.clear();
    };
  }, [reduceMotion]);

  return null;
}
