"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Brand from "@/components/layout/Brand";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "For Sponsors & CROs", href: "/for-sponsors" },
  { label: "For Sites", href: "/for-sites" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const navLink = (item: (typeof links)[number], mobile = false) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      onClick={() => setOpen(false)}
      className={`${mobile ? "block border-b border-forest/10 py-3.5 text-[17px]" : "rounded-full px-2.5 py-2 text-[14px] 2xl:px-3"} font-medium transition-colors hover:text-forest ${pathname === item.href ? "text-forest" : "text-charcoal/75"}`}
    >
      {item.label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:flex">
          {links.map((item) => navLink(item))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contact?inquiry=sponsor#inquiry-form" className="hidden min-h-11 items-center justify-center rounded-full bg-forest px-5 text-sm font-semibold text-white transition-colors hover:bg-forest/85 sm:inline-flex">
            Discuss a Study
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest hover:bg-sage xl:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full border-b border-forest/15 bg-ivory px-5 pb-6 shadow-lg xl:hidden sm:px-8" aria-label="Mobile navigation">
          <nav aria-label="Mobile navigation links" className="mx-auto max-w-[1440px]">
            {links.map((item) => navLink(item, true))}
            <Link href="/contact?inquiry=sponsor#inquiry-form" onClick={() => setOpen(false)} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-forest px-5 text-sm font-semibold text-white sm:hidden">
              Discuss a Study
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
