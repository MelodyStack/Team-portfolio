import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StorefrontMockup } from "@/components/storefront-mockup";
import { coverFor, type Project } from "@/lib/projects";
import { cn, prettyUrl } from "@/lib/utils";

/**
 * A single work card: a soft white card that rises slightly on hover.
 *
 * The screenshot is the point, so it gets a generous crop and the copy sits
 * underneath rather than over it. The whole card is one link to the case
 * study; the live-site URL is shown as text rather than a second nested
 * anchor, because nested interactive elements are invalid and make the card
 * unpredictable on touch.
 *
 * The card always fills its grid cell (`h-full`); column spanning is the
 * caller's job, because the grid child is sometimes an animation wrapper.
 */
export function ProjectCard({
  project,
  priority = false,
  /** Featured cards get a wider image crop. */
  wide = false,
}: {
  project: Project;
  priority?: boolean;
  wide?: boolean;
}) {
  const ink = coverFor(project.slug);
  const checkable = Boolean(project.live || project.links?.length);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group lift flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_#0f3d3e40]"
    >
      <div
        className={cn(
          "relative overflow-hidden bg-cream-2",
          wide ? "aspect-16/9" : "aspect-4/3",
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title}: screenshot of the live site`}
            fill
            // Featured cards occupy two of three columns on desktop; the rest
            // sit in a 3-up grid. Getting this right is the difference between
            // shipping a 1600px image into a 460px slot and not.
            sizes={
              wide
                ? "(max-width: 768px) 100vw, 1100px"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 460px"
            }
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <StorefrontMockup kind={project.cover} ink={ink} />
        )}

        {checkable && (
          <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1.5 text-[0.75rem] font-semibold text-ink backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-clay" />
            {project.live ? "Live" : "On the stores"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {project.category && (
          <span className="text-[0.8125rem] font-semibold text-clay-ink">
            {project.category}
          </span>
        )}

        <h3 className="headline mt-2 text-[1.375rem] text-ink">
          {project.title}
        </h3>

        <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-muted">
          {project.summary}
        </p>

        {/* Revealed on hover on pointer devices; always visible on featured
            cards, which have the room for it. */}
        <p
          className={cn(
            "text-[0.875rem] leading-[1.6] text-faint",
            wide
              ? "mt-3"
              : "mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:max-h-36 group-hover:opacity-100",
          )}
        >
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {project.tags.slice(0, wide ? 4 : 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream-2 px-3 py-1 text-[0.75rem] font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {checkable && (
          <span className="mt-5 flex items-center justify-between gap-3 border-t border-line-soft pt-4 text-[0.8125rem] font-medium text-faint transition-colors duration-300 group-hover:text-clay-ink">
            {project.live
              ? prettyUrl(project.live)
              : project.links?.map((l) => l.label).join(" · ")}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </Link>
  );
}
