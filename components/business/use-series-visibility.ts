"use client";

import * as React from "react";

export interface UseSeriesVisibilityOptions {
  /** When false, toggle is a no-op (static legend). Default true. */
  interactiveLegend?: boolean | undefined;
  /** Series names hidden on first render. */
  defaultHiddenSeries?: string[] | undefined;
  /** Fires after each toggle with the current hidden name list (stable order). */
  onSeriesVisibilityChange?: ((hidden: string[]) => void) | undefined;
}

export interface UseSeriesVisibilityResult {
  isHidden: (name: string) => boolean;
  toggle: (name: string) => void;
  /** Sorted list of currently hidden series names. */
  hiddenNames: string[];
}

/**
 * Shared multi-series legend visibility for pure SVG charts (AreaChart / LineChart).
 * Issue #23 / CUI-DASH-08 — click legend to show/hide series; allow hide-all.
 */
function useSeriesVisibility({
  interactiveLegend = true,
  defaultHiddenSeries = [],
  onSeriesVisibilityChange,
}: UseSeriesVisibilityOptions = {}): UseSeriesVisibilityResult {
  const [hidden, setHidden] = React.useState<Set<string>>(
    () => new Set(defaultHiddenSeries),
  );
  const onChangeRef = React.useRef(onSeriesVisibilityChange);
  React.useEffect(() => {
    onChangeRef.current = onSeriesVisibilityChange;
  }, [onSeriesVisibilityChange]);

  const hiddenNames = React.useMemo(
    () => Array.from(hidden).sort((a, b) => a.localeCompare(b)),
    [hidden],
  );

  const isHidden = React.useCallback(
    (name: string) => hidden.has(name),
    [hidden],
  );

  const toggle = React.useCallback(
    (name: string) => {
      if (!interactiveLegend) return;
      setHidden((prev) => {
        const next = new Set(prev);
        if (next.has(name)) next.delete(name);
        else next.add(name);
        const names = Array.from(next).sort((a, b) => a.localeCompare(b));
        // Defer so callers see state after commit; still fire in same event turn via queue
        queueMicrotask(() => onChangeRef.current?.(names));
        return next;
      });
    },
    [interactiveLegend],
  );

  return { isHidden, toggle, hiddenNames };
}

export { useSeriesVisibility };
