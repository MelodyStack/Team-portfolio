import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/button";
import { CtaBlock } from "@/components/cta-block";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/section";
import { SocialProof } from "@/components/social-proof";
import { MemberAvatar } from "@/components/member-icon";
import { contact, team } from "@/lib/site";
import { spellNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Team",
  description:
    "A lead engineer, three full-stack engineers leaning frontend, backend and mobile, plus ecommerce, QA and design. The people on your kickoff call are the people writing the code.",
  alternates: { canonical: "/team" },
};

/* No years figures anywhere on this page. They were never confirmed for most
   of the roster, and a mix of real and estimated numbers is worse than none:
   it makes the estimated ones look verified. */

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="The team"
        title="A small team of senior people, and no bench."
        lede={`${spellNumber(team.length, true)} core disciplines. You will meet everyone who touches your project, and they stay on it until it is live.`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/contact" size="lg">
            Book a build review
          </Button>
          <Button
            href={`mailto:${contact.email}`}
            variant="secondary"
            size="lg"
            arrow={false}
          >
            {contact.email}
          </Button>
        </div>
      </PageHero>

      <Section tightTop className="border-b border-line-soft">
        <SectionHead
          eyebrow="Who you work with"
          title={`${spellNumber(team.length, true)} disciplines, one room.`}
          lede="We staff a project with the disciplines it needs rather than with whoever is free. If your build does not need a mobile engineer, you are not paying for one."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.role} delay={i * 0.05}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-all duration-200 ease-out hover:-translate-y-1 lift hover:lift">
                <MemberAvatar member={member} />

                <h2 className="headline mt-6 text-xl text-ink">
                  {member.name}
                </h2>
                <p className="mt-1 text-[0.9375rem] font-medium text-clay-ink">
                  {member.role}
                </p>

                <p className="mt-4 flex-1 text-[0.9375rem] leading-[1.6] text-muted">
                  {member.focus}
                </p>

                {/* Profiles as pills rather than one labelled link: people
                    carry different numbers of them, and for an engineer a
                    GitHub or Stack Overflow page is better evidence than a
                    LinkedIn profile anyway. */}
                {member.links && member.links.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-line-soft pt-5">
                    {member.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.8125rem] font-medium text-muted transition-colors hover:border-clay hover:text-clay-ink"
                        >
                          {link.label}
                          <ArrowUpRight className="size-3.5" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Culture, framed as what it means for the client rather than as
          perks nobody outside the team cares about. */}
      <Section className="border-b border-line-soft">
        <SectionHead
          eyebrow="How the team runs"
          title={`Why a team of ${spellNumber(team.length)} beats an agency of eighty.`}
          lede="Not a slogan: these are the structural reasons, and they are the same reasons a big agency cannot match them."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line-soft md:grid-cols-2">
          {[
            {
              t: "No layer between you and the work",
              b: "At this size there is nobody whose job is to translate. You talk to the engineer, the engineer talks to you, and nothing gets lost in a weekly status call.",
            },
            {
              t: "Everyone knows the whole codebase",
              b: "Small enough that any one of us can pick up any part of your project. If someone is ill the week before launch, it is an inconvenience rather than a crisis.",
            },
            {
              t: "We only take work we can staff",
              b: "This is why the header of this site says how many slots are open rather than inviting everyone in. Overcommitting is how agencies end up putting juniors on a senior project.",
            },
            {
              t: "One timezone band, deliberately",
              b: "Core hours that overlap European and US Eastern working days. You get same-day answers instead of a 12-hour round trip on every question.",
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

      <SocialProof />

      <CtaBlock />
    </>
  );
}
