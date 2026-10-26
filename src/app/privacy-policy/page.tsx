import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/content/PageIntro";

export const metadata: Metadata = {
  title: "Privacy Policy Draft",
  description: "Draft privacy policy page for Global Study Sync. This document requires review and approval before publication.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageIntro eyebrow="Draft policy · review required" title="Privacy Policy" summary="This is an unpublished draft page. It is not legal advice or a final privacy notice, and it requires review and approval before launch." compact />
      <section className="bg-sage/30 py-12 sm:py-16"><div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="rounded-3xl border border-forest/10 bg-white/85 p-6 shadow-sm sm:p-10">
          <div role="note" className="rounded-xl border border-champagne/30 border-l-4 bg-sage/45 p-5 text-sm leading-7 text-charcoal/75">A final notice must accurately identify the responsible business and contact channel, describe the information collected and its use, identify service providers and retention practices, explain applicable privacy choices and rights, and provide a process for privacy requests. Confirm the notice against the actual form handler and applicable law before publishing.</div>
          <h2 className="mt-9 text-xl font-semibold text-forest">Current form status</h2>
          <p className="mt-3 text-sm leading-7 text-charcoal/70">Online inquiry delivery remains unavailable until a secure delivery endpoint, spam protection, and an approved privacy notice are configured. Form submissions are not saved by this website while delivery is unavailable.</p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-champagne underline-offset-4">Return to contact <span aria-hidden="true">→</span></Link>
        </div>
      </div></section>
    </>
  );
}
