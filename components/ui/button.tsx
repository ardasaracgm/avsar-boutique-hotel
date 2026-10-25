import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "outline-light" | "ghost";
export type ButtonSize = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2.5 font-sans font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ease-(--ease-elegant) disabled:pointer-events-none disabled:opacity-50 rtl:[&>svg]:-scale-x-100";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-navy text-ivory hover:bg-navy-soft",
  outline: "border border-sand-deep text-sand-deep hover:bg-sand-deep hover:text-ivory",
  "outline-light": "border border-ivory/70 text-ivory hover:bg-ivory hover:text-navy",
  ghost: "text-navy underline-offset-8 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-[0.6875rem]",
  md: "min-h-12 px-6 text-xs",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}

type CommonProps = { variant?: ButtonVariant; size?: ButtonSize; arrow?: boolean; children: ReactNode };

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />}
    </button>
  );
}

/** External link styled as a button (booking engine, WhatsApp, tel:). For internal routes use <ButtonLink> from `./button-link`. */
export function ButtonAnchor({
  variant,
  size,
  arrow,
  className,
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"a">) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />}
    </a>
  );
}
