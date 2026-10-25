import type { MetadataRoute } from "next";
import { isSiteLive, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isSiteLive) {
    // Pre-launch / previews: block all crawling.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
