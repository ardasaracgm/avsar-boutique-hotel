"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wrap only the sections that animate (Phase 2+), not the whole app — keeps motion out of the
 * initial bundle. Use `m.*` components inside (not `motion.*`) so LazyMotion's small feature set applies.
 * Honors the OS "reduce motion" setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
