import { describe, it, expect } from "vitest";
import { pdf } from "./pdf";

describe("pdf", () => {
  it("exports pdf", () => {
    expect(pdf).toBeDefined();
  });
});
