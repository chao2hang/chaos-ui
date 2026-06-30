import { describe, it, expect } from "vitest";
import { useSse } from "./use-sse";

describe("use-sse", () => {
  it("exports useSse", () => {
    expect(useSse).toBeDefined();
  });
});
