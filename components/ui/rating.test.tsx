import { describe, it, expect } from "vitest";
import { Rating } from "./rating";

describe("rating", () => {
  it("exports Rating", () => {
    expect(Rating).toBeDefined();
  });
});
