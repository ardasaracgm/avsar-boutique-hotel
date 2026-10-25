import type { MetadataRoute } from "next";
import { rooms } from "@/data/rooms";
import { localeTag, routing, staticPathnames } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

type Href = Parameters<typeof absoluteUrl>[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs: Href[] = [
    ...staticPathnames,
    ...rooms.map((r) => ({ pathname: "/rooms/[slug]" as const, params: { slug: r.slug } })),
  ];

  return hrefs.flatMap((href) => {
    const languages = Object.fromEntries(routing.locales.map((l) => [localeTag[l], absoluteUrl(href, l)]));
    return routing.locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      alternates: { languages },
    }));
  });
}
