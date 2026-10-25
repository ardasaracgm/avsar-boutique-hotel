import { useTranslations } from "next-intl";
import { hotel } from "@/data/hotel";
import { whatsappUrl } from "@/lib/booking";

/**
 * Floating WhatsApp button. Sits above the mobile action bar via
 * `--mobile-bar-height-active` (globals.css: bar height below lg, 0 from lg).
 */
export function WhatsAppButton() {
  const t = useTranslations();
  return (
    <a
      href={whatsappUrl(t("whatsapp.message", { hotel: hotel.name }))}
      target="_blank"
      rel="noopener"
      aria-label={`${t("whatsapp.label")} — ${t("a11y.opensWhatsapp")}`}
      className="fixed end-3 bottom-[calc(1.75rem+var(--mobile-bar-height-active,0px)+env(safe-area-inset-bottom))] z-30 inline-flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-10px_rgb(20_44_59/0.55)] transition-transform duration-300 hover:scale-105 sm:end-6 lg:bottom-[calc(1rem+env(safe-area-inset-bottom))] lg:size-14"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-6 lg:size-7" fill="currentColor">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.44 9.44m8.03-17.47A11.28 11.28 0 0 0 12.04.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.59 23.6l6.01-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.04-1.18-5.89-3.32-8.03" />
      </svg>
    </a>
  );
}
