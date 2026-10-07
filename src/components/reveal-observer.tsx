"use client";

import { useEffect } from "react";

/**
 * Drives every <Reveal> on the page from one IntersectionObserver.
 *
 * Mounted once in the layout. One observer for the whole document rather than
 * one per element: a long marketing page has forty-odd reveals, and forty
 * observers plus forty client component boundaries is a measurable cost for an
 * effect that is pure decoration.
 *
 * A MutationObserver picks up nodes added by client-side navigation and by the
 * filterable work grid, so nothing has to re-register on route change.
 */
export function RevealObserver() {
  useEffect(() => {
    const items = () =>
      Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));

    // Anything already on screen when the page loads should be shown without
    // an entrance: the visitor did not scroll to it, so there is nothing to
    // reveal. `is-instant` suppresses the transition for this group only.
    const viewportBottom = window.innerHeight;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          // One-shot: re-animating on every pass is what makes a long page
          // feel cheap, and it keeps the observer list shrinking.
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    const register = (el: HTMLElement) => {
      if (el.getBoundingClientRect().top < viewportBottom) {
        el.classList.add("is-instant", "is-in");
        return;
      }
      observer.observe(el);
    };

    items().forEach(register);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.classList.contains("reveal")) observer.observe(node);
          node
            .querySelectorAll<HTMLElement>(".reveal:not(.is-in)")
            .forEach((el) => observer.observe(el));
        }
      }
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
