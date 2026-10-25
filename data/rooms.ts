/**
 * Room types — facts only. Names and descriptions come from messages/*.json
 * under `rooms.<slug>.name` / `rooms.<slug>.description`.
 *
 * Source: hotelavsar.com/hostel_room/* pages (Oct 2026) + owner confirmation (24 Oct 2026).
 */

export type RoomView = "sea" | "land";

export type Room = {
  slug: string;
  legacyPath: string; // old WordPress URL, used for 301 redirects
  elektraCode?: string; // TODO: room code in ElektraWeb, if deep-linking to a room is supported
  view: RoomView;
  sizeM2: number;
  maxGuests: number;
  maxGuestsNote?: string;
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
    slug: "comfort-sea-view",
    legacyPath: "/hostel_room/cmfsv/",
    view: "sea",
    sizeM2: 20,
    maxGuests: 3,
    amenities: baseAmenities,
    featured: false,
    sortOrder: 3,
    verified: true,
  },
  {
    slug: "superior-land-view",
    legacyPath: "/hostel_room/suplv/",
    view: "land",
    sizeM2: 25,
    maxGuests: 3,
    amenities: baseAmenities,
    featured: false,
    sortOrder: 4,
    verified: true,
    notes: "Old gallery labels some photos 'Land Suit' — confirm room name.",
  },
  {
    slug: "deluxe-sea-view",
    legacyPath: "/hostel_room/dlxsv/",
    view: "sea",
    sizeM2: 30,
    maxGuests: 4,
    maxGuestsNote: "3+1",
    amenities: baseAmenities,
    featured: true,
    sortOrder: 5,
    verified: true,
  },
  {
    slug: "superior-sea-view",
    legacyPath: "/hostel_room/supsv/",
    view: "sea",
    sizeM2: 35,
    maxGuests: 3,
    floorNote: "topFloor",
    unitCount: 2,
    amenities: baseAmenities,
    featured: true,
    sortOrder: 6,
    verified: true, // owner: 2 rooms, 35 m², top floor, sea view
  },
] as const;

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);
export const featuredRooms = () => rooms.filter((r) => r.featured).sort((a, b) => a.sortOrder - b.sortOrder);
