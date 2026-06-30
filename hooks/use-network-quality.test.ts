import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useNetworkQuality } from "./use-network-quality";

describe("useNetworkQuality", () => {
  it("returns online state from navigator", () => {
    const { result } = renderHook(() => useNetworkQuality());
    expect(typeof result.current.online).toBe("boolean");
  });

  it("reflects navigator.onLine", () => {
    const before = navigator.onLine;
    const { result } = renderHook(() => useNetworkQuality());
    expect(result.current.online).toBe(before);
  });
});
