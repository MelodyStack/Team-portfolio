import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/button";
import { Chapters } from "@/components/case-study/chapters";
import { Pager } from "@/components/case-study/pager";
import { CtaBlock } from "@/components/cta-block";
import { Reveal } from "@/components/reveal";
import { StorefrontMockup } from "@/components/storefront-mockup";
import { coverFor, getProject, projects } from "@/lib/projects";
import { prettyUrl } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

/** Every case study is a static route generated from the project list. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Not found" };

  return {
    title: `${project.title} | ${project.kicker}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${project.kicker}`,
      description: project.summary,
      type: "article",
      ...(project.image ? { images: [{ url: project.image }] } : {}),
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const ink = coverFor(project.slug);

  return (
    <>
      {/* ── Masthead ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-14 md:pt-40">
        
        <div className="shell relative">
          <Reveal y={8}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-[0.8125rem] text-faint transition-colors hover:text-ink"
            >
              <ArrowLeft
                aria-hidden
                className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-1"
              />
              All work
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Acid fill with ink type rather than a per-project tint: one
                  accent, used the same way everywhere. */}
              <span className="border border-line bg-clay px-3 py-1.5 text-[0.8125rem] font-medium text-ink">
                {project.kicker}
              </span>
              {project.category && (
                <span className="text-[0.8125rem] text-faint">
                  {project.category}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="headline mt-6 text-[clamp(2.4rem,6.4vw,4.5rem)]">
              {project.title}
            </h1>
          </Reveal>

          {/* The thesis. Largest body text on the page by design: if a visitor reads one sentence, this is the one worth reading. */}
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-4xl text-pretty text-[clamp(1.15rem,2.2vw,1.6rem)] leading-[1.45] text-ink/90">
              {project.statement}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {project.live && (
                <Button href={project.live} size="lg" arrow={false}>
                  Visit {prettyUrl(project.live)}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Button>
              )}
              {project.repo && (
                <Button href={project.repo} variant="secondary" size="lg">
                  Source
                </Button>
              )}
              {/* Store listings, for products that ship to a store rather
                  than to a URL. The first one is the primary action when
                  there is no live site to link. */}
              {project.links?.map((link, i) => (
                <Button
                  key={link.url}
                  href={link.url}
                  variant={!project.live && i === 0 ? "primary" : "secondary"}
                  size="lg"
                  arrow={false}
                >
                  {link.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Cover image ────────────────────────────────────────────────── */}
      <section className="shell">
        <Reveal y={24}>
          <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-line bg-cream-2 md:aspect-16/9">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title}: the live site`}
                fill
                sizes="(max-width: 1280px) 100vw, 1216px"
                priority
                className="object-cover object-top"
              />
            ) : (
              <StorefrontMockup kind={project.cover} ink={ink} />
            )}
          </div>
        </Reveal>
      </section>

      {/* ── Engagement facts ───────────────────────────────────────────── */}
      <section className="shell mt-14 md:mt-20">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line-soft sm:grid-cols-3">
          {[
            { k: "Our role", v: project.role },
            { k: "Timeline", v: project.timeline },
            { k: "Team", v: project.team },
          ].map((item, i) => (
            <Reveal
              key={item.k}
              delay={i * 0.06}
              className="bg-cream p-6 md:p-7"
            >
              <dt className="text-[0.8125rem] text-faint">
                {item.k}
              </dt>
              <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink">
                {item.v}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── Metrics ────────────────────────────────────────────────────── */}
      <section className="shell mt-5">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line-soft sm:grid-cols-3">
          {project.metrics.map((metric, i) => (
            <Reveal
              key={metric.label}
              delay={i * 0.06}
              className="bg-cream p-6 md:p-7"
            >
              <p className="headline text-[clamp(1.9rem,4vw,2.6rem)] text-ink">
                {metric.value}
              </p>
              <p className="mt-2 text-[0.9375rem] font-medium text-ink">
                {metric.label}
              </p>
              {metric.detail && (
                <p className="mt-1 text-[0.8125rem] leading-snug text-faint">
                  {metric.detail}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Story ──────────────────────────────────────────────────────── */}
      <section className="shell mt-16 md:mt-24">
        <Chapters chapters={project.chapters} />
      </section>

      {/* ── Stack ──────────────────────────────────────────────────────── */}
      <section className="shell pb-16 md:pb-24">
        <div className="rounded-2xl border border-line bg-card p-7 md:p-10">
          <h2 className="text-[0.8125rem] text-ink">
            What it is built on
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {project.stack.map((group, i) => (
              <Reveal key={group.group} delay={i * 0.06}>
                <p className="text-[0.9375rem] font-medium text-ink">
                  {group.group}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-line-soft bg-cream-2 px-3 py-1.5 text-[0.8125rem] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Takeaways ──────────────────────────────────────────────────── */}
      <section className="shell pb-20 md:pb-28">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[auto_1fr]">
          <div className="lg:w-44">
            <p className="text-[0.8125rem] text-ink">
              What we learned
            </p>
          </div>

          <ul className="space-y-7">
            {project.takeaways.map((takeaway, i) => (
              <Reveal as="li" key={takeaway} delay={i * 0.06}>
                <div className="flex gap-5">
                  <span className="mt-1 text-[0.8125rem] text-muted tabular-nums">
                    0{i + 1}
                  </span>
                  <p className="max-w-3xl text-[1.0625rem] leading-[1.7] text-ink/85">
                    {takeaway}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Pager slug={project.slug} />

      <CtaBlock />
    </>
  );
}
