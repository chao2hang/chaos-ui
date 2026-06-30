import { describe, it, expect } from "vitest";
import { useDataScope } from "./use-data-scope";

describe("use-data-scope", () => {
  it("exports useDataScope", () => {
    expect(useDataScope).toBeDefined();
  });
});
