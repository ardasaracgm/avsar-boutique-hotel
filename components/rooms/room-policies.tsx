import { BedSingle, Baby, Clock3, Coffee, DoorOpen, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { hotel } from "@/data/hotel";
import { cn } from "@/lib/cn";

/** Facts that apply to every room type (data/hotel.ts + roomPolicies). */
export function RoomPolicies({ className }: { className?: string }) {
  const t = useTranslations("roomsPage");
  const items = [
    { Icon: Clock3, text: t("policies.checkIn", { time: hotel.property.checkIn.value }) },
    { Icon: DoorOpen, text: t("policies.checkOut", { time: hotel.property.checkOut.value }) },
    { Icon: Coffee, text: t("policies.breakfast") },
    { Icon: BedSingle, text: t("policies.capacity") },
    { Icon: Sun, text: t("policies.balcony") },
    { Icon: Baby, text: t("policies.children") },
  ];

  return (
    <section aria-labelledby="policies-title" className={cn("border border-navy/10 bg-white p-6 sm:p-8", className)}>
      <h2 id="policies-title" className="font-heading text-h3">
        {t("policiesTitle")}
      </h2>
      <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ Icon, text }) => (
          <li key={text} className="flex items-start gap-3 text-sm leading-relaxed">
            <Icon aria-hidden className="mt-0.5 size-4.5 shrink-0 text-sand-deep" strokeWidth={1.5} />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
