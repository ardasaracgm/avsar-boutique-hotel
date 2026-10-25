/**
 * Guest reviews shown on the site. Only add reviews whose source is verifiable
 * (e.g. a public Google review the hotel owns, with the reviewer's displayed name).
 * The homepage section stays hidden while this list is empty.
 *
 * TODO: decide the source — Google Places API (live rating + reviews) or a hand-picked,
 * hotel-approved list copied from the Google Business Profile with a link to each review.
 */
export type Review = {
  author: string;
  text: string;
  source: "Google" | "Booking.com" | "Tripadvisor";
  url?: string;
  /** Language the review was written in (shown untranslated). */
  lang: "tr" | "en" | "de" | "ru";
};

export const reviews: readonly Review[] = [];
