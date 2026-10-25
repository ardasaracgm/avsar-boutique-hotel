import type { MetadataRoute } from "next";
import { hotel } from "@/data/hotel";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: hotel.name,
    short_name: hotel.shortName,
    start_url: "/",
    display: "browser",
    background_color: "#f6f2eb",
    theme_color: "#142c3b",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
