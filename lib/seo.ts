import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { localeTag, routing, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

type Href = Parameters<typeof getPathname>[0]["href"];

export const absoluteUrl = (href: Href, locale: Locale) => `${siteUrl}${getPathname({ href, locale })}`;

/** Canonical + hreflang alternates (incl. x-default → tr) for a localized route. */
export function localizedAlternates(href: Href, locale: Locale): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[localeTag[l]] = absoluteUrl(href, l);
  languages["x-default"] = absoluteUrl(href, routing.defaultLocale);

  return { canonical: absoluteUrl(href, locale), languages };
}
