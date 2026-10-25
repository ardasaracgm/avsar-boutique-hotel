import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PageStub } from "@/components/layout/page-stub";
import { pageMetadata } from "@/lib/page-metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/about", "about");
}

export default function Page() {
  const t = useTranslations("pages");
  return <PageStub title={t("about.title")} />;
}
