import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act as hookAct } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/use-local-storage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("is exported", () => {
    expect(useLocalStorage).toBeDefined();
  });

  it("returns initial value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("returns stored value when localStorage has data", () => {
    localStorage.setItem("test-key", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("stored");
  });

  it("sets value to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    hookAct(() => {
      result.current[1]("updated");
    });
    expect(result.current[0]).toBe("updated");
    expect(localStorage.getItem("test-key")).toBe(JSON.stringify("updated"));
  });

  it("sets value using updater function", () => {
    const { result } = renderHook(() => useLocalStorage("counter", 0));
    hookAct(() => {
      result.current[1]((prev) => prev + 1);
    });
    expect(result.current[0]).toBe(1);
    expect(localStorage.getItem("counter")).toBe(JSON.stringify(1));
  });

  it("removes value from localStorage and resets to initial", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    hookAct(() => {
      result.current[1]("updated");
    });
    expect(result.current[0]).toBe("updated");
    hookAct(() => {
      result.current[2](); // remove
    });
    expect(result.current[0]).toBe("default");
    expect(localStorage.getItem("test-key")).toBeNull();
  });

  it("handles object values", () => {
    const initial = { name: "test", count: 0 };
    const { result } = renderHook(() => useLocalStorage("obj-key", initial));
    expect(result.current[0]).toEqual(initial);
    hookAct(() => {
      result.current[1]({ name: "updated", count: 1 });
    });
    expect(result.current[0]).toEqual({ name: "updated", count: 1 });
  });

  it("handles array values", () => {
    const { result } = renderHook(() => useLocalStorage("arr-key", [1, 2, 3]));
    expect(result.current[0]).toEqual([1, 2, 3]);
    hookAct(() => {
      result.current[1]((prev) => [...prev, 4]);
    });
    expect(result.current[0]).toEqual([1, 2, 3, 4]);
  });

  it("handles boolean values", () => {
    const { result } = renderHook(() => useLocalStorage("bool-key", false));
    expect(result.current[0]).toBe(false);
    hookAct(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(true);
  });

  it("handles null values in localStorage gracefully", () => {
    localStorage.setItem("test-key", "null");
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBeNull();
  });

  it("handles corrupt JSON in localStorage by returning initial value", () => {
    localStorage.setItem("test-key", "{invalid json");
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "fallback"),
    );
    expect(result.current[0]).toBe("fallback");
  });

  it("listens for storage events from other tabs", () => {
    const { result } = renderHook(() => useLocalStorage("sync-key", "initial"));
    // Simulate a storage event from another tab
    // StorageEvent in jsdom: we need to set localStorage first so read() picks it up
    localStorage.setItem("sync-key", JSON.stringify("from-another-tab"));
    hookAct(() => {
      const event = new StorageEvent("storage", {
        key: "sync-key",
        newValue: JSON.stringify("from-another-tab"),
        storageArea: localStorage,
      });
      window.dispatchEvent(event);
    });
    expect(result.current[0]).toBe("from-another-tab");
  });

  it("ignores storage events for different keys", () => {
    const { result } = renderHook(() => useLocalStorage("my-key", "initial"));
    hookAct(() => {
      const event = new StorageEvent("storage", {
        key: "other-key",
        newValue: JSON.stringify("other-value"),
      });
      window.dispatchEvent(event);
    });
    expect(result.current[0]).toBe("initial");
  });

  it("cleans up storage event listener on unmount", () => {
    const { unmount } = renderHook(() => useLocalStorage("clean-key", "val"));
    unmount();
    // Should not throw or leak
  });

  it("module is importable", async () => {
    const mod = await import("@/hooks/use-local-storage");
    expect(mod.useLocalStorage).toBeDefined();
  });
});
