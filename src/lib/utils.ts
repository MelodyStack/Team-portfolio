/**
 * Joins class names, dropping anything that isn't a non-empty string.
 *
 * Takes `unknown` rather than a union because the common caller shape is
 * `cn(base, someReactNode && "...")`, and a ReactNode guard would otherwise
 * have to be written at every call site.
 */
export function cn(...parts: unknown[]) {
  return parts.filter((p): p is string => typeof p === "string" && p !== "").join(" ");
}

/**
 * External links get target/rel; internal ones must not, or the back button
 * stops working the way visitors expect.
 */
export function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten", "eleven", "twelve",
];

/**
 * 6 -> "six". Used so headcount copy ("Six people…") stays tied to the actual
 * roster instead of being a number someone has to remember to update in three
 * places when the team changes. Falls back to digits past twelve, where
 * spelling out stops reading naturally anyway.
 */
export function spellNumber(n: number, capitalise = false) {
  const word = WORDS[n] ?? String(n);
  return capitalise ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

/** "https://flybeond.com/" -> "flybeond.com": for displaying a live link. */
export function prettyUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}
