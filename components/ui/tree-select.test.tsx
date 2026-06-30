import { describe, it, expect } from "vitest";
import { TreeSelect } from "./tree-select";
import type { TreeNode, TreeSelectProps } from "./tree-select";

describe("tree-select", () => {
  it("exports TreeSelect", () => {
    expect(TreeSelect).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TreeNode | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: TreeSelectProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
