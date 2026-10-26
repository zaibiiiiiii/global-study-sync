import Link from "next/link";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
      <path d="M33 16.5c-2.3-4.4-6.2-7-11.1-7-8.1 0-13.7 6.1-13.7 14s5.6 14 13.7 14c5.1 0 9.3-2.4 11.4-6.8v4.1c0 5.2-3.4 8-9.1 8h-1.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 16.5h7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="16.5" r="2.7" fill="#C49A6C" />
    </svg>
  );
}

export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Global Study Sync home" className={`group inline-flex items-center gap-2.5 ${light ? "text-ivory" : "text-forest"}`}>
      <BrandMark className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
      <span className="font-semibold tracking-[-.045em] text-[17px] leading-none sm:text-[18px]">
        global study <span className="font-normal">sync</span>
      </span>
    </Link>
  );
}
