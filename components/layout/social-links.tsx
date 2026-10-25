import { hotel } from "@/data/hotel";
import { cn } from "@/lib/cn";

const labels = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube" } as const;

/** Renders only accounts that exist in `hotel.social` (currently none → renders nothing). */
export function SocialLinks({ className }: { className?: string }) {
  const accounts = (Object.keys(labels) as (keyof typeof labels)[]).filter((k) => hotel.social[k]);
  if (accounts.length === 0) return null;

  return (
    <ul className={cn("flex gap-4", className)}>
      {accounts.map((k) => (
        <li key={k}>
          <a href={hotel.social[k]!} target="_blank" rel="noopener" className="text-sm text-ivory/75 hover:text-ivory">
            {labels[k]}
          </a>
        </li>
      ))}
    </ul>
  );
}
