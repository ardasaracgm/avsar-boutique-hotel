import type { MediaItem } from "@/data/media";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

type Slot = Parameters<typeof HotelImage>[0]["slot"];

/** Image-led page header used by inner pages (Dialogue, Experiences, Gallery, About…). */
export function PageHero({
  title,
  eyebrow,
  lead,
  crumbs,
  image,
  slot,
}: {
  title: string;
  eyebrow?: string;
  lead?: string;
  crumbs: Crumb[];
  image: MediaItem;
  slot: Slot;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-ivory">
      <HotelImage item={image} slot={slot} alt="" sizes="100vw" tone="dark" placeholder="background" priority className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 via-navy/45 to-navy/20" />
      <Container className="flex min-h-[26rem] flex-col justify-between gap-16 pt-8 pb-14 sm:min-h-[30rem] lg:min-h-[36rem] lg:pb-20">
        <Breadcrumbs items={crumbs} tone="light" />
        <div className="max-w-3xl">
          {eyebrow && <p className="text-eyebrow font-semibold uppercase text-sand">{eyebrow}</p>}
          <h1 className="mt-4 text-h1 text-ivory">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/85">{lead}</p>}
        </div>
      </Container>
    </section>
  );
}
