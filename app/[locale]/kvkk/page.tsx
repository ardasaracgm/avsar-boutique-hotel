import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage, legalDescription } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/kvkk", "kvkk", await legalDescription("kvkk"));
}

export default async function Page() {
  const t = await getTranslations("pages");
  return <LegalPage doc="kvkk" title={t("kvkk.title")} />;
}
