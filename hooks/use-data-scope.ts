"use client";
import * as React from "react";

/**
 * @hook useDataScope
 * @category Data
 * @since 1.0.0-beta.0
 * @description Tracks the active data scope (e.g. company/department/period) used to filter business queries, with persistence and change subscription.
 * @param initial Initial scope.
 * @param options storageKey to persist to localStorage.
 * @example
 * const { scope, setScope, subscribe } = useDataScope({ companyId: "1" });
 */
export type DataScope = Record<string, string | number | boolean | undefined>;

export interface UseDataScopeState<S extends DataScope> {
  scope: S;
  setScope: (next: S | ((prev: S) => S)) => void;
  patch: (partial: Partial<S>) => void;
  reset: () => void;
  subscribe: (fn: (scope: S) => void) => () => void;
}

export function useDataScope<S extends DataScope>(
  initial: S,
  options: { storageKey?: string } = {},
): UseDataScopeState<S> {
  const { storageKey } = options;
  const [scope, setScopeState] = React.useState<S>(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) return { ...initial, ...JSON.parse(raw) };
      } catch {
        // ignore
      }
    }
    return initial;
  });
  const listenersRef = React.useRef<Set<(s: S) => void>>(new Set());

  const persist = React.useCallback(
    (next: S) => {
      if (storageKey && typeof window !== "undefined") {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      listenersRef.current.forEach((fn) => fn(next));
    },
    [storageKey],
  );

  const setScope = React.useCallback(
    (next: S | ((prev: S) => S)) => {
      setScopeState((prev) => {
        const value = typeof next === "function" ? (next as (p: S) => S)(prev) : next;
        persist(value);
        return value;
      });
    },
    [persist],
  );

  const patch = React.useCallback(
    (partial: Partial<S>) => {
      setScopeState((prev) => {
        const value = { ...prev, ...partial };
        persist(value);
        return value;
      });
    },
    [persist],
  );

  const reset = React.useCallback(() => {
    setScopeState(initial);
    persist(initial);
  }, [initial, persist]);

  const subscribe = React.useCallback((fn: (scope: S) => void) => {
    listenersRef.current.add(fn);
    return () => {
      listenersRef.current.delete(fn);
    };
  }, []);

  return { scope, setScope, patch, reset, subscribe };
}
