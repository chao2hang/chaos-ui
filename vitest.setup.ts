import "@testing-library/jest-dom/vitest"
import { vi, beforeEach, afterEach } from "vitest"
import React from "react"

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
  }))
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
  })) as unknown as typeof IntersectionObserver
}

if (typeof window !== "undefined" && !window.ResizeObserver) {
  window.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
}

if (typeof window !== "undefined" && !window.scrollTo) {
  window.scrollTo = vi.fn()
}

if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn()
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
}))

vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    theme: "light",
    resolvedTheme: "light",
    setTheme: vi.fn(),
    themes: ["light", "dark", "system"],
    systemTheme: "light",
  })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}))

beforeEach(() => {
  if (typeof window !== "undefined") {
    window.localStorage.clear()
    window.sessionStorage.clear()
  }
})

afterEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers()
})
