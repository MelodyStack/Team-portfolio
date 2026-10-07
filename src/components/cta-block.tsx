import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { brand, contact, cta } from "@/lib/site";

/**
 * The closing call to action, reused at the bottom of most pages.
 *
 * A deep teal card inset from the page edges rather than a full-bleed band:
 * on a warm layout, giving it rounded corners and letting cream show around
 * it keeps it reading as an invitation instead of a footer.
 *
 * The numbered "what happens next" list is the part that does the work. The
 * reason a founder doesn't send the email is usually uncertainty about what
 * they're committing to, not price. Spelling out all four steps removes it.
 */
export function CtaBlock() {
  return (
    <section className="py-20 md:py-24">
      <div className="shell">
        <div className="teal-block lift-lg relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
          {/* Warm glow in the corner, so the dark card still feels warm. */}
          <div
            aria-hidden
            className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-clay/15 blur-[120px]"
          />

          <div className="relative grid grid-cols-1 gap-x-16 gap-y-12 p-8 md:p-14 lg:grid-cols-[1.15fr_0.85fr] lg:p-16">
            <div>
              <Reveal y={10}>
                <span className="inline-flex items-center gap-2.5 text-[0.8125rem] font-semibold text-clay-200">
                  <span className="size-1.5 rounded-full bg-clay-200" />
                  {cta.eyebrow}
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.25rem)] text-on-teal">
                  {cta.title}
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.65] text-on-teal-muted">
                  {cta.body}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button
                    href="/contact"
                    size="lg"
                    className="bg-clay text-on-teal hover:bg-clay-ink"
                  >
                    Book a build review
                  </Button>
                  <Button
                    href={`mailto:${contact.email}`}
                    variant="onTeal"
                    size="lg"
                    arrow={false}
                  >
                    {contact.email}
                  </Button>
                </div>
              </Reveal>

              {brand.availability.open && (
                <Reveal delay={0.2}>
                  <p className="mt-7 flex items-center gap-2.5 text-[0.9375rem] text-on-teal-muted">
                    <span className="relative grid size-2 place-items-center">
                      <span className="absolute size-2 animate-pulse-dot rounded-full bg-clay-200" />
                      <span className="size-2 rounded-full bg-clay-200" />
                    </span>
                    {brand.availability.label} · {brand.availability.detail}
                  </p>
                </Reveal>
              )}
            </div>

            <Reveal delay={0.12}>
              <p className="text-[0.8125rem] font-semibold text-on-teal-muted">
                What happens next
              </p>

              <ol className="mt-5 space-y-5">
                {cta.steps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-on-teal/10 text-[0.8125rem] font-semibold text-clay-200">
                      {i + 1}
                    </span>
                    <span className="text-[0.9375rem] leading-[1.65] text-on-teal/90">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
