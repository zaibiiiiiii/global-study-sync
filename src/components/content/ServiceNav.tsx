"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type ServiceNavItem = { id: string; index: string; title: string };

/**
 * Section navigation for the services page.
 * - Desktop: a quiet rail in the sticky sidebar.
 * - Mobile: a sticky pill bar that stays under the header while cards scroll.
 * The active section is tracked with an IntersectionObserver.
 */
export default function ServiceNav({ items, pills = false }: { items: ServiceNavItem[]; pills?: boolean }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  if (pills) {
    return (
      <nav
        aria-label="Service sections"
        className="sticky top-[88px] z-30 flex gap-2 overflow-x-auto rounded-full border border-forest/10 bg-ivory/95 p-1.5 shadow-sm backdrop-blur-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
      >
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active ? "location" : undefined}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${active ? "bg-forest text-ivory" : "text-charcoal/70 hover:text-forest"}`}
            >
              <span className={active ? "text-champagne" : "text-forest/55"}>{item.index}</span>
              {item.title}
            </a>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Service sections" className="mt-8 hidden flex-col gap-1 rounded-2xl border border-forest/10 bg-white/75 p-2 shadow-sm lg:flex">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active ? "location" : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active ? "bg-forest text-ivory" : "text-charcoal/75 hover:bg-sage/70 hover:text-forest"}`}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors ${active ? "border-champagne bg-champagne text-forest" : "border-forest/20 text-forest/70"}`}>
              {item.index}
            </span>
            <span className="flex-1 font-medium">{item.title}</span>
            <ArrowRight size={14} aria-hidden="true" className={`shrink-0 transition-all ${active ? "text-champagne" : "text-forest/40 group-hover:translate-x-0.5"}`} />
          </a>
        );
      })}
    </nav>
  );
}
