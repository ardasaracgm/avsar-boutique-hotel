/**
 * 301 redirects from the old WordPress site (hotelavsar.com) to the new routes.
 * Consumed by next.config.ts `redirects()`. Target paths are TR (default locale).
 *
 * Before launch: crawl the old sitemap (wp-sitemap.xml) once more for any URL missing here.
 */

import { rooms } from "./rooms";

export const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/modern-butik-otel-odalari", destination: "/tr/odalar" },
  { source: "/services-facilities", destination: "/tr/dialogue" },
  { source: "/avsar_hotel_hakkimizda", destination: "/tr/hakkimizda" },
  { source: "/avsar_butik_otel_galeri", destination: "/tr/galeri" },
  { source: "/avsar-otel-havuz", destination: "/tr/deneyimler#pool" },
  { source: "/butik_otel-avsar_iletisim", destination: "/tr/iletisim" },
  { source: "/gizlilik-sozlesmesi", destination: "/tr/gizlilik" },
  { source: "/kullanim-sozlesmesi", destination: "/tr/kullanim-kosullari" },
  { source: "/kisisel-verileri-koruma-kanunu-bilgilendirmesi", destination: "/tr/kvkk" },
  // Old blog posts → Antalya guide / about (decide: migrate content or redirect)
  { source: "/avsar_butik_hotel_deneyimi", destination: "/tr/hakkimizda" },
  { source: "/avsar_butik_hotel_gastronomi", destination: "/tr/dialogue" },
  { source: "/yerel_cevre_gezi_rotalari", destination: "/tr/antalya-rehberi" },
  ...rooms.flatMap((r) => (r.legacyPath ? [r] : [])).map((r) => ({
    source: r.legacyPath!.replace(/\/$/, ""),
    destination: `/tr/odalar/${r.slug}`,
  })),
  // Catch-alls for the rest of the old WordPress structure (must stay after the specific rules).
  { source: "/hostel_room/:slug", destination: "/tr/odalar" },
  { source: "/category/:path*", destination: "/tr" },
  { source: "/tag/:path*", destination: "/tr" },
  { source: "/author/:path*", destination: "/tr" },
  { source: "/feed", destination: "/tr" },
  { source: "/wp-login.php", destination: "/tr" },
  { source: "/wp-admin/:path*", destination: "/tr" },
];
