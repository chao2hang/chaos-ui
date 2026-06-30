import { describe, it, expect } from "vitest";
import { Divider } from "./divider";
import type { DividerProps } from "./divider";

describe("divider", () => {
  it("exports Divider", () => {
    expect(Divider).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DividerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
