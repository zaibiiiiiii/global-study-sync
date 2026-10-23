// ============================================================
// GLOBAL STUDY SYNC — Content Data File
// Edit all site copy, stats, services, and section content here.
// ============================================================

// ─── Navigation ─────────────────────────────────────────────
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Therapeutic Areas", href: "#therapeutic-areas" },
  { label: "Global Reach", href: "#global-footprint" },
  { label: "Why Us", href: "#why-gss" },
  { label: "Insights", href: "#insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "#contact" },
];

// ─── Hero ────────────────────────────────────────────────────
export const hero = {
  headline: "Clinical Trials, Perfectly\nSynchronized.",
  subheadline:
    "We align sponsors, sites, and science across borders — so your study moves from protocol to results without friction.",
  primaryCTA: "Request a Consultation",
  secondaryCTA: "Explore Services",
  trustStrip: [
    "Global reach",
    "Regulatory-aware",
    "Therapeutic expertise",
    "GCP-compliant",
  ],
  // Video path — place your MP4 at /public/video/hero.mp4
  // WebM version at /public/video/hero.webm (recommended for smaller file size)
  videoSrc: "/video/hero.mp4",
  videoWebm: "/video/hero.webm",
  // Poster image fallback — place at /public/images/hero-poster.jpg
  posterSrc: "/images/hero-poster.jpg",
};

// ─── Credibility / Stats ─────────────────────────────────────
// [PLACEHOLDER] Replace all numbers with real company statistics
export const stats = [
  { value: 45, suffix: "+", label: "Countries Covered", note: "[PLACEHOLDER]" },
  { value: 500, suffix: "+", label: "Active Sites", note: "[PLACEHOLDER]" },
  { value: 200, suffix: "+", label: "Studies Supported", note: "[PLACEHOLDER]" },
  { value: 18, suffix: "", label: "Therapeutic Areas", note: "[PLACEHOLDER]" },
];

// [PLACEHOLDER] Replace with real partner/client logo paths and names
export const partnerLogos = [
  { name: "Partner A", src: "/images/logos/partner-a.svg" },
  { name: "Partner B", src: "/images/logos/partner-b.svg" },
  { name: "Partner C", src: "/images/logos/partner-c.svg" },
  { name: "Partner D", src: "/images/logos/partner-d.svg" },
  { name: "Partner E", src: "/images/logos/partner-e.svg" },
  { name: "Partner F", src: "/images/logos/partner-f.svg" },
];

// ─── Services ────────────────────────────────────────────────
export const services = [
  {
    id: "feasibility",
    icon: "Search",
    title: "Feasibility & Protocol Assessment",
    summary: "Data-driven site and country selection before a single protocol page is printed.",
    detail:
      "We analyze patient populations, competitive trial landscapes, regulatory timelines, and site capabilities to give you a clear-eyed feasibility picture — reducing costly protocol amendments and recruitment delays downstream.",
    tag: "Study Start-Up",
  },
  {
    id: "site-selection",
    icon: "MapPin",
    title: "Site Selection & Study Start-Up",
    summary: "From shortlist to first patient enrolled, faster than industry benchmarks.",
    detail:
      "Our global site network and established investigator relationships compress timelines. We manage site qualification, contract negotiation, IRB/IEC submissions, and SIV coordination in parallel, not in sequence.",
    tag: "Operations",
  },
  {
    id: "clinical-ops",
    icon: "Activity",
    title: "Clinical Operations",
    summary: "Day-to-day study management with full protocol fidelity.",
    detail:
      "Dedicated clinical research associates, centralized project management, and proactive risk monitoring keep your study on protocol, on budget, and on time — across every site, every visit, every data point.",
    tag: "Core Service",
  },
  {
    id: "regulatory",
    icon: "Shield",
    title: "Regulatory & Compliance",
    summary: "Navigating global frameworks so you can focus on the science.",
    detail:
      "From IND/CTA preparation to health authority interactions, our regulatory team works across FDA, EMA, PMDA, and regional agencies. ICH E6 (R3) GCP compliance is embedded in every process, not bolted on at audit time.", // [LEGAL REVIEW: verify regulatory claims]
    tag: "Regulatory",
  },
  {
    id: "data-mgmt",
    icon: "Database",
    title: "Data Management & Biostatistics",
    summary: "Clean, submission-ready data from first CRF to final statistical report.",
    detail:
      "Purpose-built EDC strategy, centralized data review, medical coding, and a validated statistical analysis pipeline ensure your dataset is ready for regulatory review the moment your study closes.",
    tag: "Data Science",
  },
  {
    id: "monitoring",
    icon: "Eye",
    title: "Monitoring & Pharmacovigilance",
    summary: "Continuous oversight — on-site, remote, and risk-based.",
    detail:
      "Our hybrid monitoring approach combines risk-based remote monitoring with targeted on-site visits, ensuring protocol adherence without monitoring fatigue. Safety reporting is integrated, timely, and complete.", // [LEGAL REVIEW: verify safety claims]
    tag: "Safety",
  },
  {
    id: "patient-recruitment",
    icon: "Users",
    title: "Patient Recruitment & Retention",
    summary: "Right patients, right sites, right time — and kept engaged throughout.",
    detail:
      "Digital-first and community-based recruitment strategies, combined with decentralized visit options and participant engagement programs, reduce screen-failure rates and improve completion rates across diverse populations.",
    tag: "Recruitment",
  },
];

// ─── Process / How We Sync ───────────────────────────────────
export const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We listen first. Every study starts with an in-depth briefing — your molecule, your timeline, your risk tolerance — before any solution is proposed.",
  },
  {
    step: "02",
    title: "Feasibility & Design",
    description:
      "Our scientific and operational teams assess protocol complexity, site landscape, and regulatory environment to define the optimal study architecture.",
  },
  {
    step: "03",
    title: "Site Activation",
    description:
      "Contracts, ethics submissions, and investigator training run in synchronized parallel tracks — compressing your start-up window without sacrificing quality.",
  },
  {
    step: "04",
    title: "Enrollment & Operations",
    description:
      "With sites active and patients enrolled, our monitoring and data teams maintain continuous oversight — catching issues before they become deviations.",
  },
  {
    step: "05",
    title: "Data Lock & Close-Out",
    description:
      "Database lock, statistical analysis, and clinical study report — delivered clean, on time, and ready for submission. Close-out visits completed by protocol.",
  },
];

// ─── Therapeutic Areas ───────────────────────────────────────
export const therapeuticAreas = [
  { id: "oncology", label: "Oncology", icon: "Microscope" },
  { id: "rare-disease", label: "Rare Disease", icon: "Dna" },
  { id: "neurology", label: "Neurology & CNS", icon: "Brain" },
  { id: "cardiology", label: "Cardiology", icon: "Heart" },
  { id: "immunology", label: "Immunology", icon: "Shield" },
  { id: "infectious", label: "Infectious Disease", icon: "Virus" },
  { id: "respiratory", label: "Respiratory", icon: "Wind" },
  { id: "metabolic", label: "Metabolic & Endocrine", icon: "Zap" },
  { id: "ophthalmology", label: "Ophthalmology", icon: "Eye" },
  { id: "dermatology", label: "Dermatology", icon: "Sun" },
  { id: "womens-health", label: "Women's Health", icon: "Heart" },
  { id: "gastroenterology", label: "Gastroenterology", icon: "Activity" },
];

// ─── Global Footprint ────────────────────────────────────────
// [PLACEHOLDER] Update regions with actual presence and site counts
export const globalRegions = [
  {
    id: "north-america",
    name: "North America",
    countries: ["United States", "Canada", "Mexico"],
    sites: 180, // [PLACEHOLDER]
    description: "Our largest operational hub, with deep FDA expertise and access to diverse patient populations across major academic and community sites.",
    x: 220,
    y: 180,
  },
  {
    id: "europe",
    name: "Europe",
    countries: ["Germany", "UK", "France", "Spain", "Netherlands", "Poland"],
    sites: 140, // [PLACEHOLDER]
    description: "Comprehensive EMA-aligned coverage across Western and Eastern Europe, with multilingual teams and established ethics board relationships.",
    x: 480,
    y: 155,
  },
  {
    id: "asia-pacific",
    name: "Asia Pacific",
    countries: ["Japan", "South Korea", "Australia", "Singapore", "India"],
    sites: 120, // [PLACEHOLDER]
    description: "Rapid enrollment potential and PMDA/TGA expertise, with a network spanning both mature and emerging clinical trial markets.",
    x: 720,
    y: 190,
  },
  {
    id: "latin-america",
    name: "Latin America",
    countries: ["Brazil", "Argentina", "Colombia", "Chile"],
    sites: 60, // [PLACEHOLDER]
    description: "Cost-effective enrollment in therapeutically naïve populations, supported by bilingual project management and regional regulatory experience.",
    x: 280,
    y: 300,
  },
  {
    id: "middle-east-africa",
    name: "Middle East & Africa",
    countries: ["UAE", "Israel", "South Africa", "Egypt"],
    sites: 40, // [PLACEHOLDER]
    description: "Growing presence in high-potential markets with strategic partnerships enabling rapid site activation and diverse patient access.",
    x: 520,
    y: 250,
  },
];

// ─── Why Global Study Sync ───────────────────────────────────
export const differentiators = [
  {
    icon: "Globe2",
    title: "One Team, Everywhere",
    description:
      "A unified global operations model means your study director, data team, and site managers work from a single source of truth — no handoffs, no communication gaps, no timezone silos.",
  },
  {
    icon: "Zap",
    title: "Speed Through Synchrony",
    description:
      "Parallel work streams, pre-qualified site networks, and templated start-up packages compress timelines without compressing quality. Our clients routinely achieve first-patient-in ahead of plan.",
  },
  {
    icon: "Lock",
    title: "Compliance by Design",
    description:
      "ICH E6 (R3) GCP principles, 21 CFR Part 11-ready systems, and GDPR/data privacy protocols are built into every SOP, not applied retroactively at audit time.", // [LEGAL REVIEW: verify compliance claims]
  },
  {
    icon: "Heart",
    title: "Patient-Centered Science",
    description:
      "Every protocol decision is weighed against participant burden. Decentralized and hybrid trial options, multilingual support, and participant engagement programs improve retention and diversity.",
  },
];

// ─── Insights / Blog ─────────────────────────────────────────
// [PLACEHOLDER] Replace with real articles and links
export const insights = [
  {
    id: "1",
    category: "Industry Insight",
    title: "Decentralized Trials in 2025: What's Working and What Isn't",
    excerpt:
      "As DCT adoption matures, sponsors are separating signal from noise. We explore which decentralized elements consistently improve outcomes — and which add friction without benefit.",
    date: "October 2026", // [PLACEHOLDER]
    readTime: "6 min read",
    href: "#",
    imageSrc: "/images/insights/insight-1.jpg", // [PLACEHOLDER]
  },
  {
    id: "2",
    category: "Regulatory",
    title: "ICH E6 (R3) GCP: A Practical Guide for Sponsors and CROs",
    excerpt:
      "The updated GCP guideline shifts emphasis from procedural compliance to risk-based quality management. Here's what that means for your 2025 and 2026 protocols.",
    date: "September 2026", // [PLACEHOLDER]
    readTime: "8 min read",
    href: "#",
    imageSrc: "/images/insights/insight-2.jpg", // [PLACEHOLDER]
  },
  {
    id: "3",
    category: "Patient Recruitment",
    title: "Closing the Diversity Gap in Clinical Trials",
    excerpt:
      "Diverse enrollment isn't just an ethical imperative — regulators are increasingly requiring it. We outline the operational levers that make meaningful diversity achievable.",
    date: "August 2026", // [PLACEHOLDER]
    readTime: "5 min read",
    href: "#",
    imageSrc: "/images/insights/insight-3.jpg", // [PLACEHOLDER]
  },
];

// ─── Testimonials ────────────────────────────────────────────
// [PLACEHOLDER] Replace with real testimonials once available. Do not publish without legal/permission review.
export const testimonials = [
  {
    id: "1",
    quote:
      "From feasibility to first patient in, the team at Global Study Sync compressed our timeline by over 30%. Their site network and regulatory fluency in Europe were exactly what our Phase II needed.",
    author: "[Name withheld — pending permission]",
    role: "VP Clinical Operations",
    company: "[Biotech company — placeholder]",
    studyType: "Phase II Oncology",
  },
  {
    id: "2",
    quote:
      "We'd struggled with enrollment in previous studies. GSS's patient recruitment strategy, combined with their decentralized visit options, got us to target enrollment in record time.",
    author: "[Name withheld — pending permission]",
    role: "Medical Director",
    company: "[Pharma company — placeholder]",
    studyType: "Phase III Immunology",
  },
  {
    id: "3",
    quote:
      "The data quality we received was exceptional. Clean data, timely queries, and a biostatistics team that understood the science behind the numbers.",
    author: "[Name withheld — pending permission]",
    role: "Head of Biometrics",
    company: "[CRO partner — placeholder]",
    studyType: "Phase II/III Multi-Regional",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────
export const faqs = [
  {
    question: "What therapeutic areas does Global Study Sync specialize in?",
    answer:
      "We support studies across 18 therapeutic areas, with particular depth in oncology, rare disease, neurology, and immunology. Our scientific leadership team includes former investigators and medical monitors with specialized expertise. See our Therapeutic Areas section for the full list.",
  },
  {
    question: "How does Global Study Sync handle multi-regional studies?",
    answer:
      "Our global operations model is built for multi-regional complexity. We deploy dedicated in-country teams supported by a centralized project management hub, ensuring consistent quality standards, synchronized milestones, and unified data — regardless of how many countries your study spans.",
  },
  {
    question: "Can you work as a full CRO or in a functional service provider (FSP) model?",
    answer:
      "Both. We offer full-service CRO support across all study phases, as well as FSP arrangements where you need supplemental expertise in specific functions — monitoring, data management, regulatory, or recruitment — while retaining internal oversight.",
  },
  {
    question: "What is your approach to patient diversity and recruitment?",
    answer:
      "Diversity is embedded in our feasibility assessments, site selection criteria, and recruitment planning — not addressed as an afterthought. We partner with community health organizations, use multilingual engagement materials, and offer decentralized visit options to reduce participation barriers.",
  },
  {
    question: "How do you ensure data quality and GCP compliance across sites?",
    answer:
      "Quality is built in, not inspected in. Our risk-based monitoring approach, central data review, automated query generation, and proactive site engagement ensure issues are identified and resolved in real time — long before database lock.", // [LEGAL REVIEW: verify GCP claims]
  },
  {
    question: "What phases of clinical trials do you support?",
    answer:
      "We support Phase I through Phase IV studies, as well as observational studies and post-approval commitments. Our regulatory team has experience with both interventional and non-interventional designs across major health authorities.",
  },
  {
    question: "How do I get started?",
    answer:
      "Request a consultation using the form below or email us directly. We typically respond within one business day. Our initial call is a no-obligation conversation about your study objectives, timeline, and how we might fit.",
  },
];

// ─── Contact Form ─────────────────────────────────────────────
export const contactConfig = {
  // Set NEXT_PUBLIC_FORM_ENDPOINT in your .env.local file
  // Supports Formspree (https://formspree.io/f/YOUR_ID), Netlify Forms, or your own API
  endpointEnvKey: "NEXT_PUBLIC_FORM_ENDPOINT",
  studyPhases: ["Phase I", "Phase II", "Phase III", "Phase IV", "Phase I/II", "Phase II/III", "Observational", "Post-Approval", "Not sure yet"],
  therapeuticAreaOptions: [
    "Oncology", "Rare Disease", "Neurology & CNS", "Cardiology", "Immunology",
    "Infectious Disease", "Respiratory", "Metabolic & Endocrine", "Ophthalmology",
    "Dermatology", "Women's Health", "Gastroenterology", "Other",
  ],
  roles: [
    "Sponsor / Biotech / Pharma", "CRO", "Clinical Site / Investigator",
    "Regulatory Affairs", "Patient / Participant", "Other",
  ],
};

// ─── Footer ───────────────────────────────────────────────────
export const footerLinks = {
  services: [
    { label: "Feasibility", href: "#services" },
    { label: "Site Selection", href: "#services" },
    { label: "Clinical Operations", href: "#services" },
    { label: "Regulatory & Compliance", href: "#services" },
    { label: "Data Management", href: "#services" },
    { label: "Monitoring", href: "#services" },
    { label: "Patient Recruitment", href: "#services" },
  ],
  company: [
    { label: "Why Global Study Sync", href: "#why-gss" },
    { label: "Therapeutic Areas", href: "#therapeutic-areas" },
    { label: "Global Footprint", href: "#global-footprint" },
    { label: "Insights", href: "#insights" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/privacy-policy#cookies" },
  ],
};

export const contactInfo = {
  // [PLACEHOLDER] Replace with real contact details
  email: "info@globalstudysync.com", // [PLACEHOLDER]
  phone: "+1 (800) 000-0000", // [PLACEHOLDER]
  address: "Global Study Sync, Inc. [Address — Placeholder]", // [PLACEHOLDER]
};

export const socialLinks = [
  { platform: "LinkedIn", href: "#", icon: "Linkedin" }, // [PLACEHOLDER]
  { platform: "Twitter/X", href: "#", icon: "Twitter" }, // [PLACEHOLDER]
];
