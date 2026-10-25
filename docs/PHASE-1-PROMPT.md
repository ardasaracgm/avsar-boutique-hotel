# AVŞAR BOUTIQUE HOTEL — PHASE 1 (revised)

You are a senior frontend engineer building a premium boutique hotel website.
We are rebuilding https://hotelavsar.com/ from scratch (old site: WordPress hostel theme — do not reuse anything from it).

Attached:
- `homepage-mockup.png` — visual reference ONLY (layout, spacing, typography, palette). Its photos are AI-generated and its text/numbers are NOT facts.
- `data/hotel.ts`, `data/rooms.ts`, `data/legacy-redirects.ts`, `lib/booking.ts` — **the only source of hotel facts**. Copy them into the project unchanged. Never invent or hardcode a fact (sizes, capacities, phone, distances, services) anywhere else. If something you need is missing, add a `TODO` and tell me — do not guess.

## Stack
- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui (only the primitives we actually use)
- lucide-react
- motion (`motion/react`)
- next-intl
- next/image, next/font
Use current stable, mutually compatible versions. No CMS — content lives in `data/` and `messages/`.

## Brand
- Hotel name everywhere, all locales: **Avşar Boutique Hotel** (never "Avşar Butik Otel", "Avşar Hotel", "Avşar Otel").
- Café/restaurant name: **Dialogue Coffee & Kitchen** (never "Dialog Cafe", "Dialogue Cafe", "Dialogue Restaurant").
- Turkish SEO keywords ("butik otel", "deniz manzaralı", "Lara") belong in copy and meta, not in the brand name.

## Design tokens
Navy `#142C3B` · Ivory `#F6F2EB` · Sand Gold `#C2A47C` · Mediterranean Blue `#5C8C9D` · White `#FFFFFF`
Headings: Cormorant Garamond (latin + latin-ext + cyrillic subsets). Body: Manrope (latin + latin-ext + cyrillic).
Language: large editorial headings, generous whitespace, minimal borders/shadows, restrained motion, `prefers-reduced-motion` respected.

## Internationalization
- Locales: `tr` (default), `en`, `de`, `ru`. Prefix always (`/tr`, `/en`…). `/` redirects by Accept-Language, falling back to `tr`.
- Build RTL-ready (`dir` on `<html>` from locale config, logical CSS properties `ps-/pe-/ms-/me-`) so Arabic can be added later without refactoring. Do NOT add `ar` now.
- Localized pathnames via next-intl `pathnames`:

| key | tr | en | de | ru |
|---|---|---|---|---|
| rooms | /odalar | /rooms | /zimmer | /nomera |
| room | /odalar/[slug] | /rooms/[slug] | /zimmer/[slug] | /nomera/[slug] |
| dialogue | /dialogue | /dialogue | /dialogue | /dialogue |
| experiences | /deneyimler | /experiences | /erlebnisse | /vpechatleniya |
| gallery | /galeri | /gallery | /galerie | /galereya |
| about | /hakkimizda | /about | /ueber-uns | /o-nas |
| guide | /antalya-rehberi | /antalya-guide | /antalya-reisefuehrer | /putevoditel-antalya |
| contact | /iletisim | /contact | /kontakt | /kontakty |
| privacy | /gizlilik | /privacy | /datenschutz | /konfidentsialnost |
| terms | /kullanim-kosullari | /terms | /agb | /usloviya |
| kvkk | /kvkk | /kvkk | /kvkk | /kvkk |

- Every user-facing string comes from `messages/{locale}.json`. Write real TR and EN copy for Phase 1 UI strings; DE and RU may be machine-quality but complete (no missing keys). Add a script that fails if any locale is missing a key.

## Booking & contact behavior
- Booking engine: ElektraWeb at `https://avsarhotel.rezervasyonal.com/`. Always build links with `buildBookingUrl()` / `bookingHomeUrl()` from `lib/booking.ts` (passes `language` + `currency`; dates and adults when provided). Open in the same tab.
- Do not send a children parameter (format unverified — see `CHILDREN_PARAM_VERIFIED`).
- Prices are shown in EUR by the engine (it converts to TRY internally). The site itself never displays prices.
- Room facts: no room has a kitchen; balconies exist only in corner rooms (`roomPolicies`). Never show "balcony" or "kitchen" as a room-type feature.
- Phone links use `hotel.contact.phone.tel`. WhatsApp uses `whatsappUrl()` with a localized prefilled message.

## Phase 1 scope
1. Project scaffold, configs, path alias `@/`
2. Tailwind theme with the tokens above, global styles, typography scale
3. next-intl setup (routing, pathnames, middleware, request config, typed messages)
4. Root `[locale]/layout.tsx`: fonts, `lang`/`dir`, base metadata, `hreflang` alternates helper in `lib/seo.ts`
5. Header: logo (text wordmark until the real logo file arrives), nav, language switcher that keeps the current page, "Rezervasyon" button → `bookingHomeUrl(locale)`. Sticky, slim on scroll. Mobile: full-screen menu, focus-trapped, Esc closes, body scroll locked.
6. Footer: address, phone, e-mail, WhatsApp, quick links, legal links, tourism license number from `hotel.legal`, language list, © current year (computed). Social icons render only if a URL exists in `hotel.social`.
7. Floating WhatsApp button (bottom-right, mobile-safe, does not cover content or the future sticky booking bar).
8. UI primitives: Container, Section, Heading/Eyebrow/Text, Button (primary/outline/ghost, link-as-button), and a `MediaPlaceholder` component — a neutral labeled box used wherever a real photo is missing (e.g. SPA). Never use stock or AI photos as hotel images.
9. `data/media.ts` manifest: every image slot by key (hero, rooms.<slug>[], dialogue[], pool, spa, gallery[]) with `src | null`; components render `MediaPlaceholder` when `null`.
10. `next.config.ts` redirects from `data/legacy-redirects.ts` (permanent).
11. `app/sitemap.ts` and `app/robots.ts` (all locales, alternates).
12. Placeholder home route showing header, a simple hero block, footer — enough to verify layout, i18n and links. Do not build the full homepage yet.
13. Stub pages for every route above (title + "coming soon"), so navigation and the language switcher work end to end.

## Quality gates (run and fix before reporting)
- `tsc --noEmit`, ESLint, `next build` all pass
- No console errors, no horizontal overflow at 360px
- Keyboard: all interactive elements reachable, visible focus ring
- Lighthouse mobile on the placeholder home: Performance ≥ 90, Accessibility ≥ 95

## Report
List files created, any TODOs added, any fact you needed but did not find in `data/`, and what is ready for Phase 2 (homepage).
