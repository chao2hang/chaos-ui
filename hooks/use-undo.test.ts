import { describe, it, expect } from "vitest";
import { useUndo } from "./use-undo";

describe("use-undo", () => {
  it("exports useUndo", () => {
    expect(useUndo).toBeDefined();
  });
});
