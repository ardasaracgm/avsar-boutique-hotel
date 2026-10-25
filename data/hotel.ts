/**
 * Avşar Boutique Hotel — single source of truth for hotel facts.
 *
 * Rules:
 * - Components must read facts from this file only. Never hardcode facts in JSX.
 * - Every fact carries a `verified` flag. `false` = taken from the old site or a
 *   third-party listing and must be confirmed with the hotel before launch.
 * - Marketing copy lives in messages/*.json, not here.
 *
 * Sources: hotelavsar.com (Oct 2026), avsarhotel.rezervasyonal.com (ElektraWeb),
 * owner confirmation in chat (24 Oct 2026).
 */

export type Fact<T> = { value: T; verified: boolean; note?: string };

export const hotel = {
  name: "Avşar Boutique Hotel",
  shortName: "Avşar",
  siteUrl: "https://hotelavsar.com",

  address: {
    street: "Şirinyalı Mah., 1537. Sk. No:10",
    postalCode: "07160",
    district: "Muratpaşa",
    city: "Antalya",
    country: "TR",
    verified: true,
    mapsUrl: "https://maps.app.goo.gl/Y7169aE6f6fmRgGW9", // owner-confirmed
    geo: { value: { lat: 36.851836, lng: 30.747652 }, verified: true }, // owner-confirmed pin
    area: "Lara / Eski Lara Caddesi",
  },

  contact: {
    phone: { display: "0242 324 25 05", tel: "+902423242505", verified: true },
    // Temporary number, owner will replace later.
    whatsapp: { display: "+90 532 391 99 41", number: "905323919941", verified: true, temporary: true },
    email: { value: "rezervasyon@avsarhotel.com", verified: true },
    receptionHours: "24/7",
  },

  booking: {
    engine: "ElektraWeb",
    baseUrl: "https://avsarhotel.rezervasyonal.com/",
    // Owner confirmed: single source of rates & availability for all channels.
    verified: true,
  },

  legal: {
    tourismLicenseNo: { value: "2022-7-1027", verified: true },
  },

  property: {
    totalRooms: { value: 36, verified: true },
    totalBeds: { value: 78, verified: false, note: "Old About page" },
    roomTypeCount: 7, // ElektraWeb room list (25 Oct 2026)
    checkIn: { value: "14:00", verified: true },
    checkOut: { value: "12:00", verified: true },
    boardType: "bed-and-breakfast",
  },

  facilities: {
    pool: {
      type: "outdoor",
      lengthM: 8,
      widthM: 4,
      depthCm: 145,
      loungers: true,
      verified: true,
    },
    spa: {
      name: "Avşar Spa",
      services: ["hammam", "sauna", "massage"], // owner: several massage types
      paid: true, // owner: all spa services are paid
      verified: true,
      photosAvailable: false, // owner: SPA exists, no original photos yet → neutral placeholder
    },
    dialogue: {
      name: "Dialogue Coffee & Kitchen",
      // Breakfast for hotel guests is served here. Located on the cliffs, across the street.
      breakfast: { includedForGuests: true, hours: { opens: "08:30", closes: "10:00" }, verified: true },
      /** Owner: kitchen opens around 11:00; full menu until 23:00. */
      lunchDinner: { available: true, paid: true, hours: { opens: "11:00", closes: "23:00" }, verified: true },
      liveMusic: { schedule: "usuallyWeekends", verified: true },
      openToPublic: { value: true, verified: true }, // owner: outside guests welcome
      /** Owner: hotel guests book a table by giving their room number. */
      tableBooking: { method: "roomNumber", verified: true },
      menuUrl: "https://qr.finedinemenu.com/dialogue-cafe/menu/6645aea3ca49e847ae85081d",
      verified: true,
    },
    // From ElektraWeb facility list (hotel's own entry). * = paid
    general: [
      "wifi",
      "elevator",
      "airConditioning",
      "reception24h",
      "freeParking",
      "valetParking",
      "poolLoungers",
      "safeDeposit",
      "dailyHousekeeping",
      "wakeUpService",
      "bar", // paid
      "lobbyBar", // paid
      "restaurantALaCarte", // paid
    ] as const,
  },

  location: {
    highlights: ["seaView", "taurusMountainsView", "cliffs", "terraCityWalkingDistance"] as const,
    // TODO: verify distances (third-party listing): airport 16 km, Kaleiçi 7 km
    distances: {
      airportKm: { value: 16, verified: false },
      kaleiciKm: { value: 7, verified: false },
    },
  },

  social: {
    // Owner: no active social media accounts. Footer hides icons while these are null.
    instagram: null as string | null,
    facebook: null as string | null,
    youtube: null as string | null,
  },
} as const;

export type Hotel = typeof hotel;
