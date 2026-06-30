import { describe, it, expect } from "vitest";
import { excel } from "./excel";

describe("excel", () => {
  it("exports excel", () => {
    expect(excel).toBeDefined();
  });
});
