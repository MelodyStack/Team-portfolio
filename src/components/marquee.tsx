import { clients } from "@/lib/site";

/**
 * The client name ribbon.
 *
 * The most persuasive element near the top of the page, so it is plain text
 * at a readable size rather than a row of tiny grey logos: a founder
 * recognises a name faster than a wordmark they have to squint at.
 *
 * On a warm page this sits on cream rather than in an inverted band, because
 * a hard band here would cut the hero off from the rest of the page.
 *
 * CSS-only: the track renders the list twice and translates -50%, so the loop
 * is seamless with no JS and no layout thrash. Pure server component.
 */
export function ClientMarquee({ label }: { label?: string }) {
  return (
    <section className="border-y border-line-soft bg-cream-2/60 py-10 md:py-12">
      {label && (
        <p className="shell mb-7 text-center text-[0.8125rem] font-semibold text-faint">
          {label}
        </p>
      )}

      <div
        className="fade-x group relative flex overflow-hidden"
        // Decorative repetition of information already in the work grid;
        // announcing 48 names would be noise for a screen reader.
        aria-hidden
      >
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center">
              {clients.map((name) => (
                <li
                  key={`${copy}-${name}`}
                  className="flex items-center gap-7 px-7 md:gap-10 md:px-10"
                >
                  <span className="headline text-xl whitespace-nowrap text-teal/70 transition-colors duration-300 hover:text-teal md:text-2xl">
                    {name}
                  </span>
                  <span className="size-1.5 shrink-0 rounded-full bg-clay/60" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
