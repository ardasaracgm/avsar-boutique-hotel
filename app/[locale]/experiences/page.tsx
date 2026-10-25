import type { Metadata } from "next";
import {
  AirVent,
  ArrowUpDown,
  BellRing,
  Car,
  CarFront,
  ConciergeBell,
  ExternalLink,
  GlassWater,
  Ruler,
  Sparkles,
  Sun,
  UtensilsCrossed,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";
import { media } from "@/data/media";
import { whatsappUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/page-metadata";
import { FeatureBlock } from "@/components/layout/feature-block";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { ButtonAnchor } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("experiencesPage");
  return pageMetadata("/experiences", "experiences", t("lead"));
}

const serviceIcons: Partial<Record<(typeof hotel.facilities.general)[number], LucideIcon>> = {
  wifi: Wifi,
  freeParking: Car,
  valetParking: CarFront,
  reception24h: ConciergeBell,
  elevator: ArrowUpDown,
  airConditioning: AirVent,
  dailyHousekeeping: Sparkles,
  wakeUpService: BellRing,
  lobbyBar: GlassWater,
  restaurantALaCarte: UtensilsCrossed,
};

type ServiceKey = keyof (typeof import("@/messages/tr.json"))["experiencesPage"]["services"];

export default async function ExperiencesPage() {
  const t = await getTranslations();
  const { pool, dialogue } = hotel.facilities;
  const services = hotel.facilities.general.filter((s): s is ServiceKey & typeof s => s in serviceIcons);

  const poolFacts = [
    { Icon: Ruler, text: t("experiencesPage.pool.size", { length: pool.lengthM, width: pool.widthM }) },
    { Icon: Waves, text: t("experiencesPage.pool.depth", { depth: pool.depthCm }) },
    { Icon: Sun, text: t("experiencesPage.pool.loungers") },
  ];

  return (
    <>
      <PageHero
        title={t("pages.experiences.title")}
        eyebrow={t("experiencesPage.eyebrow")}
        lead={t("experiencesPage.lead")}
        crumbs={[{ label: t("nav.experiences") }]}
        image={media.pool}
        slot="pool"
      />

      <div className="py-6 lg:py-10">
        <FeatureBlock id="pool" title={t("experiencesPage.pool.title")} image={media.pool} slot="pool">
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("experiencesPage.pool.text")}</p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {poolFacts.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon aria-hidden className="size-4 text-sand-deep" strokeWidth={1.5} />
                {text}
              </li>
            ))}
          </ul>
        </FeatureBlock>

        <FeatureBlock id="spa" title={t("experiencesPage.spa.title")} image={media.spa} slot="spa" reverse>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("experiencesPage.spa.text", { rooms: hotel.facilities.spa.massageRooms })}</p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {hotel.facilities.spa.services.map((svc) => (
              <li key={svc} className="flex items-center gap-2">
                <Sparkles aria-hidden className="size-4 text-sand-deep" strokeWidth={1.5} />
                {t(`experiencesPage.spa.services.${svc}`)}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-muted">{t("experiencesPage.spa.paid")}</p>
          <ButtonAnchor
            href={whatsappUrl(t("whatsapp.message", { hotel: hotel.name }))}
            target="_blank"
            rel="noopener"
            variant="outline"
            arrow
            className="mt-8"
          >
            {t("experiencesPage.spa.contact")}
          </ButtonAnchor>
        </FeatureBlock>

        <FeatureBlock id="dining" title={t("experiencesPage.dining.title")} image={media.breakfast} slot="dialogue">
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("experiencesPage.dining.text")}</p>
          <p className="mt-4 text-sm font-medium">
            {t("dialoguePage.info.breakfastHours", dialogue.breakfast.hours)} ·{" "}
            {t("dialoguePage.info.kitchenHours", dialogue.lunchDinner.hours)}
          </p>
          <ButtonLink href="/dialogue" variant="outline" arrow className="mt-8">
            {t("experiencesPage.dining.cta")}
          </ButtonLink>
        </FeatureBlock>

        <FeatureBlock id="location" title={t("experiencesPage.location.title")} image={media.nightExterior} slot="hero" reverse>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("experiencesPage.location.text")}</p>
          <ButtonAnchor href={hotel.address.mapsUrl} target="_blank" rel="noopener" variant="outline" className="mt-8">
            {t("experiencesPage.location.cta")}
            <ExternalLink aria-hidden className="size-4" strokeWidth={1.5} />
          </ButtonAnchor>
        </FeatureBlock>
      </div>

      <section aria-labelledby="services-title" className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <h2 id="services-title" className="text-h2">
            {t("experiencesPage.servicesTitle")}
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => {
              const Icon = serviceIcons[s]!;
              return (
                <li key={s} className="flex items-center gap-3 text-sm">
                  <Icon aria-hidden className="size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
                  {t(`experiencesPage.services.${s}`)}
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-xs text-ink-muted">{t("experiencesPage.servicesNote")}</p>
        </Container>
      </section>
    </>
  );
}
