import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";

/** Temporary page body used until each page is built in its own phase. */
export function PageStub({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: ReactNode }) {
  const t = useTranslations("pages");
  return (
    <Section>
      <Container size="narrow" className="min-h-[50vh]">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <Heading as="h1" level="h1">
          {title}
        </Heading>
        <Text muted size="lg" className="mt-6">
          {t("comingSoon")}
        </Text>
        {children}
        <div className="mt-10">
          <ButtonLink href="/" variant="ghost" className="text-sm">
            {t("backHome")}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
