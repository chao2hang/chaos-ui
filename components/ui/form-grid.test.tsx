import { describe, it, expect } from "vitest";
import { FormGrid, FormGridItem, formGridVariants } from "./form-grid";
import type { FormGridProps, FormGridItemProps } from "./form-grid";

describe("form-grid", () => {
  it("exports FormGrid", () => {
    expect(FormGrid).toBeDefined();
  });

  it("exports FormGridItem", () => {
    expect(FormGridItem).toBeDefined();
  });

  it("exports formGridVariants", () => {
    expect(formGridVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FormGridProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FormGridItemProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
