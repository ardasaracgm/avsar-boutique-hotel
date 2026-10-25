import type { AppPathname } from "@/i18n/routing";

/** Primary navigation, in display order. Labels come from `nav.<key>`. */
export const mainNav = [
  { key: "about", href: "/about" },
  { key: "rooms", href: "/rooms" },
  { key: "dialogue", href: "/dialogue" },
  { key: "experiences", href: "/experiences" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const satisfies readonly { key: string; href: AppPathname }[];

export const infoNav = [
  { key: "guide", href: "/antalya-guide" },
  { key: "kvkk", href: "/kvkk" },
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
] as const satisfies readonly { key: string; href: AppPathname }[];

/** True when `current` (internal pathname) is `href` or nested below it. */
export const isActive = (current: string, href: string) =>
  href === "/" ? current === "/" : current === href || current.startsWith(`${href}/`);
