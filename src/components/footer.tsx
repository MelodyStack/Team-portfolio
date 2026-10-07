import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { brand, contact, nav, services } from "@/lib/site";

const year = new Date().getFullYear();

/**
 * Footer, on teal. Opens with the wordmark at display scale so the page ends
 * on a signature rather than trailing off into a sitemap. Terracotta is
 * legible against teal, so links take it on hover.
 */
export function Footer() {
  return (
    <footer className="teal-block relative mt-auto overflow-hidden">
      {/* Warm corner glow, matching the CTA card above it. */}
      <div
        aria-hidden
        className="absolute -top-32 -left-24 size-[32rem] rounded-full bg-clay/10 blur-[120px]"
      />

      <div className="shell relative">
        <Link
          href="/"
          aria-label={`${brand.name}: home`}
          className="group block border-b border-on-teal/15 py-12 md:py-16"
        >
          <span className="display block text-[clamp(2.75rem,12vw,9rem)] leading-[0.9] text-on-teal transition-colors duration-500 group-hover:text-clay-200">
            {brand.name}
          </span>
        </Link>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="max-w-sm text-[0.9375rem] leading-[1.6] text-on-teal-muted">
              {brand.tagline}
            </p>

            <div className="mt-7 space-y-3 text-[0.9375rem]">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 text-on-teal transition-colors hover:text-clay-200"
              >
                <Mail aria-hidden className="size-4 text-on-teal-muted" />
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-2.5 text-on-teal transition-colors hover:text-clay-200"
              >
                <Phone aria-hidden className="size-4 text-on-teal-muted" />
                {contact.phone}
              </a>
              <p className="flex items-start gap-2.5 text-on-teal-muted">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />
                {contact.location}
              </p>
            </div>
          </div>

          <FooterColumn title="Studio">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((service) => (
              <FooterLink key={service.slug} href={`/services#${service.slug}`}>
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-on-teal/20 py-6 md:flex-row md:items-center">
          <p className="text-[0.75rem] text-on-teal-muted">
            © {year} {brand.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2.5 text-[0.75rem] text-on-teal">
        <span className="size-1.5 bg-clay" />
        {title}
      </h2>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

/* Every footer link is internal now that the social column is gone, so this
   no longer carries an external branch. Add one back alongside a `target`
   and `rel` if an outbound link ever returns here. */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="inline-flex items-center text-[0.9375rem] text-on-teal-muted transition-colors hover:text-clay-200"
      >
        {children}
      </Link>
    </li>
  );
}
