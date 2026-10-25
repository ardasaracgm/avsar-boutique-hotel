import { Coffee, Flower2, MapPin, Waves } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";

// Only facilities confirmed in data/hotel.ts (pool, spa, breakfast, location).
const items = [
  { key: "pool", Icon: Waves },
  { key: "spa", Icon: Flower2 },
  { key: "breakfast", Icon: Coffee },
  { key: "location", Icon: MapPin },
] as const;

export function ExperiencesSection() {
  const t = useTranslations("home.experiences");

  return (
    <section aria-labelledby="experiences-title" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading id="experiences-title" className="mt-4">
            {t("title")}
          </Heading>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon }, i) => (
            <li key={key} className="bg-ivory">
              <Reveal delay={i * 80} className="flex h-full flex-col p-7 lg:p-8">
                <Icon aria-hidden className="size-8 text-sand-deep" strokeWidth={1.25} />
                <h3 className="mt-6 font-heading text-h3">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`items.${key}.text`)}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <ButtonLink href="/experiences" variant="ghost" arrow className="text-xs">
            {t("cta")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
