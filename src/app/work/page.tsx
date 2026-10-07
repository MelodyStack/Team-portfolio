import type { Metadata } from "next";
import { CtaBlock } from "@/components/cta-block";
import { PageHero } from "@/components/page-hero";
import { ProjectGrid } from "@/components/project-grid";
import { Section } from "@/components/section";
import { apps } from "@/lib/apps";
import { builds } from "@/lib/builds";
import { projects } from "@/lib/projects";
import { spellNumber } from "@/lib/utils";

/* Case studies plus store-published apps. Derived, so adding either kind of
   work updates the copy instead of quietly making it wrong. */
const total = projects.length + builds.length + apps.length;

export const metadata: Metadata = {
  title: "Work",
  description: `${total} shipped products: mobile apps on both stores, headless storefronts, booking platforms, real-time betting, listing portals and 3D configurators. Every one is live and linked.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  /* Anything a visitor can actually open: a live URL, a store listing, or an
     outbound link such as a verified contract. */
  const linked =
    projects.filter((p) => p.live || p.links?.length).length +
    builds.filter((b) => b.live || b.links?.length).length +
    apps.length;

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={`${spellNumber(total, true)} products. All of them live.`}
        lede="Mobile apps on both stores, storefronts, booking engines, SaaS platforms, marketplaces, exchanges and dApps, built for brands and operators across three continents. Case studies open a full write-up; everything else links straight to the running product, with our role stated on the card."
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-5">
          {[
            { k: "Case studies", v: String(projects.length) },
            { k: "Shipped builds", v: String(builds.length) },
            { k: "Apps on the stores", v: String(apps.length) },
            { k: "Live and linked", v: String(linked) },
            {
              k: "Platforms",
              v: "Next.js, React, Vue, Nuxt, Laravel, React Native, Shopify, WordPress, Solidity",
            },
          ].map((item) => (
            <div key={item.k}>
              <dt className="text-[0.8125rem] text-faint">
                {item.k}
              </dt>
              <dd className="mt-1.5 text-[0.9375rem] text-ink">{item.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Tighter top than the default section rhythm: the masthead above
          already has 5rem of its own bottom padding, and stacking both leaves
          a dead screen between the lede and the first card.

          Apps go through the same grid as the case studies. Keeping them in a
          separate section below meant the "Mobile app" filter read 1 while
          seven more apps sat further down the page, which undersold the work.
          The contributing-engineer credit lives on the card instead. */}
      <Section tightTop>
        <ProjectGrid projects={projects} apps={apps} builds={builds} />
      </Section>

      <CtaBlock />
    </>
  );
}
