"use client";

import { useCallback, useEffect, useRef } from "react";
import { track } from "@/lib/telemetry";

export interface UseTrackOptions {
  /** Event name sent to the telemetry adapter. */
  event: string;
  /** Additional properties merged into the event payload. */
  properties?: Record<string, unknown>;
  /** If true, fires the event on mount. Default false. */
  trackOnMount?: boolean;
  /** If true, fires the event on unmount. Default false. */
  trackOnUnmount?: boolean;
}

/**
 * Declarative tracking hook.
 *
 * Returns a `trackNow(extra?)` function for imperative use. Optionally
 * fires events on mount/unmount via `trackOnMount` / `trackOnUnmount`.
 *
 * @since 1.1.0
 * @example
 * // Track a page view on mount
 * useTrack({ event: "page_view", properties: { page: "dashboard" }, trackOnMount: true })
 *
 * // Track a button click
 * const { trackNow } = useTrack({ event: "export_csv" })
 * <Button onClick={() => trackNow({ rows: 142 })}>Export</Button>
 */
export function useTrack(options: UseTrackOptions) {
  const { event, properties, trackOnMount, trackOnUnmount } = options;
  const propsRef = useRef(properties);
  propsRef.current = properties;

  const trackNow = useCallback(
    (extra?: Record<string, unknown>) => {
      track(event, { ...propsRef.current, ...extra });
    },
    [event],
  );

  useEffect(() => {
    if (trackOnMount) {
      track(event, propsRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (trackOnUnmount) {
        track(event, { ...propsRef.current, unmount: true });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { trackNow };
}
