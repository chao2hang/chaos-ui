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
