import { describe, it, expect } from "vitest";
import { UTMBuilder } from "./utm-builder";
import type { UTMBuilderValue, UTMBuilderProps } from "./utm-builder";

describe("utm-builder", () => {
  it("exports UTMBuilder", () => {
    expect(UTMBuilder).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: UTMBuilderValue | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: UTMBuilderProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
