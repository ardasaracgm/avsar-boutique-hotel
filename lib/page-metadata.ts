import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { AppPathname } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

type PageKey = "about" | "rooms" | "dialogue" | "experiences" | "gallery" | "guide" | "contact" | "privacy" | "terms" | "kvkk";

/** Title + canonical/hreflang for a static localized page. */
export async function pageMetadata(href: Exclude<AppPathname, "/rooms/[slug]">, key: PageKey): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t(`${key}.title`),
    alternates: localizedAlternates(href, locale),
  };
}
