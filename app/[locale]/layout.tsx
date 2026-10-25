import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { hotel } from "@/data/hotel";
import { localeDirection, routing } from "@/i18n/routing";
import { bodyFont, headingFont } from "@/lib/fonts";
import { baseOpenGraph, localizedAlternates } from "@/lib/seo";
import { isSiteLive, siteUrl } from "@/lib/site";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function resolveLocale() {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${hotel.name} | Lara, Antalya`, template: `%s | ${hotel.name}` },
    description: t("description"),
    alternates: localizedAlternates("/", locale),
    // Pre-launch: keep every page out of search engines until NEXT_PUBLIC_SITE_LIVE=true.
    robots: isSiteLive ? undefined : { index: false, follow: false },
    openGraph: baseOpenGraph(locale),
    twitter: { card: "summary_large_image", images: ["/og.png"] },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f2eb",
};

/**
 * Only the namespaces used by Client Components are sent to the browser
 * (Header, LanguageSwitcher, LocaleLinks, BookingBar, StickyBookBar, ContactForm).
 * Add a namespace here when a new Client Component calls useTranslations.
 */
async function clientMessages() {
  const m = await getMessages();
  return {
    a11y: m.a11y,
    nav: m.nav,
    languages: m.languages,
    whatsapp: m.whatsapp,
    home: { booking: m.home.booking, sticky: m.home.sticky },
    contactPage: { form: m.contactPage.form },
  };
}

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const locale = await resolveLocale();
  const messages = await clientMessages();

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
            <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
