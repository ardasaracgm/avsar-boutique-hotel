import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage, legalDescription } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/privacy", "privacy", await legalDescription("privacy"));
}

export default async function Page() {
  const t = await getTranslations("pages");
  return <LegalPage doc="privacy" title={t("privacy.title")} />;
}
