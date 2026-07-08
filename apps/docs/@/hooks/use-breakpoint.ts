"use client";
import * as React from "react";

/**
 * @hook useBreakpoint
 * @category hooks/responsive
 * @since 0.2.0
 * @description 响应式断点检测 / Responsive breakpoint detection
 * @returns Current breakpoint key ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
 * @example
 * const bp = useBreakpoint();
 * if (bp === 'xs') { ... }
 */

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint(): Breakpoint | undefined {
  // Start undefined so SSR and first client render match (avoids hydration
  // mismatch from assuming "lg" server-side while the real width differs).
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= breakpoints["2xl"]) setBreakpoint("2xl");
      else if (width >= breakpoints.xl) setBreakpoint("xl");
      else if (width >= breakpoints.lg) setBreakpoint("lg");
      else if (width >= breakpoints.md) setBreakpoint("md");
      else if (width >= breakpoints.sm) setBreakpoint("sm");
      else setBreakpoint("xs");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint, { passive: true });
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}

export function useIsBreakpoint(breakpoint: Breakpoint): boolean {
  const current = useBreakpoint();
  // Before hydration (undefined) return false — safer than assuming a default.
  if (!current) return false;
  const order: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  return order.indexOf(current) >= order.indexOf(breakpoint);
}
