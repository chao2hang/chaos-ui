import { describe, it, expect } from "vitest";
import { useNetworkStatus } from "./use-network-status";

describe("use-network-status", () => {
  it("exports useNetworkStatus", () => {
    expect(useNetworkStatus).toBeDefined();
  });
});
