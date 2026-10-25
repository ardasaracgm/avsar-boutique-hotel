/**
 * Antalya guide. Names/descriptions live in messages (`guidePage.places.<key>`).
 * No distances or travel times on purpose — not verified. `mapsQuery` opens a Google Maps search.
 */
export type Place = { key: string; group: "near" | "dayTrip"; mapsQuery: string };

export const places = [
  { key: "terraCity", group: "near", mapsQuery: "TerraCity AVM Antalya" },
  { key: "duden", group: "near", mapsQuery: "Aşağı Düden Şelalesi Antalya" },
  { key: "laraBeach", group: "near", mapsQuery: "Lara Plajı Antalya" },
  { key: "kaleici", group: "near", mapsQuery: "Kaleiçi Antalya" },
  { key: "museum", group: "near", mapsQuery: "Antalya Müzesi" },
  { key: "konyaalti", group: "near", mapsQuery: "Konyaaltı Plajı Antalya" },
  { key: "perge", group: "dayTrip", mapsQuery: "Perge Antik Kenti" },
  { key: "aspendos", group: "dayTrip", mapsQuery: "Aspendos Antik Tiyatrosu" },
] as const satisfies readonly Place[];

export const mapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
