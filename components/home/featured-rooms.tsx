import { ArrowRight, BedDouble, Maximize2, Mountain, Users, Waves } from "lucide-react";
import { useTranslations } from "next-intl";
import { featuredRooms, type Room } from "@/data/rooms";
import { media } from "@/data/media";
import { Link } from "@/i18n/navigation";
import type { RoomMessageSlug } from "@/i18n/types";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";

function RoomCard({ room }: { room: Room }) {
  const t = useTranslations();
  const name = t(`rooms.${room.slug as RoomMessageSlug}.name`);
  const photo = media.rooms[room.slug as keyof typeof media.rooms]?.[0] ?? { src: null };
  const ViewIcon = room.view === "land" ? Mountain : Waves;

  return (
    <article className="group relative flex h-full flex-col bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <HotelImage
          item={photo}
          slot="room"
          alt={name}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
          className="transition-transform duration-700 ease-(--ease-elegant) group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-h3">
          <Link
            href={{ pathname: "/rooms/[slug]", params: { slug: room.slug } }}
            className="after:absolute after:inset-0 focus-visible:outline-none group-has-[a:focus-visible]:underline"
          >
            {name}
          </Link>
        </h3>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
          {room.sizeM2 !== null && (
            <li className="flex items-center gap-1.5">
              <Maximize2 aria-hidden className="size-4 text-sand-deep" strokeWidth={1.5} />
              {t("home.rooms.size", { size: room.sizeM2 })}
            </li>
          )}
          <li className="flex items-center gap-1.5">
            <Users aria-hidden className="size-4 text-sand-deep" strokeWidth={1.5} />
            {t("home.rooms.guests", { count: room.maxGuests })}
          </li>
          <li className="flex items-center gap-1.5">
            <ViewIcon aria-hidden className="size-4 text-sand-deep" strokeWidth={1.5} />
            {t(`home.rooms.view.${room.view}`)}
          </li>
        </ul>
        <span
          aria-hidden
          className="mt-auto flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-sand-deep rtl:[&>svg]:-scale-x-100"
        >
          {t("home.rooms.details")}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={1.5} />
        </span>
      </div>
    </article>
  );
}

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
