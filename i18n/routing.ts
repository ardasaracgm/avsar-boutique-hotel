import { defineRouting } from "next-intl/routing";

export const locales = ["tr", "en", "de", "ru"] as const;
export type Locale = (typeof locales)[number];

/** Text direction per locale. Ready for RTL (e.g. `ar`) without refactoring. */
export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  tr: "ltr",
  en: "ltr",
  de: "ltr",
  ru: "ltr",
};

/** BCP-47 tags used for hreflang and Open Graph. */
export const localeTag: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en",
  de: "de",
  ru: "ru",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "tr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/rooms": { tr: "/odalar", en: "/rooms", de: "/zimmer", ru: "/nomera" },
    "/rooms/[slug]": {
      tr: "/odalar/[slug]",
      en: "/rooms/[slug]",
      de: "/zimmer/[slug]",
      ru: "/nomera/[slug]",
    },
    "/dialogue": "/dialogue",
    "/experiences": { tr: "/deneyimler", en: "/experiences", de: "/erlebnisse", ru: "/vpechatleniya" },
    "/gallery": { tr: "/galeri", en: "/gallery", de: "/galerie", ru: "/galereya" },
    "/about": { tr: "/hakkimizda", en: "/about", de: "/ueber-uns", ru: "/o-nas" },
    "/antalya-guide": {
      tr: "/antalya-rehberi",
      en: "/antalya-guide",
      de: "/antalya-reisefuehrer",
      ru: "/putevoditel-antalya",
    },
    "/contact": { tr: "/iletisim", en: "/contact", de: "/kontakt", ru: "/kontakty" },
    "/privacy": { tr: "/gizlilik", en: "/privacy", de: "/datenschutz", ru: "/konfidentsialnost" },
    "/terms": { tr: "/kullanim-kosullari", en: "/terms", de: "/agb", ru: "/usloviya" },
    "/kvkk": "/kvkk",
  },
});

export type AppPathname = keyof typeof routing.pathnames;

/** Static (non-parameterised) routes — used by sitemap and stub pages. */
export const staticPathnames = Object.keys(routing.pathnames).filter(
  (p) => !p.includes("["),
) as Exclude<AppPathname, "/rooms/[slug]">[];
