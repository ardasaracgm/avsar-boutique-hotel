import type messages from "@/messages/tr.json";

/** Room slugs that have translated names under `rooms.<slug>`. */
export type RoomMessageSlug = keyof (typeof messages)["rooms"];
