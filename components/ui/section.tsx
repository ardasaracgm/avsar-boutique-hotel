import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentPropsWithoutRef<"section"> & {
  tone?: "ivory" | "white" | "navy";
  spacing?: "default" | "compact" | "none";
};

const tones = {
  ivory: "bg-ivory text-navy",
  white: "bg-white text-navy",
  navy: "bg-navy text-ivory",
};

const spacings = {
  default: "py-20 sm:py-24 lg:py-32",
  compact: "py-12 sm:py-16",
  none: "",
};

export function Section({ tone = "ivory", spacing = "default", className, ...rest }: Props) {
  return <section className={cn(tones[tone], spacings[spacing], className)} {...rest} />;
}
