import { describe, it, expect } from "vitest";
import { useDict } from "./use-dict";

describe("use-dict", () => {
  it("exports useDict", () => {
    expect(useDict).toBeDefined();
  });
});
