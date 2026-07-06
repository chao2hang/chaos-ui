import "@testing-library/jest-dom/vitest";
import { vi, beforeEach, afterEach } from "vitest";
import React from "react";

function createStorage() {
  const store = new Map<string, string>();

  return {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    get length() {
      return store.size;
    },
  };
}

function ensureStorage(name: "localStorage" | "sessionStorage") {
  if (typeof window === "undefined") return;

  try {
    const storage = window[name];
    if (storage) {
      storage.clear();
      return;
    }
  } catch {
    // fall through to polyfill
  }

  Object.defineProperty(window, name, {
    value: createStorage(),
    configurable: true,
  });
}

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

if (typeof window !== "undefined" && !window.IntersectionObserver) {
  window.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(() => []),
    root: null,
    rootMargin: "",
    thresholds: [],
  })) as unknown as typeof IntersectionObserver;
}

if (typeof window !== "undefined" && !window.ResizeObserver) {
  window.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

if (typeof window !== "undefined" && !window.scrollTo) {
  window.scrollTo = vi.fn();
}

if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}

// HTMLDialogElement — jsdom does not implement show/showModal/close (audit C7)
if (typeof HTMLDialogElement !== "undefined") {
  HTMLDialogElement.prototype.show ??= function (this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.open = false;
  };
}

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  useParams: vi.fn(() => ({})),
}));

vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    theme: "light",
    resolvedTheme: "light",
    setTheme: vi.fn(),
    themes: ["light", "dark", "system"],
    systemTheme: "light",
  })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

beforeEach(() => {
  ensureStorage("localStorage");
  ensureStorage("sessionStorage");
});

afterEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});
