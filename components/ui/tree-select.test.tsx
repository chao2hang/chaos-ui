import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { TreeSelect } from "@/components/ui/tree-select";
import type { TreeNode, TreeSelectProps } from "@/components/ui/tree-select";

const sampleData: TreeNode[] = [
  {
    id: "1",
    label: "Root",
    children: [{ id: "1-1", label: "Child" }],
  },
];

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
      size: "sm",
    };
    expect(props.placeholder).toBe("Select...");
    expect(props.multiple).toBe(false);
    expect(props.maxCount).toBe(5);
    expect(props.size).toBe("sm");
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

  it("defaults data-size to default on root", () => {
    render(<TreeSelect data={sampleData} />);
    expect(
      document
        .querySelector('[data-slot="tree-select"]')
        ?.getAttribute("data-size"),
    ).toBe("default");
  });

  it("applies sm size data attribute (issue #28)", () => {
    render(<TreeSelect data={sampleData} size="sm" />);
    const root = document.querySelector(
      '[data-slot="tree-select"]',
    ) as HTMLElement;
    expect(root.getAttribute("data-size")).toBe("sm");
    expect(root.className).toContain("w-full");
    expect(
      Array.from(root.querySelectorAll("[data-size='sm']")).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("sm single-select trigger includes h-7 min-h-7", () => {
    const { container } = render(
      <TreeSelect data={sampleData} size="sm" placeholder="Filter..." />,
    );
    const className = container
      .querySelector('[data-slot="tree-select"]')
      ?.querySelector(".min-h-7")?.className;
    expect(className).toBeDefined();
    expect(className).toMatch(/min-h-7/);
    expect(className).toMatch(/\bh-7\b/);
  });

  it("does not emit Base UI nativeButton console error on mount (issue #45)", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<TreeSelect data={sampleData} placeholder="Pick" />);
    const joined = spy.mock.calls.map((c) => String(c[0] ?? "")).join("\n");
    expect(joined).not.toMatch(/nativeButton/i);
    spy.mockRestore();
  });

  it("dropdown node labels expose title when truncated (issue #48)", () => {
    const long =
      "030101010101 250ML 玻璃瓶 特级生抽 整箱 超长分类名用于截断测试";
    const flat: TreeNode[] = [{ id: "1", label: long }];
    const { getByText } = render(<TreeSelect data={flat} />);
    // Open dialog so tree items mount
    fireEvent.click(document.querySelector('[data-slot="dialog-trigger"]')!);
    const label = getByText(long);
    expect(label.getAttribute("title")).toBe(long);
    expect(label.className).toMatch(/truncate/);
  });
});
