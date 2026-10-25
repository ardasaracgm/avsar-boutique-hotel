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
}: {
  slot: Slot;
  className?: string;
  tone?: "light" | "dark";
}) {
  const t = useTranslations("media");
  return (
    <div
      role="img"
      aria-label={`${t(`slots.${slot}`)} — ${t("placeholder")}`}
      className={cn(
        "flex flex-col items-center justify-center gap-2 border border-dashed text-center",
        tone === "light" ? "border-navy/20 bg-ivory-deep text-ink-muted" : "border-ivory/25 bg-navy-soft text-ivory/60",
        className,
      )}
    >
      <ImageIcon aria-hidden className="size-6" strokeWidth={1.25} />
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">{t(`slots.${slot}`)}</span>
      <span className="text-xs">{t("placeholder")}</span>
    </div>
  );
}
