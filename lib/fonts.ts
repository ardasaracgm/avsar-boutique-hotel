import localFont from "next/font/local";

// Self-hosted (subset: Latin, Latin Extended incl. Turkish, Cyrillic). No request to Google Fonts,
// which keeps the site KVKK/GDPR-friendly and the build independent of external services.
export const headingFont = localFont({
  src: "../app/fonts/CormorantGaramond-Variable.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const bodyFont = localFont({
  src: "../app/fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});
