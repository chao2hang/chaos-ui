import { describe, it, expect } from "vitest";
import { PageHeader } from "./page-header";
import type { BreadcrumbItemType, PageHeaderProps } from "./page-header";

describe("page-header", () => {
  it("exports PageHeader", () => {
    expect(PageHeader).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BreadcrumbItemType | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: PageHeaderProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
