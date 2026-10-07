"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppCard } from "@/components/app-card";
import { BuildCard } from "@/components/build-card";
import { ProjectCard } from "@/components/project-card";
import type { App } from "@/lib/apps";
import type { Build } from "@/lib/builds";
import type { Project, ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Every ProjectCategory must appear here or its projects become unreachable
 * from the filter row: they'd only ever show under "All".
 *
 * Ordered by what a visitor is most likely to be shopping for rather than
 * alphabetically: someone who wants an app wants to see apps first.
 */
const FILTERS: Array<"All" | ProjectCategory> = [
  "All",
  "Web platform",
  "Mobile app",
  "Shopify",
  "Headless Shopify",
  "WordPress",
  "Headless WordPress",
  "Blockchain",
];

/**
 * The grid holds two kinds of work. Case studies we shaped end to end, and
 * store-published apps we contributed engineering to.
 *
 * They share the grid because splitting them put one mobile product under the
 * "Mobile app" filter while seven more sat in a separate section further down
 * the same page, which read as though we had barely shipped any. The honesty
 * that justified the split is preserved on the card instead: an AppCard always
 * shows its role credit and links to the store rather than to a case study.
 */
type Item =
  | { kind: "project"; key: string; category?: ProjectCategory; project: Project }
  | { kind: "app"; key: string; category: ProjectCategory; app: App }
  | { kind: "build"; key: string; category: ProjectCategory; build: Build };

export function ProjectGrid({
  projects,
  apps = [],
  builds = [],
}: {
  projects: Project[];
  apps?: App[];
  builds?: Build[];
}) {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");

  const items = useMemo<Item[]>(() => {
    const fromProjects: Item[] = projects.map((project) => ({
      kind: "project",
      key: `project-${project.slug}`,
      category: project.category,
      project,
    }));

    const fromApps: Item[] = apps.map((app) => ({
      kind: "app",
      key: `app-${app.slug}`,
      category: "Mobile app",
      app,
    }));

    const fromBuilds: Item[] = builds.map((build) => ({
      kind: "build",
      key: `build-${build.slug}`,
      category: build.category,
      build,
    }));

    // Case studies lead, because they are the work we can explain in depth.
    return [...fromProjects, ...fromBuilds, ...fromApps];
  }, [projects, apps, builds]);

  const counts = useMemo(() => {
    const map = new Map<string, number>([["All", items.length]]);
    for (const item of items) {
      if (item.category) {
        map.set(item.category, (map.get(item.category) ?? 0) + 1);
      }
    }
    return map;
  }, [items]);

  const visible = useMemo(
    () =>
      active === "All" ? items : items.filter((i) => i.category === active),
    [active, items],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter work by platform"
        className="flex flex-wrap items-center gap-2"
      >
        {FILTERS.filter((f) => counts.get(f)).map((filter) => {
          const selected = active === filter;
          return (
            <button
              key={filter}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActive(filter)}
              className={cn(
                "relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                selected
                  ? "border-teal bg-teal text-on-teal"
                  : "border-line bg-card text-muted hover:border-clay hover:text-clay-ink",
              )}
            >
              {filter}
              <span
                className={cn(
                  "ml-2 text-[0.75rem] tabular-nums",
                  selected ? "text-clay-200" : "text-faint",
                )}
              >
                {counts.get(filter)}
              </span>
            </button>
          );
        })}
      </div>

      {/* `dense` backfills the single-column hole a featured (span-2) card
          leaves at the end of a row. Safe here because the grid is a gallery
          with no meaningful reading order: the visual gap is worse than the
          slight reorder. */}
      <div className="mt-10 grid grid-flow-row-dense grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => {
            /* Featuring is a curation device for the full grid. Inside a
               filtered view a double-width card just stretches whatever sits
               beside it into a tall half-empty box, so everything is equal
               width once a filter is on. */
            const wide =
              active === "All" &&
              item.kind === "project" &&
              item.project.featured;

            return (
              <motion.div
                key={item.key}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.4,
                  // Cap the stagger: with 31 cards an uncapped delay means the
                  // last one arrives two seconds after the first.
                  delay: Math.min(i, 6) * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(wide && "md:col-span-2")}
              >
                {item.kind === "project" ? (
                  <ProjectCard
                    project={item.project}
                    wide={wide}
                    priority={i < 2}
                  />
                ) : item.kind === "build" ? (
                  <BuildCard build={item.build} priority={i < 2} />
                ) : (
                  <AppCard app={item.app} priority={i < 2} />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <p className="py-20 text-center text-muted">
          Nothing in that category yet.
        </p>
      )}
    </div>
  );
}
