import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { hotel } from "@/data/hotel";
import "./globals.css";

const heading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export const metadata: Metadata = {
  title: hotel.name,
  description: "Lara, Antalya — deniz manzaralı butik otel. Yeni web sitesi hazırlanıyor.",
  robots: { index: false, follow: false }, // pre-launch: keep the preview out of search engines
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
