import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Level = "display" | "h1" | "h2" | "h3";

const levelClass: Record<Level, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  level?: Level;
};

export function Heading({ as: Tag = "h2", level = "h2", className, ...rest }: HeadingProps) {
  return <Tag className={cn("font-heading font-medium", levelClass[level], className)} {...rest} />;
}

export function Eyebrow({ className, ...rest }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-eyebrow font-semibold uppercase text-sand-deep", className)} {...rest} />;
}

type TextProps = ComponentPropsWithoutRef<"p"> & { size?: "sm" | "base" | "lg"; muted?: boolean };

export function Text({ size = "base", muted = false, className, ...rest }: TextProps) {
  return (
    <p
      className={cn(
        size === "sm" && "text-sm leading-relaxed",
        size === "base" && "text-base leading-relaxed",
        size === "lg" && "text-lg leading-relaxed",
        muted && "text-ink-muted",
        className,
      )}
      {...rest}
    />
  );
}
