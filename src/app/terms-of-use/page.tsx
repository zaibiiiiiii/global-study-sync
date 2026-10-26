import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/content/PageIntro";

export const metadata: Metadata = {
  title: "Terms of Use Draft",
  description: "Draft website terms of use for Global Study Sync. Requires review and approval before publication.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <>
      <PageIntro eyebrow="Draft policy · review required" title="Terms of Use" summary="This is a draft marker, not a complete or published legal agreement. It requires review and approval before launch." compact />
      <section className="bg-sage/30 py-12 sm:py-16"><div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="rounded-3xl border border-forest/10 bg-white/85 p-6 shadow-sm sm:p-10">
          <div role="note" className="rounded-xl border border-champagne/30 border-l-4 bg-sage/45 p-5 text-sm leading-7 text-charcoal/75">Before publication, prepare and review terms that accurately cover website use, intellectual property, acceptable submissions, service scope, limitations, jurisdiction, and any other terms the business intends to apply. This draft does not create engagement terms or a service agreement.</div>
          <h2 className="mt-9 text-xl font-semibold text-forest">Engagements are agreed separately</h2>
          <p className="mt-3 text-sm leading-7 text-charcoal/70">The scope of work, compensation, deliverables, confidentiality, and responsibilities for any service engagement are to be agreed between the relevant parties before work begins.</p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-champagne underline-offset-4">Return to contact <span aria-hidden="true">→</span></Link>
        </div>
      </div></section>
    </>
  );
}
