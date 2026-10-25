import { useLocale, useTranslations } from "next-intl";
import { bookingHomeUrl } from "@/lib/booking";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ButtonAnchor } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

// Phase 1 placeholder home: verifies layout, i18n and links. The real homepage is Phase 2.
export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <Section spacing="none" className="py-12 sm:py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Eyebrow className="mb-5">{t("eyebrow")}</Eyebrow>
          <Heading as="h1" level="display">
            {t("title")}
          </Heading>
          <Text muted size="lg" className="mt-6 max-w-xl">
            {t("intro")}
          </Text>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor href={bookingHomeUrl(locale)} arrow>
              {t("ctaBook")}
            </ButtonAnchor>
            <ButtonLink href="/rooms" variant="outline">
              {t("ctaRooms")}
            </ButtonLink>
          </div>
        </div>
        <MediaPlaceholder slot="hero" className="aspect-[4/3] w-full lg:col-span-6 lg:aspect-[5/4]" />
      </Container>
    </Section>
  );
}
