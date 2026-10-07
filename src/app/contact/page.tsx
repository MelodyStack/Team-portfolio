import type { Metadata } from "next";
import { CalendarCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Accordion } from "@/components/accordion";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Section, SectionHead } from "@/components/section";
import { brand, contact, cta, faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 30-minute build review with the engineer who would lead your project. No deck, no sales script, just a straight answer and a ballpark range.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "Replies within one working day",
  },
  {
    icon: CalendarCheck,
    label: "Book directly",
    value: "Pick a slot",
    href: contact.calendar,
    note: "30 minutes, with the technical lead",
  },
  {
    icon: Phone,
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^+\d]/g, "")}`,
    note: "Core hours, or leave a message",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Tell us what you are trying to build."
        lede="Thirty minutes with the engineer who would lead the project. You will leave with an opinion on what to build, what to skip, and roughly what it costs, whether or not you hire us."
      />

      <Section tightTop className="border-b border-line-soft">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-xl font-medium text-ink">
                Send us the short version
              </h2>
              <p className="mt-2.5 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                Four lines is plenty. We would rather read something honest and
                incomplete than a polished brief that hides the real constraint.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-9">
              <ContactForm />
            </Reveal>
          </div>

          <div className="space-y-5">
            {CHANNELS.map((channel, i) => (
              <Reveal key={channel.label} delay={0.05 + i * 0.06}>
                <a
                  href={channel.href}
                  {...(channel.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="group flex items-start gap-4 rounded-2xl border border-line bg-card p-6 transition-all duration-200 ease-out hover:-translate-y-1 lift hover:lift"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-cream-2 text-ink transition-colors duration-500 group-hover:border-line group-hover:bg-clay">
                    <channel.icon className="size-5" aria-hidden />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[0.8125rem] text-faint">
                      {channel.label}
                    </span>
                    <span className="mt-1.5 block truncate text-[0.9375rem] text-ink transition-colors group-hover:text-ink">
                      {channel.value}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-faint">
                      {channel.note}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <div className="rounded-2xl border border-line bg-card p-6">
                <p className="text-[0.8125rem] text-ink">
                  What happens next
                </p>
                <ol className="mt-5 space-y-4">
                  {cta.steps.map((step, i) => (
                    <li key={step} className="flex gap-3.5">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-line-soft text-[0.6875rem] text-ink">
                        {i + 1}
                      </span>
                      <span className="text-[0.875rem] leading-relaxed text-muted">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-3.5 rounded-2xl border border-line bg-card p-6">
                <p className="flex items-start gap-3 text-[0.875rem] text-muted">
                  <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-faint" />
                  {contact.location}
                </p>
                <p className="flex items-start gap-3 text-[0.875rem] text-muted">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-faint" />
                  {brand.availability.label} · {brand.availability.detail}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Before you write"
          title="You may find your answer here."
        />
        <div className="mt-12">
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  );
}
