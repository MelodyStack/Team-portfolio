import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * Masthead for interior pages.
 *
 * Deliberately shallower than the homepage hero: an interior page should
 * start delivering content within one screen, not re-pitch the studio. No
 * hard rules, so it flows into the content below rather than being fenced
 * off from it.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Buttons, meta rows, anything that belongs under the lede. */
  children?: ReactNode;
}) {
  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="shell">
        <Reveal y={8}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.25rem)]">
            {title}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-[1.65] text-muted">
              {lede}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={0.15}>
            <div className="mt-9">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
