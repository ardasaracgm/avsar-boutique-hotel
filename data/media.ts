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

/** Use for a slot with no photo yet (renders a neutral placeholder). */
export const emptyMedia: MediaItem = { src: null };

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
  // Homepage intro trio: 1 tall + 2 small.
  intro: [
    { src: "/images/hotel/sunset-dialogue-view.jpg", width: 1122, height: 1402 },
    { src: "/images/hotel/pool.jpg", width: 1086, height: 1448, position: "50% 62%" },
    { src: "/images/rooms/superior-sea-view/01.jpg", width: 1448, height: 1086 },
  ] as MediaItem[],
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
  // Dialogue Coffee & Kitchen — original photos. [0] = homepage banner, [1] = Dialogue page header.
  dialogue: [
    { src: "/images/dialogue/terrace.jpg", width: 2048, height: 1365, position: "55% 55%" },
    { src: "/images/dialogue/aerial-cliff.jpg", width: 2048, height: 1534, position: "50% 45%" },
    { src: "/images/dialogue/breakfast-view.jpg", width: 2048, height: 1536 },
    { src: "/images/dialogue/garden.jpg", width: 2048, height: 1365 },
    { src: "/images/dialogue/night.jpg", width: 2048, height: 1534 },
    { src: "/images/dialogue/aerial-hotel.jpg", width: 2048, height: 1533 },
    { src: "/images/dialogue/aerial-top.jpg", width: 2048, height: 1533 },
    { src: "/images/dialogue/breakfast-terrace.jpg", width: 2048, height: 1536 },
  ] as MediaItem[],
  breakfast: { src: "/images/dialogue/breakfast-terrace.jpg", width: 2048, height: 1536 } as MediaItem,
  pool: { src: "/images/hotel/pool.jpg", width: 1086, height: 1448, position: "50% 62%" } as MediaItem,
  spa: { src: "/images/hotel/spa-massage.jpg", width: 960, height: 720 } as MediaItem, // massage room (owner-supplied)
  // Dialogue terrace at night (Antalya guide header).
  nightExterior: { src: "/images/dialogue/night.jpg", width: 2048, height: 1534 } as MediaItem,
  // Hotel, Dialogue and the cliffs with Lara behind — Experiences "location" block and Contact header.
  location: { src: "/images/dialogue/aerial-hotel.jpg", width: 2048, height: 1533, position: "50% 55%" } as MediaItem,
  // Top-down drone shot of the terrace, cliffs and sea behind the closing booking call-to-action.
  ctaBanner: { src: "/images/dialogue/aerial-top.jpg", width: 2048, height: 1533, position: "50% 45%" } as MediaItem,
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
    { src: "/images/dialogue/terrace.jpg", width: 2048, height: 1365, category: "dialogue" },
    { src: "/images/dialogue/night.jpg", width: 2048, height: 1534, category: "dialogue" },
    { src: "/images/dialogue/breakfast-view.jpg", width: 2048, height: 1536, category: "dialogue" },
    { src: "/images/dialogue/garden.jpg", width: 2048, height: 1365, category: "dialogue" },
    { src: "/images/dialogue/aerial-cliff.jpg", width: 2048, height: 1534, category: "hotel" },
    { src: "/images/dialogue/aerial-top.jpg", width: 2048, height: 1533, category: "hotel" },
    { src: "/images/dialogue/aerial-hotel.jpg", width: 2048, height: 1533, category: "hotel" },
    { src: "/images/hotel/pool.jpg", width: 1086, height: 1448, category: "pool" },
    { src: "/images/hotel/spa-massage.jpg", width: 960, height: 720, category: "hotel" },
  ] as GalleryItem[],
} as const;

// TODO: request original high-resolution files (JPG/RAW) from the hotel / photographer.
// The old site only has 2015-era compressed PNGs.
