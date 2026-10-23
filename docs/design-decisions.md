# Design Decisions — Global Study Sync

## 1. Competitor Analysis

### Clinixir (clinixir.com)
**Strengths:**
- Full-service CRO positioning is clear; service list is comprehensive
- Highlights ICH-GCP, FDA compliance credentials prominently
- Academic/hospital partnerships add credibility

**Weaknesses:**
- Visual design feels dated — heavy use of stock imagery, weak typographic hierarchy
- Navigation is deep and confusing; difficult to find the right contact path quickly
- No strong emotional hook; copy is dense and technical, not benefit-led
- Mobile UX is poor — CTAs are buried below the fold

**Pattern:** Credentials-first, human-second.

---

### Biopharmainfo.net
**Strengths:**
- Dense information — useful for researchers who already know what they want
- Site network metrics are front-and-center

**Weaknesses:**
- Extremely cluttered; no clear information hierarchy
- No design coherence; mixes multiple fonts, colors, and layouts
- Lead capture is minimal and buried
- Zero brand personality; feels like a 2008 portal

**Pattern:** Information overload with no conversion strategy.

---

### DM Clinical Research (dmclinicalresearch.com)
**Strengths:**
- Dual-audience approach (sponsors + patients) is explicit
- Site network size and therapeutic areas are highlighted
- Patient-facing content is more approachable

**Weaknesses:**
- Visual design is generic and stock-heavy
- No differentiation story — reads like every other mid-size CRO
- Form experience is clunky; multi-step without progress clarity
- Performance is slow; heavy page weight

**Pattern:** Tries to serve everyone, excels at serving no one visually.

---

### ClinTrial Networks (clintrialnetworks.com)
**Strengths:**
- Network-of-sites model is clearly explained
- Maps/geographic reach visualized (though crudely)
- Partnership/investigator on-boarding path exists

**Weaknesses:**
- Design is very basic — no micro-interactions, no hierarchy
- Copy is jargon-heavy and not benefit-led
- Trust signals are minimal
- No testimonials, case studies, or social proof

**Pattern:** Functional but uninspiring; no emotional connection.

---

### Kelsey Health (kelsey.health)
**Strengths:**
- Cleanest design of the group — uses white space effectively
- Brand personality is warmer and more human
- Patient-centric language is accessible

**Weaknesses:**
- Skews heavily patient-facing; sponsor/CRO audience is underserved
- Services are not detailed enough for B2B decision-makers
- Global reach story is missing
- Limited lead-gen strategy for enterprise sponsors

**Pattern:** Best UX and brand feel, weakest B2B conversion.

---

### Common Patterns Across All Five
1. **Static, non-interactive** — no meaningful animations or micro-interactions
2. **Poor information hierarchy** — headlines don't lead with benefits
3. **Weak or buried CTAs** — consultation / contact forms are not prominent
4. **Stock imagery fatigue** — same lab / doctor / globe clichés
5. **No clear differentiation narrative** — all say "global, compliant, experienced"
6. **Slow performance** — heavy assets, no optimization
7. **Accessibility gaps** — poor contrast, no focus states, weak keyboard nav

---

### Where Global Study Sync Stands Out
- **Premium, motion-first design** with purposeful Framer Motion animations vs. static competitors
- **Benefit-led, human copy** — not a list of credentials, but a story of synchronized partnership
- **Single conversion funnel** — every section points to one CTA without confusion
- **Real-time video hero** — dynamic, cinematic vs. static imagery
- **Interactive data visualization** — animated stats, SVG globe, filterable grids
- **Speed + accessibility** — Next.js App Router, next/image, semantic HTML, WCAG AA

---

## 2. Information Architecture

```
/                           ← Single-page scroll (main)
  #hero
  #credibility
  #services
  #process
  #therapeutic-areas
  #global-footprint
  #why-gss
  #insights
  #testimonials
  #faq
  #contact

/careers                    ← Investigators & sites stub
/privacy-policy             ← Placeholder
/terms-of-service           ← Placeholder
```

**Navigation order:** Services → Therapeutic Areas → Global Reach → About/Why Us → Insights → Careers → Contact

---

## 3. Color Palette

| Role | Token | Hex | Notes |
|------|-------|-----|-------|
| Base / Primary | `navy-950` | `#0A0F1E` | Deep ink — backgrounds, hero |
| Base / Dark | `navy-900` | `#0D1528` | Alternate dark surfaces |
| Base / Mid | `navy-800` | `#152040` | Card backgrounds |
| Surface / Light | `navy-50` | `#F0F4FF` | Light page sections |
| Surface / Neutral | `slate-50` | `#F8FAFC` | Cards, alternating sections |
| Accent / Primary | `teal-500` | `#14B8A6` | CTAs, highlights, icons |
| Accent / Hover | `teal-400` | `#2DD4BF` | Hover states |
| Accent / Glow | `teal-300` | `#5EEAD4` | Subtle glows, underlines |
| Text / Primary | `white` | `#FFFFFF` | On dark backgrounds |
| Text / Secondary | `slate-300` | `#CBD5E1` | Subtext on dark |
| Text / Dark | `navy-950` | `#0A0F1E` | On light backgrounds |
| Text / Muted | `slate-500` | `#64748B` | Captions, meta |
| Border | `navy-700` | `#1E3A5F` | Subtle borders on dark |
| Border Light | `slate-200` | `#E2E8F0` | Borders on light |
| Success | `emerald-500` | `#10B981` | Form success states |
| Error | `red-400` | `#F87171` | Form validation |

**WCAG AA compliance:**
- White on `navy-950`: contrast ratio ~19:1 ✅
- `teal-500` on `navy-950`: contrast ratio ~4.7:1 ✅ (AA for large text)
- `navy-950` on `teal-500`: contrast ratio ~4.7:1 ✅
- White on `navy-800`: ~12:1 ✅

---

## 4. Typography

### Display / Headlines: Plus Jakarta Sans
- Weight range: 400–800
- Used for: H1–H3, hero text, section titles, card headlines
- Rationale: Modern geometric grotesk with warmth; distinctive without being quirky. Strong at large sizes. Better personality than Inter alone.
- Source: Google Fonts (`next/font/google`)

### Body / UI: Inter
- Weight range: 400–600
- Used for: body copy, nav, buttons, labels, captions, form fields
- Rationale: Industry-standard for legibility at small sizes; extensive OpenType features; pairs naturally with Jakarta Sans without competing
- Source: Google Fonts (`next/font/google`)

### Type Scale (Tailwind-mapped)

| Level | Class | Size | Weight | Use |
|-------|-------|------|--------|-----|
| Display | `text-7xl lg:text-8xl` | 72–96px | 800 | Hero headline |
| H1 | `text-5xl lg:text-6xl` | 48–60px | 700 | Page/section titles |
| H2 | `text-3xl lg:text-4xl` | 30–36px | 700 | Sub-section titles |
| H3 | `text-xl lg:text-2xl` | 20–24px | 600 | Card titles |
| Lead | `text-lg lg:text-xl` | 18–20px | 400 | Hero subtext, intros |
| Body | `text-base` | 16px | 400 | Running copy |
| Small | `text-sm` | 14px | 400 | Captions, meta, labels |
| XSmall | `text-xs` | 12px | 500 | Badges, tags |

---

## 5. Spacing & Layout Tokens

- **Container max-width:** 1280px (7xl), padding 1rem → 2rem → 4rem
- **Section padding:** `py-20 lg:py-32`
- **Border radius:** `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for containers, `rounded-full` for pills/badges
- **Shadows:** Custom `shadow-navy` (dark mode), `shadow-sm` to `shadow-lg` on light surfaces
- **Grid:** 12-column grid; components use 4-col, 6-col, or 3-col responsive breakpoints

---

## 6. Motion Design Principles

- **Entrance animations:** `fadeInUp` (y: 20→0, opacity: 0→1), duration 0.5s, ease: `easeOut`
- **Stagger children:** 0.1s delay between items in lists/grids
- **Hover states:** scale(1.02–1.05), color transitions at 200ms
- **Count-up animation:** 2s duration with easeOut, triggered on viewport entry
- **Scroll reveal:** `whileInView` with `once: true`; viewport threshold 0.2
- **Reduced motion:** All animations respect `prefers-reduced-motion` via Framer Motion's `useReducedMotion()` hook
- **Max duration:** 400ms for interactions, 600ms for entrance reveals

---

## 7. Component Architecture

```
src/
  app/
    layout.tsx          ← root layout, fonts, metadata
    page.tsx            ← single-page composition
    careers/page.tsx    ← careers stub
    privacy-policy/page.tsx
    terms-of-service/page.tsx
  components/
    layout/
      Header.tsx
      Footer.tsx
    sections/
      HeroSection.tsx
      CredibilityBar.tsx
      ServicesSection.tsx
      ProcessSection.tsx
      TherapeuticAreas.tsx
      GlobalFootprint.tsx
      WhyGSS.tsx
      InsightsSection.tsx
      Testimonials.tsx
      FAQSection.tsx
      ContactSection.tsx
    ui/
      Button.tsx
      Badge.tsx
      Card.tsx
      AnimatedCounter.tsx
      ScrollReveal.tsx
      SectionHeader.tsx
  lib/
    data.ts             ← all editable content
    utils.ts
  hooks/
    useReducedMotion.ts
    useScrollProgress.ts
```

---

## 8. Rationale Summary

The core design thesis is **"precision without coldness"** — the site must feel as rigorous and trustworthy as the science it supports, but human enough that a sponsor feels they're partnering with people, not a process. The deep navy grounds the brand in authority; teal brings life, motion, and modernity. Plus Jakarta Sans gives a distinctive voice without sacrificing professionalism. Every interaction is purposeful — animations reward attention rather than distract from it.
