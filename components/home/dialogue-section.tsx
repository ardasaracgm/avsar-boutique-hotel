import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { media } from "@/data/media";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";

/** Full-bleed banner: terrace photo with the text over a darkened start side. */
export function DialogueSection() {
  const t = useTranslations("home.dialogue");
  const points = ["breakfast", "meals", "music"] as const;

  return (
    <section aria-labelledby="dialogue-title" className="relative isolate overflow-hidden bg-navy text-ivory">
      <HotelImage
        item={media.dialogue[0]}
        slot="dialogue"
        alt=""
        sizes="100vw"
        tone="dark"
        placeholder="background"
        className="-z-10"
      />
      {/* Shading: strong on the text side, fading out over the view; soft bottom edge on phones */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/5 rtl:bg-gradient-to-l" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/60 to-navy/0 lg:hidden" />

      <Container className="flex min-h-[32rem] items-center py-20 lg:min-h-[36rem] lg:py-24">
        <Reveal className="max-w-xl">
          <p className="text-eyebrow font-semibold uppercase text-sand">{t("eyebrow")}</p>
          <h2 id="dialogue-title" className="mt-4 text-h2">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ivory/85">{t("text")}</p>
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
    </section>
  );
}
