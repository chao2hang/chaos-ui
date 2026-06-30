import { describe, it, expect } from "vitest";
import { useClipboard } from "./use-clipboard";

describe("use-clipboard", () => {
  it("exports useClipboard", () => {
    expect(useClipboard).toBeDefined();
  });
});
