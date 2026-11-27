import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollTextMotion from "@/components/content/ScrollTextMotion";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter-family", display: "swap" });
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
const defaultTitle = "Global Study Sync | Clinical Research Site Sourcing & Feasibility";
const defaultDescription = "Global Study Sync connects research sites with sponsors and CROs through transparent clinical trial site sourcing, feasibility coordination, and business development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: "%s | Global Study Sync" },
  description: defaultDescription,
  keywords: ["clinical trial site sourcing", "clinical research site identification", "clinical trial feasibility coordination", "clinical research business development", "clinical research sites United States", "sponsor CRO site identification"],
  authors: [{ name: "Global Study Sync" }],
  creator: "Global Study Sync",
  publisher: "Global Study Sync",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", url: siteUrl, siteName: "Global Study Sync", title: defaultTitle, description: defaultDescription, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Global Study Sync — connecting clinical research with suitable sites" }] },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription, images: ["/og-image.png"] },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F4F7F8" };

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Global Study Sync",
  url: siteUrl,
  description: "Independent clinical research business development and site-sourcing support focused on preliminary site identification, feasibility coordination, and professional introductions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="sr-only z-[100] rounded-full bg-forest px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
        <Header />
        <ScrollTextMotion />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatWidget />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
