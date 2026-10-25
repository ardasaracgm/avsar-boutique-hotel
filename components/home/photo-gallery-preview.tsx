import { useTranslations } from "next-intl";
import { media } from "@/data/media";
import { Container } from "@/components/ui/container";
import { HotelImage } from "@/components/ui/hotel-image";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";

const MIN_PHOTOS = 5;

/** Asymmetric preview of the first 5 gallery photos. Hidden until enough real photos exist. */
export function PhotoGalleryPreview() {
  const t = useTranslations("home.gallery");
  const photos = media.gallery.filter((p) => p.src).slice(0, MIN_PHOTOS);
  if (photos.length < MIN_PHOTOS) return null;

  const layout = [
    "col-span-2 row-span-2 lg:col-span-2",
    "",
    "",
    "lg:col-span-1",
    "col-span-2 lg:col-span-1",
  ];

  return (
    <section aria-labelledby="gallery-title" className="bg-white py-20 sm:py-24 lg:py-32">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <Heading id="gallery-title" className="mt-4">
              {t("title")}
            </Heading>
          </div>
          <ButtonLink href="/gallery" variant="ghost" arrow className="self-start text-xs sm:self-auto">
            {t("cta")}
          </ButtonLink>
        </Reveal>
        <ul className="mt-12 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] lg:auto-rows-[15rem] lg:grid-cols-4 lg:gap-4">
          {photos.map((photo, i) => (
            <li key={photo.src} className={`relative overflow-hidden ${layout[i]}`}>
              <HotelImage item={photo} slot="gallery" alt="" sizes="(min-width: 1024px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
