import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";
import { media } from "@/data/media";
import { bookingHomeUrl, whatsappUrl } from "@/lib/booking";
import { isContactFormEnabled } from "@/lib/contact-config";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { MapEmbed } from "@/components/contact/map-embed";
import { Container } from "@/components/ui/container";
import { ButtonAnchor } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const [base, t] = await Promise.all([pageMetadata("/contact", "contact"), getTranslations("contactPage")]);
  return { ...base, description: t("lead") };
}

export default async function ContactPage() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const { contact, address } = hotel;
  const geo = address.geo.value;
  const formEnabled = isContactFormEnabled();

  const channels = [
    { Icon: Phone, label: t("contactPage.channels.phone"), value: contact.phone.display, href: `tel:${contact.phone.tel}` },
    {
      Icon: MessageCircle,
      label: t("contactPage.channels.whatsapp"),
      value: contact.whatsapp.display,
      href: whatsappUrl(t("whatsapp.message", { hotel: hotel.name })),
      external: true,
    },
    { Icon: Mail, label: t("contactPage.channels.email"), value: contact.email.value, href: `mailto:${contact.email.value}` },
    {
      Icon: MapPin,
      label: t("contactPage.channels.address"),
      value: `${address.street}, ${address.postalCode} ${address.district} / ${address.city}`,
      href: address.mapsUrl,
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        title={t("pages.contact.title")}
        eyebrow={t("contactPage.eyebrow")}
        lead={t("contactPage.lead")}
        crumbs={[{ label: t("pages.contact.title") }]}
        image={media.nightExterior}
        slot="hero"
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <address className="not-italic">
              <ul className="divide-y divide-navy/10 border-y border-navy/10">
                {channels.map(({ Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener" } : {})}
                      className="group flex items-start gap-4 py-5"
                    >
                      <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
                      <span>
                        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{label}</span>
                        <span className="mt-1 block break-words underline-offset-4 group-hover:underline">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </address>
            <p className="mt-6 text-sm text-ink-muted">{t("contactPage.channels.reception")}</p>

            <div className="mt-10 border border-navy/10 bg-white p-6">
              <p className="text-sm leading-relaxed">{t("contactPage.bookingHint")}</p>
              <ButtonAnchor href={bookingHomeUrl(locale)} arrow size="sm" className="mt-5">
                {t("nav.book")}
              </ButtonAnchor>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-h2">{t("contactPage.form.title")}</h2>
            <div className="mt-8">
              {formEnabled ? (
                <ContactForm />
              ) : (
                <p className="border border-navy/10 bg-white p-6 text-sm leading-relaxed text-ink-muted">
                  {t("contactPage.form.unavailable")}
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="map-title" className="bg-white pt-16 sm:pt-20">
        <Container className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="map-title" className="text-h2">
            {t("contactPage.map.title")}
          </h2>
          <a
            href={address.mapsUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sand-deep underline-offset-4 hover:underline"
          >
            {t("contactPage.map.open")}
            <ExternalLink aria-hidden className="size-4" strokeWidth={1.5} />
          </a>
        </Container>
        <div className="mt-8 h-[22rem] sm:h-[28rem]">
          {geo && (
            <MapEmbed
              lat={geo.lat}
              lng={geo.lng}
              labels={{
                load: t("contactPage.map.load"),
                note: t("contactPage.map.note"),
                title: t("contactPage.map.frameTitle", { hotel: hotel.name }),
              }}
            />
          )}
        </div>
      </section>
    </>
  );
}
