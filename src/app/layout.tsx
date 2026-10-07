import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Backdrop } from "@/components/backdrop";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { RevealObserver } from "@/components/reveal-observer";
import { ScrollProgress } from "@/components/scroll-progress";
import { brand, contact, services } from "@/lib/site";
import "./globals.css";

/* A soft serif for headings. Fraunces is variable on a SOFT axis, so it can
   be warm without tipping into quirky, and it is the main reason the page
   reads as made by people rather than generated from a template. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
});

/* Humanist geometric sans for everything else: friendly, highly legible at
   small sizes, and it does not fight the serif. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} | Product engineering team for founders`,
    template: `%s | ${brand.name}`,
  },
  description: brand.tagline,
  applicationName: brand.name,
  keywords: [
    brand.name,
    "development team",
    "software development agency",
    "product engineering team",
    "hire a development team",
    "Next.js agency",
    "React development team",
    "Shopify development",
    "headless Shopify",
    "WordPress development",
    "React Native app development",
    "MVP development for startups",
    "dedicated development team",
    "team extension",
    ...services.map((s) => s.title),
  ],
  authors: [{ name: brand.legalName, url: brand.url }],
  creator: brand.legalName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: brand.url,
    siteName: brand.name,
    title: `${brand.name} | Product engineering team for founders`,
    description: brand.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Product engineering team for founders`,
    description: brand.tagline,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  /* Matches --color-cream so mobile browser chrome blends into the page.
     One value, because the site has one theme. */
  themeColor: "#fdfbf7",
  colorScheme: "light",
};

/**
 * Organisation structured data.
 *
 * Worth the handful of bytes: it is what lets a founder's Google result show
 * the studio as an entity rather than as a bare blue link.
 */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.legalName,
  alternateName: brand.name,
  url: brand.url,
  description: brand.tagline,
  email: contact.email,
  telephone: contact.phone,
  areaServed: "Worldwide",
  knowsAbout: services.map((s) => s.title),
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.summary },
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <head>
        {/* Marks that scripting is available, which is what lets the scroll
            reveals default to visible. Inline and blocking by design: if it
            ran after first paint, every revealed block would flash in. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/* In the layout so they persist across navigation: re-mounting the
            backdrop would flash, and the nav has to stay mounted for its
            active-pill layout animation to run. */}
        <Backdrop />
        <ScrollProgress />
        <RevealObserver />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <script
          type="application/ld+json"
          // Static, locally-authored object; no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
