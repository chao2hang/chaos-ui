"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CommandPaletteLazy = dynamic(
  () =>
    import("@/components/command-palette").then((m) => ({
      default: m.CommandPalette,
    })),
  { ssr: false },
);

/**
 * Defer loading the full command palette (+ catalog meta) until first Cmd/Ctrl+K
 * or idle. Keeps root layout client baseline light.
 */
export function CommandPaletteHost() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        enable();
      }
    };
    window.addEventListener("keydown", onKey);
    // Prefetch after idle so first open is snappy without blocking first paint
    let idleId: number | undefined;
    const timeoutId = window.setTimeout(enable, 2500);
    const ric = (
      window as Window & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") {
      idleId = ric(() => enable(), { timeout: 4000 });
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      const cic = (
        window as Window & { cancelIdleCallback?: (id: number) => void }
      ).cancelIdleCallback;
      if (idleId != null && typeof cic === "function") cic(idleId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!enabled) return null;
  return <CommandPaletteLazy />;
}
