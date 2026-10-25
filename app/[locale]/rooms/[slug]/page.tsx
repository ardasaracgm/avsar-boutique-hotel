import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getRoom, rooms } from "@/data/rooms";
import type { RoomMessageSlug } from "@/i18n/types";
import { localizedAlternates } from "@/lib/seo";
import { PageStub } from "@/components/layout/page-stub";
import { ButtonLink } from "@/components/ui/button-link";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "rooms" });
  return {
    title: t(`${room.slug as RoomMessageSlug}.name`),
    alternates: localizedAlternates({ pathname: "/rooms/[slug]", params: { slug: room.slug } }, locale),
  };
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const t = await getTranslations();
  return (
    <PageStub eyebrow={t("pages.rooms.title")} title={t(`rooms.${room.slug as RoomMessageSlug}.name`)}>
      <ButtonLink href="/rooms" variant="outline" size="sm" className="mt-8">
        {t("pages.allRooms")}
      </ButtonLink>
    </PageStub>
  );
}
