"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryCategory, GalleryItem } from "@/data/media";
import { cn } from "@/lib/cn";

export type GalleryLabels = {
  all: string;
  filter: string;
  categories: Record<GalleryCategory, string>;
  open: string; // contains "{label}"
  close: string;
  prev: string;
  next: string;
  counter: string; // contains "{current}" and "{total}"
};

type Props = { items: GalleryItem[]; locale: "tr" | "en" | "de" | "ru"; labels: GalleryLabels };

/** Filterable photo grid with an accessible lightbox (native <dialog>, arrow keys, swipe). */
export function GalleryGrid({ items, locale, labels }: Props) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const categories = useMemo(
    () => (Object.keys(labels.categories) as GalleryCategory[]).filter((c) => items.some((i) => i.category === c)),
    [items, labels.categories],
  );
  const visible = useMemo(() => (filter === "all" ? items : items.filter((i) => i.category === filter)), [items, filter]);

  const altFor = (item: GalleryItem) => item.alt?.[locale] ?? labels.categories[item.category];

  const open = (i: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setIndex(i);
  };
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) {
      dialog.close();
      triggerRef.current?.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(document.dir === "rtl" ? -1 : 1);
      if (e.key === "ArrowLeft") step(document.dir === "rtl" ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? visible[index] : null;

  return (
    <>
      {categories.length > 1 && (
        <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
          {(["all", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "min-h-10 border px-4 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
                filter === c ? "border-navy bg-navy text-ivory" : "border-navy/20 text-navy hover:border-navy",
              )}
            >
              {c === "all" ? labels.all : labels.categories[c]}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((item, i) => (
          <li key={item.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              aria-label={labels.open.replace("{label}", altFor(item))}
              className="group block w-full overflow-hidden"
            >
              <Image
                src={item.src}
                alt={altFor(item)}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-(--ease-elegant) group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={current ? altFor(current) : undefined}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-navy/95 p-0 text-ivory backdrop:bg-navy/80"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p aria-live="polite" className="text-xs tracking-[0.2em]">
                {labels.counter.replace("{current}", String(index! + 1)).replace("{total}", String(visible.length))}
              </p>
              <button type="button" onClick={close} aria-label={labels.close} className="inline-flex size-11 items-center justify-center">
                <X aria-hidden className="size-6" strokeWidth={1.5} />
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <Image src={current.src} alt={altFor(current)} fill sizes="100vw" className="object-contain" />
            </div>
            {visible.length > 1 && (
              <div className="flex justify-center gap-3 py-4">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={labels.prev}
                  className="inline-flex size-12 items-center justify-center border border-ivory/30 hover:bg-ivory/10"
                >
                  <ChevronLeft aria-hidden className="size-5 rtl:-scale-x-100" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={labels.next}
                  className="inline-flex size-12 items-center justify-center border border-ivory/30 hover:bg-ivory/10"
                >
                  <ChevronRight aria-hidden className="size-5 rtl:-scale-x-100" strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
