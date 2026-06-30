import { describe, it, expect } from "vitest";
import { useCopyToClipboard } from "./use-copy-to-clipboard";

describe("use-copy-to-clipboard", () => {
  it("exports useCopyToClipboard", () => {
    expect(useCopyToClipboard).toBeDefined();
  });
});
