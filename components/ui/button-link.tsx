import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button";

type Props = ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize; arrow?: boolean };

/** Internal, locale-aware link styled as a button. */
export function ButtonLink({ variant, size, arrow, className, children, ...rest }: Props) {
  return (
    <Link className={buttonClasses({ variant, size, className: typeof className === "string" ? className : undefined })} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />}
    </Link>
  );
}
