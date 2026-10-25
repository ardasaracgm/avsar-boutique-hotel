/**
 * Image manifest. Every image slot on the site is listed here by key.
 * `src: null` → the component renders <MediaPlaceholder />. Never point a slot at stock
 * or AI-generated imagery: only original hotel photos (put files in public/images/...).
 */
import type { rooms } from "./rooms";

export type MediaItem = {
  src: string | null;
  width?: number;
  height?: number;
  /** Translation key under `media.alt.*` once real photos exist. */
  altKey?: string;
  /** CSS object-position for cropping (e.g. "70% 50%" keeps the right side in view on phones). */
  position?: string;
  /**
   * true = atmospheric image that does not show the hotel itself (or not yet confirmed as an
   * original photo). Must be replaced with an original photo before launch — see docs/LAUNCH.md.
   */
  provisional?: boolean;
};

type RoomSlug = (typeof rooms)[number]["slug"];

export const galleryCategories = ["hotel", "rooms", "dialogue", "pool", "views"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  /** Path under public/, e.g. "/images/gallery/pool-1.jpg". */
  src: string;
  width: number;
  height: number;
  category: GalleryCategory;
  /** Optional per-locale alt text; falls back to the category name. */
  alt?: Partial<Record<"tr" | "en" | "de" | "ru", string>>;
};

const empty: MediaItem = { src: null };

export const media = {
  // Antalya coastline (cliffs + Beydağları) — provisional until an original hotel photo arrives.
  hero: { src: "/images/hotel/hero-coast.jpg", width: 2244, height: 701, position: "72% 50%", provisional: true } as MediaItem,
  intro: [empty, empty, empty],
  rooms: {
    "standard-land-view": [empty],
    "standard-sea-view": [empty],
    "partial-sea-view": [empty],
    "comfort-sea-view": [empty],
    "superior-land-view": [empty],
    "deluxe-sea-view": [empty],
    "superior-sea-view": [empty],
  } satisfies Record<RoomSlug, MediaItem[]>,
  dialogue: [empty],
  breakfast: empty,
  pool: empty,
  spa: empty, // owner: SPA exists, no original photos yet
  nightExterior: empty,
  // Add original photos here (order = display order). Homepage preview uses the first 5.
  gallery: [] as GalleryItem[],
} as const;

// TODO: request original high-resolution files (JPG/RAW) from the hotel / photographer.
// The old site only has 2015-era compressed PNGs.
