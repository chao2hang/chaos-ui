"use client";

import { useCallback, useEffect, useRef } from "react";

export interface UseTrackOptions {
  event: string;
  properties?: Record<string, unknown>;
  trackOnMount?: boolean;
  trackOnUnmount?: boolean;
}

/**
 * Docs dual-inventory tracking hook.
 * Package telemetry `track` is not part of the stable /lib surface used by docs;
 * this shim no-ops while preserving the call signature for stories/tests.
 */
export function useTrack(options: UseTrackOptions) {
  const {
    event,
    properties,
    trackOnMount = false,
    trackOnUnmount = false,
  } = options;
  const propsRef = useRef(properties);
  propsRef.current = properties;

  const trackNow = useCallback(
    (_extra?: Record<string, unknown>) => {
      void event;
      void propsRef.current;
    },
    [event],
  );

  useEffect(() => {
    if (trackOnMount) trackNow();
    return () => {
      if (trackOnUnmount) trackNow();
    };
  }, [trackOnMount, trackOnUnmount, trackNow]);

  return trackNow;
}
