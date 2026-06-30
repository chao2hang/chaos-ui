import { describe, it, expect } from "vitest";
import { cspHeaders } from "./security";

describe("security", () => {
  it("exports cspHeaders", () => {
    expect(cspHeaders).toBeDefined();
  });
});
