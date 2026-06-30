import { describe, it, expect } from "vitest";
import { useLocalStorage } from "./use-local-storage";

describe("use-local-storage", () => {
  it("exports useLocalStorage", () => {
    expect(useLocalStorage).toBeDefined();
  });
});
