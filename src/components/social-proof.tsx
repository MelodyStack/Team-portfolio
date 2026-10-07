import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/section";
import { apps } from "@/lib/apps";
import { builds } from "@/lib/builds";
import { projects } from "@/lib/projects";
import { proofSlugs, testimonials } from "@/lib/site";
import { cn, prettyUrl } from "@/lib/utils";

/**
 * Social proof, in one of two states.
 *
 * With real testimonials, it shows them. With none, it shows shipped client
 * work that a visitor can open and check.
 *
 * The switch exists because the alternative is worse than an empty section.
 * Anonymous invented quotes ("Founder, DTC brand, $11M revenue") read as
 * fabricated to exactly the audience this site is for, and they drag the
 * honest claims around them down with them. Named, checkable client work is
 * stronger proof anyway, and it needs nobody's permission to publish.
 */
export function SocialProof({
  className,
  index,
}: {
  className?: string;
  /** Section number, when the page is numbering its sections. */
  index?: string;
}) {
  if (testimonials.length > 0) return <Testimonials className={className} index={index} />;
  return <ShippedProof className={className} index={index} />;
}

/* ── Real quotes ──────────────────────────────────────────────────── */

function Testimonials({
  className,
  index,
}: {
  className?: string;
  index?: string;
}) {
  return (
    <Section className={className}>
      <SectionHead
        index={index}
        eyebrow="In their words"
        title="What clients say when the project is over."
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.quote}
            delay={i * 0.08}
            className="lift flex h-full flex-col rounded-3xl border border-line bg-card p-7"
          >
            <Quote aria-hidden className="size-7 text-clay/40" />

            <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-[1.65] text-ink/90">
              {t.quote}
            </blockquote>

            <figcaption className="mt-7 flex items-center gap-3 border-t border-line-soft pt-5">
              {t.photo ? (
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={44}
                  height={44}
                  sizes="44px"
                  className="size-11 shrink-0 rounded-full object-cover ring-1 ring-line"
                />
              ) : (
                <span className="size-11 shrink-0 rounded-full bg-clay-soft" />
              )}

              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-semibold text-ink">
                  {t.name}
                </span>
                <span className="block truncate text-[0.8125rem] text-muted">
                  {t.role}, {t.company}
                </span>
              </span>

              {t.url && (
                <a
                  href={t.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ml-auto shrink-0 text-faint transition-colors hover:text-clay-ink"
                  aria-label={`${t.name} profile`}
                >
                  <ArrowUpRight className="size-4" />
                </a>
              )}
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── The fallback: work you can open ──────────────────────────────── */

type ProofItem = { title: string; summary: string; href: string; kind: string };

/** Resolves a slug against all three work datasets. */
function resolve(slug: string): ProofItem | null {
  const project = projects.find((p) => p.slug === slug);
  if (project) {
    const href = project.live ?? project.links?.[0]?.url;
    if (href) {
      return {
        title: project.title,
        summary: project.summary,
        href,
        kind: project.category ?? "Case study",
      };
    }
  }

  const build = builds.find((b) => b.slug === slug);
  if (build) {
    const href = build.live ?? build.links?.[0]?.url;
    if (href) {
      return {
        title: build.title,
        summary: build.summary,
        href,
        kind: build.category,
      };
    }
  }

  const app = apps.find((a) => a.slug === slug);
  if (app) {
    return {
      title: app.name,
      summary: app.blurb,
      href: app.links[0].url,
      kind: "On the app stores",
    };
  }

  return null;
}

function ShippedProof({
  className,
  index,
}: {
  className?: string;
  index?: string;
}) {
  const items = proofSlugs
    .map(resolve)
    .filter((i): i is ProofItem => i !== null);

  if (items.length === 0) return null;

  return (
    <Section className={className}>
      <SectionHead
        index={index}
        eyebrow="Proof you can check"
        title="We would rather show you the work than quote ourselves."
        lede="Client testimonials are easy to write and impossible to verify. These are running products with our work in them. Open any of them."
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.href} delay={i * 0.06}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "group lift flex h-full flex-col rounded-3xl border border-line bg-card p-7",
                "transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_#0f3d3e40]",
              )}
            >
              <span className="text-[0.8125rem] font-semibold text-clay-ink">
                {item.kind}
              </span>

              <h3 className="headline mt-2 text-[1.375rem] text-ink">
                {item.title}
              </h3>

              <p className="mt-2.5 flex-1 text-[0.9375rem] leading-[1.6] text-muted">
                {item.summary}
              </p>

              <span className="mt-6 flex items-center justify-between gap-3 border-t border-line-soft pt-5 text-[0.8125rem] font-medium text-faint transition-colors duration-300 group-hover:text-clay-ink">
                <span className="min-w-0 truncate">{prettyUrl(item.href)}</span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
