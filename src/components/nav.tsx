"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import { brand, contact, nav } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Floating pill header.
 *
 * Transparent and wide at the top of the page, then it contracts into a
 * rounded card with a soft lift once the visitor scrolls. Contracting rather
 * than only adding a background is what keeps the CTA on screen for the whole
 * page without the header ever feeling heavy.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Read once on mount too: a reload restores scroll position, and without
    // this the header would start expanded halfway down a page.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-teal focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-on-teal"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="shell">
          <div
            className={cn(
              "flex items-center justify-between gap-6 rounded-full transition-all duration-500 ease-out",
              scrolled
                ? "lift border border-line bg-cream/90 py-2.5 pr-2.5 pl-5 backdrop-blur-xl md:pl-6"
                : "border border-transparent px-0 py-2",
            )}
          >
            <Logo />

            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                    isActive(item.href)
                      ? "text-ink"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-clay-soft"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              {brand.availability.open && (
                <span className="hidden items-center gap-2 rounded-full bg-clay-soft py-1.5 pr-4 pl-3 xl:inline-flex">
                  <span className="relative grid size-2 place-items-center">
                    <span className="absolute size-2 animate-pulse-dot rounded-full bg-clay" />
                    <span className="size-2 rounded-full bg-clay" />
                  </span>
                  <span className="text-[0.8125rem] font-semibold text-clay-ink">
                    {brand.availability.label}
                  </span>
                </span>
              )}

              {/* Straight to the booking calendar, not to the contact form.
                  Someone who reaches for the header CTA is ready to talk; the
                  form is for people who want to explain first, and that path
                  is still the one every in-page CTA takes.

                  Wrapped rather than given `hidden sm:inline-flex` directly:
                  the button's own base class sets inline-flex, and two
                  display utilities at equal specificity leave which one wins
                  down to stylesheet order. */}
              <span className="hidden sm:contents">
                <Button href={contact.calendar} size="md">
                  Book a call
                </Button>
              </span>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid size-11 place-items-center rounded-full border border-line bg-card text-ink transition-colors hover:border-clay hover:text-clay-ink lg:hidden"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="teal-block fixed inset-0 z-40 lg:hidden"
          >
            {/* Closing on any click inside the drawer covers every link in one
                handler, and reacting to the click is correct where reacting to
                a pathname change is not: tapping the link for the page you are
                already on still has to dismiss the overlay. */}
            <div
              onClick={() => setOpen(false)}
              className="shell flex h-full flex-col justify-center pt-20 pb-10"
            >
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between gap-4 border-b border-on-teal/15 py-5"
                    >
                      <span
                        className={cn(
                          "display text-[clamp(2rem,10vw,3rem)] transition-colors",
                          isActive(item.href)
                            ? "text-clay-200"
                            : "text-on-teal group-hover:text-clay-200",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="text-[0.8125rem] text-on-teal-muted">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-10 space-y-5"
              >
                {/* The drawer is the header CTA on mobile, so it goes to the
                    same place: the calendar, not the form. */}
                <Button href={contact.calendar} size="lg" className="w-full">
                  Book a call
                </Button>
                <a
                  href={`mailto:${contact.email}`}
                  className="block text-center text-[0.9375rem] text-on-teal-muted"
                >
                  {contact.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
