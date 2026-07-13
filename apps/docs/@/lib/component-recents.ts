"use client";

/** localStorage keys for docs component discovery */
export const RECENT_COMPONENTS_KEY = "docs:component-recents";
export const FAVORITE_COMPONENTS_KEY = "docs:component-favorites";

export const MAX_RECENTS = 20;

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

/** Push a component slug to the front of recents (deduped, capped). */
export function pushRecentComponent(slug: string): string[] {
  const prev = readJson<string[]>(RECENT_COMPONENTS_KEY, []);
  const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX_RECENTS);
  writeJson(RECENT_COMPONENTS_KEY, next);
  return next;
}

export function getRecentComponents(): string[] {
  return readJson<string[]>(RECENT_COMPONENTS_KEY, []);
}

export function getFavoriteComponents(): string[] {
  return readJson<string[]>(FAVORITE_COMPONENTS_KEY, []);
}

export function toggleFavoriteComponent(slug: string): string[] {
  const prev = getFavoriteComponents();
  const next = prev.includes(slug)
    ? prev.filter((s) => s !== slug)
    : [...prev, slug];
  writeJson(FAVORITE_COMPONENTS_KEY, next);
  return next;
}

export function isFavoriteComponent(slug: string, favorites: string[]): boolean {
  return favorites.includes(slug);
}
