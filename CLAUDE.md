# Avşar Boutique Hotel — project rules

@AGENTS.md

## Context
New website for Avşar Boutique Hotel (Şirinyalı, Muratpaşa / Antalya), replacing the old WordPress site at hotelavsar.com.
The owner works in Turkish; code, comments and commits are in English.

## Hard rules
- Hotel facts (sizes, capacities, phone, distances, services) come ONLY from `data/hotel.ts` and `data/rooms.ts`. Never hardcode or invent a fact. If one is missing, add a `TODO` and say so.
- Booking links are built ONLY with `lib/booking.ts` (ElektraWeb, https://avsarhotel.rezervasyonal.com). Never send the children parameter until `CHILDREN_PARAM_VERIFIED` is true.
- Brand names: "Avşar Boutique Hotel" and "Dialogue Coffee & Kitchen" in every locale. No other variants.
- No room has a kitchen; balconies exist only in corner rooms. Never list balcony/kitchen as a room-type feature.
- Never use stock or AI-generated photos as hotel images. Missing photo → `MediaPlaceholder`.
- `docs/homepage-mockup.png` is a visual reference only; its text and numbers are not facts.
- All user-facing strings go through next-intl messages (tr default, en, de, ru).

## Workflow
- Work in small, incremental steps, one phase at a time (see `docs/PHASE-1-PROMPT.md`).
- Before reporting done: `npx tsc --noEmit`, `npm run lint`, `npm run build` must pass.
- `main` deploys to production on Vercel; use feature branches for larger changes.
