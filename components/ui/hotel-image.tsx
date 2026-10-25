import Image from "next/image";
import type { MediaItem } from "@/data/media";
import { cn } from "@/lib/cn";
import { MediaPlaceholder } from "./media-placeholder";

type Props = {
  item: MediaItem;
  slot: Parameters<typeof MediaPlaceholder>[0]["slot"];
  alt: string;
  sizes: string;
  className?: string;
  tone?: "light" | "dark";
  /** Above-the-fold image (hero): load eagerly with high priority. */
  priority?: boolean;
  /** Placeholder style while no photo exists. Use "background" when text sits on top. */
  placeholder?: "block" | "background";
};

/**
 * Fills its (relatively positioned) parent. Renders the real photo from data/media.ts,
 * or a neutral placeholder while `src` is null.
 */
export function HotelImage({ item, slot, alt, sizes, className, tone, priority, placeholder }: Props) {
  if (!item.src) {
    return <MediaPlaceholder slot={slot} tone={tone} variant={placeholder} className={cn("absolute inset-0 size-full", className)} />;
  }
  return (
    <Image
      src={item.src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover [object-position:var(--pos-sm,var(--pos,50%_50%))] lg:[object-position:var(--pos,50%_50%)]", className)}
      style={
        {
          ...(item.position ? { "--pos": item.position } : {}),
          ...(item.positionMobile ? { "--pos-sm": item.positionMobile } : {}),
        } as React.CSSProperties
      }
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
