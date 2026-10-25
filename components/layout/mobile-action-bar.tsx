import { CalendarDays, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { hotel } from "@/data/hotel";
import { bookingHomeUrl } from "@/lib/booking";

/**
 * Fixed bottom bar on phones and tablets (hidden from lg): Booking | Phone.
 * Its height is reserved via --mobile-bar-height (globals.css) so page content and the
 * floating WhatsApp button never sit underneath it.
 */
export function MobileActionBar() {
  const t = useTranslations();
  const locale = useLocale();

  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 text-[0.8125rem] font-medium text-navy transition-colors active:bg-ivory-deep";

  return (
    <nav
      aria-label={t("a11y.quickActions")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgb(20_44_59/0.35)] lg:hidden"
    >
      <div className="flex h-(--mobile-bar-height) divide-x divide-navy/10 rtl:divide-x-reverse">
        <a href={bookingHomeUrl(locale)} className={item}>
          <CalendarDays aria-hidden className="size-6" strokeWidth={1.5} />
          {t("nav.book")}
        </a>
        <a href={`tel:${hotel.contact.phone.tel}`} className={item} aria-label={`${t("footer.phone")}: ${hotel.contact.phone.display}`}>
          <Phone aria-hidden className="size-6" strokeWidth={1.5} />
          {hotel.contact.phone.display}
        </a>
      </div>
    </nav>
  );
}
