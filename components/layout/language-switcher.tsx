"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { useCurrentHref } from "./locale-links";

/** Header dropdown. Each option is a real link to the same page in another locale (crawlable, works without JS). */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const href = useCurrentHref();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("a11y.language")} — ${t("a11y.currentLanguage", { language: t(`languages.${locale}`) })}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-10 items-center gap-1.5 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy hover:text-navy-soft"
      >
        <Globe aria-hidden className="size-4" strokeWidth={1.5} />
        {locale}
        <ChevronDown aria-hidden className={cn("size-3.5 transition-transform", open && "rotate-180")} strokeWidth={1.5} />
      </button>

      <ul
        id={listId}
        hidden={!open}
        className="absolute end-0 top-full z-50 mt-2 min-w-44 border border-navy/10 bg-white py-2 shadow-[0_12px_32px_-12px_rgb(20_44_59/0.25)]"
      >
        {routing.locales.map((l) => (
          <li key={l}>
            <Link
              href={href}
              locale={l}
              lang={l}
              hrefLang={l}
              aria-current={l === locale ? "true" : undefined}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-between gap-6 px-4 text-sm text-navy hover:bg-ivory"
            >
              <span>{t(`languages.${l}`)}</span>
              {l === locale && <Check aria-hidden className="size-4 text-sand-deep" strokeWidth={1.75} />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
