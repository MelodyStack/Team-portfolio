import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Build } from "@/lib/builds";
import { cn, prettyUrl } from "@/lib/utils";

/**
 * A shipped build, shaped to sit alongside ProjectCard in the work grid.
 *
 * No case study to link to, so the card opens the live site instead. Where
 * there is no live URL either, it is not a link at all rather than a link
 * that goes nowhere.
 *
 * `role` is always visible. Three of these say "Contributing developer"
 * because that is what the original credit said, and a visitor should see
 * that in the same glance as the title rather than discovering it later.
 */
export function BuildCard({
  build,
  priority = false,
}: {
  build: Build;
  priority?: boolean;
}) {
  const href = build.live ?? build.links?.[0]?.url;

  const media = (
    <div className="relative aspect-4/3 overflow-hidden bg-cream-2">
      {build.image ? (
        <Image
          src={build.image}
          alt={`${build.title}: screenshot of the live site`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 460px"
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        /* No screenshot: a plain tinted panel with the title set in the
           display face. Honest about having nothing to show, and it still
           looks deliberate next to the cards that do. */
        <div className="grid h-full place-items-center px-8">
          <span className="headline text-center text-2xl text-teal/35">
            {build.title}
          </span>
        </div>
      )}

      {build.live && (
        <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1.5 text-[0.75rem] font-semibold text-ink backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-clay" />
          Live
        </span>
      )}
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col p-6 md:p-7">
      <span className="text-[0.8125rem] font-semibold text-clay-ink">
        {build.category}
      </span>

      <h3 className="headline mt-2 text-[1.375rem] text-ink">{build.title}</h3>

      <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-muted">
        {build.summary}
      </p>

      <p className="mt-0 max-h-0 overflow-hidden text-[0.875rem] leading-[1.6] text-faint opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:max-h-52 group-hover:opacity-100">
        {build.detail}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        {build.tech.slice(0, 3).map((item) => (
          <span
            key={item}
            className="rounded-full bg-cream-2 px-3 py-1 text-[0.75rem] font-medium text-muted"
          >
            {item}
          </span>
        ))}
      </div>

      <span
        className={cn(
          "mt-5 flex items-center justify-between gap-3 border-t border-line-soft pt-4",
          "text-[0.8125rem] font-medium text-faint",
          href && "transition-colors duration-300 group-hover:text-clay-ink",
        )}
      >
        <span className="min-w-0 truncate">
          {build.role}
          {build.live ? ` · ${prettyUrl(build.live)}` : ""}
        </span>
        {href && (
          <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </div>
  );

  const shell =
    "group lift flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-500 ease-out";

  if (!href) {
    return (
      <div className={shell}>
        {media}
        {body}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        shell,
        "hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_#0f3d3e40]",
      )}
    >
      {media}
      {body}
    </a>
  );
}
