import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";
import { galleryCategories, media } from "@/data/media";
import { bookingHomeUrl, whatsappUrl } from "@/lib/booking";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/layout/page-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { ButtonAnchor } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const [base, t] = await Promise.all([pageMetadata("/gallery", "gallery"), getTranslations("galleryPage")]);
  return { ...base, description: t("lead") };
}

export default async function GalleryPage() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const items = media.gallery;

  const labels = {
    all: t("galleryPage.all"),
    filter: t("galleryPage.filter"),
    categories: Object.fromEntries(galleryCategories.map((c) => [c, t(`galleryPage.categories.${c}`)])) as Record<
      (typeof galleryCategories)[number],
      string
    >,
    open: t.raw("galleryPage.open") as string,
    close: t("galleryPage.close"),
    prev: t("galleryPage.prev"),
    next: t("galleryPage.next"),
    counter: t.raw("galleryPage.counter") as string,
  };

  return (
    <>
      <PageHero
        title={t("pages.gallery.title")}
        eyebrow={t("galleryPage.eyebrow")}
        lead={t("galleryPage.lead")}
        crumbs={[{ label: t("nav.gallery") }]}
        image={items[0] ?? media.nightExterior}
        slot="gallery"
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <Container>
          {items.length > 0 ? (
            <GalleryGrid items={[...items]} locale={locale} labels={labels} />
          ) : (
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <h2 className="text-h2">{t("galleryPage.emptyTitle")}</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t("galleryPage.emptyText")}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonAnchor href={bookingHomeUrl(locale)} arrow>
                    {t("nav.book")}
                  </ButtonAnchor>
                  <ButtonAnchor
                    href={whatsappUrl(t("whatsapp.message", { hotel: hotel.name }))}
                    target="_blank"
                    rel="noopener"
                    variant="outline"
                  >
                    {t("home.cta.whatsapp")}
                  </ButtonAnchor>
                </div>
              </div>
              <ul aria-hidden className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7">
                {galleryCategories.map((c, i) => (
                  <li key={c} className={i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"}>
                    <MediaPlaceholder slot="gallery" className="size-full" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
