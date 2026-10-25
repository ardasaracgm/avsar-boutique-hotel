"use client";

import type { ComponentProps } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Href = ComponentProps<typeof Link>["href"];

/** Href for the current page, so switching language keeps the visitor on the same page. */
export function useCurrentHref(): Href {
  const pathname = usePathname();
  const params = useParams();
  return toHref(pathname, params);
}

const dynamicTemplates = Object.keys(routing.pathnames).filter((p) => p.includes("["));
const templateRegex = (template: string) => new RegExp(`^${template.replace(/\[[^\]]+\]/g, "[^/]+")}$`);

/**
 * During prerendering `usePathname()` can return the resolved internal path
 * (e.g. "/rooms/deluxe-sea-view") instead of the template ("/rooms/[slug]").
 * Map it back to its template so links get the correctly localized path in every locale.
 */
function toHref(pathname: string, params: ReturnType<typeof useParams>): Href {
  if (pathname.includes("[")) return { pathname, params } as Href;
  const template = dynamicTemplates.find((t) => templateRegex(t).test(pathname));
  return (template ? { pathname: template, params } : pathname) as Href;
}

/** Inline list of language links (footer, mobile menu). */
export function LocaleLinks({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const t = useTranslations();
  const current = useLocale();
  const href = useCurrentHref();

  return (
    <ul className={cn("flex flex-wrap items-center gap-x-1 gap-y-2", className)}>
      {routing.locales.map((l) => (
        <li key={l}>
          <Link
            href={href}
            locale={l}
            lang={l}
            hrefLang={l}
            aria-current={l === current ? "true" : undefined}
            className={cn(
              "inline-flex min-h-10 min-w-10 items-center justify-center px-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors",
              tone === "dark"
                ? l === current
                  ? "text-navy"
                  : "text-navy/50 hover:text-navy"
                : l === current
                  ? "text-ivory"
                  : "text-ivory/55 hover:text-ivory",
            )}
          >
            {l}
            <span className="sr-only"> {t(`languages.${l}`)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
