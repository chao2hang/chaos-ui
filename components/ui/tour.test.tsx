import { describe, it, expect } from "vitest";
import { Tour } from "./tour";
import type { TourStep } from "./tour";

describe("tour", () => {
  it("exports Tour", () => {
    expect(Tour).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TourStep | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
