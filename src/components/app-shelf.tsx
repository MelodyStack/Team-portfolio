import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { apps } from "@/lib/apps";

/**
 * The shipped-apps shelf.
 *
 * Presented as credits with store links rather than as case studies, because
 * on these we were a contributing mobile engineer on someone else's product.
 * The `role` line is on every card for that reason: overstating ownership on
 * an app a founder can go and check is the expensive kind of lie.
 *
 * Each card carries its own store links, so this renders as a list of cards
 * with links inside rather than as a grid of giant link targets.
 */
export function AppShelf({ limit }: { limit?: number }) {
  const shown = limit ? apps.slice(0, limit) : apps;

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {shown.map((app, i) => (
        <Reveal as="li" key={app.slug} delay={Math.min(i, 5) * 0.05}>
          <article className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-all duration-200 ease-out hover:-translate-y-1 lift hover:lift">
            <div className="flex items-start gap-4">
              <Image
                src={app.icon}
                alt=""
                width={56}
                height={56}
                sizes="56px"
                className="size-14 shrink-0 rounded-2xl border border-line object-cover"
              />

              <div className="min-w-0">
                <h3 className="truncate text-[1.0625rem] font-medium text-ink">
                  {app.name}
                </h3>
                <p className="mt-1 text-[0.75rem] text-muted">
                  {app.category}
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-faint">{app.role}</p>
              </div>
            </div>

            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
              {app.blurb}
            </p>

            <p className="mt-3 text-[0.875rem] leading-relaxed text-faint">
              {app.contribution}
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {app.stack.slice(0, 5).map((item) => (
                <li
                  key={item}
                  className="border border-line-soft bg-cream-2 px-2.5 py-1 text-[0.75rem] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-2 border-t border-line-soft pt-5">
              {app.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 border border-line-soft px-3 py-1.5 text-[0.8125rem] text-muted transition-colors hover:border-line hover:text-ink"
                >
                  {link.label}
                  <ArrowUpRight className="size-3" aria-hidden />
                </a>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
