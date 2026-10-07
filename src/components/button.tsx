import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onTeal";
type Size = "md" | "lg";

/*
 * Pills with a soft tinted lift. The hover is a small rise rather than a
 * jump, which is the whole difference in feel between this and the hard
 * brutalist step it replaces.
 */
const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 text-[0.9375rem]",
  lg: "h-14 text-base",
};

/* Kept separate from `sizes` so the ghost variant can opt out of horizontal
   padding without a call site passing `px-0`: two padding utilities at equal
   specificity would leave the winner down to stylesheet order. */
const pads: Record<Size, string> = {
  md: "px-6",
  lg: "px-8",
};

const variants: Record<Variant, string> = {
  /* Deep teal rather than the accent: the accent is warm and friendly, but
     the primary action should read as solid and dependable. */
  primary:
    "bg-teal text-on-teal lift hover:-translate-y-0.5 hover:bg-teal-soft hover:shadow-[0_18px_40px_-16px_#0f3d3e66] active:translate-y-0",
  secondary:
    "border border-line bg-card text-ink hover:-translate-y-0.5 hover:border-clay hover:text-clay-ink active:translate-y-0",
  ghost:
    "font-semibold text-clay-ink underline decoration-clay/40 decoration-2 underline-offset-[6px] hover:decoration-clay",
  /* For use inside .teal-block sections. */
  onTeal:
    "border border-on-teal/30 bg-transparent text-on-teal hover:border-clay-200 hover:bg-clay-200 hover:text-teal",
};

type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Adds a nudging arrow. On by default for primary. */
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const showArrow = arrow ?? variant === "primary";

  /* Children go in as direct flex children rather than inside a wrapper
     span: callers pass their own icons alongside the label, and nesting them
     in one inline span lets the icon wrap onto a second line. */
  const inner = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      )}
    </>
  );

  const classes = cn(
    base,
    sizes[size],
    variant !== "ghost" && pads[size],
    variants[variant],
    className,
  );

  if (!href) {
    return (
      <button
        type={type}
        className={classes}
        disabled={disabled}
        onClick={onClick}
      >
        {inner}
      </button>
    );
  }

  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
