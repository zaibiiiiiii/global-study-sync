# Global Study Sync

Responsive B2B website for an independent clinical research site-sourcing and business development company. The site describes preliminary site identification, feasibility coordination, site and investigator relationship development, and professional introductions. It does not present Global Study Sync as a CRO, sponsor, recruitment agency, or established site network.

## Run locally

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. To run a production build locally:

```powershell
npm run lint
npm run build
npm run start
```

With the production server running, run the browser smoke checks in another terminal:

```powershell
npx playwright install chromium # one-time, if Chromium is not installed
npm run smoke
```

The smoke script checks route and internal-link responses, mobile navigation, 404 behavior, SEO assets, responsive overflow, text contrast on the home page, and form validation plus unavailable/success UI states. It mocks the success response locally and does not send real inquiries.

## Configure inquiry delivery

The sponsor, site, and general inquiry forms validate entries in the browser and on the server. Until every delivery requirement is configured, the API rejects submissions with an explicit unavailable message and does not save or forward the submitted fields.

To enable delivery:

1. Create a Resend account, verify a sending domain, and create an API key with email-sending access.
2. Create a Cloudflare Turnstile widget for the deployed site and its hostnames.
3. Have the Privacy Policy draft reviewed and replaced with the final notice that accurately describes the form and email provider. Do not enable delivery while the linked page is still marked as a draft.
4. Set the environment values below in `.env.local` for local use and in the deployment provider for production. Keep private values server-side.
5. Set both delivery flags to `true` only after the sender, recipient, Turnstile keys, and final HTTPS privacy notice are in place. Redeploy after changing `NEXT_PUBLIC_*` values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The real canonical website origin, used for metadata, sitemap, and robots output. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional verified business email shown on the Contact page. Leave blank until one is available. |
| `NEXT_PUBLIC_PRIVACY_NOTICE_URL` | Absolute HTTPS final privacy-notice URL shown beside consent. Delivery stays unavailable until this is set. |
| `NEXT_PUBLIC_INQUIRY_DELIVERY_ENABLED` | Public form status flag. Set to `true` only after delivery is ready. |
| `INQUIRY_DELIVERY_ENABLED` | Server-side delivery switch. Must also be `true` to send. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Cloudflare Turnstile widget key. |
| `TURNSTILE_SECRET_KEY` | Private Turnstile verification key. |
| `RESEND_API_KEY` | Private Resend API key. |
| `CONTACT_TO_EMAIL` | Business inbox that receives inquiries. |
| `CONTACT_FROM_EMAIL` | Sender address on the verified Resend domain. |
| `PUBLISHED_PRIVACY_NOTICE_URL` | Absolute HTTPS URL of the final approved privacy notice, recorded in the delivered email. It must match `NEXT_PUBLIC_PRIVACY_NOTICE_URL`. |

The application does not use a database for inquiry submissions. When configured, the message is sent to the business inbox through Resend; that provider processes the email. Do not enable delivery until the final privacy notice and provider configuration are in place. The forms warn visitors not to submit confidential protocols or patient-identifiable information, and they do not provide file uploads.

## Pages and content

- `/` — positioning, service overview, process, and calls to action.
- `/services` — four scoped service areas and engagement terms.
- `/for-sponsors` — sponsor and CRO support, information checklist, and study inquiry.
- `/for-sites` — site profile details, no-guarantee disclosure, and site-interest form.
- `/about` — company description and operating principles.
- `/contact` — separate sponsor/CRO, site/investigator, and general inquiry paths.
- `/privacy-policy` and `/terms-of-use` — visibly marked drafts with `noindex`; replace with reviewed legal text before launch.

The site uses a generated lowercase connected-g mark, page-specific metadata, Open Graph defaults, a sitemap, robots rules, keyboard-accessible navigation, and a custom 404 page. The canonical domain is intentionally not assumed: set `NEXT_PUBLIC_SITE_URL` to the actual domain before deployment.

## Publish the website

1. Deploy this Next.js project to a host that supports the App Router and Node.js Route Handlers.
2. Add the chosen domain in the hosting provider’s project settings and follow the DNS records it supplies at the domain registrar.
3. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin. Add the same hostname to Turnstile and verify the Resend sender domain.
4. Configure the remaining production environment values and publish the reviewed privacy notice and terms.
5. Keep delivery disabled until a production inquiry is confirmed end to end. Do not use real patient or confidential study data for that check.

## Design system

The visual palette uses forest green `#173D35`, warm ivory `#F5F0E7`, champagne `#B7A078`, charcoal `#282C29`, sage `#DCE5DE`, and white. The homepage hero uses the supplied `public/video/hero.mp4` as a full-bleed background with a forest overlay, a small accessible playback toggle, and a still poster when motion is reduced or data saving is enabled. A forest-tinted image background uses small scroll-linked parallax movement; Motion disables that movement for visitors who prefer reduced motion. Page introductions use a brief, staggered text entrance that is disabled for reduced-motion preferences. Static, locally optimized Pexels photographs support the alternating editorial sections; none are presented as Global Study Sync staff, clients, investigators, or partner sites. Photographer and source details are in `public/images/credits.md`.
