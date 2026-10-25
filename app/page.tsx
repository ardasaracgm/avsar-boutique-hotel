import { hotel } from "@/data/hotel";
import { bookingHomeUrl } from "@/lib/booking";

// Temporary page to verify the GitHub → Vercel pipeline. Replaced in Phase 1.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-sand">Antalya · Lara</p>
      <h1 className="font-heading text-5xl sm:text-6xl">{hotel.name}</h1>
      <p className="max-w-md text-navy/70">Yeni web sitemiz hazırlanıyor.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={bookingHomeUrl("tr")}
          className="bg-navy px-6 py-3 text-sm tracking-widest uppercase text-ivory hover:bg-navy/90"
        >
          Rezervasyon
        </a>
        <a href={`tel:${hotel.contact.phone.tel}`} className="border border-navy px-6 py-3 text-sm tracking-widest uppercase">
          {hotel.contact.phone.display}
        </a>
      </div>
    </main>
  );
}
