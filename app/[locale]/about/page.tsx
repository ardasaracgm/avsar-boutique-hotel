import type { Metadata } from "next";
import { Coffee, MapPin, Mountain, Waves } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";
import { media } from "@/data/media";
import { bookingHomeUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";
import { Heading, Text } from "@/components/ui/typography";
import { ButtonAnchor } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("aboutPage");
  return pageMetadata("/about", "about", t("lead"));
}

const why = [
  { key: "view", Icon: Mountain },
  { key: "breakfast", Icon: Coffee },
  { key: "location", Icon: MapPin },
  { key: "relax", Icon: Waves },
] as const;

export default async function AboutPage() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const [, top = { src: null }, bottom = { src: null }] = media.intro;

  const stats = [
    { value: String(hotel.property.totalRooms.value), label: t("home.intro.stats.rooms") },
    { value: String(hotel.property.roomTypeCount), label: t("home.intro.stats.roomTypes") },
    { value: hotel.contact.receptionHours, label: t("home.intro.stats.reception") },
  ];

  return (
    <>
      <PageHero
        title={hotel.name}
        eyebrow={t("aboutPage.eyebrow")}
        lead={t("aboutPage.lead")}
        crumbs={[{ label: t("pages.about.title") }]}
        image={media.hero}
        slot="hero"
      />

      <section aria-labelledby="story-title" className="py-20 sm:py-24 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Heading id="story-title">{t("aboutPage.storyTitle")}</Heading>
            <Text muted size="lg" className="mt-6">
              {t("aboutPage.story1")}
            </Text>
            <Text muted size="lg" className="mt-4">
              {t("aboutPage.story2")}
            </Text>
            <dl className="mt-10 grid grid-cols-3 border-y border-navy/10">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse py-5 not-first:border-s not-first:border-navy/10 not-first:ps-4">
                  <dt className="mt-1 text-xs text-ink-muted">{s.label}</dt>
                  <dd className="font-heading text-3xl leading-none">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6">
            <div className="relative aspect-[3/4]">
              <HotelImage item={top} slot="pool" alt="" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
            <div className="relative mt-10 aspect-[3/4]">
              <HotelImage item={bottom} slot="room" alt="" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="why-title" className="bg-white py-20 sm:py-24">
        <Container>
          <Heading id="why-title">{t("aboutPage.whyTitle")}</Heading>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(({ key, Icon }, i) => (
              <li key={key}>
                <Reveal delay={i * 80}>
                  <Icon aria-hidden className="size-8 text-sand-deep" strokeWidth={1.25} />
                  <h3 className="mt-5 font-heading text-h3">{t(`aboutPage.why.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`aboutPage.why.${key}.text`)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-14 border-t border-navy/10 pt-6 text-xs text-ink-muted">
            {t("aboutPage.license", { number: hotel.legal.tourismLicenseNo.value })}
            {" · "}
            <a href={hotel.legal.licenseVerifyUrl} target="_blank" rel="noopener" className="underline underline-offset-4">
              {t("footer.verifyLicense")}
            </a>
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor href={bookingHomeUrl(locale)} arrow>
              {t("nav.book")}
            </ButtonAnchor>
            <ButtonLink href="/rooms" variant="outline">
              {t("aboutPage.ctaRooms")}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
