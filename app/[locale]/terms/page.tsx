import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage, legalDescription } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/terms", "terms", await legalDescription("terms"));
}

export default async function Page() {
  const t = await getTranslations("pages");
  return <LegalPage doc="terms" title={t("terms.title")} />;
}
