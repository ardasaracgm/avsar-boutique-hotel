import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";
import type { AppPathname } from "@/i18n/routing";
import { absoluteUrl, baseOpenGraph, localizedAlternates } from "@/lib/seo";

type PageKey = "about" | "rooms" | "dialogue" | "experiences" | "gallery" | "guide" | "contact" | "privacy" | "terms" | "kvkk";
type Href = Parameters<typeof absoluteUrl>[0];

/** Title, description, canonical/hreflang and Open Graph for a localized page. */
export async function seoMetadata({ href, title, description }: { href: Href; title: string; description?: string }): Promise<Metadata> {
  const locale = await getLocale();
  const url = absoluteUrl(href, locale);
  return {
    title,
    description,
    alternates: localizedAlternates(href, locale),
    openGraph: { ...baseOpenGraph(locale), title: `${title} | ${hotel.name}`, description, url },
    twitter: { card: "summary_large_image", title: `${title} | ${hotel.name}`, description, images: ["/og.png"] },
  };
}

/** Shortcut for static pages whose title is `pages.<key>.title`. */
export async function pageMetadata(
  href: Exclude<AppPathname, "/rooms/[slug]">,
  key: PageKey,
  description?: string,
): Promise<Metadata> {
  const t = await getTranslations("pages");
  return seoMetadata({ href, title: t(`${key}.title`), description });
}
