import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { rooms } from "@/data/rooms";
import { pageMetadata } from "@/lib/page-metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BookingBar } from "@/components/booking/booking-bar";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { RoomCard } from "@/components/rooms/room-card";
import { RoomPolicies } from "@/components/rooms/room-policies";

export async function generateMetadata(): Promise<Metadata> {
  const [base, t] = await Promise.all([pageMetadata("/rooms", "rooms"), getTranslations("roomsPage")]);
  return { ...base, description: t("intro") };
}

export default async function RoomsPage() {
  const t = await getTranslations();
  const sorted = [...rooms].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <section className="pt-10 pb-12 sm:pt-14 lg:pt-16 lg:pb-16">
        <Container>
          <Breadcrumbs items={[{ label: t("pages.rooms.title") }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{t("roomsPage.eyebrow")}</Eyebrow>
              <Heading as="h1" level="h1" className="mt-4">
                {t("pages.rooms.title")}
              </Heading>
              <Text muted size="lg" className="mt-6 max-w-xl">
                {t("roomsPage.intro")}
              </Text>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="sr-only">{t("roomsPage.bookTitle")}</h2>
            <BookingBar />
          </div>
        </Container>
      </section>

      <section aria-labelledby="room-list-title" className="bg-ivory-deep/60 py-16 sm:py-20 lg:py-24">
        <Container>
          <h2 id="room-list-title" className="sr-only">
            {t("pages.rooms.title")}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {sorted.map((room, i) => (
              <li key={room.slug}>
                <Reveal delay={(i % 3) * 80} className="h-full">
                  <RoomCard room={room} showDescription />
                </Reveal>
              </li>
            ))}
          </ul>
          <RoomPolicies className="mt-14" />
        </Container>
      </section>
    </>
  );
}
