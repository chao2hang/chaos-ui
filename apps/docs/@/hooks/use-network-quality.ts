"use client";
import * as React from "react";

/**
 * @hook useNetworkQuality
 * @category Data
 * @since 1.0.0-beta.0
 * @description Estimates network quality via navigator.connection (effectiveType, downlink, rtt) plus online/offline status.
 * @example
 * const { online, effectiveType, downlink, rtt } = useNetworkQuality();
 */
export interface UseNetworkQualityState {
  online: boolean;
  effectiveType: string | undefined;
  downlink: number | undefined;
  rtt: number | undefined;
  saveData: boolean | undefined;
}

function readConnection(): UseNetworkQualityState {
  if (typeof navigator === "undefined") {
    return { online: true, effectiveType: undefined, downlink: undefined, rtt: undefined, saveData: undefined };
  }
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean } }).connection;
  return {
    online: navigator.onLine,
    effectiveType: conn?.effectiveType,
    downlink: conn?.downlink,
    rtt: conn?.rtt,
    saveData: conn?.saveData,
  };
}

export function useNetworkQuality(): UseNetworkQualityState {
  const [state, setState] = React.useState<UseNetworkQualityState>(readConnection);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setState(readConnection());
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    const conn = (navigator as Navigator & { connection?: EventTarget }).connection;
    conn?.addEventListener?.("change", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      conn?.removeEventListener?.("change", update);
    };
  }, []);

  return state;
}
