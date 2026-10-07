import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  Layers,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Accordion } from "@/components/accordion";
import { AppShelf } from "@/components/app-shelf";
import { Button } from "@/components/button";
import { CtaBlock } from "@/components/cta-block";
import { Hero } from "@/components/hero";
import { ClientMarquee } from "@/components/marquee";
import { MemberAvatar } from "@/components/member-icon";
import { ProcessTimeline } from "@/components/process-timeline";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/section";
import { SocialProof } from "@/components/social-proof";
import { apps } from "@/lib/apps";
import { builds } from "@/lib/builds";
import { projects } from "@/lib/projects";
import {
  engagements,
  faqs,
  principles,
  services,
  situations,
  team,
} from "@/lib/site";
import { cn, spellNumber } from "@/lib/utils";

const ICONS = {
  Layers,
  ShoppingBag,
  Smartphone,
  Workflow,
  Gauge,
  Sparkles,
} as const;

/* Four on the homepage: enough to prove range, few enough that a visitor
   reaches the next section instead of bouncing off a wall of cards. Picked to
   span the range rather than to be the four prettiest: a 3D configurator, a
   real-time platform, a fintech funnel and an app we own.

   Client work leads. Our own product is real and it belongs here, but opening
   with it reads as a side project rather than as a track record, and `beond`
   is deliberately absent because it is already the hero image directly above. */
const SHOWCASE = [
  "the-future-of-jewelry",
  "thunderpick",
  "one-park-financial",
  "playbyplay-anime",
];

/** Everything shippable, so the headline counts can't drift from the data. */
const total = projects.length + builds.length + apps.length;

export default function HomePage() {
  const showcase = SHOWCASE.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <Hero />

      {/* ── Proof, immediately. The numbers now live inside the hero's
             inverted band, so this is just the client names. ───────────── */}
      <ClientMarquee label="Shipped for" />

      {/* ── Situation matching. Lets the visitor self-identify. ────────── */}
      <Section id="situations">
        <SectionHead
          index="01"
          eyebrow="Who hires us"
          title="You are probably in one of four situations."
          lede="We have been on the other side of each of these. Find yours and you will know within a paragraph whether we are the right team to call."
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line-soft md:grid-cols-2">
          {situations.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.06}
              className="group relative bg-cream p-7 transition-colors duration-500 hover:bg-card md:p-9"
            >
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-clay transition-transform duration-300 ease-out group-hover:scale-x-100" />

              <span className="text-[0.8125rem] text-muted">
                {item.tag}
              </span>

              <h3 className="mt-4 text-xl font-medium tracking-[-0.015em] text-ink md:text-[1.4rem]">
                {item.title}
              </h3>

              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Services. ──────────────────────────────────────────────────── */}
      <Section id="services" className="border-t border-line-soft">
        <SectionHead
          index="02"
          eyebrow="What we build"
          title="Six things, done properly."
          lede="We are not a full-service agency and we do not pretend to be. These are the six areas where we have shipped enough to carry the risk of an estimate."
          aside={
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                Every price below is the smallest real version of that work,
                not the biggest. Most founders start with one sprint and buy
                the next only if the first one was worth it.
              </p>
              <Button
                href="/services"
                variant="ghost"
                size="md"
                className="mt-4"
              >
                Full capability breakdown
              </Button>
            </div>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-all duration-200 ease-out hover:-translate-y-1 lift hover:lift"
                >
                  <span className="grid size-11 place-items-center rounded-2xl border border-line bg-cream-2 text-ink transition-colors duration-500 group-hover:border-line group-hover:bg-clay">
                    <Icon className="size-5" aria-hidden />
                  </span>

                  <h3 className="mt-6 text-lg font-medium tracking-[-0.01em] text-ink">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                    {service.summary}
                  </p>

                  {/* The entry price, not the typical one. A founder scanning
                      the homepage decides whether to keep reading on this
                      number alone. */}
                  <div className="mt-6 border-t border-line-soft pt-5">
                    <span className="text-[0.9375rem] font-semibold text-clay-ink">
                      From {service.typical.from}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-faint">
                      for {service.typical.entry}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── Selected work. ─────────────────────────────────────────────── */}
      <Section id="work" className="border-t border-line-soft">
        <SectionHead
          index="03"
          eyebrow="Selected work"
          title="Every one of these is live. Open them."
          lede={`${spellNumber(total, true)} shipped products: apps on both stores, storefronts, booking platforms, real-time systems and configurators. The links go to the running products, not to a slide about them.`}
          aside={
            <div className="flex lg:justify-end">
              <Button href="/work" variant="secondary" size="lg">
                All {total} products
              </Button>
            </div>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {showcase.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 0.06}
              className={cn(i === 0 && "md:col-span-2")}
            >
              <ProjectCard project={project} wide={i === 0} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Apps. Separate from the grid above because the credit is
             different: contributing engineer, not product owner. ────────── */}
      <Section id="apps" className="border-t border-line-soft">
        <SectionHead
          index="04"
          eyebrow="On the app stores"
          title={`And another ${spellNumber(apps.length)} apps you can download now.`}
          lede="Client apps we contributed mobile engineering to, built in React Native and Flutter for iOS and Android. Not ours end to end, which is why they sit here rather than in the case studies above."
          aside={
            <div className="flex lg:justify-end">
              <Button href="/work#apps" variant="secondary" size="lg">
                Every app and what we built
              </Button>
            </div>
          }
        />

        <div className="mt-14">
          <AppShelf limit={3} />
        </div>
      </Section>

      {/* ── Why us. Differentiators as plain assertions. ───────────────── */}
      <Section id="principles" className="border-t border-line-soft">
        <SectionHead
          index="05"
          eyebrow="How we are different"
          title={
            <>
              Six commitments we will put{" "}
              <span className="text-ink">
                in the contract
              </span>
              .
            </>
          }
          lede="Every agency claims to be senior, communicative and transparent. These are the versions of those claims that are specific enough to hold us to."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
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

      {/* ── Process. ───────────────────────────────────────────────────── */}
      <Section id="process" className="border-t border-line-soft">
        <SectionHead
          index="06"
          eyebrow="How it runs"
          title="From first call to live, with an exit at every step."
          lede="The thing that actually worries a founder is not the price. It is paying for something that never ships. So here is exactly what happens, what you get at each stage, and where you can stop."
        />

        <ProcessTimeline />

        <Reveal>
          <div className="rounded-2xl border border-line bg-card p-7 md:p-9">
            <p className="max-w-3xl text-[1.0625rem] leading-relaxed text-ink/90">
              <span className="text-2xl text-ink">“</span>
              If at any point you want to take the project in-house or hand it
              to another team, everything you need is already in your accounts.
              That is not a concession we make at the end. It is the setup from the first commit.
              <span className="text-2xl text-ink">”</span>
            </p>
            <Button
              href="/process"
              variant="ghost"
              size="md"
              className="mt-5"
            >
              Read the full process
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ── Engagement models and prices. ──────────────────────────────── */}
      <Section id="engagements" className="border-t border-line-soft">
        <SectionHead
          index="07"
          eyebrow="How to work with us"
          title="You can start with one sprint."
          lede="Published on purpose, cheapest first. You do not need a funding round to work with us, and most of the founders who do start at the smallest option here and work up."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {engagements.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.07}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-colors duration-500 md:p-8",
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

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="headline text-[2rem] text-clay-ink">
                    {plan.price}
                  </span>
                </div>
                <p className="mt-1 text-[0.8125rem] text-faint">
                  {plan.cadence}
                </p>

                <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                  {plan.body}
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-line-soft pt-6">
                  {plan.includes.map((line) => (
                    <li key={line} className="flex gap-3 text-[0.9375rem]">
                      <ArrowRight
                        aria-hidden
                        className="mt-1 size-3.5 shrink-0 text-muted"
                      />
                      <span className="text-muted">{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-line-soft pt-6">
                  <p className="text-[0.8125rem] text-faint">
                    Best for
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] text-ink">{plan.best}</p>
                </div>

                <Button
                  href="/contact"
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  Start here
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Team. Short version; the full roster is at /team. ──────────── */}
      <Section id="team" className="border-t border-line-soft">
        <SectionHead
          index="08"
          eyebrow="The team"
          title={`${spellNumber(team.length, true)} people. You will know all of their names.`}
          lede="No bench, no outsourcing, no bait-and-switch after the contract is signed. The people on your kickoff call are the people writing the code."
          aside={
            <div className="flex lg:justify-end">
              <Button href="/team" variant="secondary" size="lg">
                Meet the team
              </Button>
            </div>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line-soft sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal
              key={member.role}
              delay={i * 0.05}
              className="group bg-cream p-7 transition-colors duration-500 hover:bg-card"
            >
              <div className="flex items-center gap-4">
                <MemberAvatar member={member} size="sm" />
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{member.name}</p>
                  <p className="truncate text-[0.8125rem] text-faint">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                {member.focus}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Social proof. Real quotes when there are any, shipped client
             work you can open when there are not. ─────────────────────── */}
      <SocialProof index="09" className="border-t border-line-soft" />

      {/* ── FAQ: the objections that stop the email being sent. ────────── */}
      <Section id="faq" className="border-t border-line-soft">
        <SectionHead
          index="10"
          eyebrow="Before you ask"
          title="The questions founders actually ask."
          lede="Including the awkward ones. If your question is not here, ask it on the call. We will answer it the same way."
        />

        <div className="mt-12">
          <Accordion items={faqs} />
        </div>
      </Section>

      <CtaBlock />
    </>
  );
}
