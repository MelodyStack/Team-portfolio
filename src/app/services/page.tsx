import type { Metadata } from "next";
import {
  ArrowRight,
  Gauge,
  Layers,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/button";
import { CtaBlock } from "@/components/cta-block";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/section";
import { engagements, services, starterOffer } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web product engineering, commerce, mobile apps, integrations, performance and product design. Published prices, starting at a $1,900 plan or a single $3,900 sprint.",
  alternates: { canonical: "/services" },
};

const ICONS = {
  Layers,
  ShoppingBag,
  Smartphone,
  Workflow,
  Gauge,
  Sparkles,
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Six things we do, sized to what you can actually spend."
        lede="We are a product engineering team, not a full-service agency. We do not run your ads, write your blog or manage your brand. We build the software, and because most of the people reading this are founders paying out of their own pocket, every price below is the smallest real version of that work rather than the biggest."
      >
        <Button href="/contact" size="lg">
          Book a build review
        </Button>
      </PageHero>

      {/* Each service gets its own anchored block: the footer and homepage
          cards both deep-link here. */}
      {services.map((service, i) => {
        const Icon = ICONS[service.icon];

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn(
              "scroll-mt-28 border-b border-line-soft py-16 md:py-24",
              i % 2 === 1 && "bg-card",
            )}
          >
            <div className="shell">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
                <div>
                  <Reveal y={10}>
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-2xl border border-line bg-cream-2 text-ink">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="text-[0.8125rem] text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.05}>
                    <h2 className="headline mt-6 text-[clamp(1.8rem,3.8vw,2.8rem)]">
                      {service.title}
                    </h2>
                  </Reveal>

                  <Reveal delay={0.08}>
                    <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
                      {service.body}
                    </p>
                  </Reveal>

                  {/* The starting price always travels with the scope it
                      buys, so nobody arrives expecting a full build for the
                      entry figure. */}
                  <Reveal delay={0.12}>
                    <div className="mt-8 rounded-2xl bg-clay-soft/60 p-5">
                      <p className="flex flex-wrap items-baseline gap-x-2">
                        <span className="headline text-2xl text-clay-ink">
                          From {service.typical.from}
                        </span>
                        <span className="text-[0.9375rem] text-muted">
                          for {service.typical.entry}
                        </span>
                      </p>
                      <p className="mt-2 text-[0.8125rem] text-faint">
                        {service.typical.timeline}. Bigger scopes cost more; we
                        will tell you which you need.
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {service.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-line-soft bg-cream-2 px-3 py-1.5 text-[0.8125rem] text-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={0.1}>
                  <div className="border border-line bg-gradient-to-b from-surface/70 to-surface/20 p-7 md:p-9">
                    <p className="text-[0.8125rem] text-ink">
                      What you get
                    </p>

                    <ul className="mt-6 space-y-4">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex gap-3.5">
                          <ArrowRight
                            aria-hidden
                            className="mt-1 size-3.5 shrink-0 text-muted"
                          />
                          <span className="text-[0.9375rem] leading-relaxed text-muted">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* A fixed label, not "Discuss a {service.title} project":
                        buttons are whitespace-nowrap, so the longest service
                        name pushed this past a 375px viewport, and "a integrations & automation project" was never
                        grammatical anyway. */}
                    <Button
                      href="/contact"
                      variant="secondary"
                      className="mt-8 w-full sm:w-auto"
                    >
                      Discuss a project
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* Honesty section. Naming what we don't do makes everything above it
          more believable, and filters out the enquiries we'd have to decline. */}
      <Section className="border-b border-line-soft">
        <SectionHead
          eyebrow="What we don't do"
          title="The work we will send elsewhere."
          lede="Saying this out loud costs us a few enquiries and saves everybody a wasted fortnight."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line-soft md:grid-cols-3">
          {[
            {
              t: "Paid media and SEO retainers",
              b: "We will build a site that is fast and crawlable. We will not run your campaigns, and the agencies who do both are usually better at one than the other.",
            },
            {
              t: "Equity instead of payment",
              b: "We will flex hard on how you pay, including sprint by sprint. We do not take equity in place of a fee, because a team carrying your risk stops being able to tell you the inconvenient thing.",
            },
            {
              t: "Staff augmentation by headcount",
              b: "We take ownership of a surface and deliver it. We do not sell bodies by the hour into someone else's backlog, because nobody is accountable for the outcome in that arrangement.",
            },
          ].map((item, i) => (
            <Reveal
              key={item.t}
              delay={i * 0.06}
              className="bg-cream p-7 md:p-8"
            >
              <h3 className="text-[1.0625rem] font-medium text-ink">
                {item.t}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {item.b}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Commercial models, repeated here because this is the page a visitor
          lands on from search when they're comparing quotes. */}
      <Section>
        <SectionHead
          eyebrow="Commercials"
          title="Start at one sprint, or commission the whole thing."
          lede="Most founders who hire us start at the cheapest option on this page and work up. You are not expected to arrive with a six-figure budget."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {engagements.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 md:p-8",
                  plan.featured
                    ? "lift border-clay bg-clay-soft/50"
                    : "border-line bg-card",
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-clay px-3 py-1 text-[0.75rem] font-semibold text-on-teal">
                    Where most founders start
                  </span>
                )}
                <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
                <p className="headline mt-3 text-[2rem] text-clay-ink">
                  {plan.price}
                </p>
                <p className="mt-1 text-[0.8125rem] text-faint">
                  {plan.cadence}
                </p>
                <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {plan.body}
                </p>
                <p className="mt-6 border-t border-line-soft pt-5 text-[0.9375rem] text-ink">
                  {plan.best}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The smallest thing we sell, for anyone still not ready. */}
        <Reveal delay={0.1}>
          <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 rounded-3xl border border-line bg-cream-2 p-7 md:p-9 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Not ready for any of that?</p>
              <h3 className="headline mt-4 text-2xl text-ink">
                {starterOffer.name}, {starterOffer.price}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {starterOffer.body}
              </p>
              <Button href="/contact" variant="ghost" size="md" className="mt-5">
                Ask about an audit
              </Button>
            </div>

            <ul className="space-y-3.5 lg:pt-10">
              {starterOffer.points.map((point) => (
                <li key={point} className="flex gap-3.5">
                  <ArrowRight
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-clay"
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-muted">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <CtaBlock />
    </>
  );
}
