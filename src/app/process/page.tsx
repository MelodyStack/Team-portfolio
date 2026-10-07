import type { Metadata } from "next";
import { Accordion } from "@/components/accordion";
import { Button } from "@/components/button";
import { CtaBlock } from "@/components/cta-block";
import { PageHero } from "@/components/page-hero";
import { ProcessTimeline } from "@/components/process-timeline";
import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/section";
import { faqs, principles } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How an engagement runs, from a free build review through a fixed-fee scoping sprint to two-week delivery increments and handover. With an exit at every stage.",
  alternates: { canonical: "/process" },
};

/**
 * Risk-reduction, in full.
 *
 * This page exists because the real blocker on a six-figure decision is not
 * price, it's the fear of paying for something that never arrives. Everything
 * here is framed around what the client receives and when they can stop.
 */
export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="The honest version of how a project runs."
        lede="Including the parts most agencies leave out: what happens when an estimate is wrong, how you can stop, and what you walk away with if you do."
      >
        <Button href="/contact" size="lg">
          Start with a build review
        </Button>
      </PageHero>

      <Section tightTop className="border-b border-line-soft">
        <SectionHead
          eyebrow="The sequence"
          title="Six stages. Two of them are free or fixed-fee."
          lede="You find out whether we are any good before the expensive part begins. That ordering is deliberate. It is the only way a founder can reasonably commit to a build with a team they have not worked with."
        />

        <ProcessTimeline />
      </Section>

      {/* The questions that normally go unanswered until a contract review. */}
      <Section className="border-b border-line-soft">
        <SectionHead
          eyebrow="When things go wrong"
          title="Estimates are wrong sometimes. Here is what happens then."
          lede="Any team telling you their estimates are always right is either inexperienced or not being straight with you."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line-soft md:grid-cols-2">
          {[
            {
              t: "We underestimated",
              b: "On a fixed-scope milestone, the overrun is ours. We quoted it, we carry it. What we will not do is quietly absorb it by shipping something worse than we agreed. If the only honest options are more time or less scope, you will hear both and choose.",
            },
            {
              t: "The scope changed",
              b: "Normal, and usually a sign you learned something. We re-estimate the affected milestone in writing before any new work starts, so there is never a surprise invoice. Nothing gets built on a verbal 'while you're in there'.",
            },
            {
              t: "A dependency failed",
              b: "A payment provider changes an API, a client's legacy system is not what the documentation claims. We flag it the day we find it with options and costs attached, rather than burning a sprint hoping it resolves itself.",
            },
            {
              t: "You want to stop",
              b: "Monthly contracts take 30 days' notice; milestone contracts end at the current milestone. You keep everything built to that point, in your own repository, with the documentation written so far. There is no exit fee and nothing to negotiate.",
            },
          ].map((item, i) => (
            <Reveal
              key={item.t}
              delay={i * 0.06}
              className="bg-cream p-7 md:p-9"
            >
              <h3 className="text-lg font-medium text-ink">{item.t}</h3>
              <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-muted">
                {item.b}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-b border-line-soft">
        <SectionHead
          eyebrow="Working principles"
          title="How we behave when nobody is watching."
          lede="These are the ones we will put in the contract, which is the only meaningful test of a principle."
        />

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="flex gap-5">
                <span className="mt-1 text-[0.8125rem] text-muted tabular-nums">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Before you ask"
          title="The awkward questions, answered."
        />

        <div className="mt-12">
          <Accordion items={faqs} />
        </div>
      </Section>

      <CtaBlock />
    </>
  );
}
