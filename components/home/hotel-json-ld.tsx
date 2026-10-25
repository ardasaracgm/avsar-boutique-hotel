import { useTranslations } from "next-intl";
import { hotel } from "@/data/hotel";
import { siteUrl } from "@/lib/site";

const amenityNames: Partial<Record<(typeof hotel.facilities.general)[number], string>> = {
  wifi: "Free Wi-Fi",
  elevator: "Elevator",
  airConditioning: "Air conditioning",
  reception24h: "24-hour front desk",
  freeParking: "Free parking",
  valetParking: "Valet parking",
};

/** schema.org Hotel — built only from data/hotel.ts facts. */
export function HotelJsonLd({ url }: { url: string }) {
  const t = useTranslations("meta");
  const { address, contact, property, facilities } = hotel;

  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    url,
    description: t("description"),
    telephone: contact.phone.tel,
    email: contact.email.value,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.district,
      addressRegion: address.city,
      addressCountry: address.country,
    },
    geo: address.geo.value
      ? { "@type": "GeoCoordinates", latitude: address.geo.value.lat, longitude: address.geo.value.lng }
      : undefined,
    hasMap: address.mapsUrl,
    checkinTime: property.checkIn.value,
    checkoutTime: property.checkOut.value,
    numberOfRooms: property.totalRooms.value,
    amenityFeature: [
      ...facilities.general
        .filter((f) => amenityNames[f])
        .map((f) => ({ "@type": "LocationFeatureSpecification", name: amenityNames[f], value: true })),
      { "@type": "LocationFeatureSpecification", name: "Outdoor pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
      { "@type": "LocationFeatureSpecification", name: "Breakfast included", value: true },
    ],
    potentialAction: { "@type": "ReserveAction", target: hotel.booking.baseUrl },
    sameAs: Object.values(hotel.social).filter(Boolean),
    // TODO: add `image` (absolute hero photo URL) and `logo` once the files exist.
    "@id": `${siteUrl}/#hotel`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
