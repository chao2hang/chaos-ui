import { describe, it, expect } from "vitest";
import { useSwr } from "./use-swr";

describe("use-swr", () => {
  it("exports useSwr", () => {
    expect(useSwr).toBeDefined();
  });
});
