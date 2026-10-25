"use server";

import { hotel } from "@/data/hotel";
import { contactConfig, isContactFormEnabled } from "@/lib/contact-config";

export type ContactField = "name" | "email" | "message" | "consent";
export type ContactValues = { name: string; email: string; phone: string; message: string };
export type ContactState =
  | { status: "idle" }
  | {
      status: "invalid";
      errors: Partial<Record<ContactField, "required" | "invalidEmail" | "consentRequired">>;
      values: ContactValues;
    }
  | { status: "success" }
  | { status: "error"; values: ContactValues };

const MIN_FILL_MS = 3000; // bots submit instantly
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContactMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();

  // Spam traps: honeypot field must stay empty; form must be open a few seconds.
  const startedAt = Number(get("startedAt"));
  if (get("website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success" }; // silently drop
  }

  const name = get("name").slice(0, 120);
  const email = get("email").slice(0, 200);
  const phone = get("phone").slice(0, 40);
  const message = get("message").slice(0, 4000);
  const locale = get("locale").slice(0, 5);

  const errors: Extract<ContactState, { status: "invalid" }>["errors"] = {};
  if (!name) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!EMAIL.test(email)) errors.email = "invalidEmail";
  if (!message) errors.message = "required";
  if (form.get("consent") !== "on") errors.consent = "consentRequired";
  // Returned so the form can restore what the visitor typed (React resets forms after an action).
  const values = { name, email, phone, message };
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  if (!isContactFormEnabled()) return { status: "error", values };

  const html = `
    <h2>${escape(hotel.name)} — web contact form</h2>
    <p><strong>Name:</strong> ${escape(name)}<br/>
    <strong>Email:</strong> ${escape(email)}<br/>
    <strong>Phone:</strong> ${escape(phone || "-")}<br/>
    <strong>Language:</strong> ${escape(locale)}</p>
    <p style="white-space:pre-wrap">${escape(message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${contactConfig.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: contactConfig.from,
        to: [contactConfig.to],
        reply_to: email,
        subject: `Web: ${name}`,
        html,
      }),
    });
    return res.ok ? { status: "success" } : { status: "error", values };
  } catch {
    return { status: "error", values };
  }
}
