# Avşar Boutique Hotel — hotelavsar.com

New website for Avşar Boutique Hotel (Şirinyalı, Muratpaşa / Antalya).

- **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · next-intl (from Phase 1)
- **Booking engine:** ElektraWeb — https://avsarhotel.rezervasyonal.com (single source of rates & availability)
- **Hosting:** Vercel (`main` → production, other branches → preview)

## Source of truth
Hotel facts live only in `data/hotel.ts` and `data/rooms.ts`. Never hardcode facts in components.
Booking links are built only with `lib/booking.ts`.

## Docs
- `docs/PHASE-1-PROMPT.md` — next build step
- `docs/homepage-mockup.png` — visual reference only (AI photos, not facts)
- `docs/chatgpt-plan.md` — original design plan

## Structure
- `app/[locale]/` — routes (tr default, en, de, ru); localized URLs in `i18n/routing.ts`
- `messages/*.json` — all UI text; `npm run check:i18n` fails on missing keys
- `components/ui` — Container, Section, Heading/Eyebrow/Text, Button, MediaPlaceholder
- `components/layout` — Header, Footer, LanguageSwitcher, WhatsAppButton
- `data/media.ts` — image slots (`null` → placeholder)
- `data/legacy-redirects.ts` — 301s from the old WordPress URLs

## Launch switch
The site is `noindex` and `robots.txt` blocks crawling until `NEXT_PUBLIC_SITE_LIVE=true`
is set in Vercel (Production) — do this only when hotelavsar.com points to Vercel.

## Develop
```bash
npm install
npm run dev
npm run check   # i18n keys + TypeScript + ESLint
npm run build
```
