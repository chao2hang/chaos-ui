import { describe, it, expect } from "vitest";
import { TabCrudPage } from "./tab-crud-page";
import type { TabCrudPageProps } from "./tab-crud-page";

describe("tab-crud-page", () => {
  it("exports TabCrudPage", () => {
    expect(TabCrudPage).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TabCrudPageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
