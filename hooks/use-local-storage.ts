"use client";
import * as React from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const initialRef = React.useRef(initialValue);
  initialRef.current = initialValue;

  const read = React.useCallback((): T => {
    if (typeof window === "undefined") return initialRef.current;
    try {
      const raw = window.localStorage.getItem(key);
      return raw == null ? initialRef.current : (JSON.parse(raw) as T);
    } catch {
      return initialRef.current;
    }
  }, [key]);

  // SSR-safe: start from initialValue, hydrate from localStorage after mount.
  const [value, setValue] = React.useState<T>(initialValue);

  React.useEffect(() => {
    setValue(read());
  }, [key, read]);

  const set = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {}
        return resolved;
      });
    },
    [key],
  );

  const remove = React.useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {}
    setValue(initialRef.current);
  }, [key]);

  React.useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key) setValue(read());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, read]);

  return [value, set, remove];
}
