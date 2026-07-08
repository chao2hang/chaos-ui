"use client";
import * as React from "react";

/**
 * @hook useUndo
 * @category Data
 * @since 1.0.0-beta.0
 * @description Undo/redo history for a value. Returns value, setters, and can/clear flags.
 * @param initial Initial value.
 * @param limit Max history entries (default 100).
 * @example
 * const { value, set, undo, redo, canUndo, canRedo } = useUndo("");
 */
export interface UseUndoState<T> {
  value: T;
  setValue: (next: T | ((prev: T) => T)) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function useUndo<T>(initial: T, limit = 100): UseUndoState<T> {
  const [past, setPast] = React.useState<T[]>([]);
  const [present, setPresent] = React.useState<T>(initial);
  const [future, setFuture] = React.useState<T[]>([]);

  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const value = typeof next === "function" ? (next as (p: T) => T)(present) : next;
      setPast((p) => {
        const updated = [...p, present];
        return updated.length > limit ? updated.slice(updated.length - limit) : updated;
      });
      setPresent(value);
      setFuture([]);
    },
    [present, limit],
  );

  const undo = React.useCallback(() => {
    setPast((p) => {
      if (p.length === 0) return p;
      const previous = p[p.length - 1] as T;
      setPresent((cur) => {
        setFuture((f) => [cur, ...f]);
        return previous;
      });
      return p.slice(0, -1);
    });
  }, []);

  const redo = React.useCallback(() => {
    setFuture((f) => {
      if (f.length === 0) return f;
      const next = f[0] as T;
      setPresent((cur) => {
        setPast((p) => [...p, cur]);
        return next;
      });
      return f.slice(1);
    });
  }, []);

  const clear = React.useCallback(() => {
    setPast([]);
    setFuture([]);
    setPresent(initial);
  }, [initial]);

  return {
    value: present,
    setValue,
    undo,
    redo,
    clear,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}
