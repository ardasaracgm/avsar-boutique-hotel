import { hotel } from "@/data/hotel";

/**
 * Indexing switch. Until launch day the site must stay out of search engines.
 * Set NEXT_PUBLIC_SITE_LIVE=true in Vercel (Production only) when hotelavsar.com points here.
 */
export const isSiteLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

/** Canonical origin — always the real domain, never a vercel.app preview URL. */
export const siteUrl = hotel.siteUrl;
