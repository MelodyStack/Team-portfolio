"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Terracotta reading-progress bar pinned to the very top of the viewport.
 *
 * Spring-damped rather than tied directly to scroll position: raw
 * scrollYProgress jitters on trackpads with momentum, and the bar is the one
 * element on the page where that is visible.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-60 h-[2px] origin-left bg-clay"
    />
  );
}
