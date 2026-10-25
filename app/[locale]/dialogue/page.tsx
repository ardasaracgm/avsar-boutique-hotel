import type { Metadata } from "next";
import { Clock3, Coffee, ExternalLink, MapPin, MessageCircle, Music, Phone, UtensilsCrossed } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";
import { media } from "@/data/media";
import { whatsappUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/page-metadata";
import { absoluteUrl } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { BookingBar } from "@/components/booking/booking-bar";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";
import { Heading, Text } from "@/components/ui/typography";
import { ButtonAnchor } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const [base, t] = await Promise.all([pageMetadata("/dialogue", "dialogue"), getTranslations("dialoguePage")]);
  return { ...base, description: t("lead") };
}

const dayItems = [
  { key: "breakfast", Icon: Coffee },
  { key: "meals", Icon: UtensilsCrossed },
  { key: "music", Icon: Music },
] as const;

export default async function DialoguePage() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const d = hotel.facilities.dialogue;
  const [mainPhoto = { src: null }, secondPhoto = { src: null }] = media.dialogue;
  const breakfastHours = t("dialoguePage.info.breakfastHours", d.breakfast.hours);

  // schema.org: restaurant that is part of the hotel. Only verified facts.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: d.name,
    url: absoluteUrl("/dialogue", locale),
    telephone: hotel.contact.phone.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.address.street,
      postalCode: hotel.address.postalCode,
      addressLocality: hotel.address.district,
      addressRegion: hotel.address.city,
      addressCountry: hotel.address.country,
    },
    hasMenu: d.menuUrl,
    acceptsReservations: true,
    containedInPlace: { "@id": `${hotel.siteUrl}/#hotel`, "@type": "Hotel", name: hotel.name },
    // TODO: openingHoursSpecification (lunch/dinner) once confirmed by the hotel.
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <PageHero
        title={d.name}
        eyebrow={t("dialoguePage.eyebrow")}
        lead={t("dialoguePage.lead")}
        crumbs={[{ label: t("nav.dialogue") }]}
        image={mainPhoto}
        slot="dialogue"
      />

      <section aria-labelledby="dialogue-intro" className="py-20 sm:py-24 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Heading id="dialogue-intro">{t("dialoguePage.introTitle")}</Heading>
            <Text muted size="lg" className="mt-6">
              {t("dialoguePage.introText")}
            </Text>
            <p className="mt-4 font-medium">{t("dialoguePage.public")}</p>
            <ButtonAnchor
              href={d.menuUrl}
              target="_blank"
              rel="noopener"
              variant="outline"
              className="mt-8"
              aria-describedby="menu-note"
            >
              {t("dialoguePage.menu")}
              <ExternalLink aria-hidden className="size-4" strokeWidth={1.5} />
            </ButtonAnchor>
            <span id="menu-note" className="sr-only">
              {t("dialoguePage.menuNote")}
            </span>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6">
            <div className="relative aspect-[3/4]">
              <HotelImage item={media.breakfast} slot="dialogue" alt="" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
            <div className="relative mt-10 aspect-[3/4]">
              <HotelImage item={secondPhoto} slot="dialogue" alt="" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="dialogue-day" className="bg-navy py-20 text-ivory sm:py-24 lg:py-28">
        <Container>
          <h2 id="dialogue-day" className="text-h2">
            {t("dialoguePage.dayTitle")}
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 md:grid-cols-3">
            {dayItems.map(({ key, Icon }, i) => (
              <li key={key} className="bg-navy">
                <Reveal delay={i * 100} className="flex h-full flex-col p-7 lg:p-9">
                  <Icon aria-hidden className="size-8 text-sand" strokeWidth={1.25} />
                  <h3 className="mt-6 text-h3">{t(`dialoguePage.day.${key}.title`)}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ivory/75">{t(`dialoguePage.day.${key}.text`)}</p>
                  <p className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-sand">
                    {t(`dialoguePage.day.${key}.tag`)}
                    {key === "breakfast" && <span className="text-ivory/70"> · {breakfastHours}</span>}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="dialogue-info" className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading id="dialogue-info" level="h3" className="text-h3">
              {t("dialoguePage.infoTitle")}
            </Heading>
            <dl className="mt-8 space-y-6">
              <div className="flex gap-4">
                <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{t("dialoguePage.info.location")}</dt>
                  <dd className="mt-1">
                    <a href={hotel.address.mapsUrl} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">
                      {t("dialoguePage.info.locationValue")}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock3 aria-hidden className="mt-0.5 size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{t("dialoguePage.info.hours")}</dt>
                  <dd className="mt-1">{breakfastHours}</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <MessageCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{t("dialoguePage.info.contact")}</dt>
                  <dd className="mt-1 space-y-1">
                    <p className="text-ink-muted">{t("dialoguePage.info.tableValue")}</p>
                    <p className="text-ink-muted">{t("dialoguePage.info.contactValue")}</p>
                    <p className="flex flex-wrap gap-x-5 gap-y-1">
                      <a
                        href={whatsappUrl(t("whatsapp.message", { hotel: hotel.name }))}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
                      >
                        WhatsApp {hotel.contact.whatsapp.display}
                      </a>
                      <a href={`tel:${hotel.contact.phone.tel}`} className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline">
                        <Phone aria-hidden className="size-4" strokeWidth={1.5} />
                        {hotel.contact.phone.display}
                      </a>
                    </p>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-navy/10 bg-white p-6 sm:p-8">
              <h2 className="font-heading text-h3">{t("dialoguePage.ctaTitle")}</h2>
              <p className="mt-2 text-sm text-ink-muted">{t("dialoguePage.ctaText")}</p>
              <BookingBar layout="stacked" id="dialogue-booking" className="mt-6" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
