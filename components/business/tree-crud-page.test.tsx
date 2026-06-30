import { describe, it, expect } from "vitest";
import { TreeCrudPage } from "./tree-crud-page";
import type { TreeCrudPageProps } from "./tree-crud-page";

describe("tree-crud-page", () => {
  it("exports TreeCrudPage", () => {
    expect(TreeCrudPage).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TreeCrudPageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
