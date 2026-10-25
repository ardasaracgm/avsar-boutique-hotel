import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { absoluteUrl, localizedAlternates } from "@/lib/seo";
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
  const locale = await getLocale();
  return { alternates: localizedAlternates("/", locale) };
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
