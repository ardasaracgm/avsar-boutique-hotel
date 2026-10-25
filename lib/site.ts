import { hotel } from "@/data/hotel";

/**
 * Indexing switch. Until launch day the site must stay out of search engines.
 * Set NEXT_PUBLIC_SITE_LIVE=true in Vercel (Production only) when hotelavsar.com points here.
 */
export const isSiteLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

/** Canonical origin — always the real domain, never a vercel.app preview URL. */
export const siteUrl = hotel.siteUrl;

/**
 * Origin used to resolve shared assets such as the link-preview image (og.jpg).
 * Before launch hotelavsar.com still serves the old site, so previews shared from
 * the vercel.app address must load their image from Vercel itself.
 */
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
export const assetOrigin = isSiteLive || !vercelHost ? siteUrl : `https://${vercelHost}`;
