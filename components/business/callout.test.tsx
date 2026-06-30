import { describe, it, expect } from "vitest";
import { Callout } from "./callout";
import type { CalloutProps } from "./callout";

describe("callout", () => {
  it("exports Callout", () => {
    expect(Callout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CalloutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
