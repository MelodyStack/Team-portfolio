"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

/**
 * FAQ accordion.
 *
 * Single-open rather than multi-open: these are objections, and we want the
 * answer the visitor is reading to be the only thing on screen. The first item
 * starts open so the pattern is obvious without a click.
 */
export function Accordion({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line-soft border-y border-line-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "text-[1.0625rem] font-medium transition-colors duration-300 md:text-lg",
                    isOpen ? "text-ink" : "text-ink group-hover:text-ink",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-out",
                    isOpen
                      ? "rotate-45 border-clay bg-clay text-on-teal"
                      : "border-line text-faint group-hover:border-clay group-hover:text-clay-ink",
                  )}
                >
                  <Plus className="size-3.5" aria-hidden />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 text-[0.9375rem] leading-relaxed text-muted md:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
