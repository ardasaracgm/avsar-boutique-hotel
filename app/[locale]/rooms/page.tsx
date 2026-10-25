import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { rooms } from "@/data/rooms";
import { Link } from "@/i18n/navigation";
import type { RoomMessageSlug } from "@/i18n/types";
import { PageStub } from "@/components/layout/page-stub";
import { pageMetadata } from "@/lib/page-metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/rooms", "rooms");
}

export default function RoomsPage() {
  const t = useTranslations();
  return (
    <PageStub title={t("pages.rooms.title")}>
      <ul className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
        {[...rooms]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((room) => (
            <li key={room.slug}>
              <Link
                href={{ pathname: "/rooms/[slug]", params: { slug: room.slug } }}
                className="flex min-h-14 items-center font-heading text-xl hover:text-sea"
              >
                {t(`rooms.${room.slug as RoomMessageSlug}.name`)}
              </Link>
            </li>
          ))}
      </ul>
    </PageStub>
  );
}
