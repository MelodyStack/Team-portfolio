import { Reveal } from "@/components/reveal";
import { process } from "@/lib/site";

/**
 * The engagement timeline.
 *
 * Framed as risk reduction rather than methodology: each step names what the
 * client receives and, where it applies, how they can stop. A founder's real
 * fear is not the price, it's paying for something that never arrives.
 *
 * The connecting line is a single absolutely-positioned gradient rather than a
 * border on each row, so it fades out at the end instead of stopping dead.
 */
export function ProcessTimeline() {
  return (
    <ol className="relative mt-14">
      <span
        aria-hidden
        className="absolute top-2 bottom-24 left-[1.4375rem] w-px bg-line-soft/25 md:left-[1.9375rem]"
      />

      {process.map((item, i) => (
        <Reveal as="li" key={item.step} delay={i * 0.05} className="relative">
          <div className="grid grid-cols-[3rem_1fr] gap-x-5 pb-12 md:grid-cols-[4rem_1fr] md:gap-x-8 md:pb-16">
            {/* Step marker. */}
            <div className="relative">
              <span className="grid size-12 place-items-center rounded-full border border-line bg-cream text-sm text-ink md:size-16 md:text-base">
                {item.step}
              </span>
            </div>

            <div className="pt-1.5 md:pt-3">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-xl font-medium tracking-[-0.015em] text-ink md:text-2xl">
                  {item.title}
                </h3>
                <span className="text-[0.8125rem] tracking-[0.1em] text-faint">
                  {item.duration}
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
                {item.body}
              </p>

              <div className="mt-4 inline-flex items-center gap-2.5 border border-line-soft bg-card py-1.5 pr-4 pl-3">
                <span className="size-1.5 bg-clay" />
                <span className="text-[0.8125rem] text-ink">
                  {item.deliverable}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
