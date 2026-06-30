import { describe, it, expect } from "vitest";
import { usePageTitle } from "./use-page-title";

describe("use-page-title", () => {
  it("exports usePageTitle", () => {
    expect(usePageTitle).toBeDefined();
  });
});
