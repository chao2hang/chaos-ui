import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useSwr } from "./use-swr";

describe("useSwr", () => {
  it("fetches data via fetcher", async () => {
    const fetcher = vi.fn(async () => ({ ok: 1 }));
    const { result } = renderHook(() => useSwr("/k", fetcher));
    await waitFor(() => expect(result.current.data).toEqual({ ok: 1 }));
    expect(fetcher).toHaveBeenCalledWith("/k");
    expect(result.current.isLoading).toBe(false);
  });

  it("mutate updates data", async () => {
    const fetcher = vi.fn(async () => 1);
    const { result } = renderHook(() => useSwr<number>("/m", fetcher));
    await waitFor(() => expect(result.current.data).toBe(1));
    act(() => result.current.mutate(99));
    expect(result.current.data).toBe(99);
  });

  it("skips fetch when key is null", () => {
    const fetcher = vi.fn(async () => 1);
    const { result: r2 } = renderHook(() => useSwr<number>(null, fetcher));
    expect(fetcher).not.toHaveBeenCalled();
    expect(r2.current.data).toBeUndefined();
  });

  it("captures fetcher errors", async () => {
    const fetcher = vi.fn(async () => {
      throw new Error("fail");
    });
    const { result } = renderHook(() => useSwr("/e", fetcher));
    await waitFor(() => expect(result.current.error?.message).toBe("fail"));
  });
});
