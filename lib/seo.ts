import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { localeTag, routing, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { hotel } from "@/data/hotel";

type Href = Parameters<typeof getPathname>[0]["href"];

export const absoluteUrl = (href: Href, locale: Locale) => `${siteUrl}${getPathname({ href, locale })}`;

/**
 * Open Graph fields shared by every page. Pages that set `openGraph` replace the layout's
 * object entirely (shallow merge), so they must spread this in.
 * TODO: swap /og.png for a real hero photo crop (1200×630) once photos exist.
 */
export function baseOpenGraph(locale: Locale) {
  return {
    type: "website" as const,
    siteName: hotel.name,
    locale: localeTag[locale].replace("-", "_"),
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${hotel.name} — Lara, Antalya` }],
  };
}

/** Canonical + hreflang alternates (incl. x-default → tr) for a localized route. */
export function localizedAlternates(href: Href, locale: Locale): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[localeTag[l]] = absoluteUrl(href, l);
  languages["x-default"] = absoluteUrl(href, routing.defaultLocale);

  return { canonical: absoluteUrl(href, locale), languages };
}
