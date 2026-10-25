import { useLocale, useTranslations } from "next-intl";
import { hotel } from "@/data/hotel";
import { media } from "@/data/media";
import { bookingHomeUrl, whatsappUrl } from "@/lib/booking";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";
import { ButtonAnchor } from "@/components/ui/button";

export function FinalBookingCTA() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy py-24 text-center text-ivory sm:py-28 lg:py-36">
      <HotelImage item={media.nightExterior} slot="hero" alt="" sizes="100vw" tone="dark" placeholder="background" className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy/70" />
      <Container size="narrow">
        <Reveal>
          <h2 id="cta-title" className="text-h2">
            {t("home.cta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ivory/80">{t("home.cta.text")}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonAnchor
              href={bookingHomeUrl(locale)}
              variant="accent"
              arrow
            >
              {t("home.cta.book")}
            </ButtonAnchor>
            <ButtonAnchor
              href={whatsappUrl(t("whatsapp.message", { hotel: hotel.name }))}
              target="_blank"
              rel="noopener"
              variant="outline-light"
            >
              {t("home.cta.whatsapp")}
            </ButtonAnchor>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
