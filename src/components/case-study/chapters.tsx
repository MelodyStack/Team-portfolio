import { Reveal } from "@/components/reveal";
import type { Chapter } from "@/lib/projects";

/** Human labels for the three chapter kinds, in narrative order. */
const LABELS: Record<Chapter["kind"], string> = {
  problem: "The problem",
  approach: "What we did",
  outcome: "The outcome",
};

/**
 * The case study body.
 *
 * One chapter per movement of the story: problem, approach, outcome. The
 * numbering and labels come from the data's order rather than being authored,
 * so a case study cannot end up with two "approach" headings numbered 02.
 */
export function Chapters({ chapters }: { chapters: readonly Chapter[] }) {
  return (
    <div className="divide-y divide-line-soft">
      {chapters.map((chapter, i) => (
        <article key={chapter.title} className="py-14 first:pt-0 md:py-20">
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[auto_1fr]">
            {/* Chapter rail. Sticks while its own text scrolls past. */}
            <Reveal y={0} className="lg:w-44">
              <div className="lg:sticky lg:top-28">
                <span className="text-[0.8125rem] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-[0.8125rem] text-ink">
                  {LABELS[chapter.kind]}
                </p>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h2 className="headline max-w-3xl text-[clamp(1.6rem,3.2vw,2.35rem)]">
                  {chapter.title}
                </h2>
              </Reveal>

              <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-8 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
                <div>
                  {chapter.body.map((para, pi) => (
                    <Reveal key={pi} delay={0.05 + pi * 0.04}>
                      <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.75] text-muted first:mt-0">
                        {para}
                      </p>
                    </Reveal>
                  ))}

                  {chapter.points && (
                    <Reveal delay={0.12}>
                      <ul className="mt-8 space-y-3 border-l border-line pl-6">
                        {chapter.points.map((point) => (
                          <li
                            key={point}
                            className="relative text-[0.9375rem] leading-relaxed text-ink/85"
                          >
                            <span
                              aria-hidden
                              className="absolute top-[0.6em] -left-[1.65rem] size-1.5 bg-clay"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  )}

                  {chapter.shift && (
                    <Reveal delay={0.15}>
                      <div className="mt-9 flex flex-wrap items-end gap-8 rounded-2xl border border-line bg-card p-6">
                        <div>
                          <p className="text-[0.8125rem] text-faint">
                            Before
                          </p>
                          <p className="headline mt-2 text-3xl text-muted line-through decoration-line decoration-1">
                            {chapter.shift.before}
                          </p>
                        </div>
                        <div>
                          <p className="text-[0.8125rem] text-muted">
                            After
                          </p>
                          <p className="headline mt-2 text-4xl text-ink">
                            {chapter.shift.after}
                          </p>
                        </div>
                        <p className="w-full text-[0.8125rem] text-faint md:w-auto">
                          {chapter.shift.label}
                        </p>
                      </div>
                    </Reveal>
                  )}
                </div>

                {chapter.aside && (
                  <Reveal delay={0.18}>
                    <aside className="border border-line bg-gradient-to-b from-surface/70 to-surface/30 p-6">
                      <p className="text-[0.8125rem] text-ink">
                        {chapter.aside.title}
                      </p>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                        {chapter.aside.body}
                      </p>
                    </aside>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
