import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/button";
import { brand, contact, promise, stats } from "@/lib/site";
import { getProject } from "@/lib/projects";

/**
 * The homepage hero.
 *
 * Two columns: the sentence on the left, a real piece of work on the right.
 * That image does two jobs at once. It is the warmth and depth the page
 * needs, and it is proof, because it is a live client project with its name
 * on it rather than a stock photograph of people pointing at a laptop.
 *
 * Entirely a server component. The staggered entrance is the `.enter` CSS
 * animation with a per-block `--d` delay rather than a motion component: this
 * is the first thing a visitor reads, and it must not depend on JavaScript
 * having loaded and hydrated to become visible.
 */

/** The project shown in the hero. Picked for the photography. */
const HERO_PROJECT = "beond";

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

export function Hero() {
  const featured = getProject(HERO_PROJECT);

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ── The sentence ──────────────────────────────────────────── */}
          <div>
            <div
              className="enter inline-flex items-center gap-2.5 rounded-full bg-clay-soft py-2 pr-5 pl-3.5"
              style={delay(0)}
            >
              <span className="relative grid size-2 place-items-center">
                <span className="absolute size-2 animate-pulse-dot rounded-full bg-clay" />
                <span className="size-2 rounded-full bg-clay" />
              </span>
              <span className="text-[0.8125rem] font-semibold text-clay-ink">
                {brand.availability.label} · {brand.availability.detail}
              </span>
            </div>

            <h1
              className="display enter mt-7 text-[clamp(2.6rem,5.6vw,4.5rem)]"
              style={delay(90)}
            >
              We build the software your{" "}
              <span className="swash text-clay-ink">company</span> runs on.
            </h1>

            <p
              className="enter mt-7 max-w-xl text-lg leading-[1.65] text-muted"
              style={delay(180)}
            >
              {promise}
            </p>

            <div
              className="enter mt-9 flex flex-wrap items-center gap-3"
              style={delay(260)}
            >
              <Button href="/contact" size="lg">
                Book a build review
              </Button>
              <Button href="/work" variant="secondary" size="lg" arrow>
                See the work
              </Button>
            </div>

            <p
              className="enter mt-5 max-w-md text-[0.9375rem] leading-relaxed text-faint"
              style={delay(320)}
            >
              Thirty minutes with the engineer who would lead your project. No
              deck, no sales script, no obligation, or just{" "}
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-clay-ink underline decoration-clay/40 underline-offset-4 transition-colors hover:decoration-clay"
              >
                email us
              </a>
              .
            </p>
          </div>

          {/* ── A real project, shown large ───────────────────────────── */}
          {featured?.image && (
            <div className="enter relative" style={delay(200)}>
              {/* Soft clay halo behind the card, so it sits in the page
                  rather than on top of it. */}
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-clay/[0.07] blur-2xl"
              />

              <Link
                href={`/work/${featured.slug}`}
                className="group lift-lg block overflow-hidden rounded-3xl border border-line bg-card transition-transform duration-500 ease-out hover:-translate-y-1.5"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={`${featured.title}: the live site`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    priority
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className="min-w-0">
                    <p className="headline truncate text-lg text-ink">
                      {featured.title}
                    </p>
                    <p className="mt-0.5 truncate text-[0.9375rem] text-muted">
                      {featured.kicker}
                    </p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-clay-soft text-clay-ink transition-colors duration-300 group-hover:bg-clay group-hover:text-on-teal">
                    <ArrowUpRight className="size-5" aria-hidden />
                  </span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* ── The numbers, as a soft card rather than a hard band ─────── */}
        <div
          className="enter lift mt-16 overflow-hidden rounded-3xl border border-line bg-card md:mt-20"
          style={delay(380)}
        >
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                /* 2-up on mobile, 4-up from lg. The rules are keyed off
                   position in the row rather than `not-last`, or the second
                   cell would carry a border against the card edge. */
                className="border-line-soft p-6 md:p-8 [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r lg:border-b-0 lg:[&:not(:last-child)]:border-r"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="display block text-[clamp(2rem,4vw,2.75rem)] text-teal">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-[0.9375rem] font-semibold text-ink">
                    {stat.label}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-faint">
                    {stat.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
