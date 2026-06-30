import { describe, it, expect } from "vitest";
import { PrintTemplateBuilder } from "./print-template-builder";
import type { PrintTemplateBuilderProps } from "./print-template-builder";

describe("print-template-builder", () => {
  it("exports PrintTemplateBuilder", () => {
    expect(PrintTemplateBuilder).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PrintTemplateBuilderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
