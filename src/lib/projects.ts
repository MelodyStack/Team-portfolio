/**
 *  ────────────────────────────────────────────────────────────────────────
 *   WORK & CASE STUDIES
 *  ────────────────────────────────────────────────────────────────────────
 *
 *  Every entry here is a real, shipped, publicly verifiable project: the
 *  `live` URL goes to the running site. That verifiability is the point:
 *  a founder trusts a link they can open more than any claim we could make.
 *
 *  Each project renders twice: as a card in the work grid, and as a full
 *  case study at /work/<slug>. Add an entry and both appear; the route is
 *  generated statically from this list.
 *
 *  Only `slug`, `title`, `summary` and `tags` are needed for the card.
 *  The rest builds out the case study page.
 */

import type { CoverKind } from "@/components/storefront-mockup";

/**
 * The buckets the work grid filters by. Authored per project rather than
 * derived from tags, so the filter row stays fixed no matter what tags a new
 * project happens to use.
 *
 * "Web platform" covers the custom React/Next.js/Vue builds that are an
 * application rather than a storefront on someone's CMS. A project may
 * legitimately match none of these; those still appear under "All".
 */
export type ProjectCategory =
  | "Shopify"
  | "WordPress"
  | "Headless Shopify"
  | "Headless WordPress"
  | "Web platform"
  | "Mobile app"
  | "Blockchain";

/** A headline number. `detail` shows underneath in smaller type. */
export type Metric = {
  value: string;
  label: string;
  detail?: string;
};

/**
 * One movement of the story. Three kinds, in narrative order. The page
 * numbers and labels them automatically.
 */
export type Chapter = {
  kind: "problem" | "approach" | "outcome";
  title: string;
  /** Each string is a paragraph. */
  body: string[];
  /** Optional bullets rendered after the paragraphs. */
  points?: string[];
  /** Optional callout box pinned beside the text. */
  aside?: { title: string; body: string };
  /**
   * Optional before/after pair, rendered as an animated comparison.
   * Use for the numbers that make the outcome concrete.
   */
  shift?: { label: string; before: string; after: string };
};

export type Project = {
  slug: string;
  title: string;
  /** One line, shown on the card. */
  summary: string;
  /** A sentence or two, revealed on card hover. */
  description: string;
  tags: string[];
  /** Which filter bucket this belongs to. Omit if it fits none of them. */
  category?: ProjectCategory;

  /** Optional links. Omit and the button won't render. */
  live?: string;
  repo?: string;
  /**
   * Extra outbound links, e.g. App Store and Play Store listings. Used by
   * products that ship to a store rather than to a URL, where there is no
   * `live` site to send anyone to.
   */
  links?: { label: string; url: string }[];
  /** Put an image in /public and reference it as "/shot.png". */
  image?: string;
  /**
   * Which screen the generated cover wireframes. Ignored when  is set.
   * Defaults to "storefront".
   */
  cover?: CoverKind;
  /** Featured projects render double-width in the grid. */
  featured?: boolean;

  // Case study
  /** Short label above the case-study title, e.g. "Analytics platform". */
  kicker: string;
  /** The thesis. One strong sentence; this is the largest text on the page. */
  statement: string;
  role: string;
  timeline: string;
  team: string;
  metrics: Metric[];
  chapters: Chapter[];
  stack: { group: string; items: string[] }[];
  /** What we'd tell a founder about to build the same thing. */
  takeaways: string[];
};

/**
 * Accent values for the generated wireframe covers. Only reached when a
 * project has no screenshot, which currently none are. The palette is held
 * to acid and ink so a fallback cover cannot introduce a colour the rest of
 * the system does not use.
 */
const INKS = [
  "#c8ff00", // acid, the house accent
  "#0c0c0b", // ink
  "#a8d900", // acid, deepened
  "#55554e", // muted ink
  "#c8ff00",
  "#0c0c0b",
] as const;

/**
 * The accent a project renders in.
 *
 * Assigned by position rather than by hashing the title: with only a handful
 * of projects, any hash collides and you end up with three of six sharing a
 * colour. Cycling the list guarantees neighbours always differ, and reordering
 * projects re-inks them predictably.
 */
export function coverFor(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return INKS[(i === -1 ? 0 : i) % INKS.length];
}

export const projects: Project[] = [

  {
    slug: "thunderpick",
    category: "Web platform",
    cover: "settings",
    image: "/work/thunderpick.jpg",
    title: "Thunderpick",
    summary:
      "Esports and sports betting platform with a crypto wallet and live markets.",
    description:
      "A real-time betting platform where odds, match state and balances all move while the user is looking at them, with a crypto-first wallet and an in-house casino alongside the sportsbook.",
    tags: ["React", "Next.js", "WebSockets", "Real-time"],
    live: "https://thunderpick.io/",
    featured: true,

    kicker: "Real-time platform",
    statement:
      "Three things change at once (the odds, the bet slip and the wallet), and the product is only trustworthy if a user never catches them disagreeing.",
    role: "Frontend engineering on the real-time surfaces",
    timeline: "Ongoing engagement",
    team: "Lead engineer, two frontend engineers",
    metrics: [
      { value: "Real-time", label: "Odds and match state", detail: "streamed, not polled" },
      { value: "Crypto", label: "Wallet and payouts", detail: "crypto-first balances" },
      { value: "2", label: "Product surfaces", detail: "sportsbook and in-house casino" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Nothing on the page stays still",
        body: [
          "Real-time is not a feature of this product, it is the product. Odds move, matches progress, balances change, and all of it happens while the user is mid-decision.",
          "That breaks the usual request-and-response model completely. It also creates the real risk: if the bet slip, the wallet and the live market disagree for even a moment, the user has watched the platform contradict itself about their money.",
        ],
      },
      {
        kind: "approach",
        title: "Build the front end around a stream",
        body: [
          "The client is React and Next.js with Tailwind, built around streaming updates over WebSockets rather than fetching on interaction. Python services sit behind it.",
          "Most of the difficulty is consistency under motion: keeping the bet slip, the wallet balance and live market data agreeing with each other while all three are being updated independently, and keeping the interface responsive at that update rate rather than re-rendering the page every time a number moves.",
        ],
        points: [
          "WebSocket-driven state rather than request-and-response",
          "Bet slip, wallet and market data reconciled against a single source of truth",
          "Render work scoped so a changing odd does not re-render the page",
          "Crypto wallet balances and payouts",
          "Sportsbook and in-house casino on one front end",
        ],
        aside: {
          title: "The consistency problem",
          body: "Users forgive a stale number. They do not forgive two numbers on the same screen disagreeing about their balance, because that reads as the platform not knowing what it owes them.",
        },
      },
      {
        kind: "outcome",
        title: "A platform that holds together while it moves",
        body: [
          "Odds, match state and balances stream live across the sportsbook and casino, with the bet slip and wallet staying consistent through the update rate.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"] },
      { group: "Real-time", items: ["WebSockets", "Redis"] },
      { group: "Backend", items: ["Python", "FastAPI", "Celery", "PostgreSQL", "Docker"] },
    ],
    takeaways: [
      "When the data never stops moving, the architecture question is not how to fetch it but how to reconcile it. Pick one source of truth and make every surface read from it.",
      "Scope your re-renders early. On a streaming interface, the naive approach is fine in development and unusable at production update rates.",
    ],
  },

  {
    slug: "one-park-financial",
    category: "Web platform",
    cover: "settings",
    image: "/work/one-park-financial.jpg",
    title: "One Park Financial",
    summary:
      "Small-business lending platform with a two-minute prequalification funnel.",
    description:
      "A fintech platform where business owners prequalify for funding in about two minutes and money can land in the account inside a day, built across a Laravel API and a React front end.",
    tags: ["React", "Laravel", "Fintech", "Conversion"],
    live: "https://www.oneparkfinancial.com/",

    kicker: "Fintech",
    statement:
      "This is a funnel first and a marketing site second, so every decision was judged on whether it kept an applicant moving.",
    role: "Full-stack: the application funnel and the design system behind it",
    timeline: "Ongoing engagement",
    team: "Lead engineer, frontend engineer",
    metrics: [
      { value: "~2 min", label: "To prequalify", detail: "multi-step, mobile-first" },
      { value: "<1 day", label: "To funding", detail: "where underwriting allows" },
      { value: "1", label: "Design system", detail: "shared by marketing and the app" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "A funnel wearing a marketing site",
        body: [
          "The business is lending, and the only thing on the site that makes money is the prequalification flow. Everything else exists to get an owner into it.",
          "That flow has to stay fast and credible on a phone, feed underwriting cleanly, and above all never lose an applicant halfway through. A business owner abandoning at step three of five is the single most expensive event on the site.",
        ],
      },
      {
        kind: "approach",
        title: "Work both sides of the form",
        body: [
          "The work ran across the Laravel API and the React front end: the multi-step form with its validation and state handling, and the data contracts behind it, so that what the form collects is what underwriting can actually use.",
          "A Tailwind design system keeps the marketing pages and the application surface visually consistent. That matters more in lending than in most categories: a form that looks like it came from a different company than the page that sold it is exactly where people stop trusting a financial product.",
        ],
        points: [
          "Multi-step prequalification form with resilient state and validation",
          "Data contracts designed against what underwriting consumes",
          "Shared Tailwind design system across marketing and application",
          "Mobile-first, because that is where the applicants are",
        ],
        aside: {
          title: "Why consistency is a conversion feature",
          body: "In lending, a visual break between the marketing page and the form reads as a hand-off to a third party. People stop entering financial details at exactly that point.",
        },
      },
      {
        kind: "outcome",
        title: "An application people finish",
        body: [
          "Owners prequalify in roughly two minutes on a phone, the submitted data lands in a shape underwriting can act on, and the marketing and application surfaces share one visual system.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Laravel", "PHP", "REST API", "MySQL"] },
    ],
    takeaways: [
      "Design the form against what the downstream system consumes, not against what is easy to ask. A tidy form that produces unusable data has moved the problem, not solved it.",
      "In a financial product, visual consistency between the pitch and the form is a conversion mechanism, not a brand nicety.",
    ],
  },

  {
    slug: "zone-healthy",
    category: "Web platform",
    cover: "pdp",
    image: "/work/zone-healthy.jpg",
    title: "Zone Healthy",
    summary:
      "Subscription meal delivery with per-customer exclusions and ZIP-code eligibility.",
    description:
      "A chef-prepared meal delivery service for Southern California where the interesting problem is the ordering model: plan lengths, ingredient exclusions, delivery eligibility and rewards all feeding one cart.",
    tags: ["Next.js", "Subscriptions", "Node", "Stripe"],
    live: "https://www.zonehealthy.com/",

    kicker: "Subscription commerce",
    statement:
      "The storefront was never the hard part: four independent rules all had to resolve into one cart before a customer could be shown a price.",
    role: "Full-stack: storefront, subscription model and the API behind it",
    timeline: "Ongoing engagement",
    team: "Lead engineer, frontend engineer",
    metrics: [
      { value: "7 / 14 / 30", label: "Day plan lengths", detail: "each priced separately" },
      { value: "5", label: "Ingredient exclusions", detail: "per customer, per order" },
      { value: "1 pt / $1", label: "Rewards programme", detail: "plus referrals" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Four rules, one cart",
        body: [
          "Customers pick a plan length of 7, 14 or 30 days, set up to five ingredient exclusions, and can only order at all if their ZIP code is in the delivery area. On top of that sits a points-based rewards and referral programme.",
          "Each of those is simple alone. Together they are a pricing and availability problem that has to resolve before a customer can be shown anything, and getting it wrong means quoting a price for a meal you cannot deliver or cannot make.",
        ],
      },
      {
        kind: "approach",
        title: "Model the subscription, then build the shop",
        body: [
          "Built on Next.js and React with a Node backend. The work started with the subscription and cart model rather than with the storefront, because the storefront is downstream of it: plan length, exclusions, delivery eligibility and reward balance all feed the same state.",
          "That covers checkout and the account area where customers manage their preferences and track orders, which is where a subscription product actually lives after the first purchase.",
        ],
        points: [
          "7, 14 and 30-day plan lengths as first-class pricing inputs",
          "Up to five per-customer ingredient exclusions applied to the menu",
          "ZIP-code delivery eligibility checked before anything is quoted",
          "Points-based rewards and referrals feeding the same cart state",
          "Account area for preferences and order tracking",
        ],
        aside: {
          title: "Eligibility before price",
          body: "Checking the ZIP code first looks like friction. Showing someone a menu and a price for an area you do not deliver to is worse friction, and it costs the trust as well as the order.",
        },
      },
      {
        kind: "outcome",
        title: "One cart that knows all four rules",
        body: [
          "Plan length, exclusions, delivery area and rewards resolve into a single cart and subscription state, and customers manage their own preferences from the account area afterwards.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis"] },
      { group: "Commerce", items: ["Stripe", "Subscriptions", "Rewards & referrals"] },
    ],
    takeaways: [
      "When several rules interact, model the state before building the interface. A storefront built first will encode the rules by accident, in the wrong place, several times.",
      "Check deliverability before you quote. Showing an unavailable price is a worse experience than one extra question.",
    ],
  },

  {
    slug: "aether-apparel",
    category: "Web platform",
    cover: "collection",
    image: "/work/aether-apparel.jpg",
    title: "AETHER Apparel",
    summary:
      "Headless commerce for a premium outdoor brand with a very deep catalogue.",
    description:
      "A premium outdoor apparel brand selling online and through five US stores, with seasonal collections, a membership tier and an editorial journal running alongside the shop.",
    tags: ["Next.js", "Headless commerce", "GraphQL", "Editorial"],
    live: "https://aetherapparel.com/",

    kicker: "Headless commerce",
    statement:
      "A deep taxonomy and a shallow navigation are in direct opposition, and resolving that was most of the build.",
    role: "Frontend engineering on the storefront and editorial templates",
    timeline: "Ongoing engagement",
    team: "Lead engineer, frontend engineer, designer",
    metrics: [
      { value: "5", label: "US flagship stores", detail: "alongside the online channel" },
      { value: "20+", label: "Category routes per range", detail: "before collections branch again" },
      { value: "2", label: "Template systems", detail: "shop and journal, side by side" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "The catalogue is the hard part",
        body: [
          "Men's and women's ranges each branch into clothing, accessories, snow and motorcycle lines, then branch again into collections and product types. That is a deep taxonomy by the time you reach an actual product.",
          "Navigation has to stay shallow anyway. A customer will not click through four levels to find a jacket, so the structure underneath has to be deep while the path through it stays short.",
        ],
      },
      {
        kind: "approach",
        title: "Headless, with two template systems that leave each other alone",
        body: [
          "Built in React and Next.js against a headless commerce backend: collection and product templates, cart and checkout, and the Insider membership tier.",
          "The Journal runs long-form editorial beside the shop. Keeping those as two template systems rather than forcing editorial into product templates is what stops either one compromising the other: a lookbook and a product grid want opposite things from a layout.",
        ],
        points: [
          "Headless storefront on Next.js with SSR and ISR",
          "Collection and product templates built for a deep taxonomy",
          "Shallow navigation paths over a deep category tree",
          "Insider membership tier",
          "Separate editorial template system for the Journal",
        ],
        aside: {
          title: "Two systems, deliberately",
          body: "Editorial and commerce templates pull in opposite directions. Merging them produces a product page that reads like a blog post and a blog post that converts like neither.",
        },
      },
      {
        kind: "outcome",
        title: "A deep catalogue that still feels shallow",
        body: [
          "The storefront carries a multi-level taxonomy across both ranges without the navigation deepening, and the Journal publishes alongside the shop on its own templates.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SSR / ISR"] },
      { group: "Commerce", items: ["Headless commerce", "GraphQL", "Membership tier"] },
      { group: "Backend", items: ["Node.js", "REST API", "Redis", "Vercel"] },
    ],
    takeaways: [
      "Depth of taxonomy and depth of navigation are separate decisions. Treating them as the same thing is why large catalogues end up unusable.",
      "Give editorial its own templates. Commerce templates will always win the compromise, and the editorial becomes pointless.",
    ],
  },

  {
    slug: "thetreedots",
    category: "Web platform",
    cover: "collection",
    image: "/work/thetreedots.jpg",
    title: "TreeDots",
    summary:
      "B2B surplus-food marketplace in Singapore, with an Ionic app on both stores.",
    description:
      "A Singapore food-supply platform turning surplus and imperfect stock into sales, pairing a B2B marketplace with cold-chain logistics and a supplier back-office system.",
    tags: ["Vue", "Ionic", "B2B marketplace", "Cross-platform"],
    live: "https://thetreedots.com/",

    kicker: "B2B marketplace",
    statement:
      "Three products share one set of numbers, and if stock, pricing and delivery windows ever drift apart, perishable food is what gets lost.",
    role: "Frontend engineering on the buyer app and marketplace",
    timeline: "Ongoing engagement",
    team: "Lead engineer, frontend engineer",
    metrics: [
      { value: "3", label: "Products, one platform", detail: "marketplace, logistics, back office" },
      { value: "iOS + Android", label: "From one codebase", detail: "Ionic and Vue" },
      { value: "Cold chain", label: "Temperature-controlled", detail: "delivery windows that matter" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Surplus food has a deadline",
        body: [
          "TreeDots runs three things under one roof: a marketplace where suppliers list excess or imperfect food to businesses at lower prices, a temperature-controlled logistics service, and an admin system for digitising a supplier's own processes.",
          "The commodity is perishable and the inventory is, by definition, irregular. Stock that is listed but already gone, or a delivery window that the cold chain cannot actually meet, is not a bad user experience here: it is spoiled food and a lost customer.",
        ],
      },
      {
        kind: "approach",
        title: "One codebase for buyers, one source of truth underneath",
        body: [
          "The buyer-facing app is Ionic and Vue, shipping to iOS and Android from a single codebase against a Node backend. Ordering covers catalogues by category, order history and repeat buying, which is most of what a B2B buyer does.",
          "None of it works unless stock, pricing and delivery windows stay in sync between the app and the back office. That synchronisation, rather than the ordering interface, is where the engineering effort went.",
        ],
        points: [
          "Ionic and Vue buyer app to both stores from one codebase",
          "Category catalogues, order history and repeat ordering for B2B buyers",
          "Stock, pricing and delivery windows synchronised with the back office",
          "Cold-chain delivery windows surfaced at the point of ordering",
        ],
        aside: {
          title: "Repeat ordering is the B2B feature",
          body: "A consumer browses. A business reorders. Making the last order one tap away matters more than anything on the discovery side.",
        },
      },
      {
        kind: "outcome",
        title: "Surplus stock that actually moves",
        body: [
          "Buyers order from one app on both platforms, with stock, pricing and delivery windows reflecting what the back office and the cold chain can genuinely deliver.",
        ],
      },
    ],
    stack: [
      { group: "App", items: ["Vue.js", "Ionic", "Capacitor", "TypeScript", "Vuex"] },
      { group: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"] },
      { group: "Delivery", items: ["App Store", "Play Store"] },
    ],
    takeaways: [
      "In B2B, optimise the reorder, not the browse. The second purchase is the business model.",
      "When inventory is perishable and irregular, synchronisation is the product. The interface on top of it is comparatively easy.",
    ],
  },

  {
    slug: "playbyplay-anime",
    category: "Mobile app",
    cover: "pdp",
    image: "/work/playbyplay/pbp-3.jpg",
    title: "PlayByPlay Anime",
    summary:
      "A real-time AI anime football commentator, shipped to both app stores.",
    description:
      "Our own product. Victoria is an AI anime commentator who reacts live to every goal, card and momentum swing across eight competitions, turning watching a match alone into a companion experience.",
    tags: ["React Native", "AI voice agent", "LiveKit", "Expo"],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/playbyplay-anime/id6760711721",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.playbyplay.anime",
      },
    ],
    featured: true,

    kicker: "Our own product",
    statement:
      "A live voice agent has no margin for latency: if the commentary arrives after the goal, the product is worthless, so everything was built backwards from that constraint.",
    role: "Everything: concept, product design, character, interface and engineering",
    timeline: "Concept to both stores",
    team: "Co-founded and built in-house",
    metrics: [
      { value: "2", label: "App stores, live", detail: "iOS and Android from one codebase" },
      { value: "8", label: "Leagues and tournaments", detail: "through to the 2026 World Cup" },
      { value: "7", label: "Languages at launch", detail: "commentary and interface" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Watching a match alone is the actual problem",
        body: [
          "Football is a social product consumed, increasingly, alone. The gap is not information; scores are everywhere. What is missing is reaction, and somebody to shout at when the penalty is given.",
          "An AI commentator only fills that gap if it is genuinely live. Commentary that lags the match by even a few seconds stops being a companion and becomes a transcript, and a transcript is worth nothing when the viewer already saw the goal.",
        ],
      },
      {
        kind: "approach",
        title: "A voice agent, built backwards from latency",
        body: [
          "Victoria is a real-time voice agent rather than a text feed with speech bolted on. LiveKit streams the audio at low latency, ElevenLabs handles speech in and out, and an LLM writes commentary against live match state across the Premier League, La Liga, Bundesliga, Serie A, Ligue 1, the Champions League, MLS and the 2026 World Cup.",
          "It is two-way. You can cut in by voice or by chat mid-match and she answers, which is the difference between a broadcast and a companion.",
          "One React Native and Expo codebase ships to iOS and Android. A Node backend on AWS runs predictions, the credit system and affiliate rewards.",
          "There is no subscription. Credits are bought in packs when you want them, which suits a product whose usage spikes around fixtures rather than running evenly across a month.",
        ],
        points: [
          "Real-time voice agent over LiveKit and WebRTC, not a text feed read aloud",
          "LLM commentary written against live match state, not canned phrases",
          "Two-way: interrupt by voice or chat mid-match and get an answer",
          "One React Native and Expo codebase to both stores",
          "Credit packs rather than a subscription, matched to spiky fixture-driven usage",
        ],
        aside: {
          title: "Why not a subscription",
          body: "Usage follows the fixture list, not the calendar. Charging monthly for a product someone opens on nine Saturdays out of thirty is how you train people to cancel.",
        },
      },
      {
        kind: "outcome",
        title: "Live on both stores, in seven languages",
        body: [
          "The app is published on the App Store and Google Play, covering eight competitions in seven languages, with the voice agent, credit system and affiliate rewards all running in production.",
        ],
      },
    ],
    stack: [
      { group: "Mobile", items: ["React Native", "Expo", "TypeScript"] },
      { group: "Real-time voice", items: ["LiveKit", "ElevenLabs", "WebRTC", "LLM APIs"] },
      { group: "Backend", items: ["Node.js", "Express", "PostgreSQL", "AWS"] },
      { group: "Commerce", items: ["In-app purchases", "Credit packs", "Affiliate rewards"] },
    ],
    takeaways: [
      "For a live product, latency is the feature. Every architectural decision here follows from the commentary needing to land before the viewer's own reaction does.",
      "Match the billing model to the usage pattern. Spiky, event-driven usage and monthly subscriptions are a bad fit, and the churn tells you so.",
      "One codebase to two stores is still the right default for a product that has to prove itself before it can afford two native teams.",
    ],
  },

  {
    slug: "lumenac",
    category: "Web platform",
    cover: "collection",
    image: "/work/lumenac.jpg",
    title: "Lumenac",
    summary:
      "Spanish-first catalogue site for an Argentine LED lighting manufacturer.",
    description:
      "The site for a 39-year-old Argentine LED manufacturer with two factories and distributors across Latin America and Europe, built as a Vue application around a technical product catalogue.",
    tags: ["Vue", "Catalogue", "i18n", "Node"],
    live: "https://lumenac.com.ar/",

    kicker: "Product catalogue",
    statement:
      "The audience is a lighting engineer looking for a specification, not a shopper, and that changes what the site owes them.",
    role: "Frontend engineering and catalogue architecture",
    timeline: "Ongoing engagement",
    team: "Frontend engineer, designer",
    metrics: [
      { value: "39 yrs", label: "Manufacturer in market", detail: "two production plants" },
      { value: "Spanish", label: "First, not translated", detail: "copy, formatting and search" },
      { value: "Dozens", label: "Fixture families", detail: "each with full technical detail" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "A catalogue where the catalogue is the product",
        body: [
          "Lumenac manufactures LED lighting: interior and exterior ranges across dozens of fixture families such as Venus, Stadium, Flow and Backlight, each carrying the technical detail a specifier actually reads.",
          "The visitor is usually an engineer or an architect looking for a specific specification, not a shopper browsing. And they are reading in Spanish, so a site built in English and translated afterwards would be the wrong way round.",
        ],
      },
      {
        kind: "approach",
        title: "Spanish-first, specification-first",
        body: [
          "Built as a Vue single-page application on a Node backend, with product search, a downloadable catalogue and a language switcher.",
          "Spanish is the primary locale rather than a translation layer, so copy, formatting and search behaviour were built for it from the start. A projects gallery of installed work sits alongside the catalogue, which for a manufacturer is the proof that the specification performs outside a datasheet.",
        ],
        points: [
          "Vue single-page application over a Node and MySQL backend",
          "Product search across fixture families and technical attributes",
          "Downloadable catalogue for specifiers who work offline",
          "Spanish-first locale, with a language switcher rather than a translation layer",
          "Projects gallery of installed work as technical proof",
        ],
        aside: {
          title: "Why Spanish-first matters",
          body: "Search and formatting built for English and translated afterwards behave subtly wrongly in another locale. Building for the primary market first is cheaper than retrofitting it.",
        },
      },
      {
        kind: "outcome",
        title: "A catalogue a specifier can actually use",
        body: [
          "Engineers and architects search the full fixture range by technical attribute in their own language, download the catalogue, and see the installed work behind the specification.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["Vue.js", "Vue Router", "Pinia", "JavaScript", "SCSS"] },
      { group: "Backend", items: ["Node.js", "Express", "REST API", "MySQL", "Nginx"] },
      { group: "Localisation", items: ["i18n", "Spanish-first content"] },
    ],
    takeaways: [
      "Build for the primary locale first. Translating an English-first site into Spanish leaves search and formatting subtly wrong in the market that matters most.",
      "For a manufacturer, installed projects are the proof. A datasheet says what it should do; a photograph of a stadium says it did.",
    ],
  },

  {
    slug: "the-future-of-jewelry",
    category: "Headless Shopify",
    cover: "storefront",
    image: "/work/future-of-jewelry.jpg",
    title: "THEFUTUREOFJEWELRY",
    summary: "Headless Shopify with a real-time 3D jewelry configurator in React.",
    description:
      "A custom jewelry brand where every piece is configured in the browser before it is ordered. React drives the configurator, the marketing site is a separate static build, and Shopify handles the commerce behind it.",
    tags: ["Headless Shopify", "React", "Astro", "3D configurator"],
    live: "https://thefutureofjewelry.com/",
    featured: true,

    kicker: "Headless Shopify",
    statement:
      "Every ring on this store is designed by the customer before it exists, so the product page had to become a configurator rather than a gallery.",
    role: "Full build: 3D configurator, storefront and Shopify integration",
    timeline: "14 weeks to launch",
    team: "Lead engineer, two frontend engineers, product designer",
    metrics: [
      { value: "3D", label: "In-browser configurator", detail: "real time, no plugin" },
      { value: "3", label: "Customisable ranges", detail: "signets, pendants, bands" },
      { value: "6", label: "Options per piece", detail: "face, border, band, material, design, size" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "A made-to-order product does not fit a product page",
        body: [
          "The brand sells signet rings, pendants and bands that are made to order. A customer picks the face shape, the border, the band profile, the metal, the engraving and the size, and the piece is manufactured afterwards. That is not a variant matrix a normal Shopify product page can hold, and it is certainly not something a customer can imagine from a photo.",
          "Selling it needs the customer to see their exact piece before they buy, which means rendering the combination live rather than photographing every permutation.",
        ],
      },
      {
        kind: "approach",
        title: "A configurator app, with Shopify kept behind it",
        body: [
          "The configurator is its own React application, mounted at the customizer routes and built separately from the rest of the site. It renders the selected combination in 3D, updates the price as options change, and hands the finished specification to the cart.",
          "The marketing and content pages are a separate static build, so the pages that need to be fast and crawlable are not carrying the configurator's bundle. Only customers who reach the customizer download it.",
          "Shopify stays underneath as the commerce layer. Checkout, orders and payment are Shopify's problem, which is the correct division: the interesting work here is the configuration, and none of that is a good reason to rebuild a checkout.",
        ],
        points: [
          "React configurator with live 3D preview and per-option pricing",
          "Static marketing pages built separately, so they do not carry the app bundle",
          "Configured specification passed through to the cart as line-item detail",
          "Checkout left entirely to Shopify",
        ],
        aside: {
          title: "Why split the two builds",
          body: "A configurator is a heavy application. A homepage is a document. Serving them from the same bundle makes the marketing pages pay for a tool most visitors never open.",
        },
      },
      {
        kind: "outcome",
        title: "The product sells itself once you can spin it",
        body: [
          "Customers can now assemble a piece, rotate it, and see the engraving on the face before adding it to the cart. That removes the single biggest objection to buying made-to-order jewelry online, which is not knowing what will arrive.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "Vite", "Astro", "3D rendering"] },
      { group: "Commerce", items: ["Shopify", "Headless storefront", "Shopify checkout"] },
    ],
    takeaways: [
      "Made-to-order products need a configurator, not a variant list. The moment options multiply past a few dozen combinations, photography stops being an option.",
      "Splitting the marketing build from the application build keeps the pages that need SEO and speed away from the bundle that needs features.",
      "Headless is worth it when the product experience genuinely cannot be built in a theme. This is that case.",
    ],
  },

  {
    slug: "cob-foods",
    category: "Shopify",
    cover: "storefront",
    image: "/work/cob-foods.jpg",
    title: "Cob Foods",
    summary: "Custom Shopify theme for a snack brand with a very loud identity.",
    description:
      "A bold, illustration-led Shopify storefront for a popped sorghum snack brand, including subscriptions. Built as a custom theme rather than a theme-store purchase, so the brand's design survives contact with the platform.",
    tags: ["Shopify", "Custom theme", "Liquid", "Subscriptions"],
    live: "https://cobfoods.com/",
    featured: true,

    kicker: "Shopify theme",
    statement:
      "A snack brand with an identity this loud cannot be run on a bought theme, so the theme was built around the brand instead of the other way round.",
    role: "Custom Shopify theme, end to end",
    timeline: "7 weeks",
    team: "Lead engineer, frontend engineer, designer",
    metrics: [
      { value: "Custom", label: "Shopify theme", detail: "built from scratch, not theme store" },
      { value: "4", label: "Core flavours", detail: "plus limited-edition drops" },
      { value: "Yes", label: "Subscriptions", detail: "account and subscription flows" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "The brand is the product",
        body: [
          "Cob sells popped sorghum snacks into a category where the packaging does most of the selling. The identity is deliberately loud: a fat rounded wordmark, a cream and yellow palette, illustrated tins and a split-screen layout that puts the product photography against flat colour.",
          "That is the kind of design that a theme-store theme quietly flattens. Every section you cannot control becomes a compromise, and after enough compromises the site stops looking like the brand at all.",
        ],
      },
      {
        kind: "approach",
        title: "Build the theme around the identity",
        body: [
          "The storefront is a custom Shopify theme, so the layout follows the brand rather than the other way round. The split-screen hero, the shaped buttons, the announcement bar and the illustrated product presentation are all theme sections rather than things bolted on top of a template.",
          "Because it is a theme rather than a headless build, the merchant keeps everything Shopify gives them: the admin they already know, the app ecosystem, and subscriptions handled through the platform rather than through a custom billing layer. For a brand this size that is the right trade.",
        ],
        points: [
          "Custom theme, no theme-store base",
          "Split-screen hero and shaped brand components as reusable sections",
          "Subscription and account flows on Shopify's own rails",
          "Merchandising handled by the client from the theme editor",
        ],
        aside: {
          title: "Theme, not headless",
          body: "Headless would have bought speed and cost the app ecosystem and the merchant's familiarity with their own admin. For a brand selling four SKUs on strong design, a well-built theme is the better answer.",
        },
      },
      {
        kind: "outcome",
        title: "A store that looks like the tin",
        body: [
          "The storefront carries the same character as the packaging, which for a snack brand is most of the job. The client runs promotions, drops and limited editions from the theme editor without needing a developer.",
        ],
      },
    ],
    stack: [
      { group: "Theme", items: ["Shopify", "Liquid", "Custom sections", "JavaScript"] },
      { group: "Commerce", items: ["Shopify subscriptions", "Customer accounts"] },
    ],
    takeaways: [
      "A strong brand identity is an argument for a custom theme. Theme-store themes are built to be neutral, and neutral is the opposite of what this brand sells.",
      "Not every store should be headless. Keeping Cob on a theme kept the app ecosystem and the merchant's own admin, and neither was worth trading away.",
    ],
  },

  {
    slug: "holyrood-distillery",
    category: "WordPress",
    cover: "storefront",
    image: "/work/holyrood-distillery.jpg",
    title: "Holyrood Distillery",
    summary: "WooCommerce store, tour bookings and trade pricing for an Edinburgh distillery.",
    description:
      "A WordPress and WooCommerce build for a working whisky and gin distillery: bottle sales, distillery tour bookings, a cask ownership programme and role-based pricing for trade customers, on a custom Elementor theme.",
    tags: ["WordPress", "WooCommerce", "Elementor", "Custom theme"],
    live: "https://holyrooddistillery.co.uk/",

    kicker: "WordPress & WooCommerce",
    statement:
      "A distillery does not sell one thing. It sells bottles, tours, casks and trade orders, and all four had to live in one WooCommerce store.",
    role: "WordPress and WooCommerce build, plus integrations",
    timeline: "11 weeks",
    team: "Lead engineer, WordPress engineer, designer",
    metrics: [
      { value: "4", label: "Revenue streams", detail: "bottles, tours, casks, trade" },
      { value: "Trade", label: "Role-based pricing", detail: "separate rates per customer role" },
      { value: "Custom", label: "Theme", detail: "built on Elementor Pro, not a template" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "One site, four different things to sell",
        body: [
          "Holyrood is a working distillery in Edinburgh, and the site has to carry more than a product catalogue. There are bottles to sell, distillery tours and tastings to book onto specific dates, a cask ownership programme that is a considered purchase rather than an impulse one, and trade customers who should never see the same prices as the public.",
          "Those are four different buying behaviours. Treating them as one product grid would have made the site worse at all of them.",
        ],
      },
      {
        kind: "approach",
        title: "WooCommerce for the commerce, plugins chosen deliberately",
        body: [
          "Retail sales run on WooCommerce with quantity rules on the bottle products, because spirits sell by the bottle and by the case and the two need different minimums and increments.",
          "Trade pricing uses role-based pricing rather than a separate wholesale store. A trade customer logs in and sees their rates on the same catalogue everyone else browses, which avoids maintaining two stores that inevitably drift apart.",
          "Tours and tastings are scheduled events rather than products with a stock count, so they run through a proper events calendar with dates and capacity instead of being forced into a product template.",
          "The front end is a custom child theme on Elementor Pro, so the distillery's marketing team can build and edit campaign pages without a developer, which is the usual reason WordPress gets chosen for a brand like this.",
        ],
        points: [
          "WooCommerce catalogue with per-product quantity and case rules",
          "Role-based pricing so trade customers see their own rates",
          "Events calendar for tours and tastings with dates and capacity",
          "Cask ownership programme as its own considered-purchase journey",
          "Custom child theme on Elementor Pro for marketing-owned pages",
          "Mailchimp for WooCommerce connected for lifecycle email",
        ],
        aside: {
          title: "Why not a separate trade store",
          body: "Two stores means two catalogues, and two catalogues drift. Role-based pricing keeps one source of truth and changes what a logged-in customer sees, which is the actual requirement.",
        },
      },
      {
        kind: "outcome",
        title: "Bottles, tours and casks in one place",
        body: [
          "The distillery runs retail, tour bookings, its cask programme and trade ordering from a single WordPress install, and the marketing team builds its own campaign pages on the theme.",
        ],
      },
    ],
    stack: [
      { group: "Platform", items: ["WordPress", "WooCommerce", "PHP"] },
      { group: "Theme", items: ["Custom child theme", "Elementor Pro"] },
      { group: "Commerce", items: ["Role-based pricing", "Quantity rules", "Events calendar", "Mailchimp"] },
    ],
    takeaways: [
      "When a business has several revenue streams, model them as different journeys. Forcing tours and casks into a product grid makes the store worse at selling both.",
      "Role-based pricing beats a second wholesale store. One catalogue, different rates, nothing to keep in sync.",
      "If the client's marketing team cannot build a landing page, WordPress was the wrong choice for them.",
    ],
  },

  {
    slug: "darwin-group",
    category: "WordPress",
    cover: "storefront",
    image: "/work/darwin-group.jpg",
    title: "Darwin Group",
    summary: "WordPress marketing site for a modular healthcare construction firm.",
    description:
      "A content-led WordPress build for a company delivering permanent-grade modular healthcare facilities, with a custom Elementor theme so the marketing team owns every page.",
    tags: ["WordPress", "Elementor", "Custom theme", "Content site"],
    live: "https://www.darwingroup.co.uk/",

    kicker: "WordPress",
    statement:
      "A long sales cycle sells on credibility, so the site's job was proof: case studies, standards and specifics, all editable by the people who write them.",
    role: "WordPress build and theme architecture",
    timeline: "8 weeks",
    team: "WordPress engineer, designer",
    metrics: [
      { value: "B2B", label: "Long-cycle sales", detail: "healthcare estates and NHS trusts" },
      { value: "Custom", label: "Theme", detail: "built on Elementor, not a template" },
      { value: "7", label: "Plugins", detail: "a deliberately small stack" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Nobody buys a hospital building from a web form",
        body: [
          "Darwin Group designs and delivers modular healthcare facilities. The buyer is an NHS trust or a healthcare estates team, the decision takes months, and several people have to be convinced along the way.",
          "That makes the site a credibility instrument rather than a conversion funnel. It has to explain a technical proposition, evidence it with completed projects and standards, and stay current as new work completes, without a developer being involved every time.",
        ],
      },
      {
        kind: "approach",
        title: "A content site the marketing team actually owns",
        body: [
          "WordPress with a custom child theme built on Elementor, so every page is composed by the marketing team from components rather than hard-coded into templates. For a business publishing new case studies and news regularly, that ownership is the whole point.",
          "The plugin stack is deliberately small: a form plugin, analytics, and the Elementor addons the theme depends on. Seven in total. On a brochure site every additional plugin is attack surface and page weight bought in exchange for something the theme could usually do itself.",
          "The visual language leans hard on photography of real facilities, because in this market the proof is the building.",
        ],
        points: [
          "Custom child theme on Elementor, marketing-owned page building",
          "Deliberately minimal plugin stack",
          "Case study and news structure that stays current without developer time",
          "Contact and enquiry routing for a long B2B sales cycle",
        ],
        aside: {
          title: "Restraint as a feature",
          body: "Seven plugins on a content site of this size is a choice. Most WordPress builds this age carry three or four times that, and every one of them is something to update, patch and eventually blame.",
        },
      },
      {
        kind: "outcome",
        title: "Publishing without a developer in the loop",
        body: [
          "The marketing team publishes case studies, news and new service pages themselves, which is what keeps a credibility-led site credible: it stays current.",
        ],
      },
    ],
    stack: [
      { group: "Platform", items: ["WordPress", "PHP"] },
      { group: "Theme", items: ["Custom child theme", "Elementor Pro"] },
      { group: "Tooling", items: ["Contact Form 7", "Google Analytics", "WebP delivery"] },
    ],
    takeaways: [
      "A long B2B sales cycle needs evidence, not a funnel. The site's job is to be quotable in a procurement meeting.",
      "Count the plugins. Seven on a content site is a decision; thirty is an accident nobody made on purpose.",
    ],
  },
  {
    slug: "beond",
    category: "Web platform",
    cover: "storefront",
    image: "/work/beond.jpg",
    title: "Beond",
    summary: "Next.js and Contentful booking site for a premium Maldives airline.",
    description:
      "A headless Next.js frontend over Contentful and the airline's own booking APIs, carrying flight search, holidays, manage booking, check-in and flight status in one multilingual site.",
    tags: ["Next.js", "Contentful", "Headless", "Booking platform"],
    live: "https://flybeond.com/",

    kicker: "Headless booking platform",
    statement:
      "A booking engine and a brand site have opposite requirements, and this one had to be both without either half compromising the other.",
    role: "Frontend team on the booking platform and marketing site",
    timeline: "6 months, then ongoing retainer",
    team: "Lead engineer, two frontend engineers, QA",
    metrics: [
      { value: "5", label: "Booking journeys", detail: "search, holidays, manage, check-in, status" },
      { value: "Contentful", label: "Content layer", detail: "marketing owns the editorial pages" },
      { value: "Multi", label: "Languages", detail: "localised across markets" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Two products sharing one homepage",
        body: [
          "Beond flies premium routes to the Maldives, and the site has to do two quite different jobs at once. It is a booking engine: search flights, manage an existing booking, check in, look up flight status. It is also the brand's shop window, where an expensive proposition gets sold with photography and copy.",
          "Those pull in opposite directions. A booking engine is an application with state, validation and live availability. A brand site is editorial content that marketing needs to change without a release.",
        ],
      },
      {
        kind: "approach",
        title: "Next.js in front, Contentful for the words, the airline's APIs for the seats",
        body: [
          "The front end is Next.js. Editorial content lives in Contentful, so destination pages, the holidays offering and campaign content are all edited by the marketing team rather than deployed by a developer.",
          "Booking runs against the airline's own APIs. The search widget on the homepage is the entry point to that, with the other journeys (manage booking, check-in, flight status) sitting alongside it as tabs rather than being buried in a menu, because those are the tasks returning passengers actually arrive to do.",
          "Multilingual support is handled at the content layer, so adding a market is a content exercise rather than a rebuild.",
        ],
        points: [
          "Next.js frontend with server rendering for the marketing pages",
          "Contentful as the content layer, marketing owns editorial",
          "Booking, manage, check-in and flight status against the airline's APIs",
          "Multilingual content model for market expansion",
        ],
        aside: {
          title: "Why the tabs matter",
          body: "Most airline traffic is not people booking. It is people checking in or checking a flight. Putting those on the homepage rather than in a submenu is the single highest-value layout decision on a site like this.",
        },
      },
      {
        kind: "outcome",
        title: "One site doing both jobs",
        body: [
          "The marketing team publishes destination and campaign content without developer involvement, while the booking journeys run against live airline systems on the same front end.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript"] },
      { group: "Content", items: ["Contentful", "Multilingual model"] },
      { group: "Integrations", items: ["Booking APIs", "Vimeo", "GA4"] },
    ],
    takeaways: [
      "When a site is both an application and a brochure, split the content layer from the transactional one. Marketing should never wait on a release to change a headline.",
      "Surface the tasks returning users actually arrive for. On an airline site that is check-in and flight status, not booking.",
    ],
  },

  {
    slug: "beast-health",
    category: "Shopify",
    cover: "storefront",
    image: "/work/beast-health.jpg",
    title: "Beast Health",
    summary: "Custom Shopify theme for a blender brand selling across markets.",
    description:
      "A heavily customised Shopify 2.0 theme for the Beast blender, running localised storefronts through Shopify Markets with region-specific merchandising and promotions.",
    tags: ["Shopify", "Custom theme", "Shopify Markets", "Multi-region"],
    live: "https://thebeast.com/",

    kicker: "Shopify theme",
    statement:
      "One product, sold hard, in several countries at once: the theme's job was to make each market feel like it was built for that market.",
    role: "Custom Shopify 2.0 theme and multi-market setup",
    timeline: "9 weeks",
    team: "Lead engineer, frontend engineer",
    metrics: [
      { value: "Multi", label: "Markets", detail: "localised storefronts per region" },
      { value: "Custom", label: "Theme", detail: "Shopify 2.0, not a theme-store build" },
      { value: "DTC", label: "Single-product focus", detail: "conversion-led merchandising" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "A design-led product needs a design-led store",
        body: [
          "Beast sells a blender that is bought on design and performance rather than on price, which means the store has to carry a lot of visual weight: full-bleed video, product photography, and a merchandising flow that builds a case rather than listing specs.",
          "It also sells into multiple countries, and each market needs its own language, currency, promotions and shipping messaging. That is not something you bolt on afterwards.",
        ],
      },
      {
        kind: "approach",
        title: "Custom Shopify 2.0 theme with Markets underneath",
        body: [
          "The storefront is a custom Shopify 2.0 theme rather than a theme-store purchase, so the layout follows the brand: video-led hero, full-width product storytelling, and a promotion bar that carries market-specific offers.",
          "Localisation runs on Shopify Markets, so each region gets its own language, currency and merchandising while sharing one catalogue and one admin. The market is selected automatically, which is the correct default even though it means the site you see depends on where you are.",
          "Because it is a theme rather than a headless build, the client keeps Shopify's app ecosystem and the admin their team already knows, which for a DTC brand running frequent promotions matters more than a Lighthouse point.",
        ],
        points: [
          "Custom Shopify 2.0 theme with sections built around video and photography",
          "Shopify Markets for per-region language, currency and promotions",
          "Market-specific announcement and promotion messaging",
          "One catalogue and one admin across regions",
        ],
        aside: {
          title: "Verified from the outside",
          body: "Loading the store from outside the US serves a fully localised regional storefront rather than a translated shell, which is Markets doing its job properly.",
        },
      },
      {
        kind: "outcome",
        title: "A store that ships in several languages from one admin",
        body: [
          "The brand runs regional storefronts with their own language, pricing and promotions without maintaining separate stores, and the marketing team merchandises all of them from a single Shopify admin.",
        ],
      },
    ],
    stack: [
      { group: "Platform", items: ["Shopify", "Liquid", "Online Store 2.0"] },
      { group: "Localisation", items: ["Shopify Markets", "Multi-currency", "Translated content"] },
    ],
    takeaways: [
      "Shopify Markets beats running a store per country. One catalogue, one admin, and localisation handled by the platform rather than by a sync job.",
      "For a single-product DTC brand, the theme is the pitch. Sections have to be built for storytelling, not for listing a catalogue.",
    ],
  },

  {
    slug: "wonderful-dental",
    category: "Shopify",
    cover: "storefront",
    image: "/work/wonderful-dental.jpg",
    title: "Wonderful Dental",
    summary: "Illustration-led Shopify store built on a performance-tuned Dawn theme.",
    description:
      "A heavily customised Dawn theme for a dental care brand with a hand-illustrated identity, including a free samples funnel and a fallback ordering path for customers who hit trouble.",
    tags: ["Shopify", "Dawn theme", "Custom theme", "CRO"],
    live: "https://wonderfuldental.com/",

    kicker: "Shopify theme",
    statement:
      "An illustrated, theatrical storefront on top of Dawn, with a plain ordering path kept alive underneath it for anyone the theatre gets in the way of.",
    role: "Shopify theme build and conversion work",
    timeline: "6 weeks",
    team: "Frontend engineer, designer",
    metrics: [
      { value: "Dawn", label: "Theme base", detail: "customised well past recognition" },
      { value: "2", label: "Ordering paths", detail: "illustrated flow plus a classic fallback" },
      { value: "Samples", label: "Acquisition funnel", detail: "free samples as the entry point" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Dental care is a boring category to sell",
        body: [
          "Toothpaste and floss are commodity purchases with strong incumbents. Competing on specification is a losing game, so the brand competes on personality: a hand-illustrated world with a theatre, characters and a tone that has nothing in common with the rest of the category.",
          "That is a lot of art direction to hang on a storefront, and art direction is exactly the thing that usually breaks conversion.",
        ],
      },
      {
        kind: "approach",
        title: "Build the theatre, keep the fire exit",
        body: [
          "The storefront is built on Shopify's Dawn theme, customised far past its origins: illustrated full-bleed scenes, a large single call to action, and a free samples offer positioned as the low-commitment entry point rather than buried in a menu.",
          "The detail we would point at is the fallback. Sitting under the illustrated experience is a link to a classic shopping experience for anyone having trouble ordering. That is an unglamorous decision and a correct one: an expressive storefront will always fail somebody, whether through an older browser, assistive tech or a slow connection, and losing that order is worse than admitting the possibility.",
          "Building on Dawn rather than a premium theme keeps the store close to Shopify's own defaults, which is what makes it cheap to keep current when Shopify moves.",
        ],
        points: [
          "Dawn as the base, customised into an illustration-led experience",
          "Free samples funnel as the low-commitment entry point",
          "Classic shopping fallback for customers who hit trouble",
          "Single dominant call to action rather than a product grid",
        ],
        aside: {
          title: "The fire exit",
          body: "Offering a plain ordering path under an expressive one is a mature decision. It concedes that the fancy version will fail some customers, and keeps their money anyway.",
        },
      },
      {
        kind: "outcome",
        title: "A commodity product with a brand you remember",
        body: [
          "The store carries the brand's illustrated world without giving up a conventional path to purchase, and the samples offer gives first-time visitors something to say yes to before they commit to a subscription.",
        ],
      },
    ],
    stack: [
      { group: "Platform", items: ["Shopify", "Liquid", "Dawn", "Online Store 2.0"] },
      { group: "Conversion", items: ["Samples funnel", "Fallback ordering path"] },
    ],
    takeaways: [
      "In a commodity category the brand is the differentiator, and the storefront has to carry it rather than apologise for it.",
      "Always keep a plain path to purchase under an expressive one. Some customers will need it, and they are still customers.",
    ],
  },

  {
    slug: "mojibricks",
    category: "Shopify",
    cover: "collection",
    image: "/work/mojibricks.jpg",
    title: "Mojibricks",
    summary: "Shopify toy store rebranded on the Impact theme.",
    description:
      "A children's toy and building-set store on Shopify, rebuilt as a rebrand of the Impact theme with promotion-led merchandising and a collection structure for a broad, mixed catalogue.",
    tags: ["Shopify", "Impact theme", "Merchandising", "Ecommerce"],
    live: "https://mojibricks.com/",

    kicker: "Shopify store",
    statement:
      "A broad toy catalogue sold on promotions and trust signals, structured so a parent can find the right age range in two clicks.",
    role: "Shopify rebuild and merchandising structure",
    timeline: "5 weeks",
    team: "Frontend engineer, designer",
    metrics: [
      { value: "Impact", label: "Theme base", detail: "rebranded and restructured" },
      { value: "Promo", label: "Merchandising-led", detail: "campaign banners and best sellers" },
      { value: "Trust", label: "Signals on the hero", detail: "safety, quality, shipping" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Selling toys to parents, not to children",
        body: [
          "The catalogue spans soft toys, ride-ons, drawing tablets and collector building sets, which is a wide range with no single obvious navigation. The buyer is a parent making a judgement about safety and quality for someone else, usually against a deadline like a birthday.",
          "That means two things the storefront has to do quickly: get them to the right category, and answer the trust question before they have to ask it.",
        ],
      },
      {
        kind: "approach",
        title: "Promotion-led hero, category-led navigation",
        body: [
          "The store is built on Shopify's Impact theme, rebranded and restructured rather than used as shipped. The hero leads with the current promotion, because in this category discount is a genuine motivator and hiding it wastes the fold.",
          "Directly under the offer sit four trust signals: safe and durable, premium quality, fast shipping, and a small-business note. Those answer the parent's actual questions in the same glance as the discount, rather than making them hunt for a policy page.",
          "Navigation splits the catalogue by how people shop it rather than by internal taxonomy, with collector building sets separated from general toys because those are two different buyers.",
        ],
        points: [
          "Impact theme rebranded and restructured for the catalogue",
          "Promotion-led hero with best sellers as the entry point",
          "Trust signals surfaced above the fold",
          "Collections split by shopper intent, not internal categories",
        ],
      },
      {
        kind: "outcome",
        title: "A wide catalogue that stays navigable",
        body: [
          "The store handles a broad, mixed range without the navigation collapsing, and the client runs promotions and seasonal campaigns from the theme editor.",
        ],
      },
    ],
    stack: [
      { group: "Platform", items: ["Shopify", "Liquid", "Impact theme"] },
      { group: "Merchandising", items: ["Collections", "Promotion banners", "Best sellers"] },
    ],
    takeaways: [
      "When the buyer is purchasing for someone else, answer the trust question above the fold. They will not go looking for it.",
      "Structure collections by how people shop, not by how the catalogue is organised internally.",
    ],
  },

  {
    slug: "black-tie-cbd",
    category: "Headless Shopify",
    cover: "collection",
    image: "/work/black-tie-cbd.jpg",
    title: "Black Tie CBD",
    summary: "Webflow storefront wired to Shopify for a restricted category.",
    description:
      "A THCA and hemp retailer running a Webflow front end with Shopify handling cart and checkout, plus an age gate, Klaviyo lifecycle email and an affiliate programme.",
    tags: ["Webflow", "Shopify", "Klaviyo", "Restricted category"],
    live: "https://www.blacktiecbd.net/",

    kicker: "Webflow + Shopify",
    statement:
      "Selling a restricted category means the platform choice is a compliance decision, so the front end and the checkout came from two different products on purpose.",
    role: "Webflow front end wired to Shopify commerce",
    timeline: "7 weeks",
    team: "Lead engineer, frontend engineer, designer",
    metrics: [
      { value: "21+", label: "Age gate", detail: "enforced before the storefront loads" },
      { value: "2", label: "Platforms, one store", detail: "Webflow front end, Shopify checkout" },
      { value: "Affiliate", label: "Programme integrated", detail: "plus Klaviyo lifecycle email" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "A category most platforms would rather not host",
        body: [
          "THCA flower, concentrates and edibles sit in a regulated, restricted category. Payment processors, ad platforms and ecommerce platforms all have opinions about it, and those opinions change.",
          "On top of that, the brand competes on presentation. It is an award-winning product sold with dark, cinematic art direction, so the storefront needs real design freedom rather than whatever a template allows.",
        ],
      },
      {
        kind: "approach",
        title: "Webflow for the front end, Shopify for the money",
        body: [
          "The site is built in Webflow, which gives the design freedom and lets the client's team edit pages directly. Commerce runs through Shopify underneath, so cart, checkout, orders and customer accounts sit on infrastructure built for it rather than on a website builder's bolted-on store.",
          "That split is the whole point. Presentation and compliance have different requirements, and giving each to the tool that handles it best is more robust than forcing one platform to do both.",
          "An age gate runs before the storefront is reachable, which the category requires. Klaviyo handles lifecycle email and the on-site capture, and an affiliate programme is integrated for the referral channel that categories like this lean on when paid advertising is restricted.",
        ],
        points: [
          "Webflow front end for design freedom and client-editable pages",
          "Shopify for cart, checkout, orders and accounts",
          "Age verification gate before the storefront loads",
          "Klaviyo lifecycle email and on-site capture",
          "Affiliate programme integration for a restricted-ads category",
        ],
        aside: {
          title: "Why not just Shopify",
          body: "Design freedom, mostly. And splitting presentation from checkout means a change on either side does not put the other at risk, which matters more than usual in a category where the rules move.",
        },
      },
      {
        kind: "outcome",
        title: "Design freedom without giving up a real checkout",
        body: [
          "The brand gets a storefront that looks nothing like a template, on a checkout built for selling, with the compliance requirements of the category handled at the front door.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["Webflow", "Custom JavaScript"] },
      { group: "Commerce", items: ["Shopify", "Cart & checkout", "Customer accounts"] },
      { group: "Growth", items: ["Klaviyo", "Affiliate programme", "GA4"] },
    ],
    takeaways: [
      "In a restricted category the platform choice is a compliance decision first and a design decision second.",
      "Splitting the front end from the checkout is a legitimate architecture, not a compromise, when the two have genuinely different requirements.",
    ],
  },
  {
    slug: "business-brokerage-services",
    category: "WordPress",
    cover: "collection",
    image: "/work/business-brokerage.jpg",
    title: "Business Brokerage Services",
    summary: "WordPress listing portal and accounts for a Denver business brokerage.",
    description:
      "The public site for a 20-year business brokerage: searchable listings of businesses for sale, buyer accounts, seller enquiry capture and an exit planning funnel, on WordPress with Elementor.",
    tags: ["WordPress", "Elementor", "Listings portal", "Brokerage"],
    live: "https://denverbbs.com/",

    kicker: "Brokerage platform",
    statement:
      "Selling a business is a confidential, months-long process, so the site's job is to qualify both sides before anyone picks up the phone.",
    role: "Owned the frontend and the integration layer",
    timeline: "Jul 2024 to present",
    team: "Lead engineer plus designer, working with the brokerage's marketing lead",
    metrics: [
      { value: "2", label: "Audiences, one site", detail: "buyers browsing, sellers enquiring" },
      { value: "Accounts", label: "Buyer registration", detail: "gating detailed listing data" },
      { value: "20yr", label: "Brokerage credibility", detail: "carried through the design" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Two audiences who must not see the same thing",
        body: [
          "A business brokerage serves two sides at once. Buyers want to browse what is for sale in detail. Sellers want discretion, because a leaked sale process unsettles staff, customers and suppliers.",
          "That tension shapes everything. Listings have to be public enough to attract buyers and vague enough to protect the seller, with the detail released only to someone who has registered and identified themselves.",
        ],
      },
      {
        kind: "approach",
        title: "Public teaser, gated detail, separate seller path",
        body: [
          "Listings are browsable publicly at a summary level, with buyer accounts gating the detail. Registration is the qualification step: it converts an anonymous browser into a named lead the brokers can work, and it gives the seller the confidentiality the process requires.",
          "The seller journey is deliberately separate. Sell My Business and Exit Planning are their own routes rather than a form on the listings page, because someone considering selling is at a completely different stage from someone shopping.",
          "The build is WordPress with Elementor, which puts the content in the marketing lead's hands. For a brokerage publishing new listings and market commentary continuously, waiting on a developer would have been the bottleneck.",
        ],
        points: [
          "Public listing summaries with account-gated detail",
          "Buyer registration and sign-in as the qualification step",
          "Separate seller and exit-planning journeys",
          "WordPress and Elementor so the marketing lead owns the pages",
        ],
        aside: {
          title: "Registration as qualification",
          body: "Gating listing detail behind an account is not a growth hack here. It is how the brokerage keeps a sale confidential while still advertising it, and it produces a named lead as a side effect.",
        },
      },
      {
        kind: "outcome",
        title: "Listings that advertise without exposing",
        body: [
          "The brokerage publishes and updates listings itself, buyers self-qualify by registering, and the seller-side content runs as its own funnel rather than competing with the buyer experience.",
        ],
      },
    ],
    stack: [
      { group: "Platform", items: ["WordPress", "Elementor", "PHP"] },
      { group: "Features", items: ["Listing search", "Buyer accounts", "Enquiry routing"] },
    ],
    takeaways: [
      "When two audiences want opposite things from the same content, split the journeys rather than compromising on one page.",
      "Gating detail behind registration can serve the client's confidentiality obligation and lead qualification at the same time.",
    ],
  },

  {
    slug: "scott-curcio",
    category: "WordPress",
    cover: "collection",
    image: "/work/scott-curcio.jpg",
    title: "Scott Curcio Residential",
    summary: "WordPress site with IDX property search for a Chicago luxury agent.",
    description:
      "A luxury real estate agent site on a custom WordPress theme, with live MLS listings through an IDX integration, price and bed filters, community pages and appointment booking.",
    tags: ["WordPress", "Real estate", "IDX", "Custom theme"],
    live: "https://scottcurcio.com/",

    kicker: "Real estate",
    statement:
      "A luxury agent competes on personal reputation, so the site has to carry the brand and still show every listing on the market.",
    role: "Custom WordPress theme and IDX integration",
    timeline: "6 weeks",
    team: "WordPress engineer, designer",
    metrics: [
      { value: "IDX", label: "Live MLS listings", detail: "via iHomeFinder" },
      { value: "4", label: "Search filters", detail: "price, beds, baths, area" },
      { value: "Custom", label: "Theme", detail: "built for the agent's brand" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Every agent shows the same listings",
        body: [
          "Residential property is an odd market to build for. Every agent in the city can show essentially the same MLS inventory, so the listings are not the differentiator. The agent is.",
          "That leaves two requirements pulling apart: the site must feel like a personal, high-end brand, and it must also be a functional property search that stays current with a feed nobody controls.",
        ],
      },
      {
        kind: "approach",
        title: "Brand on top, IDX underneath",
        body: [
          "Listings come in through an IDX integration, so search results reflect live MLS data rather than a manually maintained list that goes stale the week after launch. Buyers filter on the things they actually filter on: price range, beds, baths and area.",
          "Everything around that is brand. A custom WordPress theme carries the agent's identity, community guides position him as the local expert, and press coverage does the credibility work that a logo cannot.",
          "Appointment booking and newsletter signup sit persistently in the layout rather than only on a contact page, because in this market the conversion is a conversation, not a purchase.",
        ],
        points: [
          "IDX integration for live MLS listings and search",
          "Price, bed, bath and area filtering",
          "Community and neighbourhood guides for local search",
          "Persistent appointment booking and newsletter capture",
          "Custom WordPress theme rather than an agent template",
        ],
        aside: {
          title: "Why not just use a template",
          body: "Agent templates all look like agent templates. When the listings are identical across every competitor, the presentation is the only thing left to compete on.",
        },
      },
      {
        kind: "outcome",
        title: "A brand site that happens to be a property portal",
        body: [
          "The site carries the agent's brand while staying a functional, current property search, and enquiries route to a booked appointment rather than an unattended inbox.",
        ],
      },
    ],
    stack: [
      { group: "Platform", items: ["WordPress", "PHP", "Custom theme"] },
      { group: "Listings", items: ["IDX integration", "MLS feed", "Property search"] },
    ],
    takeaways: [
      "When every competitor shows the same inventory, the brand is the product and the listings are table stakes.",
      "IDX beats a hand-maintained listing list. Property data goes stale faster than anyone keeps up with.",
    ],
  },

  {
    slug: "sentral",
    category: "Headless WordPress",
    cover: "collection",
    image: "/work/sentral.jpg",
    title: "Sentral",
    summary: "Headless WordPress booking site for a flexible-living apartment operator.",
    description:
      "A multi-city React frontend over a headless WordPress backend for an apartment operator selling nightly, monthly and long-term stays in the same buildings, with location search, a rewards programme and a separate real estate track.",
    tags: ["Headless WordPress", "React", "Booking platform", "Multi-location"],
    live: "https://sentral.com/",

    kicker: "Flexible living",
    statement:
      "The same apartment is sold three ways depending on how long you want it, and the site has to make that a choice rather than a confusion.",
    role: "Frontend team on the booking experience",
    timeline: "5 months",
    team: "Lead engineer, two frontend engineers",
    metrics: [
      { value: "3", label: "Stay lengths", detail: "nightly, monthly, long-term" },
      { value: "Multi", label: "Cities", detail: "location-led search" },
      { value: "Headless", label: "WordPress backend", detail: "property content per building" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "One building, three different customers",
        body: [
          "Sentral operates apartment buildings that serve travellers wanting a few nights, professionals wanting a few months, and residents signing a lease. Same units, three completely different purchase decisions.",
          "There is also a fourth audience: real estate partners and investors, who need the operator's credentials rather than a booking flow.",
          "Fitting all of that into one homepage without it becoming a menu of menus is the actual design problem.",
        ],
      },
      {
        kind: "approach",
        title: "Lead with location, branch by intent",
        body: [
          "The homepage leads with a single location selector, because whichever customer you are, the first question is which city. Stay length branches after that rather than before it, which keeps the entry point simple.",
          "Property content is managed in WordPress and consumed headlessly, so each building's description, amenities and imagery are maintained by the operations team in an admin they already know. Opening a new location is a content task rather than a release.",
          "Real estate sits in the main navigation as its own destination rather than being buried in a footer, because that audience arrives deliberately and should not have to hunt.",
          "A rewards programme threads through the experience for the repeat-stay segment, which is where the margin is in flexible living.",
        ],
        points: [
          "Location-first search as the single entry point",
          "Stay length as a branch after location, not before",
          "Headless WordPress for per-building content and amenities",
          "Separate real estate track for partners and investors",
          "Rewards programme for repeat stays",
        ],
        aside: {
          title: "Order of questions",
          body: "Asking city before stay length is the whole trick. Reverse it and every customer has to classify themselves before they can look at anything.",
        },
      },
      {
        kind: "outcome",
        title: "Three products, one coherent front door",
        body: [
          "Travellers, monthly stayers and residents all start in the same place and end up in the right flow, while the operations team manages the property content itself.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "JavaScript", "Responsive UI"] },
      { group: "Content", items: ["Headless WordPress", "WP REST or GraphQL", "Per-property content model"] },
      { group: "Tooling", items: ["Sentry", "GA4", "Accessibility overlay"] },
    ],
    takeaways: [
      "When one inventory serves several intents, branch after the question everyone shares rather than making people self-classify first.",
      "A content layer is what makes opening a new location a content task instead of a release.",
    ],
  },

  {
    slug: "sonder",
    category: "Web platform",
    cover: "collection",
    image: "/work/sonder.jpg",
    title: "Sonder",
    summary: "Booking frontend for a boutique hotel and apartment-stay operator.",
    description:
      "A hospitality booking site spanning boutique hotels and apartment-style stays across many cities, with location search, editorial collections and distribution through the major OTAs.",
    tags: ["Booking platform", "Hospitality", "Multi-city", "Frontend"],
    live: "https://sonder.com/",

    kicker: "Hospitality",
    statement:
      "Competing with Booking.com while also selling through it means the direct site has to be worth choosing on something other than inventory.",
    role: "Frontend engineering on the direct booking site",
    timeline: "4 months",
    team: "Two frontend engineers, designer",
    metrics: [
      { value: "2", label: "Property types", detail: "boutique hotels and apartments" },
      { value: "8+", label: "OTA channels", detail: "Booking.com, Expedia, Vrbo and more" },
      { value: "Direct", label: "Booking focus", detail: "editorial-led discovery" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "You cannot out-inventory the OTAs",
        body: [
          "Sonder sells through Booking.com, Expedia, Vrbo and half a dozen other channels, and those channels are also its competitors on the direct site. Nobody wins that fight on inventory or on search UX, because the OTAs have spent a decade and a fortune on both.",
          "The direct site therefore has to earn the booking on something else: brand, curation and the parts of the experience an OTA listing cannot convey.",
        ],
      },
      {
        kind: "approach",
        title: "Sell the stay, not the search results",
        body: [
          "The site leads with editorial rather than a filter panel. Collections and curated groupings do the work an OTA cannot: they present a stay as a choice with a point of view instead of a row in a results table.",
          "Search is present and prominent, filtered by apartments, boutique hotels or both, but it is not the only entry point. Someone who does not yet know which city they want is served by the editorial route instead of being dead-ended at an empty search.",
          "OTA partner logos sit directly under the fold. Listing your competitors on your own homepage is counterintuitive and correct: it borrows their trust for a brand the visitor may not know yet.",
        ],
        points: [
          "Editorial collections as a discovery path alongside search",
          "Property type filter across hotels and apartments",
          "OTA partner logos as trust transfer",
          "Multi-city inventory with location-led search",
        ],
        aside: {
          title: "Borrowing trust",
          body: "Showing Booking.com and Expedia on your own site looks like sending customers away. It is actually telling a first-time visitor that a platform they already trust has vetted you.",
        },
      },
      {
        kind: "outcome",
        title: "A direct channel with a reason to exist",
        body: [
          "The direct site competes on curation and brand rather than trying to beat the OTAs at a search problem they have already solved.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "JavaScript", "Responsive UI"] },
      { group: "Commerce", items: ["Booking flow", "Multi-city inventory", "OTA distribution"] },
    ],
    takeaways: [
      "If you distribute through the platforms you compete with, the direct channel has to win on brand and curation, not on search.",
      "Showing the OTAs you sell through borrows their trust rather than leaking traffic to them.",
    ],
  },

  {
    slug: "hello-landing",
    cover: "collection",
    category: "Headless WordPress",
    image: "/work/land.png",
    title: "Landing",
    summary: "React frontend on headless WordPress for a US furnished-apartment network.",
    description:
      "A membership furnished-apartment network offering flexible stays across US cities, with city and duration search, a corporate housing track and a supply-side partner funnel, built as React over headless WordPress.",
    tags: ["Headless WordPress", "React", "Rentals", "Membership"],
    live: "https://www.hellolanding.com/",

    kicker: "Flexible rentals",
    statement:
      "Furnished apartments rented by the week, the month or indefinitely, which means the search has to ask how long before it can show a price.",
    role: "Frontend engineering across search and the three funnels",
    timeline: "5 months",
    team: "Lead engineer, frontend engineer",
    metrics: [
      { value: "3", label: "Audiences", detail: "renters, corporate, property partners" },
      { value: "Duration", label: "Search dimension", detail: "alongside city and dates" },
      { value: "24/7", label: "Support model", detail: "surfaced site-wide" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Duration is the variable everything else depends on",
        body: [
          "Landing rents furnished apartments for a week, a month, or as long as someone needs. That single fact reshapes the search: on a normal rental site the question is where and when, but here the answer changes entirely depending on how long you intend to stay.",
          "There are also three audiences pulling on the same site. Individuals booking a stay, companies arranging corporate housing for relocating staff, and property owners who want their units in the network. Those are three completely different conversations.",
        ],
      },
      {
        kind: "approach",
        title: "Put duration in the search bar, split the rest into tracks",
        body: [
          "Duration sits in the primary search alongside city and check-in rather than being a filter applied afterwards. Where, When, Duration, Search: the commitment length is asked up front because pricing and availability both hang off it.",
          "Corporate Housing and Partner with Us are separate destinations in the main navigation, not buried in a footer. A relocation manager and a property owner both arrive deliberately, and neither is served by a consumer booking flow.",
          "The frontend is React, handling search, browsing and the signup flows. Content runs headlessly out of WordPress, so city pages, guides and the marketing copy around all three tracks are published by the content team without touching the application. On a site where the marketing content changes far more often than the booking logic, that separation is what keeps both maintainable.",
        ],
        points: [
          "Duration as a first-class search input, not a post-search filter",
          "Separate corporate housing and property-partner tracks",
          "React frontend for search, browsing and signup",
          "Headless WordPress for city pages and marketing content",
          "24/7 support surfaced site-wide, since flexible stays generate questions",
        ],
        aside: {
          title: "Why headless here",
          body: "The booking application changes rarely; the city and marketing content changes constantly. Coupling them means every copy edit rides a release, which is the thing headless WordPress genuinely solves.",
        },
      },
      {
        kind: "outcome",
        title: "One site serving renters, employers and landlords",
        body: [
          "All three audiences start from the same homepage and reach their own flow, while the content team publishes city and marketing content independently of the application.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "JavaScript", "Responsive UI"] },
      { group: "Content", items: ["Headless WordPress", "WP REST or GraphQL"] },
      { group: "Features", items: ["City & duration search", "Corporate housing", "Partner funnel"] },
    ],
    takeaways: [
      "Ask the question the price depends on first. For flexible rentals that is duration, and burying it in a filter makes every result provisional.",
      "Headless WordPress earns its place when marketing content changes far more often than the application it sits beside.",
    ],
  },

  {
    slug: "the-cradle",
    category: "Web platform",
    cover: "pdp",
    image: "/work/the-cradle.jpg",
    title: "The Cradle",
    summary: "Bilingual site for a timber office building in Düsseldorf.",
    description:
      "A custom-built, bilingual marketing site for a sustainable cross-laminated timber office development, with an animated structural illustration and a leasing enquiry path.",
    tags: ["Custom build", "Bilingual", "Property marketing", "Frontend"],
    live: "https://www.the-cradle.de/",

    kicker: "Property marketing",
    statement:
      "A building made from wood is an architectural argument before it is a property listing, so the site had to make the case before it made the pitch.",
    role: "Full custom build, bilingual",
    timeline: "5 weeks",
    team: "Frontend engineer, designer",
    metrics: [
      { value: "2", label: "Languages", detail: "German and English" },
      { value: "Custom", label: "Build", detail: "no CMS or page builder" },
      { value: "Leasing", label: "Enquiry path", detail: "commercial tenants" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Selling a sustainability argument, not floorspace",
        body: [
          "The Cradle is a cross-laminated timber office building in Düsseldorf, built to cradle-to-cradle principles. Its selling point is the construction philosophy: a building designed so its materials can be recovered rather than demolished.",
          "Prospective tenants are commercial, and the audience is bilingual. So the site has to explain an architectural and environmental argument in two languages, then convert that interest into a leasing conversation.",
        ],
      },
      {
        kind: "approach",
        title: "Let the structure be the hero",
        body: [
          "The site opens on an animated wireframe of the building's timber frame rather than a rendered photograph. That is the correct choice for this project: the structure is the story, and a wireframe says engineering where a render says marketing.",
          "The palette is a single deep green with almost nothing else, which for a sustainability-led development does the positioning work without a paragraph of copy.",
          "It is a custom front-end build rather than a CMS site. For a single-building development with a finite content set and a defined marketing period, that avoids carrying a content platform nobody needs.",
          "German and English are handled as a first-class language toggle rather than a translation plugin, because the tenant audience genuinely splits between the two.",
        ],
        points: [
          "Animated structural wireframe as the hero",
          "Bilingual German and English with a persistent toggle",
          "Custom front-end build without a CMS",
          "Leasing enquiry as the single conversion goal",
        ],
        aside: {
          title: "When not to use a CMS",
          body: "A single building with a fixed content set and a defined campaign window does not need a content platform. Building one anyway is a maintenance burden the client inherits for nothing.",
        },
      },
      {
        kind: "outcome",
        title: "The argument lands before the floorplan",
        body: [
          "The site leads with the building's construction philosophy in both languages, and routes interested commercial tenants into a leasing conversation.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["JavaScript", "SVG animation", "Responsive UI"] },
      { group: "Delivery", items: ["Static hosting", "GA4", "Bilingual routing"] },
    ],
    takeaways: [
      "Match the visual language to the argument. A wireframe reads as engineering; a render reads as sales.",
      "Not every site needs a CMS. A fixed content set and a defined campaign window is a good reason to skip one.",
    ],
  },

  {
    slug: "rt-accountant",
    category: "WordPress",
    cover: "settings",
    image: "/work/rt-accountant.jpg",
    title: "RT Accountant",
    summary: "WordPress site for an accounting, audit and tax practice.",
    description:
      "A professional services site for an accounting firm, built on WordPress with Elementor so the practice can maintain its own service pages, guides and enquiry routing.",
    tags: ["WordPress", "Elementor", "Professional services", "Lead capture"],
    live: "https://rtaccountant.com/",

    kicker: "Professional services",
    statement:
      "Accounting is bought on trust and proximity, so the site's job is to look like a firm you would hand your books to.",
    role: "WordPress build and lead-capture setup",
    timeline: "4 weeks",
    team: "WordPress engineer",
    metrics: [
      { value: "3", label: "Service lines", detail: "accounting, auditing, tax" },
      { value: "WordPress", label: "Client-editable", detail: "Elementor page building" },
      { value: "Leads", label: "Enquiry-led", detail: "consultation as the conversion" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Every accountant's website says the same things",
        body: [
          "Accounting, auditing and tax are undifferentiated on paper. Every firm lists the same services, and a prospective client cannot evaluate technical competence from a website.",
          "What they can evaluate is whether the firm looks established, whether it explains things clearly, and whether getting in touch is easy. That is what the site has to deliver.",
        ],
      },
      {
        kind: "approach",
        title: "Clear service pages, easy enquiry, client-maintained",
        body: [
          "Each service line gets its own page written in plain language rather than a single blurred services list, because a prospect arriving from a search for one specific need should land somewhere that addresses it.",
          "The build is WordPress with Elementor, which matters more for a practice this size than any performance argument: the firm updates its own content, publishes its own guidance, and does not pay a developer to change a phone number.",
          "Enquiry routing is direct throughout, since in professional services the conversion is a consultation rather than a transaction.",
        ],
        points: [
          "A page per service line rather than one combined list",
          "WordPress and Elementor for client-maintained content",
          "Consultation enquiry as the single conversion goal",
          "Plain-language copy over technical jargon",
        ],
      },
      {
        kind: "outcome",
        title: "A practice that maintains its own site",
        body: [
          "The firm publishes and edits its own service and guidance content, and enquiries route straight through to a consultation.",
        ],
      },
    ],
    stack: [
      { group: "Platform", items: ["WordPress", "Elementor", "PHP"] },
      { group: "Features", items: ["Service pages", "Enquiry forms", "Guidance content"] },
    ],
    takeaways: [
      "In an undifferentiated professional service, clarity is the differentiator. Plain language beats a longer list of capabilities.",
      "For a small practice, the ability to edit their own site is worth more than a faster one.",
    ],
  },

  {
    slug: "beewiz-travel",
    category: "WordPress",
    cover: "collection",
    image: "/work/beewiz-travel.jpg",
    title: "Beewiz Travel",
    summary: "Content-led WordPress travel publication, tuned for speed.",
    description:
      "A travel blog and guide site on a custom WordPress theme with WP Rocket caching, structured for search traffic across adventure and budget travel content.",
    tags: ["WordPress", "Custom theme", "Content site", "Technical SEO"],
    live: "https://www.beewiztravel.com/",

    kicker: "Content publishing",
    statement:
      "A travel publication lives entirely on organic search, which makes speed and structure the product rather than a nice-to-have.",
    role: "Custom theme and performance work",
    timeline: "6 weeks, plus a performance retainer",
    team: "WordPress engineer, performance engineer",
    metrics: [
      { value: "Custom", label: "Theme", detail: "built for the content model" },
      { value: "WP Rocket", label: "Caching layer", detail: "page and asset optimisation" },
      { value: "SEO", label: "Structured for search", detail: "category and guide architecture" },
    ],
    chapters: [
      {
        kind: "problem",
        title: "Search traffic is the whole business",
        body: [
          "A travel content site earns through organic search and affiliate or advertising revenue downstream of it. There is no direct sale, which means traffic is not a marketing metric here, it is the revenue.",
          "That puts unusual weight on two things most content sites treat as afterthoughts: how fast pages load, and how the content is structured for both readers and crawlers.",
        ],
      },
      {
        kind: "approach",
        title: "A theme built for the content, and caching that means it",
        body: [
          "The site runs a custom theme rather than a general-purpose blog theme, so the templates match the content types the publication actually produces: destination guides, budget breakdowns and adventure write-ups.",
          "Performance is handled with WP Rocket doing page caching and asset optimisation. On a content site with no logged-in users and no cart, aggressive full-page caching is close to free, and it is the single highest-leverage performance decision available.",
          "Category and guide architecture is designed for search intent rather than for the author's mental model, which is the difference between a blog and a publication.",
        ],
        points: [
          "Custom theme matched to the content types published",
          "WP Rocket page caching and asset optimisation",
          "Category architecture built around search intent",
          "Content templates for guides, budgets and destinations",
        ],
        aside: {
          title: "Why caching is easy here",
          body: "No logged-in users, no cart, no personalisation. A content site is the one case where full-page caching has almost no downside, and skipping it is leaving speed on the table.",
        },
      },
      {
        kind: "outcome",
        title: "Fast pages, structured for discovery",
        body: [
          "The publication serves cached pages against a content structure built for how people search for travel information rather than how the archive happens to be organised.",
        ],
      },
    ],
    stack: [
      { group: "Platform", items: ["WordPress", "Custom theme", "PHP"] },
      { group: "Performance", items: ["WP Rocket", "Page caching", "Asset optimisation"] },
    ],
    takeaways: [
      "On a content site, page caching is the cheapest performance win available and there is no good reason to skip it.",
      "Structure categories around what people search for, not around how the archive grew.",
    ],
  },
];

/** Look up a single project by slug. */
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Wrap-around neighbours, used by the case-study pager. */
export function getNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1 || projects.length < 2) {
    return { prev: undefined, next: undefined };
  }

  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  // With exactly two projects the wrap-around makes prev and next the same
  // entry, which would render the identical card twice. Show it once.
  return { prev: prev.slug === next.slug ? undefined : prev, next };
}
