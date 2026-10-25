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
  /** CSS object-position for cropping (e.g. "70% 50%"). Applies on desktop, and on phones unless positionMobile is set. */
  position?: string;
  /** object-position below the lg breakpoint (portrait crops). */
  positionMobile?: string;
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
  // Aerial: hotel + Dialogue on the left, sea on the right (text sits over the sea on desktop).
  // Phones: keep the hotel building in frame. Do not mirror/rotate.
  hero: {
    src: "/images/hotel/hero-aerial.jpg",
    width: 1672,
    height: 941,
    position: "50% 45%",
    positionMobile: "20% 45%",
    // Owner: composite of two real drone shots (confirmed 25 Oct 2026).
  } as MediaItem,
  intro: [empty, empty, empty],
  // Room photos: first item = card image. Superior Sea View 01–04 are owner photos with light AI touch-ups (sky/light).
  rooms: {
    "standard-land-view": [
      { src: "/images/rooms/standard-land-view/01.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/standard-land-view/02.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/standard-land-view/03.jpg", width: 2400, height: 1600 },
    ],
    "standard-sea-view": [
      { src: "/images/rooms/standard-sea-view/01.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/standard-sea-view/02.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/standard-sea-view/03.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/standard-sea-view/04.jpg", width: 2400, height: 1600 },
    ],
    "partial-sea-view": [
      { src: "/images/rooms/partial-sea-view/01.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/partial-sea-view/02.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/partial-sea-view/03.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/partial-sea-view/04.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/partial-sea-view/05.jpg", width: 2400, height: 1600 },
    ],
    "comfort-sea-view": [
      { src: "/images/rooms/comfort-sea-view/01.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/comfort-sea-view/02.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/comfort-sea-view/03.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/comfort-sea-view/04.jpg", width: 2400, height: 1600 },
    ],
    "superior-land-view": [
      { src: "/images/rooms/superior-land-view/01.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/superior-land-view/02.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/superior-land-view/03.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/superior-land-view/04.jpg", width: 2400, height: 1600 },
    ],
    "deluxe-sea-view": [
      { src: "/images/rooms/deluxe-sea-view/01.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/deluxe-sea-view/02.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/deluxe-sea-view/03.jpg", width: 2400, height: 1600 },
      { src: "/images/rooms/deluxe-sea-view/04.jpg", width: 1138, height: 1707 },
    ],
    "superior-sea-view": [
      { src: "/images/rooms/superior-sea-view/01.jpg", width: 1448, height: 1086 },
      { src: "/images/rooms/superior-sea-view/02.jpg", width: 1448, height: 1086 },
      { src: "/images/rooms/superior-sea-view/03.jpg", width: 1448, height: 1086 },
      { src: "/images/rooms/superior-sea-view/04.jpg", width: 1448, height: 1086 },
      { src: "/images/rooms/superior-sea-view/05.jpg", width: 2400, height: 1600 },
    ],
} satisfies Record<RoomSlug, MediaItem[]>,
  // Panoramic terrace view used as the homepage Dialogue banner and the Dialogue page header.
  dialogue: [
    { src: "/images/dialogue/terrace-sunset.jpg", width: 2244, height: 701, position: "62% 50%", provisional: true },
  ] as MediaItem[],
  breakfast: empty,
  pool: empty,
  spa: empty, // owner: SPA exists, no original photos yet
  nightExterior: empty,
  // Antalya coastline (cliffs + Beydağları) behind the closing booking call-to-action.
  ctaBanner: { src: "/images/hotel/coast-cliffs.jpg", width: 2244, height: 701, position: "65% 50%", provisional: true } as MediaItem,
  // Add original photos here (order = display order). Homepage preview uses the first 5.
  gallery: [
    { src: "/images/gallery/view-01.jpg", width: 1448, height: 1086, category: "views" },
    { src: "/images/gallery/view-02.jpg", width: 1448, height: 1086, category: "views" },
    { src: "/images/gallery/view-03.jpg", width: 1448, height: 1086, category: "views" },
    { src: "/images/gallery/view-04.jpg", width: 1448, height: 1086, category: "views" },
    { src: "/images/gallery/view-05.jpg", width: 1448, height: 1086, category: "views" },
    { src: "/images/gallery/view-06.jpg", width: 1448, height: 1086, category: "views" },
    { src: "/images/rooms/superior-sea-view/01.jpg", width: 1448, height: 1086, category: "rooms" },
    { src: "/images/rooms/standard-sea-view/01.jpg", width: 2400, height: 1600, category: "rooms" },
    { src: "/images/rooms/comfort-sea-view/01.jpg", width: 2400, height: 1600, category: "rooms" },
    { src: "/images/rooms/partial-sea-view/01.jpg", width: 2400, height: 1600, category: "rooms" },
    { src: "/images/rooms/deluxe-sea-view/01.jpg", width: 2400, height: 1600, category: "rooms" },
    { src: "/images/rooms/superior-land-view/01.jpg", width: 2400, height: 1600, category: "rooms" },
    { src: "/images/rooms/standard-land-view/01.jpg", width: 2400, height: 1600, category: "rooms" },
  ] as GalleryItem[],
} as const;

// TODO: request original high-resolution files (JPG/RAW) from the hotel / photographer.
// The old site only has 2015-era compressed PNGs.
