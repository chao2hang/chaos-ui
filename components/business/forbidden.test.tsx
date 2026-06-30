import { describe, it, expect } from "vitest";
import { Forbidden } from "./forbidden";
import type { ForbiddenProps } from "./forbidden";

describe("forbidden", () => {
  it("exports Forbidden", () => {
    expect(Forbidden).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ForbiddenProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
