import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAsync } from "@/hooks/use-async";

describe("useAsync", () => {
  it("runs immediately and resolves", async () => {
    const fn = vi.fn(async () => "data");
    const { result } = renderHook(() => useAsync(fn));
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.data).toBe("data");
  });

  it("handles error", async () => {
    const fn = vi.fn(async () => {
      throw new Error("fail");
    });
    const { result } = renderHook(() => useAsync(fn, false));
    await act(async () => {
      try {
        await result.current.run();
      } catch {
        // useAsync catches internally; swallow to avoid unhandled rejection
      }
    });
    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("manual run", async () => {
    const fn = vi.fn(async (x: number) => x * 2);
    const { result } = renderHook(() => useAsync(fn, false));
    expect(result.current.status).toBe("idle");
    await act(async () => {
      await result.current.run(5);
    });
    expect(result.current.data).toBe(10);
  });
});

it("ignores stale success when a newer run finishes first", async () => {
  let resolveSlow: (v: string) => void = () => undefined;
  const slow = new Promise<string>((r) => {
    resolveSlow = r;
  });
  const fn = vi.fn(async (id: number) => {
    if (id === 1) return slow;
    return "fast";
  });
  const { result } = renderHook(() => useAsync(fn, false));
  await act(async () => {
    void result.current.run(1);
  });
  await act(async () => {
    await result.current.run(2);
  });
  await waitFor(() => expect(result.current.data).toBe("fast"));
  await act(async () => {
    resolveSlow("slow");
    await Promise.resolve();
  });
  // Stale slow must not overwrite fast
  expect(result.current.data).toBe("fast");
  expect(result.current.status).toBe("success");
});
