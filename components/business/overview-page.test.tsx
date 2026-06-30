import { describe, it, expect } from "vitest";
import { OverviewPage } from "./overview-page";
import type { OverviewPageProps } from "./overview-page";

describe("overview-page", () => {
  it("exports OverviewPage", () => {
    expect(OverviewPage).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: OverviewPageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
