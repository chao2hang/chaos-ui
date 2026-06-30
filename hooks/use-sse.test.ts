import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSse } from "./use-sse";

describe("useSse", () => {
  it("starts with closed state when no url", () => {
    const { result } = renderHook(() => useSse(null));
    expect(result.current.readyState).toBe(0);
  });

  it("exports lastEvent default undefined", () => {
    const { result } = renderHook(() => useSse(null));
    expect(result.current.lastEvent).toBeUndefined();
  });
});
