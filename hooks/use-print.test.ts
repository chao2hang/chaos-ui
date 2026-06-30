import { describe, it, expect } from "vitest";
import { usePrint } from "./use-print";

describe("use-print", () => {
  it("exports usePrint", () => {
    expect(usePrint).toBeDefined();
  });
});
