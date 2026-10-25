import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { media } from "@/data/media";
import { HotelImage } from "@/components/ui/hotel-image";
import { Container } from "@/components/ui/container";
import { BookingBar } from "@/components/booking/booking-bar";

export function HeroSection() {
  const t = useTranslations("home.hero");
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-navy text-ivory sm:min-h-[38rem] lg:min-h-[max(40rem,82svh)]">
        <HotelImage item={media.hero} slot="hero" alt="" sizes="100vw" tone="dark" priority placeholder="background" className="-z-10" />
        {/* Legibility gradient over the photo (and a soft tone over the placeholder) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/85 via-navy/35 to-navy/10 ltr:bg-gradient-to-tr rtl:bg-gradient-to-tl"
        />
        <Container className="pb-32 lg:pb-40">
          <div className="max-w-2xl pt-28">
            <p className="text-eyebrow font-semibold uppercase text-sand">{t("eyebrow")}</p>
            <h1 id="hero-title" className="mt-5 text-display text-ivory">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/85">{t("text")}</p>
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
