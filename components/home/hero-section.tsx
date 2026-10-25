import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { media } from "@/data/media";
import { HotelImage } from "@/components/ui/hotel-image";
import { Container } from "@/components/ui/container";
import { BookingBar } from "@/components/booking/booking-bar";

/**
 * Aerial hero. The photo has the hotel on the LEFT and the sea on the RIGHT, so on desktop the
 * text sits over the sea (~58% from the left) with a navy gradient from the right edge.
 * Placement is physical (left/right), not logical: it follows the photo, not the reading direction.
 * Below lg the photo is its own block (hotel kept in frame) and the text sits on navy underneath.
 */
export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative isolate overflow-hidden bg-navy text-ivory lg:flex lg:min-h-[max(42rem,84svh)] lg:items-center">
        {/* Photo — phones/tablets: its own block so text never covers the hotel; desktop: full-bleed background */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
          <HotelImage item={media.hero} slot="hero" alt="" sizes="100vw" tone="dark" priority placeholder="background" />
          {/* Phones: fade the bottom edge into the navy text panel */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-navy/0 lg:hidden" />
          {/* Desktop shading: navy from the right edge over the sea, soft bottom and top */}
          <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-l from-navy/85 via-navy/55 to-navy/0 lg:block" />
          <div aria-hidden className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-navy/30 to-navy/0 lg:block" />
          <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-navy/50 to-navy/0 lg:block" />
          <div aria-hidden className="absolute inset-x-0 top-0 hidden h-28 bg-gradient-to-b from-navy/35 to-navy/0 lg:block" />
        </div>

        <Container className="pt-6 pb-32 sm:pt-10 lg:py-36">
          <div className="max-w-xl lg:ml-[56%] lg:max-w-[42%]">
            <p className="text-eyebrow font-semibold uppercase text-sand">{t("eyebrow")}</p>
            <h1 id="hero-title" className="mt-5 font-heading text-display text-white lg:[text-shadow:0_2px_24px_rgb(20_44_59/0.35)]">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/90">{t("text")}</p>
            <a
              href="#otel"
              className="mt-9 inline-flex min-h-12 items-center gap-2.5 border border-sand px-6 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-sand hover:text-navy"
            >
              {t("explore")}
              <ArrowDown aria-hidden className="size-4" strokeWidth={1.5} />
            </a>
          </div>
        </Container>
      </div>

      <Container className="relative z-10 -mt-20 lg:-mt-14">
        <BookingBar />
      </Container>
    </section>
  );
}
