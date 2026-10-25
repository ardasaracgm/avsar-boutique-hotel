/**
 * ElektraWeb (rezervasyonal.com) deep-link builder.
 *
 * Parameter names observed on other hotels using the same engine:
 *   ?Adult=2&Checkin=2023-05-11&Checkout=2023-05-12&Children=&currency=USD&language=en
 *
 * Verified: Adult, Checkin, Checkout (YYYY-MM-DD), currency, language.
 * NOT verified: Children format (count vs. ages). Until tested on the live engine,
 * children are NOT sent — the guest adds them inside the engine.
 * Flip CHILDREN_PARAM_VERIFIED after testing and adjust `childrenParam()`.
 */

import { hotel } from "@/data/hotel";

export type Locale = "tr" | "en" | "de" | "ru";
export type Currency = "TRY" | "EUR" | "USD";

const CHILDREN_PARAM_VERIFIED = false;

// Owner: ElektraWeb displays EUR and converts to TRY internally.
export const defaultCurrencyByLocale: Record<Locale, Currency> = {
  tr: "EUR",
  en: "EUR",
  de: "EUR",
  ru: "EUR",
};

export type BookingQuery = {
  checkIn?: string; // YYYY-MM-DD
  checkOut?: string; // YYYY-MM-DD
  adults?: number;
  childAges?: number[];
  locale: Locale;
  currency?: Currency;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function childrenParam(_ages: number[]): string | null {
  // Placeholder until the live format is confirmed.
  return null;
}

export function buildBookingUrl(q: BookingQuery): string {
  const url = new URL(hotel.booking.baseUrl);
  const p = url.searchParams;

  p.set("language", q.locale);
  p.set("currency", q.currency ?? defaultCurrencyByLocale[q.locale]);

  const validDates =
    q.checkIn && q.checkOut && ISO_DATE.test(q.checkIn) && ISO_DATE.test(q.checkOut) && q.checkIn < q.checkOut;

  if (validDates) {
    p.set("Checkin", q.checkIn!);
    p.set("Checkout", q.checkOut!);
  }

  if (q.adults && q.adults > 0) {
    p.set("Adult", String(Math.min(q.adults, 10)));
  }

  if (CHILDREN_PARAM_VERIFIED && q.childAges?.length) {
    const value = childrenParam(q.childAges);
    if (value) p.set("Children", value);
  }

  return url.toString();
}

/** Plain link to the engine (header button, footer, etc.). */
export const bookingHomeUrl = (locale: Locale) => buildBookingUrl({ locale });

/** WhatsApp click-to-chat with a localized prefilled message (pass translated text). */
export const whatsappUrl = (message?: string) => {
  const base = `https://wa.me/${hotel.contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
