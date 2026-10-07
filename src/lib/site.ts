/**
 *  ────────────────────────────────────────────────────────────────────────
 *   SITE CONTENT: edit this file, not the components.
 *  ────────────────────────────────────────────────────────────────────────
 *
 *  Everything a visitor reads outside of the case studies lives here, so
 *  rebranding the site is a single-file job. Case studies are in projects.ts.
 *
 *  Everything about the work is drawn from the shipped projects in
 *  projects.ts, builds.ts and apps.ts.
 *
 *  The copy is written for one reader: a founder who has money, a deadline,
 *  and no technical co-founder. Every section is there to answer a question
 *  that reader asks, in the order they ask it.
 */

import { spellNumber } from "@/lib/utils";
import { apps } from "@/lib/apps";
import { builds } from "@/lib/builds";
import { projects } from "@/lib/projects";

export const brand = {
  name: "Spadework",
  /**
   * Shown in the footer copyright. Add the entity suffix (Ltd, LLC, Inc)
   * once the company is registered; right now it is just the trading name.
   */
  legalName: "Spadework",
  /** No trailing slash: sitemap, robots and canonical URLs append to this. */
  url: "https://spadework.dev",

  /** One line. Shows in the browser tab and in link previews. */
  tagline:
    "A senior product engineering team that ships the thing you can stake the company on.",

  /* The hero sentence is `promise`, exported below: it counts the roster,
     so it cannot drift when a member is added. */

  /** Shown in the availability pill in the nav and hero. */
  availability: {
    open: true,
    label: "2 build slots open",
    detail: "Next start: early next month",
  },
} as const;

export const contact = {
  email: "support@spadework.dev",
  phone: "+1 (917) 672 8525",
  /** Google bookable appointment schedule. The header CTA links straight here. */
  calendar: "https://calendar.app.google/27CkhthEnDWTuS4a8",
  location: "Distributed. Core hours 9am–6pm CET, overlap with US East",
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Team", href: "/team" },
] as const;

/* ───────────────────────────── Proof ───────────────────────────── */

/**
 * The marquee under the hero. These are the real client brands from
 * projects.ts, which is the single most persuasive thing on the page: a
 * founder recognises names faster than they read a value proposition.
 */
export const clients = [
  "Insomnia Cookies",
  "Sonder",
  "Thunderpick",
  "Beond",
  "AETHER Apparel",
  "Sentral",
  "One Park Financial",
  "theCut",
  "Holyrood Distillery",
  "TreeDots",
  "Beast Health",
  "Landing",
  "Zone Healthy",
  "THEFUTUREOFJEWELRY",
  "Yummy Delivery",
  "Darwin Group",
  "Lumenac",
  "Cob Foods",
  "FaceYogi",
  "Wonderful Dental",
  "Black Tie CBD",
  "The Cradle",
  "Mojibricks",
  "Denver BBS",
  "Bizinabox",
  "Eighty Six Co.",
  "Simon Kucher",
  "Cue Biopharma",
  "Blue Venture",
  "Influize",
  "Yokaiswap",
  "TaskMagic",
  "Toplock",
  "Livearena",
  "Brera Hotel",
] as const;

/**
 * The band of numbers under the marquee. Keep these to four: a founder
 * scanning the page will read four and skip six.
 *
 * The first two are counted from the data, so shipping something new updates
 * the homepage instead of quietly making it wrong.
 */
const mobileProducts =
  projects.filter(
    (p) =>
      p.category === "Mobile app" ||
      p.tags.some((t) => /Ionic|React Native|Expo/i.test(t)),
  ).length + builds.filter((b) => b.category === "Mobile app").length;

export const stats = [
  {
    value: String(projects.length + builds.length + apps.length),
    label: "Products shipped",
    detail: `${projects.length} case studies, ${builds.length} more builds, ${apps.length} apps on the stores`,
  },
  {
    value: String(mobileProducts + apps.length),
    label: "Mobile apps live",
    detail: "React Native, Flutter and Ionic, on iOS and Android",
  },
  {
    value: "$40M+",
    label: "Processed through our builds",
    detail: "Commerce and booking revenue, aggregate",
  },
  {
    value: "4.8yr",
    label: "Average client relationship",
    detail: "Most engagements renew rather than end",
  },
];

/* ──────────────────────── \"Is this you?\" ──────────────────────── */

/**
 * Situation-matching. This section converts better than a services list
 * because the visitor recognises themselves instead of decoding capabilities.
 */
export const situations = [
  {
    title: "You have a validated idea and no engineering team",
    body: "You can describe the product and you have customers waiting. What you do not have is six months to hire a team before a line of code is written. We become the team (architecture, build, ship) and hand over something a future in-house hire can actually work with.",
    tag: "Pre-seed to Series A",
  },
  {
    title: "Your store has outgrown what the platform allows",
    body: "Revenue is real, and now the theme fights you. Configurators, subscriptions, multi-market pricing, trade accounts: the things that make money are the things a bought template cannot do. We have shipped all of them.",
    tag: "Scaling ecommerce",
  },
  {
    title: "An agency built it and then disappeared",
    body: "You own a codebase nobody will touch, a CMS nobody can edit, and a quote to rebuild from scratch. We audit first, tell you honestly what is salvageable, and fix the three things costing you money before discussing anything bigger.",
    tag: "Inherited codebase",
  },
  {
    title: "You need to move faster than your roadmap allows",
    body: "You have engineers, they are good, and they are full. We plug in as a pod with our own lead, take a whole surface of the product, and ship against your standards rather than adding coordination overhead to your team.",
    tag: "Team extension",
  },
] as const;

/* ──────────────────────────── Services ──────────────────────────── */

export type Service = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  deliverables: string[];
  stack: string[];
  typical: { timeline: string; from: string; entry: string };
  icon:
    | "Layers"
    | "ShoppingBag"
    | "Smartphone"
    | "Workflow"
    | "Gauge"
    | "Sparkles";
};

export const services: Service[] = [
  {
    slug: "product-engineering",
    title: "Web product engineering",
    summary:
      "Full product builds in Next.js and React: the thing your business actually is.",
    body: "Booking platforms, portals, marketplaces, dashboards, multi-tenant apps. We take a product from a whiteboard to something real users are paying for, and we design the data model and the architecture rather than inheriting whatever the first sprint produced. This is most of what we do.",
    deliverables: [
      "Technical architecture and data model, written down before the build",
      "Design system and component library owned by you",
      "Authentication, roles, billing and admin tooling",
      "Third-party and legacy API integration",
      "CI, preview environments, error tracking and analytics from day one",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node", "Postgres", "Prisma"],
    typical: {
      timeline: "4–20 weeks, depending on where you start",
      from: "$11k",
      entry: "a working MVP: one core flow, real accounts, deployed",
    },
    icon: "Layers",
  },
  {
    slug: "ecommerce",
    title: "Commerce & storefronts",
    summary:
      "Shopify, headless Shopify and WooCommerce builds for brands that have outgrown a theme.",
    body: "We build custom Shopify themes, headless storefronts over the Storefront API, and WooCommerce stores with the awkward requirements: trade pricing, subscriptions, configurators, multi-market catalogues. We will also tell you when a theme is the right answer and headless is an expensive mistake, which is more often than most agencies admit.",
    deliverables: [
      "Custom theme or headless storefront, built around your brand",
      "Product configurators and made-to-order flows",
      "Subscriptions, trade and role-based pricing, multi-currency",
      "Checkout and conversion work with before/after numbers",
      "Migration from Magento, BigCommerce or a legacy stack",
    ],
    stack: [
      "Shopify",
      "Liquid",
      "Hydrogen",
      "Storefront API",
      "WooCommerce",
      "Klaviyo",
    ],
    typical: {
      timeline: "2–12 weeks",
      from: "$6.5k",
      entry: "a launch-ready store on a customised theme, built to sell",
    },
    icon: "ShoppingBag",
  },
  {
    slug: "mobile",
    title: "Mobile applications",
    summary:
      "React Native and native apps that ship to both stores from one codebase.",
    body: "One team, one codebase, both platforms. Nine apps live on the stores: food delivery at 3am peak load, GPS and Apple Watch fitness tracking, barber booking with in-app payments, and a real-time AI voice agent we built and shipped ourselves. We handle the parts that sink app projects after launch: push notifications, offline state, in-app purchases, store review, and the release pipeline you will be running every fortnight for years.",
    deliverables: [
      "iOS and Android from a single React Native codebase",
      "Offline-first data layer and sync",
      "Push notifications and deep linking",
      "In-app purchases and subscription billing",
      "App Store and Play submission, plus the release pipeline",
    ],
    stack: [
      "React Native",
      "Expo",
      "Flutter",
      "TypeScript",
      "Swift",
      "Kotlin",
      "HealthKit",
    ],
    typical: {
      timeline: "5–16 weeks",
      from: "$13k",
      entry: "one platform, one core flow, submitted to the store",
    },
    icon: "Smartphone",
  },
  {
    slug: "integration",
    title: "Integrations & automation",
    summary:
      "Making the systems you already pay for talk to each other, reliably.",
    body: "The unglamorous work that quietly returns the most: ERP and CRM sync, payment and logistics providers, MLS and IDX feeds, booking engines, warehouse systems. Built with retries, idempotency and observability, because an integration that fails silently is worse than no integration.",
    deliverables: [
      "API and webhook integration with retry and idempotency",
      "Data pipelines and scheduled sync jobs",
      "Internal tools and admin dashboards",
      "Monitoring and alerting on every moving part",
      "Documentation your own team can maintain",
    ],
    stack: ["Node", "TypeScript", "REST", "GraphQL", "Webhooks", "Redis"],
    typical: {
      timeline: "1–8 weeks",
      from: "$3.5k",
      entry: "one integration, built properly, with retries and alerting",
    },
    icon: "Workflow",
  },
  {
    slug: "performance",
    title: "Performance & technical SEO",
    summary:
      "Finding the money your site is leaking on load time, and getting it back.",
    body: "We profile the real thing on real devices, fix what the numbers point at, and report the before and after. Core Web Vitals, bundle size, render-blocking work, crawlability and structured data. Usually the highest-return week of work available to a site that already has traffic.",
    deliverables: [
      "Core Web Vitals audit on field data, not just lab scores",
      "Bundle, image and font delivery overhaul",
      "Caching and rendering strategy",
      "Crawlability, structured data and indexation fixes",
      "A written report with before and after figures",
    ],
    stack: ["Lighthouse", "WebPageTest", "Next.js", "Cloudflare", "GA4"],
    typical: {
      timeline: "1–3 weeks",
      from: "$2.4k",
      entry: "a full audit and the fixes worth doing, with before and after numbers",
    },
    icon: "Gauge",
  },
  {
    slug: "design",
    title: "Product design",
    summary:
      "Interface and brand design done by the people who then have to build it.",
    body: "Design that arrives as a working front end rather than a handover document. We run discovery, design the flows, and build the design system in code, which removes the entire category of argument about whether the build matches the mockup.",
    deliverables: [
      "Discovery, user flows and information architecture",
      "High-fidelity UI design across breakpoints",
      "Design system implemented in code, not just in Figma",
      "Accessibility to WCAG 2.2 AA",
      "Prototypes you can put in front of customers",
    ],
    stack: ["Figma", "Tailwind", "Framer Motion", "Storybook"],
    typical: {
      timeline: "1–6 weeks",
      from: "$4.2k",
      entry: "a brand direction and the core screens, designed and built",
    },
    icon: "Sparkles",
  },
];

/* ───────────────────────────── Process ───────────────────────────── */

/**
 * Risk reduction, framed as a timeline. A founder's real fear is not cost,
 * it is paying for something that never ships, so each step names what they
 * get and when they can walk away.
 */
export const process = [
  {
    step: "01",
    title: "Build review",
    duration: "30 minutes, free",
    body: "A call with the engineer who would lead your project, not a salesperson. You describe what you are trying to do; we tell you what we would build, what we would not, and roughly what it costs. If we are the wrong team you will know by the end of the call.",
    deliverable: "A straight answer and a ballpark range",
  },
  {
    step: "02",
    title: "Scoping sprint",
    duration: "1–2 weeks, fixed fee",
    body: "Before anyone quotes a six-figure build, we spend a week or two turning the idea into an actual plan: architecture, data model, screen inventory, risks, and a milestone schedule with prices attached. You own the output whatever you decide next.",
    deliverable: "A technical plan, a fixed quote, and no obligation",
  },
  {
    step: "03",
    title: "Design & architecture",
    duration: "2–5 weeks",
    body: "Flows, interface and the design system, built in code from the start. In parallel the foundations go in (repository, environments, CI, error tracking) so that the first feature lands on infrastructure instead of waiting for it.",
    deliverable: "Clickable product and a deployed skeleton",
  },
  {
    step: "04",
    title: "Build in two-week increments",
    duration: "The bulk of the work",
    body: "Every two weeks: a deployed environment you can use, a demo of what changed, and an honest note on anything that slipped. No status reports written to look good. You see the real thing on a real URL from the second week onward.",
    deliverable: "Working software every fortnight",
  },
  {
    step: "05",
    title: "Launch & handover",
    duration: "1–2 weeks",
    body: "Load testing, accessibility pass, security review, analytics, and the documentation a future in-house engineer needs on their first day. The repository, the accounts and the infrastructure are in your name. That is true from day one, not granted at the end.",
    deliverable: "Live product, documented, fully yours",
  },
  {
    step: "06",
    title: "Afterwards",
    duration: "Monthly, cancel anytime",
    body: "Most clients keep us on a retainer for new features, monitoring and the occasional 2am problem. Some take it in-house and we help them hire. Both are fine outcomes and we will tell you which one we think you should pick.",
    deliverable: "Support, or a clean exit",
  },
] as const;

/* ──────────────────────── Engagement models ──────────────────────── */

/**
 * Commercial clarity. Founders filter hard on price and most agency sites
 * refuse to publish any, which costs them the qualified visitors and keeps
 * the unqualified ones. Indicative ranges, clearly labelled.
 *
 * Ordered cheapest first and deliberately starting at one sprint. Most of
 * the people reading this are solo founders or a two-person startup paying
 * out of their own pocket, and a page whose smallest number is five figures
 * tells them to leave before they have read a word about the work.
 */
export const engagements = [
  {
    name: "One sprint at a time",
    price: "$3,900 / sprint",
    cadence: "Two weeks. Stop whenever you like.",
    best: "Solo founders and pre-seed startups",
    body: "Buy a single two-week sprint. We agree what ships in it, we ship it, and you decide whether to buy another. No retainer, no minimum, no contract beyond the sprint you have paid for.",
    includes: [
      "A senior engineer and a slice of a designer",
      "Agreed deliverable for the sprint, in writing",
      "Deployed and usable at the end of it",
      "Walk away after any sprint, owing nothing",
    ],
    featured: true,
  },
  {
    name: "Fixed-scope build",
    price: "from $11k",
    cadence: "Quoted per milestone",
    best: "A defined v1 with a launch date",
    body: "We scope it, quote it, and carry the risk of the estimate. Payment follows milestones, so you are never more than one milestone ahead of delivered work.",
    includes: [
      "Fixed price per milestone, not per hour",
      "Named team for the whole build",
      "Two-week demo cadence",
      "30 days of post-launch fixes included",
    ],
    featured: false,
  },
  {
    name: "Embedded pod",
    price: "from $14k / month",
    cadence: "Monthly, 30 days' notice",
    best: "Funded teams shipping continuously",
    body: "A standing team, typically a lead, two engineers and a designer, working to your roadmap in your tools. The usual choice once a product is live, growing and funded.",
    includes: [
      "2–4 senior people, consistently the same ones",
      "Works in your repo, your board, your standups",
      "Roadmap re-prioritised every two weeks",
      "Scale the pod up or down each month",
    ],
    featured: false,
  },
] as const;

/**
 * The smallest thing we sell.
 *
 * Shown under the engagement cards as a way in for people who are not ready
 * to commit to a build. It exists because the most common reason a founder
 * does not hire anyone is that they cannot tell what they need yet, and a
 * four-figure answer to that is a far easier first cheque than a build.
 */
export const starterOffer = {
  name: "Product & codebase audit",
  price: "$1,900, fixed",
  body: "Not ready to commit to a build? Buy a week of our time instead. We go through whatever exists (code, designs, a half-finished site, or just the idea) and come back with a written plan: what to build first, what to skip, what it will cost and how long it will take.",
  points: [
    "A written technical plan you own, whoever builds it",
    "Prioritised scope: what ships in v1, what waits",
    "Honest build-versus-buy advice, including when not to hire us",
    "Credited in full against a build if you go ahead within 60 days",
  ],
} as const;

/* ────────────────────────── Differentiators ────────────────────────── */

export const principles = [
  {
    title: "You talk to the engineers building it",
    body: "There is no account manager between you and the work. The person on your kickoff call is the person writing the code, and they stay on the project until it ships.",
  },
  {
    title: "Senior only",
    body: "Everyone on the team has shipped production software for at least six years. Nobody is learning the fundamentals on your budget, and nobody needs a week to understand your codebase.",
  },
  {
    title: "You own everything from day one",
    body: "Repository, cloud accounts, domains, design files: all in your name from the first commit. No hostage situations, no licence that expires when the relationship does.",
  },
  {
    title: "Working software every two weeks",
    body: "Not a slide deck, not a percentage complete. A URL you can open and use. If something slipped, we say so in the same email as the demo.",
  },
  {
    title: "We will talk you out of things",
    body: "Half of what founders ask us to build first is not the thing that makes money. Saying so costs us billable hours and is the main reason clients stay for years.",
  },
  {
    title: "Boring technology, deliberately",
    body: "We pick stacks with ten-year track records and big hiring pools, because in three years you may want to hire for this codebase. Novelty is a cost, paid by whoever maintains it.",
  },
] as const;

/* ──────────────────────────── The team ──────────────────────────── */

export type Member = {
  name: string;
  role: string;
  focus: string;
  /**
   * Discipline icon, shown as the avatar until a real photo exists.
   *
   * An icon rather than initials: a monogram like "TL" implies a person
   * called T. L. and reads as a stock profile nobody filled in. Resolved to
   * a component in components/member-icon.tsx.
   */
  icon:
    | "Workflow"
    | "Layers"
    | "Server"
    | "Smartphone"
    | "PenTool"
    | "ShieldCheck"
    | "ShoppingBag";
  /** Optional: drop a square image in /public/team and reference it. */
  photo?: string;
  /**
   * Public profiles, rendered as pills on the card.
   *
   * A list rather than a single `linkedin` field: not everyone uses the same
   * platform, and for engineers a GitHub or Stack Overflow profile is better
   * evidence than a LinkedIn page anyway.
   */
  links?: { label: string; url: string }[];
};

/**
 * Seven named people. No placeholder seats left.
 *
 * Anything unverified is marked. LinkedIn blocks automated reads (HTTP 999),
 * so nothing here was taken from those profiles: the names come from each
 * person's own resume or portfolio in this workspace, and the `focus` lines
 * describe work that is actually in projects.ts, apps.ts and builds.ts.
 *
 * Three of the five are full-stack, so each one's lean is in the role line.
 * For a client the useful distinction is not the title but which part of the
 * stack that person gravitates to.
 */
export const team: Member[] = [
  {
    name: "Decxy Malvin",
    role: "Lead engineer",
    icon: "Workflow",
    focus:
      "Leads the team and owns the architecture and the estimate. Full-stack by background, with AI engineering on top of it, and the person accountable when a date is at risk.",
    links: [
      { label: "GitHub", url: "https://github.com/MelodyStack" },
      {
        label: "Stack Overflow",
        url: "https://stackoverflow.com/users/14533487/web-sudo",
      },
      { label: "Medium", url: "https://medium.com/@websudo" },
    ],
  },
  {
    name: "Jeram Tejano",
    role: "Full-stack developer, frontend-leaning",
    icon: "Layers",
    focus:
      "Takes a product from design to deployed: React, Next.js, Vue and Nuxt on the front, Laravel and Node behind it. Most of the platforms, storefronts and dApps in our work are his.",
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jeram-tejano-60206078/",
      },
      { label: "GitHub", url: "https://github.com/jeram" },
    ],
  },
  {
    name: "Kevin Anthony Wong Caicedo",
    role: "Full-stack developer, backend-leaning",
    icon: "Server",
    focus:
      "Data models, APIs and the integrations that have to survive a provider changing their mind on a Friday. Comfortable in the front end when a feature needs both halves moving together.",
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/kevin-anthony-wong-caicedo-a30a8136a/",
      },
    ],
  },
  {
    name: "Fajar Hadi Saputra",
    role: "Full-stack developer, mobile-leaning",
    icon: "Smartphone",
    focus:
      "Full-stack, but mobile is where he lives. Ships to both stores from one codebase in React Native and Flutter, and handles the release treadmill that starts the day after launch. Seven of the apps in our work are his.",
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/fajar-h-304a24124",
      },
    ],
  },
  {
    name: "Reynel Olaer",
    role: "Ecommerce developer",
    icon: "ShoppingBag",
    focus:
      "Shopify, WordPress and WooCommerce. Custom themes, headless storefronts, product configurators and the awkward commerce requirements a bought template cannot do.",
  },
  {
    name: "Vitto Lewerrisa",
    role: "QA & release engineer",
    icon: "ShieldCheck",
    focus:
      "Automated coverage on the paths that take money, and the person who says no to a release when it is not ready.",
  },
  {
    name: "Maya Lestari",
    role: "Product designer",
    icon: "PenTool",
    focus:
      "Designs the flows and then builds the design system, which is why the build matches the mockup.",
  },
];

/**
 * The sentence under the hero headline. Defined here rather than inside
 * `brand` because it counts the roster, and `team` is declared below it.
 */
export const promise = `We are a tight, senior team of ${spellNumber(
  team.length,
)} who design, build and ship web products, storefronts and apps for founders, usually in weeks, not quarters. No account managers, no hand-off, no juniors learning on your budget.`;

/* ────────────────────────── Testimonials ────────────────────────── */

export type Testimonial = {
  quote: string;
  /**
   * Full name, role and company are all required on purpose.
   *
   * The site previously carried three anonymous quotes attributed to "Founder,
   * DTC brand, $11M revenue". They were invented, and they read as invented:
   * an unnamed, uncheckable endorsement is the single clearest signal of a
   * fabricated testimonial, and it taints the claims around it. If a client
   * will not put their name to it, it is better not to run it.
   */
  name: string;
  role: string;
  company: string;
  /** Square headshot in /public/testimonials. */
  photo?: string;
  /** Somewhere a visitor can confirm this person exists. */
  url?: string;
};

/**
 * Empty until there are real ones.
 *
 * While this is empty the social proof section shows shipped client work with
 * live links instead, which is genuinely checkable and needs nobody's
 * permission. Add a real quote here and the section switches automatically.
 *
 * Shape to copy:
 *
 *   {
 *     quote: "Their exact words, not a tidied-up version.",
 *     name: "Ada Okafor",
 *     role: "Founder",
 *     company: "Northstar Supply",
 *     photo: "/testimonials/ada-okafor.jpg",
 *     url: "https://www.linkedin.com/in/example/",
 *   }
 */
export const testimonials: Testimonial[] = [];

/**
 * The fallback: work a visitor can open and verify in ten seconds.
 *
 * Slugs resolve against projects.ts, builds.ts and apps.ts, so the names,
 * descriptions and links cannot drift from the real data. Picked for
 * recognisability and for range rather than for being our favourites.
 *
 * One further filter: every link here has to actually open. Thunderpick was
 * in this list and sits behind a Cloudflare bot challenge, which is fine for
 * the work grid but not for a section whose whole claim is "open any of
 * them". Check a candidate loads before adding it.
 */
export const proofSlugs = [
  "insomnia-cookies",
  "simon-kucher",
  "cue-biopharma",
  "beond",
  "one-park-financial",
  "the-future-of-jewelry",
] as const;

/* ───────────────────────────── FAQ ───────────────────────────── */

/**
 * These are the objections that actually stop a founder from sending the
 * email. Answered plainly, including the ones with awkward answers.
 */
export const faqs = [
  {
    q: "What does a typical project cost?",
    a: "It starts smaller than you probably expect. A written plan is $1,900. A single two-week sprint is $3,900 and you can buy exactly one. A launch-ready store is around $6.5k, a working MVP with accounts and payments around $11k, and a large multi-year platform runs well into six figures. We publish all of it because the alternative wastes your time and ours.",
  },
  {
    q: "How fast can you start?",
    a: "A build review happens within two or three days of you emailing. Scoping can usually start the following week. Full build capacity depends on the slots open at the time, which we keep current in the header of this site rather than telling you what you want to hear.",
  },
  {
    q: "Who owns the code and the accounts?",
    a: "You do, from the first commit. The repository is created in your organisation, cloud and third-party accounts are in your name with us added as collaborators, and design files are yours. If we part ways there is nothing to transfer and nothing to negotiate.",
  },
  {
    q: "I am not technical. How do I know the work is any good?",
    a: "Three ways, none of which require you to read code. You see a working deployment every two weeks, so progress is observable rather than reported. Everything is documented in plain language. And we are happy for you to have an independent engineer review the codebase at any point. Teams who object to that are telling you something.",
  },
  {
    q: "What happens if you disappear, or we fall out?",
    a: "You hold the accounts, so the worst case is an inconvenience rather than a crisis. Contracts are monthly or milestone-based with 30 days' notice, so you are never locked in. We also keep the build on mainstream technology precisely so another team could pick it up.",
  },
  {
    q: "I am a solo founder. Can I actually afford you?",
    a: "Probably, if you start small. Most of the founders we work with begin with a $1,900 plan or a single $3,900 sprint rather than commissioning a build, and several have reached a live product that way, one sprint at a time, paying as they go. What we will not do is take a large cheque for a scope you have not tested. If the honest answer is that you need a no-code tool for another six months, we will say so.",
  },
  {
    q: "Can you take over a project someone else started?",
    a: "Frequently. It starts with the two-week audit so we can tell you honestly what is salvageable. Sometimes the answer is that the codebase is fine and the process was the problem. We will say that even though a rebuild would be worth more to us.",
  },
  {
    q: "Which time zones do you cover?",
    a: "The team is distributed with core hours covering European and US Eastern working days. In practice you get same-day replies and a scheduled call whenever you want one, rather than a 12-hour round trip on every question.",
  },
] as const;

/** Reused for the closing call to action on several pages. */
export const cta = {
  eyebrow: "Next step",
  title: "Tell us what you are trying to build.",
  body: "Thirty minutes with the engineer who would lead the project. You will leave with an opinion on what to build, what to skip, and roughly what it costs, whether or not you hire us.",
  steps: [
    "You send a few lines about the product and the deadline",
    "We reply within one working day with times",
    "A 30-minute call, no deck, no sales script",
    "A written summary and a ballpark range within 48 hours",
  ],
} as const;
