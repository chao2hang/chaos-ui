import { describe, it, expect } from "vitest";
import { ErrorBoundary } from "./error-boundary";

describe("error-boundary", () => {
  it("exports ErrorBoundary", () => {
    expect(ErrorBoundary).toBeDefined();
  });
});
