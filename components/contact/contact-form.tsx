"use client";

import { useActionState, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { sendContactMessage, type ContactField, type ContactState } from "@/app/[locale]/contact/actions";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contactPage.form");
  const locale = useLocale();
  const [state, action, pending] = useActionState(sendContactMessage, initial);
  const [startedAt, setStartedAt] = useState("");

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setStartedAt(String(Date.now())), []);

  if (state.status === "success") {
    return (
      <p role="status" className="border border-sea/40 bg-white p-6 text-sm leading-relaxed">
        {t("success")}
      </p>
    );
  }

  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;
  const error = (f: ContactField) => (state.status === "invalid" ? state.errors[f] : undefined);
  const field = "mt-1.5 block w-full border border-navy/20 bg-white px-4 py-3 text-[0.9375rem] outline-none transition-colors focus:border-navy aria-[invalid=true]:border-[#9b2c2c]";
  const label = "text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted";
  const errText = (f: ContactField) =>
    error(f) && (
      <span id={`err-${f}`} className="mt-1.5 block text-xs font-semibold text-[#9b2c2c]">
        {t(error(f)!)}
      </span>
    );

  return (
    <form action={action} noValidate className="grid gap-5">
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -start-[9999px] h-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>{t("name")}</span>
          <input name="name" defaultValue={values?.name} autoComplete="name" required aria-invalid={!!error("name")} aria-describedby={error("name") ? "err-name" : undefined} className={field} />
          {errText("name")}
        </label>
        <label className="block">
          <span className={label}>{t("email")}</span>
          <input name="email" type="email" defaultValue={values?.email} autoComplete="email" required aria-invalid={!!error("email")} aria-describedby={error("email") ? "err-email" : undefined} className={field} />
          {errText("email")}
        </label>
      </div>
      <label className="block">
        <span className={label}>{t("phone")}</span>
        <input name="phone" type="tel" defaultValue={values?.phone} autoComplete="tel" className={field} />
      </label>
      <label className="block">
        <span className={label}>{t("message")}</span>
        <textarea name="message" rows={5} defaultValue={values?.message} required aria-invalid={!!error("message")} aria-describedby={error("message") ? "err-message" : undefined} className={cn(field, "resize-y")} />
        {errText("message")}
      </label>
      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <input
            name="consent"
            type="checkbox"
            required
            aria-invalid={!!error("consent")}
            aria-describedby={error("consent") ? "err-consent" : undefined}
            className="mt-1 size-4 shrink-0 accent-navy"
          />
          <span>
            {t.rich("consent", {
              link: (chunks) => (
                <Link href="/kvkk" target="_blank" className="underline underline-offset-4">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errText("consent")}
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm font-semibold text-[#9b2c2c]">
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center bg-navy px-8 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-navy-soft disabled:opacity-60 sm:justify-self-start"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
