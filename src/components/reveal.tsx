import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Stagger siblings by passing an increasing value, in seconds. */
  delay?: number;
  /** Travel distance in px. 0 fades without moving. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span" | "article";
};

/**
 * Fade-and-rise on first scroll into view.
 *
 * A *server* component: it only emits a class and two custom properties. All
 * the observing is done once, globally, by <RevealObserver /> in the layout.
 *
 * It works this way rather than with a motion library for one reason: a
 * library's scroll reveal server-renders its elements at `opacity: 0` and
 * relies on hydration to bring them back. On a slow connection, or if a chunk
 * fails, that leaves every section below the hero blank, on a page whose
 * entire job is to be read. Here the hidden start state is scoped to `.js` on
 * <html>, so no-JS and pre-hydration both render fully visible, and the
 * animation is a pure enhancement.
 *
 * prefers-reduced-motion is handled in CSS, so it cannot be defeated by a
 * hook that reports the wrong value on the first render.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as: Tag = "div",
}: Props) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={
        {
          "--reveal-d": `${Math.round(delay * 1000)}ms`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
