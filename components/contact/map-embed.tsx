"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Click-to-load Google Map. Nothing is requested from Google until the visitor opts in (KVKK/GDPR).
 */
export function MapEmbed({
  lat,
  lng,
  labels,
}: {
  lat: number;
  lng: number;
  labels: { load: string; note: string; title: string };
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={labels.title}
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
        className="size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 bg-ivory-deep p-6 text-center">
      <MapPin aria-hidden className="size-8 text-sand-deep" strokeWidth={1.25} />
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="inline-flex min-h-11 items-center bg-navy px-6 text-xs font-semibold uppercase tracking-[0.18em] text-ivory hover:bg-navy-soft"
      >
        {labels.load}
      </button>
      <p className="max-w-xs text-xs text-ink-muted">{labels.note}</p>
    </div>
  );
}
