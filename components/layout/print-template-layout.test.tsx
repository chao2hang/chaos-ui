import { describe, it, expect } from "vitest";
import { PrintTemplateLayout } from "./print-template-layout";
import type { PrintTemplateLayoutProps } from "./print-template-layout";

describe("print-template-layout", () => {
  it("exports PrintTemplateLayout", () => {
    expect(PrintTemplateLayout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PrintTemplateLayoutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
