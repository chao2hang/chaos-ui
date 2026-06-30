import { describe, it, expect } from "vitest";
import { useMessage } from "./use-message";

describe("use-message", () => {
  it("exports useMessage", () => {
    expect(useMessage).toBeDefined();
  });
});
