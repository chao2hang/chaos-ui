import { describe, it, expect } from "vitest";
import { date } from "./date";

describe("date", () => {
  it("exports date", () => {
    expect(date).toBeDefined();
  });
});
