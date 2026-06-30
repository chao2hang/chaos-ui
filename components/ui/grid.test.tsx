import { describe, it, expect } from "vitest";
import { Row, Col } from "./grid";
import type { RowProps, ColProps, ColSpan, ResponsiveCol } from "./grid";

describe("grid", () => {
  it("exports Row", () => {
    expect(Row).toBeDefined();
  });

  it("exports Col", () => {
    expect(Col).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: RowProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ColProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: ColSpan | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: ResponsiveCol | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });
});
