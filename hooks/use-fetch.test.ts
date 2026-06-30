import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./use-fetch";

describe("useFetch", () => {
  it("returns refetch and loading state", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ hello: "world" }) }),
    );
    const { result } = renderHook(() => useFetch<{ hello: string }>("/api"));
    expect(result.current.isLoading).toBe(true);
    expect(typeof result.current.refetch).toBe("function");
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toEqual({ hello: "world" });
    vi.unstubAllGlobals();
  });

  it("captures errors on non-ok responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const { result } = renderHook(() => useFetch("/api"));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error?.message).toBe("HTTP 500");
    vi.unstubAllGlobals();
  });
});
