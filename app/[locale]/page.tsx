import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";
import { absoluteUrl, baseOpenGraph, localizedAlternates } from "@/lib/seo";
import { StickyBookBar } from "@/components/booking/sticky-book-bar";
import { DialogueSection } from "@/components/home/dialogue-section";
import { ExperiencesSection } from "@/components/home/experiences-section";
import { FeaturedRooms } from "@/components/home/featured-rooms";
import { FinalBookingCTA } from "@/components/home/final-booking-cta";
import { HeroSection } from "@/components/home/hero-section";
import { HotelIntroduction } from "@/components/home/hotel-introduction";
import { HotelJsonLd } from "@/components/home/hotel-json-ld";
import { PhotoGalleryPreview } from "@/components/home/photo-gallery-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("meta")]);
  const title = `${hotel.name} | Lara, Antalya`;
  return {
    alternates: localizedAlternates("/", locale),
    openGraph: { ...baseOpenGraph(locale), title, description: t("description"), url: absoluteUrl("/", locale) },
    twitter: { card: "summary_large_image", title, description: t("description"), images: ["/og.png"] },
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <>
      <HotelJsonLd url={absoluteUrl("/", locale)} />
      <HeroSection />
      <HotelIntroduction />
      <FeaturedRooms />
      <DialogueSection />
      <ExperiencesSection />
      <PhotoGalleryPreview />
      <TestimonialsSection />
      <FinalBookingCTA />
      <StickyBookBar />
    </>
  );
}
