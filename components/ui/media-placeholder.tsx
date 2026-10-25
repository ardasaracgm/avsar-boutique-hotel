import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type Slot = "hero" | "room" | "dialogue" | "pool" | "spa" | "gallery";

/**
 * Neutral stand-in wherever an original hotel photo is not available yet.
 * Deliberately looks like a placeholder — never replace with stock or AI imagery.
 */
export function MediaPlaceholder({
  slot,
  className,
  tone = "light",
  variant = "block",
}: {
  slot: Slot;
  className?: string;
  tone?: "light" | "dark";
  /** "background": behind text (hero, CTA) — only a small corner label, so it never collides with content. */
  variant?: "block" | "background";
}) {
  const t = useTranslations("media");
  if (variant === "background") {
    return (
      <div
        role="img"
        aria-label={`${t(`slots.${slot}`)} — ${t("placeholder")}`}
        className={cn(tone === "light" ? "bg-ivory-deep" : "bg-navy-soft", className)}
      >
        <span
          className={cn(
            "absolute end-4 top-4 inline-flex items-center gap-1.5 border border-dashed px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em]",
            tone === "light" ? "border-navy/25 text-ink-muted" : "border-ivory/30 text-ivory/75",
          )}
        >
          <ImageIcon aria-hidden className="size-3.5" strokeWidth={1.25} />
          {t(`slots.${slot}`)} · {t("placeholder")}
        </span>
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${t(`slots.${slot}`)} — ${t("placeholder")}`}
      className={cn(
        "flex flex-col items-center justify-center gap-2 border border-dashed text-center",
        tone === "light" ? "border-navy/20 bg-ivory-deep text-ink-muted" : "border-ivory/25 bg-navy-soft text-ivory/75",
        className,
      )}
    >
      <ImageIcon aria-hidden className="size-6" strokeWidth={1.25} />
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">{t(`slots.${slot}`)}</span>
      <span className="text-xs">{t("placeholder")}</span>
    </div>
  );
}
