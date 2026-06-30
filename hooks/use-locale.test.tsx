import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import {
  supportedLocales,
  getStoredLocale,
  LocaleProvider,
  useLocale,
} from "./use-locale";

function LocaleProbe() {
  const { locale, setLocale, supportedLocales: locales } = useLocale();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="count">{locales.length}</span>
      <button type="button" onClick={() => setLocale("en-US")}>
        set-en
      </button>
    </div>
  );
}

describe("use-locale", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "";
  });

  it("exports supportedLocales", () => {
    expect(supportedLocales).toBeDefined();
    expect(supportedLocales).toContain("zh-CN");
    expect(supportedLocales).toContain("en-US");
  });
  it("exports getStoredLocale", () => {
    expect(getStoredLocale).toBeDefined();
  });
  it("exports LocaleProvider", () => {
    expect(LocaleProvider).toBeDefined();
  });
  it("exports useLocale", () => {
    expect(useLocale).toBeDefined();
  });

  it("getStoredLocale returns zh-CN when nothing stored", () => {
    localStorage.clear();
    expect(getStoredLocale()).toBe("zh-CN");
  });

  it("getStoredLocale returns stored valid locale", () => {
    localStorage.setItem("chaos-ui-locale", "en-US");
    expect(getStoredLocale()).toBe("en-US");
  });

  it("getStoredLocale falls back to zh-CN for unsupported stored value", () => {
    localStorage.setItem("chaos-ui-locale", "fr-FR");
    expect(getStoredLocale()).toBe("zh-CN");
  });

  it("provider renders children with default locale zh-CN", () => {
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId("locale").textContent).toBe("zh-CN");
    expect(screen.getByTestId("count").textContent).toBe("2");
    expect(document.documentElement.lang).toBe("zh-CN");
  });

  it("setLocale updates locale, persists to storage, and sets document lang", () => {
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("set-en"));
    });
    expect(screen.getByTestId("locale").textContent).toBe("en-US");
    expect(localStorage.getItem("chaos-ui-locale")).toBe("en-US");
    expect(document.documentElement.lang).toBe("en-US");
  });

  it("initialLocale is honored only when window is undefined (SSR)", () => {
    // In jsdom (window defined) the provider reads getStoredLocale() on mount,
    // which falls back to "zh-CN" when nothing valid is stored — so the
    // initialLocale prop is NOT used client-side. This documents that behavior.
    render(
      <LocaleProvider initialLocale="en-US">
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId("locale").textContent).toBe("zh-CN");
  });

  it("throws when useLocale is used outside a provider", () => {
    // Suppress the expected error log noise.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<LocaleProbe />)).toThrow(/LocaleProvider/);
    spy.mockRestore();
  });

  it("supports switching locale multiple times", () => {
    function Multi() {
      const { locale, setLocale } = useLocale();
      return (
        <div>
          <span data-testid="m-locale">{locale}</span>
          <button type="button" onClick={() => setLocale("en-US")}>
            en
          </button>
          <button type="button" onClick={() => setLocale("zh-CN")}>
            zh
          </button>
        </div>
      );
    }
    render(
      <LocaleProvider>
        <Multi />
      </LocaleProvider>,
    );
    act(() => fireEvent.click(screen.getByText("en")));
    expect(screen.getByTestId("m-locale").textContent).toBe("en-US");
    act(() => fireEvent.click(screen.getByText("zh")));
    expect(screen.getByTestId("m-locale").textContent).toBe("zh-CN");
    expect(localStorage.getItem("chaos-ui-locale")).toBe("zh-CN");
  });

  it("a re-mounted provider picks up the persisted locale from storage", () => {
    localStorage.setItem("chaos-ui-locale", "en-US");
    const { unmount } = render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId("locale").textContent).toBe("en-US");
    unmount();
    // Simulate a page reload: a fresh provider reads the stored value.
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId("locale").textContent).toBe("en-US");
  });

  it("getStoredLocale SSR branch returns zh-CN when window is undefined", () => {
    // Exercise the `typeof window === "undefined"` path by temporarily
    // removing window from globalThis. localStorage is unavailable there too.
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "window",
    );
    try {
      // delete is allowed on the host object (typed as Record<string, unknown>).
      delete (globalThis as Record<string, unknown>).window;
      expect(getStoredLocale()).toBe("zh-CN");
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(globalThis, "window", originalDescriptor);
      }
    }
  });
});
