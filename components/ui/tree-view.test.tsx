import { describe, it, expect } from "vitest";
import { TreeView } from "./tree-view";
import type { TreeNode, TreeViewProps } from "./tree-view";

describe("tree-view", () => {
  it("exports TreeView", () => {
    expect(TreeView).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TreeNode | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: TreeViewProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
