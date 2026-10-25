import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { media } from "@/data/media";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";

export function DialogueSection() {
  const t = useTranslations("home.dialogue");
  const points = ["breakfast", "meals", "music"] as const;

  return (
    <section aria-labelledby="dialogue-title" className="relative isolate overflow-hidden bg-navy text-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-72 sm:min-h-96 lg:order-2 lg:min-h-[36rem]">
          <HotelImage
            item={media.dialogue[0]}
            slot="dialogue"
            alt={t("eyebrow")}
            sizes="(min-width: 1024px) 50vw, 100vw"
            tone="dark"
          />
        </div>
        <Container className="flex items-center py-16 sm:py-20 lg:mx-0 lg:ms-auto lg:max-w-[40rem] lg:py-24 lg:pe-16">
          <Reveal>
            <p className="text-eyebrow font-semibold uppercase text-sand">{t("eyebrow")}</p>
            <h2 id="dialogue-title" className="mt-4 text-h2">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ivory/80">{t("text")}</p>
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ivory/90">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-sand" strokeWidth={1.75} />
                  {t(`points.${p}`)}
                </li>
              ))}
            </ul>
            <ButtonLink href="/dialogue" variant="outline-light" arrow className="mt-10">
              {t("cta")}
            </ButtonLink>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
