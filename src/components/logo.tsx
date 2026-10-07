import Link from "next/link";
import { brand } from "@/lib/site";

/**
 * The wordmark: a spade beside the name in the display serif.
 *
 * Literal, on purpose. A spade is the tool of preparatory work, which is what
 * the name means, and a mark that explains the name is worth more than an
 * abstract one a visitor has to decode.
 *
 * Inline SVG rather than a file so it inherits currentColor and can never be
 * out of sync with the text next to it. Two tones, matching the rest of the
 * system: solid clay for the blade, the handle stepped back.
 *
 * On hover it nudges down rather than spinning. A spade digs.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name}: home`}
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-6 shrink-0 text-clay transition-transform duration-300 ease-out group-hover:translate-y-0.5"
      >
        {/* T-handle and shaft. */}
        <path
          d="M8.4 1.8h7.2v2.2h-2.4v4.4h-2.4V4H8.4z"
          className="fill-current opacity-55"
        />
        {/* Blade: square shoulders, tapering to a digging point. */}
        <path
          d="M5.6 9.2h12.8v2.9c0 4.1-2.5 7.5-6.4 10.1-3.9-2.6-6.4-6-6.4-10.1z"
          className="fill-current"
        />
      </svg>
      <span className="headline text-[1.25rem] text-ink">{brand.name}</span>
    </Link>
  );
}
