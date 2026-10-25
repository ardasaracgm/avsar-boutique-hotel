import { hotel } from "@/data/hotel";

/**
 * Contact form delivery (Resend). The form renders only when both variables are set in Vercel:
 *   RESEND_API_KEY      — Resend API key
 *   CONTACT_FROM_EMAIL  — verified sender, e.g. "Avşar Boutique Hotel <web@avsarhotel.com>"
 * Optional: CONTACT_TO_EMAIL (defaults to the hotel e-mail in data/hotel.ts).
 */
export const contactConfig = {
  apiKey: process.env.RESEND_API_KEY,
  from: process.env.CONTACT_FROM_EMAIL,
  to: process.env.CONTACT_TO_EMAIL ?? hotel.contact.email.value,
};

export const isContactFormEnabled = () => Boolean(contactConfig.apiKey && contactConfig.from);
