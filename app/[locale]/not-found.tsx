import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <Section>
      <Container size="narrow" className="min-h-[50vh]">
        <Eyebrow className="mb-4">404</Eyebrow>
        <Heading as="h1" level="h1">
          {t("title")}
        </Heading>
        <Text muted size="lg" className="mt-6">
          {t("text")}
        </Text>
        <ButtonLink href="/" arrow className="mt-10">
          {t("cta")}
        </ButtonLink>
      </Container>
    </Section>
  );
}
