import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";

export default function PageIntro({
  eyebrow,
  title,
  summary,
  action,
  actionLabel,
  secondaryAction,
  secondaryLabel,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  action?: string;
  actionLabel?: string;
  secondaryAction?: string;
  secondaryLabel?: string;
  compact?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden border-b border-forest/10 bg-gradient-to-br from-ivory via-ivory to-sage/65 ${compact ? "py-14 sm:py-16" : "py-16 sm:py-20 lg:py-24"}`}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-4 h-64 w-64 rounded-full border border-champagne/40 sm:right-4 sm:h-80 sm:w-80" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-16 h-48 w-48 rounded-full border border-forest/10 sm:right-16 sm:h-64 sm:w-64" />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-forest/80"><span className="h-px w-8 bg-champagne" />{eyebrow}</p>
          <h1 className="max-w-4xl text-balance text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[1.04] text-forest">{title}</h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-charcoal/75 sm:text-lg">{summary}</p>
          {(action || secondaryAction) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {action && <Link href={action} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-forest px-6 text-sm font-semibold text-white transition hover:bg-forest/85">{actionLabel ?? "Get in touch"}<ArrowRight size={16} aria-hidden="true" /></Link>}
              {secondaryAction && <Link href={secondaryAction} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-sm font-semibold text-forest transition hover:bg-sage">{secondaryLabel ?? "Learn more"}<ArrowDownRight size={16} aria-hidden="true" /></Link>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
