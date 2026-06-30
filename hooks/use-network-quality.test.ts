import { describe, it, expect } from "vitest";
import { useNetworkQuality } from "./use-network-quality";

describe("use-network-quality", () => {
  it("exports useNetworkQuality", () => {
    expect(useNetworkQuality).toBeDefined();
  });
});
