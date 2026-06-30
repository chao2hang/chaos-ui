import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDict } from "./use-dict";
import type { DictOption } from "./use-dict";

const opts: DictOption[] = [
  { value: "m", label: "Male" },
  { value: "f", label: "Female" },
];

describe("useDict", () => {
  it("loads options and resolves labels", async () => {
    const fetcher = vi.fn(async () => opts);
    const { result } = renderHook(() => useDict("gender", fetcher));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.options).toEqual(opts);
    expect(result.current.getLabel("m")).toBe("Male");
    expect(result.current.getLabel("x")).toBe("x");
  });

  it("does not load when dictType is null", () => {
    const fetcher = vi.fn(async () => opts);
    const { result } = renderHook(() => useDict(null, fetcher));
    expect(fetcher).not.toHaveBeenCalled();
    expect(result.current.options).toEqual([]);
  });
});
