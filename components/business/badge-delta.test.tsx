import { describe, it, expect } from "vitest";
import { BadgeDelta } from "./badge-delta";
import type { BadgeDeltaProps } from "./badge-delta";

describe("badge-delta", () => {
  it("exports BadgeDelta", () => {
    expect(BadgeDelta).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BadgeDeltaProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
