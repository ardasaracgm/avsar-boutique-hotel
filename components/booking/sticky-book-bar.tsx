"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { bookingHomeUrl } from "@/lib/booking";
import { cn } from "@/lib/cn";

const BAR_HEIGHT = "4.5rem";

/**
 * Mobile-only bar that appears once the hero booking form has scrolled out of view.
 * Publishes its height as `--sticky-bar-height` so the WhatsApp button moves above it.
 */
export function StickyBookBar({ watchId = "booking-bar" }: { watchId?: string }) {
  const t = useTranslations("home.sticky");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    const footer = document.querySelector("footer");
    if (!target) return;

    // Scroll-position check (not IntersectionObserver): a fast fling can jump over the form
    // without it ever "intersecting", which would leave the bar hidden.
    let frame = 0;
    const update = () => {
      frame = 0;
      const pastForm = target.getBoundingClientRect().bottom < 0;
      const footerInView = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(pastForm && !footerInView);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [watchId]);

  useEffect(() => {
    const root = document.documentElement;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    root.style.setProperty("--sticky-bar-height", visible && mobile ? BAR_HEIGHT : "0px");
    return () => root.style.setProperty("--sticky-bar-height", "0px");
  }, [visible]);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-navy/10 bg-ivory/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 ease-(--ease-elegant) lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href={bookingHomeUrl(locale)}
        className="flex min-h-12 w-full items-center justify-center gap-2.5 bg-navy text-xs font-semibold uppercase tracking-[0.18em] text-ivory rtl:[&>svg]:-scale-x-100"
      >
        {t("book")}
        <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
      </a>
    </div>
  );
}
