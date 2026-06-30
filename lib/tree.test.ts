import { describe, it, expect } from "vitest";
import { arrayToTree, treeToArray, findInTree, getPathById, getLeafNodes } from "@/lib/tree";
import type { TreeNode } from "@/lib/tree";

const flat: TreeNode[] = [
  { id: "1", parentId: null, name: "root" },
  { id: "2", parentId: "1", name: "child1" },
  { id: "3", parentId: "1", name: "child2" },
  { id: "4", parentId: "2", name: "grandchild" },
];

describe("lib/tree", () => {
  it("arrayToTree builds nested structure", () => {
    const tree = arrayToTree(flat);
    expect(tree.length).toBe(1);
    const root = tree[0]!;
    expect(root.children?.length).toBe(2);
    expect(root.children?.[0]?.children?.[0]?.id).toBe("4");
  });

  it("treeToArray flattens", () => {
    const tree = arrayToTree(flat);
    const arr = treeToArray(tree);
    expect(arr.length).toBe(4);
  });

  it("findInTree finds node", () => {
    const tree = arrayToTree(flat);
    const found = findInTree(tree, (n) => n.id === "3");
    expect(found?.id).toBe("3");
  });

  it("getPathById returns path", () => {
    const tree = arrayToTree(flat);
    const path = getPathById(tree, "4");
    expect(path.map((n) => n.id)).toEqual(["1", "2", "4"]);
  });

  it("getLeafNodes returns leaves", () => {
    const tree = arrayToTree(flat);
    const leaves = getLeafNodes(tree);
    expect(leaves.length).toBe(2);
  });
});
