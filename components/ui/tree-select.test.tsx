import { describe, it, expect, vi } from "vitest";
import { TreeSelect } from "@/components/ui/tree-select";
import type { TreeNode, TreeSelectProps } from "@/components/ui/tree-select";

describe("tree-select", () => {
  it("exports TreeSelect", () => {
    expect(TreeSelect).toBeDefined();
    expect(typeof TreeSelect).toBe("function");
  });

  it("TreeNode type supports all fields", () => {
    const node: TreeNode = {
      id: "1",
      label: "Root",
      icon: null,
      children: [
        { id: "1-1", label: "Child 1" },
        { id: "1-2", label: "Child 2", disabled: true },
      ],
      disabled: false,
    };
    expect(node.id).toBe("1");
    expect(node.label).toBe("Root");
    expect(node.children?.length).toBe(2);
    expect(node.children![1]!.disabled).toBe(true);
  });

  it("TreeNode type allows minimal fields", () => {
    const node: TreeNode = {
      id: "leaf",
      label: "Leaf",
    };
    expect(node.id).toBe("leaf");
    expect(node.children).toBeUndefined();
    expect(node.disabled).toBeUndefined();
    expect(node.icon).toBeUndefined();
  });

  it("TreeSelectProps type is importable", () => {
    const props: TreeSelectProps = {
      value: "1",
      defaultValue: "1",
      placeholder: "Select...",
      disabled: false,
      multiple: false,
      maxCount: 5,
      data: [],
      onChange: vi.fn(),
      className: "test",
    };
    expect(props.placeholder).toBe("Select...");
    expect(props.multiple).toBe(false);
    expect(props.maxCount).toBe(5);
  });

  it("TreeSelectProps supports multiple selection with string array value", () => {
    const props: TreeSelectProps = {
      value: ["1", "2"],
      multiple: true,
      data: [],
    };
    expect(Array.isArray(props.value)).toBe(true);
  });

  it("TreeSelectProps supports single selection with string value", () => {
    const props: TreeSelectProps = {
      value: "1",
      multiple: false,
      data: [],
    };
    expect(typeof props.value).toBe("string");
  });
});
