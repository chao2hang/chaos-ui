import { describe, it, expect } from "vitest";
import {
  PageContainer,
  PageHeader,
  PageContent,
  pageContainerVariants,
} from "./page-container";
import type {
  PageContainerProps,
  PageHeaderProps,
  PageContentProps,
} from "./page-container";

describe("page-container", () => {
  it("exports PageContainer", () => {
    expect(PageContainer).toBeDefined();
  });

  it("exports PageHeader", () => {
    expect(PageHeader).toBeDefined();
  });

  it("exports PageContent", () => {
    expect(PageContent).toBeDefined();
  });

  it("exports pageContainerVariants", () => {
    expect(pageContainerVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PageContainerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: PageHeaderProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: PageContentProps | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
