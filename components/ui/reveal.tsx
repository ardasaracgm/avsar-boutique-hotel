"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/**
 * Fades content in once when it scrolls into view. Pure CSS + IntersectionObserver
 * (no animation library). Content stays visible without JS and with reduced motion.
 */
export function Reveal({ delay = 0, style, ...rest }: ComponentPropsWithoutRef<"div"> & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = "";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} data-reveal="" style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }} {...rest} />;
}
