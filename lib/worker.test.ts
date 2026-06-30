import { describe, it, expect } from "vitest";
import { worker } from "./worker";

describe("worker", () => {
  it("exports worker", () => {
    expect(worker).toBeDefined();
  });
});
