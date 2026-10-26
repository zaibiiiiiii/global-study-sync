import Link from "next/link";
import Brand from "@/components/layout/Brand";

const pageLinks = [
  ["Home", "/"], ["Services", "/services"], ["For Sponsors & CROs", "/for-sponsors"],
  ["For Clinical Research Sites", "/for-sites"], ["About", "/about"], ["Contact", "/contact"],
] as const;

export default function Footer() {
  return (
    <footer className="bg-forest text-ivory" aria-label="Site footer">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 border-b border-white/20 pb-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Brand light />
            <p className="mt-5 max-w-sm text-sm leading-7 text-ivory/75">
              Independent site-sourcing, feasibility coordination, and business development support for clinical research.
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[.16em] text-ivory/80">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2.5 text-sm">
              {pageLinks.map(([label, href]) => <li key={href}><Link className="text-ivory/80 transition-colors hover:text-white" href={href}>{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[.16em] text-ivory/80">Information</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="text-ivory/80 hover:text-white" href="/privacy-policy">Privacy Policy <span className="text-[#d6c8ad]">(draft)</span></Link></li>
              <li><Link className="text-ivory/80 hover:text-white" href="/terms-of-use">Terms of Use <span className="text-[#d6c8ad]">(draft)</span></Link></li>
              <li><Link className="text-ivory/80 hover:text-white" href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="grid gap-6 pt-7 text-xs leading-6 text-ivory/75 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-4xl">Global Study Sync provides site-sourcing, feasibility coordination, and business development support. Final site selection, qualification, regulatory determinations, and study conduct remain the responsibility of the relevant sponsor, CRO, investigator, or research organization, as applicable.</p>
          <p className="whitespace-nowrap">© {new Date().getFullYear()} Global Study Sync</p>
        </div>
      </div>
    </footer>
  );
}
