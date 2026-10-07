import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNeighbours } from "@/lib/projects";

/**
 * Previous / next case study.
 *
 * Wrap-around rather than stopping at the ends, so a visitor reading through
 * the work never hits a dead end and has to go back to the index.
 */
export function Pager({ slug }: { slug: string }) {
  const { prev, next } = getNeighbours(slug);

  return (
    <nav
      aria-label="More case studies"
      className="grid grid-cols-1 gap-px border-y border-line bg-line-soft md:grid-cols-2"
    >
      {prev && (
        <Link
          href={`/work/${prev.slug}`}
          className="group flex flex-col gap-2 bg-cream p-8 transition-colors duration-500 hover:bg-card md:p-10"
        >
          <span className="flex items-center gap-2 text-[0.8125rem] text-faint">
            <ArrowLeft
              aria-hidden
              className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-1"
            />
            Previous
          </span>
          <span className="text-xl font-medium text-ink transition-colors group-hover:text-ink md:text-2xl">
            {prev.title}
          </span>
          <span className="text-[0.9375rem] text-muted">{prev.summary}</span>
        </Link>
      )}

      {next && (
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col items-end gap-2 bg-cream p-8 text-right transition-colors duration-500 hover:bg-card md:p-10"
        >
          <span className="flex items-center gap-2 text-[0.8125rem] text-faint">
            Next
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </span>
          <span className="text-xl font-medium text-ink transition-colors group-hover:text-ink md:text-2xl">
            {next.title}
          </span>
          <span className="text-[0.9375rem] text-muted">{next.summary}</span>
        </Link>
      )}
    </nav>
  );
}
