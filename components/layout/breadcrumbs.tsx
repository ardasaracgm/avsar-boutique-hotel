import type { ComponentProps } from "react";
import { ChevronRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/cn";

type Href = ComponentProps<typeof Link>["href"];
export type Crumb = { label: string; href?: Href };

/** Visible breadcrumb trail + schema.org BreadcrumbList. Last crumb is the current page. */
export async function Breadcrumbs({ items, className, tone = "dark" }: { items: Crumb[]; className?: string; tone?: "dark" | "light" }) {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const trail: Crumb[] = [{ label: t("nav.home"), href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href as Parameters<typeof absoluteUrl>[0], locale) } : {}),
    })),
  };

  return (
    <nav aria-label={t("roomDetail.breadcrumb")} className={className}>
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-xs", tone === "dark" ? "text-ink-muted" : "text-ivory/70")}>
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link href={c.href} className="underline-offset-4 hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={tone === "dark" ? "text-navy" : "text-ivory"}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className="size-3.5 opacity-60 rtl:-scale-x-100" strokeWidth={1.5} />}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </nav>
  );
}
