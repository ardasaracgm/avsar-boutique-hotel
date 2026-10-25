import type { ReactNode } from "react";
import type { MediaItem } from "@/data/media";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";

type Slot = Parameters<typeof HotelImage>[0]["slot"];

/** Image + text row; `reverse` puts the image on the other side. Used for editorial sections. */
export function FeatureBlock({
  id,
  title,
  image,
  slot,
  reverse = false,
  children,
}: {
  id: string;
  title: string;
  image: MediaItem;
  slot: Slot;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-14 sm:py-16 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className={cn("relative aspect-[4/3] lg:col-span-7", reverse && "lg:order-2")}>
          <HotelImage item={image} slot={slot} alt="" sizes="(min-width: 1024px) 58vw, 100vw" />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5">
          <h2 id={`${id}-title`} className="text-h2">
            {title}
          </h2>
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
