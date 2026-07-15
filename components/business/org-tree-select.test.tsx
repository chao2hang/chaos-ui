import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { OrgTreeSelect } from "@/components/business/org-tree-select";

const tree = [
  {
    key: "1",
    title: "HQ",
    children: [{ key: "1-1", title: "Eng" }],
  },
];

describe("org-tree-select size", () => {
  it("defaults data-size and applies sm h-7 (issue #30)", () => {
    const { container, rerender } = render(<OrgTreeSelect treeData={tree} />);
    rerender(<OrgTreeSelect treeData={tree} size="sm" />);
    const btn = container.querySelector(
      '[data-slot="org-tree-select"][data-size="sm"]',
    ) as HTMLElement;
    expect(btn).toBeTruthy();
    expect(btn.className).toMatch(/\bh-7\b/);
  });
});
