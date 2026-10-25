# Launch checklist — hotelavsar.com

## Before switching the domain
- [ ] **Provisional images**: every `media.ts` item with `provisional: true` (currently the Dialogue terrace banner and the closing CTA coastline) must be an original, confirmed photo before launch.
- [ ] **Photos**: originals in `public/images/…`, slots filled in `data/media.ts` (hero, intro, rooms ×7, Dialogue, breakfast, pool, spa, night exterior, gallery). Re-crop `public/og.jpg` (1200×630) if the hero changes.
- [ ] **Logo**: replace the text wordmark (`components/layout/wordmark.tsx`) and icons (`app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`) if the hotel has an official logo.
- [x] **Company title** added (from the tourism licence). [ ] **Legal**: have KVKK / privacy / terms texts reviewed by the hotel's legal advisor.
- [ ] **Vercel plan**: move the project to a Pro account/team (Hobby is non-commercial).
- [ ] **ElektraWeb panel**: hotel name → "Avşar Boutique Hotel", phone → 0242 324 25 05, website → https://hotelavsar.com, e-mail (decide info@ vs rezervasyon@), "Standard Landview" → "Standard Land View".
- [ ] **WhatsApp**: replace the temporary number in `data/hotel.ts` when ready.
- [ ] **Contact form (optional)**: Resend account + `avsarhotel.com` DNS records, then Vercel env `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (and optionally `CONTACT_TO_EMAIL`), redeploy.

## Domain switch (Natro + CDN)
The current site sits behind a CDN (likely Cloudflare). On launch day:
1. Vercel → Project → Settings → Domains → add `hotelavsar.com` and `www.hotelavsar.com` (choose one as primary; the other redirects).
2. In the DNS panel that is actually authoritative (the CDN if nameservers point there, otherwise Natro):
   - `A` record for `hotelavsar.com` → the IP Vercel shows (currently `76.76.21.21`)
   - `CNAME` for `www` → `cname.vercel-dns.com`
   - If the CDN is Cloudflare: set these records to **DNS only** (grey cloud) so Vercel can issue the SSL certificate.
3. Wait until Vercel shows the domain as valid (SSL issued).
4. Vercel → Environment Variables (Production): `NEXT_PUBLIC_SITE_LIVE=true` → redeploy. This removes `noindex` and opens `robots.txt`.
5. Do **not** touch e-mail DNS records (MX/SPF/DKIM for `avsarhotel.com` are on a different domain; for `hotelavsar.com` keep any existing MX as is).

## Right after launch
- [ ] Test old URLs: `/hostel_room/dlxsv/`, `/butik_otel-avsar_iletisim/`, `/avsar-otel-havuz/` → should 301 to the new pages.
- [ ] Google Search Console: verify the domain, submit `https://hotelavsar.com/sitemap.xml`.
- [ ] Google Business Profile: website link → `https://hotelavsar.com/tr`, booking link → ElektraWeb.
- [ ] Test the booking search from a phone (dates + guests arrive in ElektraWeb).
- [ ] Keep the old WordPress hosting for a few weeks, then cancel.
