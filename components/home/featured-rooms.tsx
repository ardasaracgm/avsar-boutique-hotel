import { BedDouble } from "lucide-react";
import { useTranslations } from "next-intl";
import { featuredRooms } from "@/data/rooms";
import { Container } from "@/components/ui/container";
import { RoomCard } from "@/components/rooms/room-card";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";

export function FeaturedRooms() {
  const t = useTranslations("home.rooms");
  const rooms = featuredRooms();

  return (
    <section aria-labelledby="rooms-title" className="bg-ivory-deep/60 py-20 sm:py-24 lg:py-32">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow className="flex items-center gap-2">
              <BedDouble aria-hidden className="size-4" strokeWidth={1.5} />
              {t("eyebrow")}
            </Eyebrow>
            <Heading id="rooms-title" className="mt-4">
              {t("title")}
            </Heading>
          </div>
          <ButtonLink href="/rooms" variant="ghost" arrow className="self-start text-xs sm:self-auto">
            {t("all")}
          </ButtonLink>
        </Reveal>
      </Container>

      {/* Mobile: horizontal snap carousel that bleeds to the edge. Desktop: 3-column grid. */}
      <div className="mt-12 overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        <ul className="mx-auto flex w-max snap-x snap-mandatory gap-4 px-4 sm:px-6 lg:grid lg:w-full lg:max-w-(--container-site) lg:grid-cols-3 lg:gap-8 lg:px-10">
          {rooms.map((room, i) => (
            <li key={room.slug} className="w-[82vw] max-w-sm shrink-0 snap-start sm:w-[45vw] lg:w-auto lg:max-w-none">
              <Reveal delay={i * 100} className="h-full">
                <RoomCard room={room} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
