import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type Props = {
  /** Mono label above the title, e.g. "What we build". */
  eyebrow?: string;
  /** Two-digit index, rendered as a large ghosted numeral beside the title. */
  index?: string;
  title: ReactNode;
  /** Intro paragraph under the title. */
  lede?: ReactNode;
  /** Pinned to the right of the heading on wide screens. */
  aside?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * The heading block every section opens with.
 *
 * Centralised because consistency here is most of what makes a long page look
 * composed rather than assembled: same eyebrow, same rule, same measure on the
 * lede, every time.
 *
 * The section number is set large and ghosted rather than as a small label.
 * At this scale it works as a structural mark that helps a visitor track how
 * far down a long page they are.
 */
export function SectionHead({
  eyebrow,
  index,
  title,
  lede,
  aside,
  align = "left",
  className,
}: Props) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      {/* No rule under the eyebrow: on a warm page the label and heading
          should read as one block, and a divider here makes every section
          look like the top of a table. */}
      <Reveal y={10}>
        <div
          className={cn("flex items-center gap-4", centered && "justify-center")}
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {index && (
            <span className="text-[0.8125rem] text-faint tabular-nums">
              {index}
            </span>
          )}
        </div>
      </Reveal>

      <div
        className={cn(
          "mt-5 gap-x-16 gap-y-8",
          aside && !centered && "lg:grid lg:grid-cols-[1.15fr_0.85fr]",
        )}
      >
        <div>
          <Reveal delay={0.05}>
            <h2
              className={cn(
                "headline text-[clamp(1.9rem,4vw,3rem)] text-balance",
                centered && "mx-auto max-w-4xl",
              )}
            >
              {title}
            </h2>
          </Reveal>

          {lede && (
            <Reveal delay={0.1}>
              <p
                className={cn(
                  "mt-6 max-w-2xl text-[1.0625rem] leading-[1.6] text-muted",
                  centered && "mx-auto",
                )}
              >
                {lede}
              </p>
            </Reveal>
          )}
        </div>

        {aside && (
          <Reveal delay={0.15} className={cn(centered && "mt-6")}>
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  );
}

/**
 * Standard vertical rhythm for a page section.
 *
 * `tightTop` is a prop rather than something a caller patches with `pt-*`,
 * because `py-20` and `pt-14` both resolve to padding-top at equal specificity
 * and which one wins would come down to stylesheet order.
 */
export function Section({
  children,
  className,
  id,
  tightTop = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Use when a PageHero directly above already supplies the top space. */
  tightTop?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        tightTop
          ? "pt-12 pb-20 md:pt-14 md:pb-28"
          : "py-20 md:py-24 lg:py-28",
        className,
      )}
    >
      <div className="shell">{children}</div>
    </section>
  );
}
