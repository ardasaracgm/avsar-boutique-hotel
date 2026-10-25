import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Props<T extends ElementType> = { as?: T; size?: "default" | "narrow" } & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({ as, size = "default", className, ...rest }: Props<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-10",
        size === "default" ? "max-w-(--container-site)" : "max-w-3xl",
        className,
      )}
      {...rest}
    />
  );
}
