import { describe, it, expect } from "vitest";
import { Tracking } from "./tracking";
import type { TrackingProps } from "./tracking";

describe("tracking", () => {
  it("exports Tracking", () => {
    expect(Tracking).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TrackingProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
