import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import {
  AirVent,
  Bath,
  Building2,
  Coffee,
  Lock,
  Maximize2,
  Mountain,
  Refrigerator,
  Sparkles,
  Tv,
  Users,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { hotel } from "@/data/hotel";
import { media } from "@/data/media";
import { getRoom, rooms, type Room } from "@/data/rooms";
import type { RoomMessageSlug } from "@/i18n/types";
import { absoluteUrl } from "@/lib/seo";
import { seoMetadata } from "@/lib/page-metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BookingBar } from "@/components/booking/booking-bar";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { RoomCard } from "@/components/rooms/room-card";
import { RoomPolicies } from "@/components/rooms/room-policies";

type Props = { params: Promise<{ slug: string }> };

const amenityIcons: Record<string, LucideIcon> = {
  wifi: Wifi,
  airConditioning: AirVent,
  flatTv: Tv,
  minibar: Refrigerator,
  safe: Lock,
  breakfastIncluded: Coffee,
  privateBathroom: Bath,
  dailyHousekeeping: Sparkles,
};

type AmenityKey = keyof (typeof import("@/messages/tr.json"))["roomDetail"]["amenity"];

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  const t = await getTranslations("rooms");
  const key = room.slug as RoomMessageSlug;
  return seoMetadata({
    href: { pathname: "/rooms/[slug]", params: { slug: room.slug } },
    title: t(`${key}.name`),
    description: t(`${key}.description`),
  });
}

/** Up to 3 other rooms: same view first, then by sort order. */
function relatedRooms(room: Room) {
  return [...rooms]
    .filter((r) => r.slug !== room.slug)
    .sort((a, b) => Number(b.view === room.view) - Number(a.view === room.view) || a.sortOrder - b.sortOrder)
    .slice(0, 3);
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const key = room.slug as RoomMessageSlug;
  const name = t(`rooms.${key}.name`);
  const photos = media.rooms[room.slug as keyof typeof media.rooms] ?? [];
  const [main, second = { src: null }, third = { src: null }] = photos.length ? photos : [{ src: null }];
  const ViewIcon = room.view === "land" ? Mountain : Waves;

  const facts = [
    {
      Icon: Maximize2,
      label: t("roomDetail.facts.size"),
      value: room.sizeM2 !== null ? t("home.rooms.size", { size: room.sizeM2 }) : t("roomDetail.sizePending"),
    },
    { Icon: Users, label: t("roomDetail.facts.guests"), value: t("home.rooms.guests", { count: room.maxGuests }) },
    { Icon: ViewIcon, label: t("roomDetail.facts.view"), value: t(`home.rooms.view.${room.view}`) },
    ...(room.floorNote === "topFloor" && room.unitCount
      ? [{ Icon: Building2, label: t("roomDetail.facts.floor"), value: t("roomDetail.floor.topFloor", { count: room.unitCount }) }]
      : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name,
    description: t(`rooms.${key}.description`),
    url: absoluteUrl({ pathname: "/rooms/[slug]", params: { slug: room.slug } }, locale),
    ...(room.sizeM2 !== null
      ? { floorSize: { "@type": "QuantitativeValue", value: room.sizeM2, unitCode: "MTK" } }
      : {}),
    occupancy: { "@type": "QuantitativeValue", maxValue: room.maxGuests },
    amenityFeature: room.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: t(`roomDetail.amenity.${a as AmenityKey}`),
      value: true,
    })),
    containedInPlace: { "@id": `${hotel.siteUrl}/#hotel`, "@type": "Hotel", name: hotel.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="pt-10 sm:pt-14 lg:pt-16">
        <Container>
          <Breadcrumbs items={[{ label: t("pages.rooms.title"), href: "/rooms" }, { label: name }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>{t("pages.rooms.title")}</Eyebrow>
            <Heading as="h1" level="h1" className="mt-4">
              {name}
            </Heading>
          </div>

          {/* Photo layout: 1 large + 2 small (placeholders until real photos exist) */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:grid-rows-2 lg:gap-4">
            <div className="relative aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[26rem] lg:min-h-[32rem]">
              <HotelImage item={main} slot="room" alt={name} sizes="(min-width: 640px) 66vw, 100vw" priority />
            </div>
            <div className="relative hidden sm:block">
              <HotelImage item={second} slot="room" alt="" sizes="33vw" />
            </div>
            <div className="relative hidden sm:block">
              <HotelImage item={third} slot="room" alt="" sizes="33vw" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <dl
              className={`grid grid-cols-2 gap-px overflow-hidden border border-navy/10 bg-navy/10 ${facts.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}
            >
              {facts.map(({ Icon, label, value }) => (
                <div key={label} className="flex flex-col gap-1 bg-ivory p-4">
                  <dt className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                    <Icon aria-hidden className="size-4 text-sand-deep" strokeWidth={1.5} />
                    {label}
                  </dt>
                  <dd className="text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-12 font-heading text-h3">{t("roomDetail.about")}</h2>
            <Text size="lg" muted className="mt-4">
              {t(`rooms.${key}.description`)}
            </Text>

            <h2 className="mt-12 font-heading text-h3">{t("roomDetail.amenities")}</h2>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {room.amenities.map((a) => {
                const Icon = amenityIcons[a] ?? Sparkles;
                return (
                  <li key={a} className="flex items-center gap-3 text-sm">
                    <Icon aria-hidden className="size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
                    {t(`roomDetail.amenity.${a as AmenityKey}`)}
                  </li>
                );
              })}
            </ul>
          </div>

          <aside aria-labelledby="room-book-title" className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <h2 id="room-book-title" className="font-heading text-h3">
                {t("roomDetail.bookTitle")}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">{t("roomDetail.bookNote")}</p>
              <BookingBar layout="stacked" id="room-booking" className="mt-6" />
            </div>
          </aside>
        </Container>

        <Container>
          <RoomPolicies className="mt-16" />
        </Container>
      </section>

      <section aria-labelledby="other-rooms-title" className="bg-ivory-deep/60 py-16 sm:py-20 lg:py-24">
        <Container>
          <Heading id="other-rooms-title">{t("roomDetail.otherRooms")}</Heading>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {relatedRooms(room).map((r, i) => (
              <li key={r.slug}>
                <Reveal delay={i * 80} className="h-full">
                  <RoomCard room={r} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
