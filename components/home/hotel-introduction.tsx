import { useTranslations } from "next-intl";
import { hotel } from "@/data/hotel";
import { media } from "@/data/media";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";

export function HotelIntroduction() {
  const t = useTranslations("home.intro");
  const [main, top, bottom] = media.intro;

  const stats = [
    { value: String(hotel.property.totalRooms.value), label: t("stats.rooms") },
    { value: String(hotel.property.roomTypeCount), label: t("stats.roomTypes") },
    { value: hotel.contact.receptionHours, label: t("stats.reception") },
  ];

  return (
    <section id="otel" aria-labelledby="intro-title" className="scroll-mt-24 py-20 sm:py-24 lg:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading id="intro-title" className="mt-4">
            {t("title")}
          </Heading>
          <Text muted size="lg" className="mt-6">
            {t("text")}
          </Text>

          <dl className="mt-10 grid grid-cols-3 border-y border-navy/10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse py-5 not-first:border-s not-first:border-navy/10 not-first:ps-4">
                <dt className="mt-1 text-xs text-ink-muted">{s.label}</dt>
                <dd className="font-heading text-3xl leading-none">{s.value}</dd>
              </div>
            ))}
          </dl>

          <ButtonLink href="/about" variant="outline" arrow className="mt-10">
            {t("cta")}
          </ButtonLink>
        </Reveal>

        <Reveal delay={120} className="grid grid-cols-[1.6fr_1fr] gap-3 sm:gap-4 lg:col-span-7">
          <div className="relative row-span-2 aspect-[4/5]">
            <HotelImage item={main} slot="hero" alt="" sizes="(min-width: 1024px) 36vw, 60vw" />
          </div>
          <div className="relative">
            <HotelImage item={top} slot="pool" alt="" sizes="(min-width: 1024px) 22vw, 38vw" />
          </div>
          <div className="relative">
            <HotelImage item={bottom} slot="room" alt="" sizes="(min-width: 1024px) 22vw, 38vw" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
