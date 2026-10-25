import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";

async function currentYear() {
  "use cache";
  cacheLife("days"); // static pages refresh daily, so the year never goes stale
  return new Date().getFullYear();
}

export async function Copyright() {
  const [t, year] = await Promise.all([getTranslations("footer"), currentYear()]);
  return <>{t("rights", { year, hotel: hotel.name })}</>;
}
