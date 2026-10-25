"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { ArrowRight, CalendarDays, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { bookingHomeUrl, buildBookingUrl } from "@/lib/booking";
import { cn } from "@/lib/cn";

const MAX_ADULTS = 8;

const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const addDays = (iso: string, days: number) => {
  const [y, m, d] = iso.split("-").map(Number);
  return toIso(new Date(y, m - 1, d + days));
};

/**
 * Availability search. Sends dates, adults, language and currency to the ElektraWeb engine
 * through `buildBookingUrl()`. Without JS the form still opens the engine (plain link).
 */
export function BookingBar({
  className,
  id = "booking-bar",
  layout = "bar",
}: {
  className?: string;
  id?: string;
  /** "bar": horizontal on desktop (hero). "stacked": single column (sidebars). */
  layout?: "bar" | "stacked";
}) {
  const t = useTranslations("home.booking");
  const locale = useLocale();
  const uid = useId();
  const [today, setToday] = useState<string>();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [error, setError] = useState(false);

  // "Today" is read on the client so prerendered HTML never carries a stale date.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setToday(toIso(new Date())), []);

  const onCheckIn = (value: string) => {
    setCheckIn(value);
    setError(false);
    if (value && (!checkOut || checkOut <= value)) setCheckOut(addDays(value, 1));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkIn && checkOut && checkOut <= checkIn) {
      setError(true);
      return;
    }
    const url = buildBookingUrl({
      locale,
      adults,
      ...(checkIn && checkOut ? { checkIn, checkOut } : {}),
    });
    window.location.assign(url);
  };

  const field = "group relative flex min-h-16 items-center gap-3 px-4 transition-colors focus-within:bg-ivory/60 lg:px-5";
  const labelClass = "block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted";
  const inputClass =
    "mt-0.5 block w-full min-w-0 bg-transparent text-[0.9375rem] text-navy outline-none [color-scheme:light] focus-visible:outline-none";

  // No-JS fallback: a GET form drops the action's query string, so carry it over as hidden fields.
  const fallback = new URL(bookingHomeUrl(locale));

  return (
    <form
      id={id}
      action={`${fallback.origin}${fallback.pathname}`}
      method="get"
      onSubmit={onSubmit}
      aria-label={t("label")}
      noValidate
      className={cn(
        "bg-white shadow-[0_24px_60px_-28px_rgb(20_44_59/0.45)] ring-1 ring-navy/5",
        className,
      )}
    >
      {[...fallback.searchParams].map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <div
        className={cn(
          "grid divide-y divide-navy/10",
          layout === "bar" && "lg:grid-cols-[1fr_1fr_0.9fr_auto] lg:divide-x lg:divide-y-0 rtl:lg:divide-x-reverse",
        )}
      >
        <div className={field}>
          <CalendarDays aria-hidden className="size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
          <div className="min-w-0 flex-1">
            <label htmlFor={`${uid}-in`} className={labelClass}>
              {t("checkIn")}
            </label>
            <input
              id={`${uid}-in`}
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => onCheckIn(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className={field}>
          <CalendarDays aria-hidden className="size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
          <div className="min-w-0 flex-1">
            <label htmlFor={`${uid}-out`} className={labelClass}>
              {t("checkOut")}
            </label>
            <input
              id={`${uid}-out`}
              type="date"
              value={checkOut}
              min={checkIn ? addDays(checkIn, 1) : today}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setError(false);
              }}
              aria-invalid={error || undefined}
              aria-describedby={error ? `${uid}-err` : undefined}
              className={inputClass}
            />
          </div>
        </div>

        <div className={field}>
          <Users aria-hidden className="size-5 shrink-0 text-sand-deep" strokeWidth={1.5} />
          <div className="min-w-0 flex-1">
            <label htmlFor={`${uid}-adults`} className={labelClass}>
              {t("guests")}
            </label>
            <select
              id={`${uid}-adults`}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className={cn(inputClass, "cursor-pointer appearance-none")}
            >
              {Array.from({ length: MAX_ADULTS }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {t("adults", { count: n })}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={layout === "bar" ? "p-3 lg:p-2.5" : "p-3"}>
          <button
            type="submit"
            className={cn("inline-flex min-h-12 w-full items-center justify-center gap-2.5 bg-navy px-6 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-navy-soft rtl:[&>svg]:-scale-x-100", layout === "bar" && "lg:h-full lg:min-h-14")}
          >
            {t("submit")}
            <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <p className="border-t border-navy/10 px-4 py-2.5 text-xs text-ink-muted lg:px-5" aria-live="polite">
        {error ? (
          <span id={`${uid}-err`} className="font-semibold text-[#9b2c2c]">
            {t("invalidRange")}
          </span>
        ) : (
          t("note")
        )}
      </p>
    </form>
  );
}
