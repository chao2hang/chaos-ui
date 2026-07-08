"use client";
import * as React from "react";

/**
 * @hook useRedo
 * @category Data
 * @since 1.0.0-beta.0
 * @description Tracks redo history for an externally-managed undo stack. Pair with {@link useUndo} when you need separate redo state, or use `useUndo` which includes both. This hook exposes the redo queue length and a way to push/peek/pop.
 * @param initial Redo queue seed (default empty).
 * @example
 * const { redoCount, push, pop, peek } = useRedo<string>();
 */
export interface UseRedoState<T> {
  redoCount: number;
  push: (value: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
}

export function useRedo<T>(): UseRedoState<T> {
  const [queue, setQueue] = React.useState<T[]>([]);

  const push = React.useCallback((value: T) => {
    setQueue((q) => [value, ...q]);
  }, []);

  const pop = React.useCallback(() => {
    let value: T | undefined;
    setQueue((q) => {
      if (q.length === 0) return q;
      value = q[0];
      return q.slice(1);
    });
    return value;
  }, []);

  const peek = React.useCallback(() => queue[0], [queue]);

  const clear = React.useCallback(() => setQueue([]), []);

  return { redoCount: queue.length, push, pop, peek, clear };
}
