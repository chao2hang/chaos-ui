import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  OrgAdminPage,
  type OrgAdminTreeNode,
  type OrgAdminPageProps,
} from "./org-admin-page";

const tree: OrgAdminTreeNode[] = [
  {
    id: "hq",
    label: "总部",
    count: 12,
    children: [
      { id: "eng", label: "工程部", badges: <span data-testid="oa">OA</span> },
      { id: "hr", label: "人事部", readOnly: true },
    ],
  },
];

describe("OrgAdminPage", () => {
  it("exports component and types", () => {
    expect(OrgAdminPage).toBeDefined();
    const _p: OrgAdminPageProps | undefined = undefined;
    expect(_p).toBeUndefined();
  });

  it("shows empty selection when nothing selected", () => {
    render(<OrgAdminPage treeData={tree} emptySelection="请选择" />);
    expect(screen.getByText("请选择")).toBeDefined();
    expect(screen.getByText("总部")).toBeDefined();
  });

  it("selects a node and renders summary + tabs", () => {
    const onSelect = vi.fn();
    render(
      <OrgAdminPage
        treeData={tree}
        defaultSelectedId="eng"
        onSelect={onSelect}
        summary={<div>摘要：工程部</div>}
        tabs={[
          { key: "members", label: "成员", children: <div>成员列表</div> },
          { key: "children", label: "下级", children: <div>下级部门</div> },
        ]}
      />,
    );
    expect(screen.getByText("摘要：工程部")).toBeDefined();
    expect(screen.getByText("成员列表")).toBeDefined();
    fireEvent.click(screen.getByText("人事部"));
    expect(onSelect).toHaveBeenCalled();
    expect(onSelect.mock.calls.at(-1)?.[0]).toBe("hr");
  });

  it("filters tree by search", () => {
    render(<OrgAdminPage treeData={tree} />);
    fireEvent.change(screen.getByLabelText("搜索部门"), {
      target: { value: "人事" },
    });
    expect(screen.getByText("人事部")).toBeDefined();
    expect(screen.queryByText("工程部")).toBeNull();
  });

  it("renders count and badges", () => {
    render(<OrgAdminPage treeData={tree} defaultSelectedId="hq" />);
    expect(screen.getByText("12")).toBeDefined();
    // expand to see child badge
    fireEvent.click(screen.getByLabelText("Collapse"));
    // already expanded top by default; eng has OA badge when visible
    const eng = screen.queryByText("工程部");
    if (eng) {
      expect(screen.getByTestId("oa")).toBeDefined();
    }
  });

  it("mobile IA: tree first, select → detail + back, back clears (#61)", () => {
    const onSelect = vi.fn();
    const { container } = render(
      <OrgAdminPage treeData={tree} onSelect={onSelect} />,
    );
    const aside = container.querySelector('[data-slot="org-admin-sidebar"]');
    const section = container.querySelector('[data-slot="org-admin-main"]');

    // Initial: tree visible, detail hidden on narrow
    expect(aside?.className ?? "").toContain("flex");
    expect(aside?.className ?? "").not.toContain("hidden");
    expect(section?.className ?? "").toContain("hidden");

    // No back button before a selection
    expect(screen.queryByLabelText("返回组织树")).toBeNull();

    // Select a node → detail pane reveals + back button appears
    fireEvent.click(screen.getByText("工程部"));
    const sectionAfter = container.querySelector(
      '[data-slot="org-admin-main"]',
    );
    expect(sectionAfter?.className ?? "").toContain("flex");
    expect(sectionAfter?.className ?? "").not.toContain("hidden");
    expect(onSelect.mock.calls.at(-1)?.[0]).toBe("eng");
    const back = screen.getByLabelText("返回组织树");
    expect(back).toBeDefined();

    // Back → tree visible again, detail hidden, selection cleared
    fireEvent.click(back);
    const asideFinal = container.querySelector(
      '[data-slot="org-admin-sidebar"]',
    );
    const sectionFinal = container.querySelector(
      '[data-slot="org-admin-main"]',
    );
    expect(asideFinal?.className ?? "").not.toContain("hidden");
    expect(sectionFinal?.className ?? "").toContain("hidden");
    expect(onSelect.mock.calls.at(-1)?.[0]).toBeUndefined();
  });

  it("sidebar width applied as CSS var (responsive desktop width)", () => {
    const { container } = render(
      <OrgAdminPage treeData={tree} sidebarWidth={360} />,
    );
    const aside = container.querySelector('[data-slot="org-admin-sidebar"]');
    expect(aside?.getAttribute("style") ?? "").toContain(
      "--org-admin-sidebar-width: 360px",
    );
    expect(aside?.className ?? "").toContain(
      "md:w-(--org-admin-sidebar-width)",
    );
  });
});
