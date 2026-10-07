/**
 *  ────────────────────────────────────────────────────────────────────────
 *   SHIPPED MOBILE APPS
 *  ────────────────────────────────────────────────────────────────────────
 *
 *  Every app here is live on the App Store or Play Store and the `links` go
 *  straight to the listing: a founder can check all of them in a minute,
 *  which is the whole point of showing them.
 *
 *  Kept out of projects.ts deliberately. On these we were a contributing
 *  mobile engineer on someone else's product rather than the team that shaped
 *  it end to end, so they get an honest credit and a store link instead of a
 *  case study that would imply more ownership than we had. The apps we did own
 *  (PlayByPlay Anime) live in projects.ts with a full write-up.
 */

export type App = {
  slug: string;
  name: string;
  /** App icon, 512px square, in /public/work/apps. */
  icon: string;
  /** App Store category: the one the listing actually sits in. */
  category: string;
  /** What we did on it. State this plainly; it is not the whole app. */
  role: string;
  /** One line: what the app does for its user. */
  blurb: string;
  /** The parts we built, and the hard bit. */
  contribution: string;
  stack: string[];
  links: { label: string; url: string }[];
};

export const apps: App[] = [
  {
    slug: "insomnia-cookies",
    name: "Insomnia Cookies",
    icon: "/work/apps/insomnia-cookies.png",
    category: "Food & Drink",
    role: "React Native engineer",
    blurb:
      "Warm cookie delivery until 3am. Find a nearby store, order for pickup or delivery, and collect rewards.",
    contribution:
      "Built real-time order tracking, the ordering interface and the Insomnia Rewards loyalty integration. The hard parts were holding performance through peak late-night load and wiring in third-party delivery services to widen the delivery area.",
    stack: [
      "React Native",
      "Redux",
      "TypeScript",
      "Firebase",
      "FCM",
      "Google Maps SDK",
      "Stripe",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/insomnia-cookies/id891379973",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.insomniacookies.insomnia",
      },
    ],
  },
  {
    slug: "thecut",
    name: "theCut: Find & Book Barbers",
    icon: "/work/apps/thecut.png",
    category: "Lifestyle",
    role: "React Native / iOS engineer",
    blurb:
      "One booking platform for barbers, shop owners and clients, covering schedules, appointments and payments in a single app.",
    contribution:
      "Barbers set availability, take bookings, get paid instantly including tips and track earnings. Shop owners manage teams in real time. Clients find barbers nearby, book and pay in-app. Most of the work was syncing schedules across three different profile types and keeping in-app payments reliable.",
    stack: [
      "React Native",
      "Redux",
      "TypeScript",
      "Firebase",
      "Apple Pay",
      "Push notifications",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/thecut-find-book-barbers/id1101408626",
      },
    ],
  },
  {
    slug: "running-walking-tracker",
    name: "Running Walking Tracker Goals",
    icon: "/work/apps/running-walking.png",
    category: "Health & Fitness",
    role: "React Native / iOS engineer",
    blurb:
      "Goal-based running, walking and cycling tracking with live GPS, voice coaching and Apple Watch support.",
    contribution:
      "Implemented GPS activity tracking, voice coaching cues and HealthKit sync for distance, pace and calories, then built Apple Watch support for live workout control and Siri shortcuts. The challenge was background GPS and Watch connectivity that stayed accurate without draining the battery.",
    stack: [
      "React Native",
      "TypeScript",
      "Zustand",
      "HealthKit",
      "WatchKit",
      "Core Location",
      "Siri Shortcuts",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/running-walking-tracker-goals/id1136617388",
      },
    ],
  },
  {
    slug: "yummy-delivery",
    name: "Yummy Delivery",
    icon: "/work/apps/yummy.png",
    category: "Food & Drink",
    role: "Flutter engineer",
    blurb:
      "Food, groceries, pharmacy items and event bookings in one Latin American delivery app.",
    contribution:
      "Built the multi-service modules, real-time order tracking and secure in-app payments, plus onboarding, navigation and push notifications. Holding performance steady across several services while keeping the experience consistent on both platforms was the recurring challenge.",
    stack: [
      "Flutter",
      "Dart",
      "Firebase",
      "FCM",
      "REST API",
      "In-app payments",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/yummy-delivery/id1506748350",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.yummy.customer",
      },
    ],
  },
  {
    slug: "faceyogi",
    name: "FaceYogi",
    icon: "/work/apps/faceyogi.png",
    category: "Health & Fitness",
    role: "React Native / iOS engineer",
    blurb:
      "Seven-day face yoga programmes at eight minutes a day, with a visual progress diary and motivational incentives.",
    contribution:
      "Built the smart coach that generates customised 7-day regimes, the Facial Diary for tracking daily progress, and the incentive mechanism that drives engagement. Real-time visual updates and heavy media content were the performance problem to solve.",
    stack: [
      "React Native",
      "Redux",
      "TypeScript",
      "Firebase",
      "HealthKit",
      "In-app purchases",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/faceyogi-face-yoga-massage/id1551099110",
      },
    ],
  },
  {
    slug: "fitme",
    name: "FitMe",
    icon: "/work/apps/fitme.png",
    category: "Health & Fitness",
    role: "Flutter engineer",
    blurb:
      "Quick, equipment-free workouts for busy people, with personalised routines, reminders and progress tracking.",
    contribution:
      "Built workout scheduling, progress tracking and offline access to exercise videos, plus reminders and adaptive workout plans. Optimising video playback and keeping animations smooth across a wide range of devices were the main constraints.",
    stack: [
      "Flutter",
      "Dart",
      "Firebase",
      "Google Fit API",
      "In-app purchases",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/fitme-lazy-workout-at-home/id6463793132",
      },
    ],
  },
  {
    slug: "habit-tracker",
    name: "Habit Tracker",
    icon: "/work/apps/habit-tracker.png",
    category: "Productivity",
    role: "Flutter engineer",
    blurb:
      "Daily habit building with reminders, streaks, progress stats and motivational nudges.",
    contribution:
      "Built habit creation, streak tracking and reminder notifications, then calendar-based progress views and sync across devices. The focus was staying smooth with long habit histories and scheduling notifications efficiently.",
    stack: [
      "Flutter",
      "FlutterFlow",
      "Dart",
      "Local notifications",
      "Cross-device sync",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/habit-tracker/id1438388363",
      },
    ],
  },
];

/** Distinct store fronts we publish to, for the "shipped to N stores" line. */
export const appStoreCount = new Set(
  apps.flatMap((app) => app.links.map((l) => l.label)),
).size;
