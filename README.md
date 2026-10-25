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

## Develop
```bash
npm install
npm run dev
```
