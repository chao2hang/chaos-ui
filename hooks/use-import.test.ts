import { describe, it, expect } from "vitest";
import { useImport } from "./use-import";

describe("use-import", () => {
  it("exports useImport", () => {
    expect(useImport).toBeDefined();
  });
});
