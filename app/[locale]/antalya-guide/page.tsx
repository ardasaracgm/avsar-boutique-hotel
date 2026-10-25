import type { Metadata } from "next";
import { ArrowUpRight, ConciergeBell } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { media } from "@/data/media";
import { mapsSearchUrl, places } from "@/data/places";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Heading } from "@/components/ui/typography";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guidePage");
  return pageMetadata("/antalya-guide", "guide", t("lead"));
}

export default async function GuidePage() {
  const t = await getTranslations();
  const groups = [
    { id: "near", title: t("guidePage.nearTitle") },
    { id: "dayTrip", title: t("guidePage.dayTitle") },
  ] as const;

  return (
    <>
      <PageHero
        title={t("pages.guide.title")}
        eyebrow={t("guidePage.eyebrow")}
        lead={t("guidePage.lead")}
        crumbs={[{ label: t("pages.guide.title") }]}
        image={media.nightExterior}
        slot="hero"
      />

      {groups.map((g, gi) => (
        <section
          key={g.id}
          aria-labelledby={`guide-${g.id}`}
          className={gi % 2 ? "bg-white py-16 sm:py-20" : "py-16 sm:py-20"}
        >
          <Container>
            <Heading id={`guide-${g.id}`}>{g.title}</Heading>
            <ul className="mt-10 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
              {places
                .filter((p) => p.group === g.id)
                .map((p, i) => (
                  <li key={p.key} className={gi % 2 ? "bg-white" : "bg-ivory"}>
                    <Reveal delay={(i % 3) * 80} className="flex h-full flex-col p-7">
                      <h3 className="font-heading text-h3">{t(`guidePage.places.${p.key}.name`)}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{t(`guidePage.places.${p.key}.text`)}</p>
                      <a
                        href={mapsSearchUrl(p.mapsQuery)}
                        target="_blank"
                        rel="noopener"
                        className="mt-6 inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.16em] text-sand-deep underline-offset-4 hover:underline"
                      >
                        {t("contactPage.map.open")}
                        <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" strokeWidth={1.5} />
                      </a>
                    </Reveal>
                  </li>
                ))}
            </ul>
          </Container>
        </section>
      ))}

      <section className="pt-4 pb-20">
        <Container>
          <p className="flex items-center gap-3 border border-navy/10 bg-white p-6 text-sm">
            <ConciergeBell aria-hidden className="size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
            {t("guidePage.help")}
          </p>
        </Container>
      </section>
    </>
  );
}
