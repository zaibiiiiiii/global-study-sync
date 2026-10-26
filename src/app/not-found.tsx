import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-8 h-64 w-64 rounded-full border border-champagne/40 sm:right-12 sm:h-80 sm:w-80" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-forest/70"><span className="h-px w-8 bg-champagne" />404 · Page not found</p>
        <h1 className="mt-6 max-w-3xl text-balance text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[1.04] text-forest">This page isn’t in sync.</h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-charcoal/75">The link may be outdated, or the page may have moved. Return to the home page or explore our services.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-forest px-6 text-sm font-semibold text-white transition hover:bg-forest/85"><ArrowLeft size={16} aria-hidden="true" />Return home</Link>
          <Link href="/services" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-forest/25 px-6 text-sm font-semibold text-forest transition hover:bg-sage">Explore services <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
