"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { bookingHomeUrl, whatsappUrl } from "@/lib/booking";
import { hotel } from "@/data/hotel";
import { cn } from "@/lib/cn";
import { ButtonAnchor } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { LocaleLinks } from "./locale-links";
import { isActive, mainNav } from "./nav-items";
import { useFocusTrap } from "./use-focus-trap";
import { Wordmark } from "./wordmark";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useFocusTrap(menuRef, menuOpen, closeMenu);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bookingUrl = bookingHomeUrl(locale);

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-3 z-[60] -translate-y-24 bg-navy px-4 py-3 text-sm font-semibold text-ivory transition-transform focus:translate-y-0"
      >
        {t("a11y.skipToContent")}
      </a>

      <header
        className={cn(
          "sticky top-0 z-40 bg-ivory/95 backdrop-blur-sm transition-[box-shadow,border-color] duration-300",
          scrolled ? "border-b border-navy/10 shadow-[0_8px_24px_-20px_rgb(20_44_59/0.5)]" : "border-b border-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-(--container-site) items-center gap-4 px-4 transition-[height] duration-300 ease-(--ease-elegant) sm:px-6 lg:px-10",
            scrolled ? "h-16" : "h-20 lg:h-24",
          )}
        >
          <Wordmark compact={scrolled} className="me-auto lg:me-0" />

          <nav aria-label={t("a11y.mainNav")} className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-3">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center px-3 font-heading text-[1.0625rem] text-navy transition-colors hover:text-sea",
                        "after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-sand after:transition-transform after:duration-300 hover:after:scale-x-100",
                        active && "after:scale-x-100",
                      )}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <LanguageSwitcher className="hidden sm:block" />
            <span className="hidden sm:inline-flex">
              <ButtonAnchor href={bookingUrl} size="sm" aria-describedby="booking-hint">
                {t("nav.book")}
              </ButtonAnchor>
            </span>
            <span id="booking-hint" className="sr-only">
              {t("a11y.opensBooking")}
            </span>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={t("a11y.openMenu")}
              onClick={() => setMenuOpen(true)}
              className="-me-2 inline-flex size-11 items-center justify-center text-navy lg:hidden"
            >
              <Menu aria-hidden className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("a11y.mainNav")}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy text-ivory transition-opacity duration-300 ease-(--ease-elegant) starting:opacity-0 lg:hidden"
          >
            <div className="flex h-20 shrink-0 items-center justify-between px-4 sm:px-6">
              <Wordmark tone="light" />
              <button
                type="button"
                aria-label={t("a11y.closeMenu")}
                onClick={closeMenu}
                className="-me-2 inline-flex size-11 items-center justify-center"
              >
                <X aria-hidden className="size-6" strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label={t("a11y.mainNav")} className="flex-1 px-4 pt-6 sm:px-6">
              <ul className="flex flex-col">
                {[{ key: "home", href: "/" } as const, ...mainNav].map((item, i) => (
                  <li
                    key={item.key}
                    style={{ transitionDelay: `${40 * i + 80}ms` }}
                    className="border-b border-ivory/10 transition-[opacity,translate] duration-500 ease-(--ease-elegant) starting:translate-y-3 starting:opacity-0"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      onClick={closeMenu}
                      className="flex min-h-14 items-center font-heading text-3xl aria-[current=page]:text-sand"
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-4 px-4 pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-6">
              <ButtonAnchor href={bookingUrl} variant="outline-light" arrow className="w-full">
                {t("nav.book")}
              </ButtonAnchor>
              <div className="flex items-center justify-between gap-4">
                <LocaleLinks tone="light" className="-ms-2" />
                <a
                  href={whatsappUrl(t("whatsapp.message", { hotel: hotel.name }))}
                  className="text-sm text-ivory/80 underline-offset-4 hover:underline"
                >
                  {hotel.contact.whatsapp.display}
                </a>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
