/**
 *  ────────────────────────────────────────────────────────────────────────
 *   SHIPPED BUILDS
 *  ────────────────────────────────────────────────────────────────────────
 *
 *  Real, shipped client work, ported from Jeram's portfolio. Every entry with
 *  a `live` URL goes to the running site.
 *
 *  A third dataset alongside projects.ts and apps.ts, and the distinction is
 *  about evidence rather than quality:
 *
 *    projects.ts  work we can write a full case study about, because we know
 *                 the problem, the decision and the outcome
 *    apps.ts      store-published apps where we were a contributing engineer
 *    builds.ts    shipped sites and platforms we have a short, accurate
 *                 description of but no written case study
 *
 *  Inventing problem/approach/outcome chapters for these to promote them into
 *  projects.ts would mean making up motivations and results we were not told.
 *  A short true description with a link you can open is worth more than a
 *  well-structured story that is partly fiction.
 *
 *  `role` preserves the original framing. Where the source said "Contributed
 *  to", it still says so here: those are not ours end to end and the card has
 *  to say that.
 */

import type { ProjectCategory } from "@/lib/projects";

export type Build = {
  slug: string;
  title: string;
  /** What it is, in one line. */
  summary: string;
  /** What we built. Kept close to the original wording. */
  detail: string;
  /** Which filter bucket it belongs in. */
  category: ProjectCategory;
  tech: string[];
  /** Screenshot in /public/work/jeram. */
  image?: string;
  live?: string;
  /** Extra outbound link, e.g. a verified contract on a block explorer. */
  links?: { label: string; url: string }[];
  /** Stated plainly. "Contributed to" is not the same as "built". */
  role: "Built end to end" | "Lead developer" | "Contributing developer";
};

export const builds: Build[] = [
  {
    slug: "bizinabox",
    title: "Bizinabox",
    summary: "A SaaS platform that lets small businesses launch their own websites.",
    detail:
      "A multi-tenant SaaS where small businesses launch websites, take Stripe and PayPal payments, and run email through Mailcow. We architected the modular template system and the backend handling subscription billing, domain provisioning and white-label branding.",
    category: "Web platform",
    tech: ["Vue.js", "Laravel", "Tailwind CSS", "Stripe"],
    image: "/work/jeram/bizinabox.png",
    live: "https://www.bizinabox.com/",
    role: "Built end to end",
  },
  {
    slug: "eighty-six-co",
    title: "Eighty Six Co.",
    summary: "Shopify app where customers earn coins and spend them on social projects.",
    detail:
      "A custom Shopify app where customers earn Impact Coins on each purchase and allocate them to social causes. Shopify webhooks drive order tracking, a Prisma-backed ledger holds coin balances, and a storefront extension renders the donation widget at checkout.",
    category: "Shopify",
    tech: ["Next.js", "React", "Prisma", "Shopify API"],
    image: "/work/jeram/eightysix.png",
    live: "https://eightysixco.com/",
    role: "Built end to end",
  },
  {
    slug: "blue-venture",
    title: "Blue Venture",
    summary: "Dive travel booking platform, migrated from Vue 2 to Vue 3.",
    detail:
      "Led the migration of a dive travel booking platform from Vue 2 to Vue 3 with the Composition API, refactored the Laravel APIs behind it, and rebuilt the front end in Tailwind for a responsive experience.",
    category: "Web platform",
    tech: ["Vue.js", "Laravel", "Tailwind CSS"],
    image: "/work/jeram/blueventure.png",
    live: "https://www.blueventure.net/",
    role: "Lead developer",
  },
  {
    slug: "influize",
    title: "Influize",
    summary: "Celebrity marketing platform connecting brands with A-list talent.",
    detail:
      "A Next.js front end over a Django REST backend, with Instagram loop giveaway campaign tooling that connects brands to A-list celebrities. Stripe handles payments and Mailgun runs the automated campaign email.",
    category: "Web platform",
    tech: ["Next.js", "Django", "Python", "Stripe", "Mailgun"],
    image: "/work/jeram/celeblink.png",
    live: "https://www.influize.com/celebrity-giveaways",
    role: "Built end to end",
  },
  {
    slug: "huurnu",
    title: "Huurnu",
    summary: "Rental marketplace for the Dutch market, with iDEAL payments.",
    detail:
      "A full rental marketplace on Nuxt with a Laravel API behind it, covering iDEAL payment integration, automated invoicing and listing management.",
    category: "Web platform",
    tech: ["Nuxt", "Laravel", "Tailwind CSS", "MySQL"],
    image: "/work/jeram/huurnl.png",
    live: "https://huurnu.nl",
    role: "Built end to end",
  },
  {
    slug: "toplock",
    title: "Toplock",
    summary: "Dutch ecommerce for cylinder locks and door hardware.",
    detail:
      "A Next.js storefront with a separate Laravel and Vue admin panel, joined by a REST API. Covers product filtering and expert consultation booking for a category where buyers need advice before they buy.",
    category: "Web platform",
    tech: ["Next.js", "Laravel", "Vue", "REST API"],
    image: "/work/jeram/toplock.png",
    live: "https://toplock.nl",
    role: "Built end to end",
  },
  {
    slug: "taskmagic",
    title: "TaskMagic",
    summary: "Web automation SaaS that turns screen recordings into workflows.",
    detail:
      "Contributed to a web automation platform built on Angular and Fastify: API integrations across 200+ third-party sites, and the workflow editor that converts walkthrough recordings into reusable automations.",
    category: "Web platform",
    tech: ["Angular", "Fastify", "Node.js", "API integration"],
    image: "/work/jeram/taskmagic.png",
    live: "https://www.taskmagic.com/",
    role: "Contributing developer",
  },
  {
    slug: "simon-kucher",
    title: "Simon Kucher",
    summary: "Corporate site for a global consulting firm, with scroll-driven storytelling.",
    detail:
      "Built on Drupal, with rich scroll-driven GSAP animation and custom interactive sections for the company history page.",
    category: "Web platform",
    tech: ["Drupal", "GSAP", "PHP", "Animation"],
    image: "/work/jeram/simonkucher.png",
    live: "https://www.simon-kucher.com/en/who-we-are/our-story",
    role: "Built end to end",
  },
  {
    slug: "gangsheet-builder",
    title: "Gangsheet Builder",
    summary: "Shopify app for visually building DTF transfer gang sheets.",
    detail:
      "A custom Shopify app in Laravel and Vue that lets customers lay out DTF transfer gang sheets visually, wired into the storefront for ordering, with the image layout engine running on the backend.",
    category: "Shopify",
    tech: ["Shopify App", "Laravel", "Vue"],
    image: "/work/jeram/gangsheet.png",
    live: "https://htgtransfers.com",
    role: "Built end to end",
  },
  {
    slug: "sanad-restaurant",
    title: "Sanad Restaurant",
    summary: "Admin dashboard wired into the Toast POS API for table-side ordering.",
    detail:
      "Syncs menu items from Toast, processes incoming orders in real time and generates QR codes for table-side ordering. Inertia.js gives SPA navigation over Laravel, with role-based access control and dark mode.",
    category: "Web platform",
    tech: ["Laravel", "Inertia.js", "Vue 3", "Toast API"],
    image: "/work/jeram/sanad.png",
    role: "Built end to end",
  },
  {
    slug: "sog-uk",
    title: "Society of Genealogists",
    summary: "Genealogy and historical research platform with a custom search portal.",
    detail:
      "A Nuxt front end over a Laravel backend. The main site runs on WordPress while the explore portal uses a custom proxy server for advanced search and retrieval across historical record databases.",
    category: "Web platform",
    tech: ["Nuxt", "Laravel", "WordPress", "Proxy server"],
    image: "/work/jeram/soguk.png",
    live: "https://sog.org.uk",
    role: "Built end to end",
  },
  {
    slug: "palm-shiba",
    title: "Palm Shiba",
    summary: "Ethereum token presale dApp with a verified smart contract.",
    detail:
      "A token presale dApp on Ethereum with a deployed Solidity contract handling contributions, allocations and claim logic, plus wallet connection and the on-chain purchase flow on the front end.",
    category: "Blockchain",
    tech: ["Solidity", "Ethereum", "Web3", "Smart contract"],
    image: "/work/jeram/palmshiba.png",
    live: "https://palmshiba.app/",
    links: [
      {
        label: "Verified contract",
        url: "https://etherscan.io/address/0xBA0029C20FDF1b2dD1Cb5c6aF51E1dEa3D5ae8A1#code",
      },
    ],
    role: "Built end to end",
  },
  {
    slug: "yokaiswap",
    title: "Yokaiswap",
    summary: "DeFi exchange and NFT marketplace on the Nervos Network.",
    detail:
      "Contributed front-end features to a DeFi exchange on Nervos: token swaps, bridge interactions and wallet integration, plus the launch of the NFT marketplace with on-chain minting and trading.",
    category: "Blockchain",
    tech: ["React", "Solidity", "Nervos", "Web3", "NFT"],
    image: "/work/jeram/yokaiswap.png",
    live: "https://www.yokaiswap.com/",
    role: "Contributing developer",
  },
  {
    slug: "ff-io",
    title: "ff.io",
    summary: "High-traffic crypto exchange with live order-book updates.",
    detail:
      "Contributed to a crypto exchange handling real-time price feeds over WebSocket: the swap interface, wallet connection through Web3 providers, and the smart contract interaction layer. Rendering was optimised for live order-book updates under heavy throughput.",
    category: "Blockchain",
    tech: ["React", "Web3", "WebSocket", "Smart contract"],
    image: "/work/jeram/fixedfloat.png",
    live: "https://ff.io",
    role: "Contributing developer",
  },
  {
    slug: "vessel-control",
    title: "Vessel Control Platform",
    summary: "Maritime HMI dashboard showing live telemetry from vessel sensors.",
    detail:
      "Live sensor telemetry over WebSocket, with interactive gauge components, alarm state management and a historical data viewer on a REST API. Designed for continuous operation on bridge-mounted displays.",
    category: "Web platform",
    tech: ["React", "WebSocket", "REST API"],
    image: "/work/jeram/seavessel.png",
    live: "https://sea-command-hmi-rswz.vercel.app/",
    role: "Built end to end",
  },
  {
    slug: "livearena",
    title: "Livearena",
    summary: "Live sports streaming with real-time score overlays.",
    detail:
      "A React front end on a Node backend, covering real-time video player controls, live score overlays and WebSocket-driven event feeds for concurrent viewers.",
    category: "Web platform",
    tech: ["React", "Node.js", "WebSocket", "Live video"],
    image: "/work/jeram/livearena.png",
    live: "https://livearena.io",
    role: "Built end to end",
  },
  {
    slug: "fondmart",
    title: "Fondmart",
    summary: "Women's fashion storefront, built mobile-first.",
    detail:
      "A Nuxt and Vue storefront with Tailwind, Stripe checkout and a filterable product catalogue, designed mobile-first because that is where the shopping happens.",
    category: "Web platform",
    tech: ["Nuxt", "Vue", "Tailwind CSS", "Stripe"],
    image: "/work/jeram/fondmart.png",
    live: "https://fondmart.com",
    role: "Built end to end",
  },
  {
    slug: "quest-haven",
    title: "Quest Haven",
    summary: "Gaming community platform with real-time chat and leaderboards.",
    detail:
      "React with Vite and Tailwind on the front end, Supabase behind it for real-time chat, authentication and database-driven leaderboards and event tracking.",
    category: "Web platform",
    tech: ["React", "Supabase", "Vite", "Tailwind CSS"],
    image: "/work/jeram/questhaven.png",
    live: "https://quest-haven-digital.vercel.app/",
    role: "Built end to end",
  },
  {
    slug: "flexpro-meals",
    title: "FlexPro Meals",
    summary: "Meal prep ecommerce with a RAG chatbot trained on the site.",
    detail:
      "A Shopify meal prep store with weekly rotating menus and subscription plans, plus a custom RAG chatbot in Python with LangChain and OpenAI, trained on the site content to answer menu questions and handle support automatically.",
    category: "Shopify",
    tech: ["Shopify", "Python", "LangChain", "OpenAI", "RAG"],
    image: "/work/jeram/flexpromeals.png",
    live: "https://flexpromeals.com/",
    role: "Built end to end",
  },
  {
    slug: "whatsapp-support-bot",
    title: "WhatsApp Support Bot",
    summary: "Automated customer support over the WhatsApp Business API.",
    detail:
      "A WhatsApp chatbot for automated customer support in Python, with OpenAI, LangChain and RAG answering queries from a business knowledge base in real time.",
    category: "Web platform",
    tech: ["Python", "WhatsApp API", "OpenAI", "LangChain", "RAG"],
    role: "Built end to end",
  },
  {
    slug: "oxa",
    title: "Oxa",
    summary: "Companion app for a wearable breathing sensor.",
    detail:
      "A cross-platform Flutter app paired to a wearable IoT sensor over Bluetooth, with real-time breathing visualisation, guided session playback and device state management. We worked with the firmware team to define the BLE protocol and handle connection drops.",
    category: "Mobile app",
    tech: ["Flutter", "Android", "iOS", "BLE", "IoT"],
    image: "/work/jeram/oxaapp.png",
    role: "Built end to end",
  },
  {
    slug: "mercato",
    title: "Mercato",
    summary: "Local grocery delivery for iOS and Android.",
    detail:
      "A React Native delivery app covering store browsing, real-time order tracking and push notifications, connecting customers to neighbourhood stores.",
    category: "Mobile app",
    tech: ["React Native", "iOS", "Android"],
    image: "/work/jeram/mercatoapp.png",
    role: "Built end to end",
  },
  {
    slug: "car-marketplace",
    title: "Car Marketplace",
    summary: "Car sales marketplace with advanced search.",
    detail:
      "Svelte on the front end over a Node backend, with vehicle listing pages, advanced search filters and a Tailwind-based responsive layout.",
    category: "Web platform",
    tech: ["Svelte", "Node.js", "Tailwind CSS"],
    image: "/work/jeram/car-marketplace.png",
    live: "https://car-sale-main.vercel.app",
    role: "Built end to end",
  },
  {
    slug: "service-dog-outfitters",
    title: "Service Dog Outfitters",
    summary: "WordPress plugin that generates service dog ID cards on demand.",
    detail:
      "A custom plugin wired into Gravity Forms that collects the customer's details and generates certification card images on demand, rather than someone producing each one by hand.",
    category: "WordPress",
    tech: ["WordPress", "PHP", "Gravity Forms", "Image generation"],
    image: "/work/jeram/servicedogoutfitters.png",
    live: "https://servicedogoutfitters.com",
    role: "Built end to end",
  },
  {
    slug: "the-valued-stats",
    title: "The Valued Stats",
    summary: "Membership platform with Discord bot integration.",
    detail:
      "A custom membership plugin and payment gateway integration for automated member management, with a Discord bot keeping access in sync.",
    category: "WordPress",
    tech: ["WordPress", "PHP", "Discord bot", "Payment gateway"],
    image: "/work/jeram/thevaluedstats.png",
    live: "https://thevaluedstats.com",
    role: "Built end to end",
  },
  {
    slug: "cue-biopharma",
    title: "Cue Biopharma",
    summary: "Site for a NASDAQ-listed pharmaceutical company.",
    detail:
      "A WordPress build with a customised theme, jQuery and CSS pipeline data visualisations, and on-page SEO work on the investor-facing content.",
    category: "WordPress",
    tech: ["WordPress", "PHP", "jQuery", "SEO"],
    image: "/work/jeram/cuebiopharma.png",
    live: "https://cuebiopharma.com",
    role: "Built end to end",
  },
  {
    slug: "primo-exchange",
    title: "Primo Exchange",
    summary: "Token exchange platform with API-driven swaps.",
    detail:
      "A custom WordPress plugin driving API-based token swaps, with theme customisation and multi-language support.",
    category: "WordPress",
    tech: ["WordPress", "PHP", "Exchange API", "i18n"],
    image: "/work/jeram/primo.png",
    live: "https://primo.exchange/",
    role: "Built end to end",
  },
  {
    slug: "karmin-hair-tools",
    title: "Karmin Hair Tools",
    summary: "WooCommerce store for professional hair tools.",
    detail:
      "A WooCommerce build with custom JavaScript plugins for product customisation, and third-party API integration for inventory and shipping.",
    category: "WordPress",
    tech: ["WordPress", "WooCommerce", "JavaScript", "REST API"],
    image: "/work/jeram/karminhairtools.png",
    live: "https://karminhairtools.com",
    role: "Built end to end",
  },
  {
    slug: "brera-hotel",
    title: "Brera Hotel",
    summary: "Hotel booking with real-time room availability.",
    detail:
      "A WordPress booking platform integrated with a booking API for live room availability, Stripe payment processing and automated email marketing for guest engagement.",
    category: "WordPress",
    tech: ["WordPress", "PHP", "Booking API", "Stripe"],
    image: "/work/jeram/brera.png",
    live: "https://brera.de",
    role: "Built end to end",
  },
];
