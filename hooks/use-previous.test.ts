import { describe, it, expect } from "vitest";
import { usePrevious } from "./use-previous";

describe("use-previous", () => {
  it("exports usePrevious", () => {
    expect(usePrevious).toBeDefined();
  });
});
