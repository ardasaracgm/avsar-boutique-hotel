import { MapPin, MessageCircle, Phone, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { hotel } from "@/data/hotel";
import { Link } from "@/i18n/navigation";
import { bookingHomeUrl, whatsappUrl } from "@/lib/booking";
import { Container } from "@/components/ui/container";
import { ButtonAnchor } from "@/components/ui/button";
import { Copyright } from "./copyright";
import { LocaleLinks } from "./locale-links";
import { infoNav, mainNav } from "./nav-items";
import { SocialLinks } from "./social-links";
import { Wordmark } from "./wordmark";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const { address, contact, legal } = hotel;

  const headingClass = "mb-5 font-sans text-eyebrow font-semibold uppercase text-sand";
  const linkClass = "inline-flex min-h-9 items-center text-sm text-ivory/75 transition-colors hover:text-ivory";

  return (
    <footer className="bg-navy text-ivory">
      <Container className="grid gap-12 pt-16 pb-10 sm:pt-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Wordmark tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">{t("footer.tagline")}</p>
          <ButtonAnchor href={bookingHomeUrl(locale)} variant="outline-light" size="sm" arrow className="mt-8">
            {t("nav.book")}
          </ButtonAnchor>
          <SocialLinks className="mt-8" />
        </div>

        <nav aria-labelledby="footer-explore" className="lg:col-span-2">
          <h2 id="footer-explore" className={headingClass}>
            {t("footer.explore")}
          </h2>
          <ul>
            {mainNav.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={linkClass}>
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-info" className="lg:col-span-2">
          <h2 id="footer-info" className={headingClass}>
            {t("footer.information")}
          </h2>
          <ul>
            {infoNav.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={linkClass}>
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className={headingClass}>{t("footer.contact")}</h2>
          <address className="not-italic">
            <ul className="space-y-4 text-sm text-ivory/80">
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-sand" strokeWidth={1.5} />
                <a href={address.mapsUrl} target="_blank" rel="noopener" className="hover:text-ivory">
                  <span className="sr-only">{t("footer.address")}: </span>
                  {address.street}
                  <br />
                  {address.postalCode} {address.district} / {address.city}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-sand" strokeWidth={1.5} />
                <a href={`tel:${contact.phone.tel}`} className="hover:text-ivory">
                  <span className="sr-only">{t("footer.phone")}: </span>
                  {contact.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-sand" strokeWidth={1.5} />
                <a href={whatsappUrl(t("whatsapp.message", { hotel: hotel.name }))} className="hover:text-ivory">
                  <span className="sr-only">{t("footer.whatsapp")}: </span>
                  {contact.whatsapp.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-sand" strokeWidth={1.5} />
                <a href={`mailto:${contact.email.value}`} className="break-all hover:text-ivory">
                  <span className="sr-only">{t("footer.email")}: </span>
                  {contact.email.value}
                </a>
              </li>
            </ul>
          </address>
          <p className="mt-6 text-xs text-ivory/55">{t("footer.reception")}</p>
        </div>
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col gap-4 py-6 pb-24 text-xs text-ivory/55 md:flex-row md:items-center md:justify-between md:pb-6 md:pe-24">
          <div className="space-y-1">
            <p>
              <Copyright />
            </p>
            <p>{t("footer.license", { number: legal.tourismLicenseNo.value.replace(/-/g, "\u2011") })}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="sr-only">{t("footer.languages")}</span>
            <LocaleLinks tone="light" />
          </div>
        </Container>
      </div>
    </footer>
  );
}
