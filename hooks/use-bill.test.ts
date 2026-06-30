import { describe, it, expect } from "vitest";
import { useBill } from "./use-bill";

describe("use-bill", () => {
  it("exports useBill", () => {
    expect(useBill).toBeDefined();
  });
});
