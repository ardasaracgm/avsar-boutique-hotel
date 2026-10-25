/**
 * Room types — facts only. Names and descriptions come from messages/*.json
 * under `rooms.<slug>.name` / `rooms.<slug>.description`.
 *
 * Source: ElektraWeb room list (names, max guests incl. extra bed — owner, 25 Oct 2026),
 * hotelavsar.com/hostel_room/* pages (sizes) + owner confirmation (24–25 Oct 2026).
 */

export type RoomView = "sea" | "partialSea" | "land";

export type Room = {
  slug: string;
  /** Room name exactly as listed in ElektraWeb — keep site and booking engine in sync. */
  elektraName: string;
  legacyPath?: string; // old WordPress URL, used for 301 redirects
  elektraCode?: string; // TODO: room code in ElektraWeb, if deep-linking to a room is supported
  view: RoomView;
  /** null = not confirmed yet; the card hides the size. */
  sizeM2: number | null;
  /** Maximum guests including an extra bed (ElektraWeb "Maksimum N misafir"). */
  maxGuests: number;
  // Owner: balconies exist only in corner rooms, not per room type.
  // Never claim a balcony on a room card; use `roomPolicies.balcony` copy instead.
  floorNote?: string;
  unitCount?: number;
  amenities: readonly string[];
  featured: boolean; // shown on homepage (3 cards)
  sortOrder: number;
  verified: boolean;
  notes?: string;
};

/** Facts that apply across room types (owner-confirmed 24 Oct 2026). */
export const roomPolicies = {
  kitchen: false, // no room has a kitchen
  balcony: "cornerRoomsOnly" as const,
  verified: true,
} as const;

const baseAmenities = [
  "wifi",
  "airConditioning",
  "flatTv",
  "minibar",
  "safe",
  "breakfastIncluded",
  "privateBathroom",
  "dailyHousekeeping",
] as const;

export const rooms: readonly Room[] = [
  {
    slug: "standard-land-view",
    elektraName: "Standard Landview Room",
    legacyPath: "/hostel_room/stdlv/",
    view: "land",
    sizeM2: 15,
    maxGuests: 2,
    amenities: baseAmenities,
    featured: false,
    sortOrder: 1,
    verified: true,
  },
  {
    slug: "standard-sea-view",
    elektraName: "Standard Sea View Room",
    legacyPath: "/hostel_room/stdsv/",
    view: "sea",
    sizeM2: 20,
    maxGuests: 2,
    amenities: baseAmenities,
    featured: true,
    sortOrder: 2,
    verified: true,
  },
  {
    slug: "partial-sea-view",
    elektraName: "Partial Sea View Room",
    view: "partialSea",
    sizeM2: null, // TODO: confirm size with the hotel
    maxGuests: 2,
    amenities: baseAmenities,
    featured: false,
    sortOrder: 3,
    verified: false,
    notes: "New type from ElektraWeb (not on the old site). Size and photos needed.",
  },
  {
    slug: "comfort-sea-view",
    elektraName: "Comfort Sea View Room",
    legacyPath: "/hostel_room/cmfsv/",
    view: "sea",
    sizeM2: 20,
    maxGuests: 3,
    amenities: baseAmenities,
    featured: false,
    sortOrder: 4,
    verified: true,
  },
  {
    slug: "superior-land-view",
    elektraName: "Superior Land View Room",
    legacyPath: "/hostel_room/suplv/",
    view: "land",
    sizeM2: 25,
    maxGuests: 3,
    amenities: baseAmenities,
    featured: false,
    sortOrder: 5,
    verified: true,
  },
  {
    slug: "deluxe-sea-view",
    elektraName: "Deluxe Sea View Room",
    legacyPath: "/hostel_room/dlxsv/",
    view: "sea",
    sizeM2: 30,
    maxGuests: 3, // ElektraWeb: max 3 incl. extra bed
    amenities: baseAmenities,
    featured: true,
    sortOrder: 6,
    verified: true,
  },
  {
    slug: "superior-sea-view",
    elektraName: "Superior Sea View Room",
    legacyPath: "/hostel_room/supsv/",
    view: "sea",
    sizeM2: 35,
    maxGuests: 3,
    floorNote: "topFloor",
    unitCount: 2,
    amenities: baseAmenities,
    featured: true,
    sortOrder: 7,
    verified: true, // owner: 2 rooms, 35 m², top floor, sea view
  },
] as const;

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);
export const featuredRooms = () => rooms.filter((r) => r.featured).sort((a, b) => a.sortOrder - b.sortOrder);
