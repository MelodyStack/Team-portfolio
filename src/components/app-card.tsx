import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { App } from "@/lib/apps";
import { cn } from "@/lib/utils";

/**
 * A store-published app, shaped to sit alongside ProjectCard in the work grid.
 *
 * Two deliberate differences from a project card, both about honesty:
 *
 *   1. The role line ("React Native engineer") is always visible, never
 *      revealed on hover. On these we were a contributing engineer on someone
 *      else's product, and that has to be legible at a glance rather than
 *      something a visitor discovers after they have formed an impression.
 *   2. The card links out to the store listing rather than to a case study,
 *      because there is no case study to write: we did not shape the product.
 *
 * The icon is centred on a tint rather than stretched to fill the media area.
 * An app icon is a square mark, and cropping one to 4:3 looks like a mistake.
 */
export function AppCard({ app, priority = false }: { app: App; priority?: boolean }) {
  const [primary] = app.links;

  return (
    <a
      href={primary.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group lift flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_#0f3d3e40]"
    >
      <div className="relative grid aspect-4/3 place-items-center overflow-hidden bg-cream-2">
        {/* Soft halo so the icon sits in the panel rather than on it. */}
        <div
          aria-hidden
          className="absolute size-56 rounded-full bg-clay/[0.08] blur-2xl"
        />

        <Image
          src={app.icon}
          alt={`${app.name} app icon`}
          width={160}
          height={160}
          sizes="160px"
          priority={priority}
          className="lift-lg relative size-36 rounded-[2rem] object-cover transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]"
        />

        <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1.5 text-[0.75rem] font-semibold text-ink backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-clay" />
          On the stores
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <span className="text-[0.8125rem] font-semibold text-clay-ink">
          {app.category}
        </span>

        <h3 className="headline mt-2 text-[1.375rem] text-ink">{app.name}</h3>

        <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-muted">
          {app.blurb}
        </p>

        {/* What we actually did, revealed on hover like a project card's
            description, so the card is not a wall of text at rest. */}
        <p className="mt-0 max-h-0 overflow-hidden text-[0.875rem] leading-[1.6] text-faint opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:max-h-44 group-hover:opacity-100">
          {app.contribution}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {app.stack.slice(0, 3).map((item) => (
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
            "text-[0.8125rem] font-medium text-faint transition-colors duration-300 group-hover:text-clay-ink",
          )}
        >
          <span className="min-w-0 truncate">
            {app.role} · {app.links.map((l) => l.label).join(" · ")}
          </span>
          <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
