import { hotel } from "@/data/hotel";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/** Text wordmark until the real logo files arrive. TODO: replace with SVG logo. */
export function Wordmark({ tone = "dark", compact = false, className }: { tone?: "dark" | "light"; compact?: boolean; className?: string }) {
  const subtitle = hotel.name.replace(hotel.shortName, "").trim(); // "Boutique Hotel"
  return (
    <Link
      href="/"
      className={cn("inline-flex flex-col items-start leading-none", tone === "dark" ? "text-navy" : "text-ivory", className)}
    >
      <span
        className={cn(
          "font-heading font-medium uppercase tracking-[0.14em] transition-[font-size] duration-300",
          compact ? "text-2xl" : "text-[1.75rem] sm:text-3xl",
        )}
      >
        {hotel.shortName}
      </span>{" "}
      <span lang="en" className="mt-1 whitespace-nowrap text-[0.5625rem] font-semibold uppercase tracking-[0.42em] opacity-80">
        {subtitle}
      </span>
    </Link>
  );
}
