import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";

// DialogContent calls useTranslation("ui"); mock it so the portal renders in jsdom.
vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({
      t: (k: string, opts?: string | { defaultValue?: string }) => {
        if (typeof opts === "string") return opts;
        if (
          opts &&
          typeof opts === "object" &&
          "defaultValue" in opts &&
          opts.defaultValue != null
        ) {
          return String(opts.defaultValue);
        }
        return k;
      },
      i18n: { language: "en" },
    }),
  };
});

import { DepartmentBrowse } from "./department-browse";
import type { Department, DepartmentBrowseProps } from "./department-browse";

const customDepartments: Department[] = [
  {
    id: "1",
    name: "Root",
    code: "RT",
    children: [
      { id: "1-1", name: "Child One", code: "C1", parentId: "1" },
      { id: "1-2", name: "Child Two", code: "C2", parentId: "1" },
    ],
  },
];

describe("department-browse", () => {
  it("exports DepartmentBrowse", () => {
    expect(DepartmentBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: Department | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: DepartmentBrowseProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders the placeholder when no value", () => {
    render(<DepartmentBrowse placeholder="Pick a dept" departments={[]} />);
    expect(screen.getByText("Pick a dept")).toBeDefined();
  });

  it("renders a default placeholder", () => {
    render(<DepartmentBrowse departments={[]} />);
    expect(screen.getByText("选择部门...")).toBeDefined();
  });

  it("renders a selected department as a badge", () => {
    render(
      <DepartmentBrowse
        defaultValue={{ id: "1", name: "Head Office" }}
        departments={customDepartments}
      />,
    );
    expect(screen.getByText("Head Office")).toBeDefined();
  });

  it("renders multiple selected departments when multiple", () => {
    render(
      <DepartmentBrowse
        multiple
        defaultValue={[
          { id: "1", name: "Root" },
          { id: "1-1", name: "Child One" },
        ]}
        departments={customDepartments}
      />,
    );
    expect(screen.getByText("Root")).toBeDefined();
    expect(screen.getByText("Child One")).toBeDefined();
  });

  it("calls onChange with undefined when clearing a single selection", () => {
    const onChange = vi.fn();
    render(
      <DepartmentBrowse
        defaultValue={{ id: "1", name: "Root" }}
        departments={customDepartments}
        onChange={onChange}
      />,
    );
    const root = document.querySelector(
      '[data-slot="department-browse"]',
    ) as HTMLElement;
    fireEvent.click(within(root).getByRole("button", { name: /^清除全部$/ }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange with an empty array when clearing a multiple selection", () => {
    const onChange = vi.fn();
    render(
      <DepartmentBrowse
        multiple
        defaultValue={[{ id: "1", name: "Root" }]}
        departments={customDepartments}
        onChange={onChange}
      />,
    );
    const root = document.querySelector(
      '[data-slot="department-browse"]',
    ) as HTMLElement;
    fireEvent.click(within(root).getByRole("button", { name: /^清除全部$/ }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("removes a single department badge via its remove button", () => {
    const onChange = vi.fn();
    render(
      <DepartmentBrowse
        multiple
        defaultValue={[
          { id: "1", name: "Root" },
          { id: "1-1", name: "Child One" },
        ]}
        departments={customDepartments}
        onChange={onChange}
      />,
    );
    const removeBtns = screen.getAllByRole("button", {
      name: /^移除$|^remove$/i,
    });
    fireEvent.click(removeBtns[0]!);
    expect(onChange).toHaveBeenCalledWith([{ id: "1-1", name: "Child One" }]);
    expect(screen.queryByText("Root")).toBeNull();
  });

  it("hides the clear and remove buttons when disabled", () => {
    render(
      <DepartmentBrowse
        defaultValue={{ id: "1", name: "Root" }}
        departments={customDepartments}
        disabled
      />,
    );
    const root = document.querySelector(
      '[data-slot="department-browse"]',
    ) as HTMLElement;
    expect(
      within(root).queryByRole("button", { name: /^清除全部$/ }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: /^移除$|^remove$/i }),
    ).toBeNull();
  });

  it("opens the dialog and shows the title and tree", () => {
    render(<DepartmentBrowse departments={customDepartments} />);
    // Trigger is the wrapper div; click it to open.
    fireEvent.click(screen.getByText("选择部门..."));
    expect(screen.getByText("选择部门")).toBeDefined();
    expect(screen.getByText("Root")).toBeDefined();
    expect(screen.getByText("Child One")).toBeDefined();
  });

  it("filters the tree by search query", () => {
    render(<DepartmentBrowse departments={customDepartments} />);
    fireEvent.click(screen.getByText("选择部门..."));
    const search = screen.getByPlaceholderText("搜索部门...");
    fireEvent.change(search, { target: { value: "child one" } });
    expect(screen.getByText("Child One")).toBeDefined();
    expect(screen.queryByText("Child Two")).toBeNull();
  });

  it("shows the empty state when no departments match the search", () => {
    render(<DepartmentBrowse departments={customDepartments} />);
    fireEvent.click(screen.getByText("选择部门..."));
    const search = screen.getByPlaceholderText("搜索部门...");
    fireEvent.change(search, { target: { value: "zzznomatch" } });
    expect(screen.getByText("未找到部门")).toBeDefined();
  });

  it("selects a department in single mode and closes the dialog", () => {
    const onChange = vi.fn();
    render(
      <DepartmentBrowse departments={customDepartments} onChange={onChange} />,
    );
    fireEvent.click(screen.getByText("选择部门..."));
    fireEvent.click(screen.getByText("Child One"));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1-1", name: "Child One" }),
    );
  });

  it("toggles selection in multiple mode without closing", () => {
    const onChange = vi.fn();
    render(
      <DepartmentBrowse
        multiple
        departments={customDepartments}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("选择部门..."));
    fireEvent.click(screen.getByText("Child One"));
    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: "1-1", name: "Child One" }),
      ]),
    );
    // Dialog title still visible — did not close.
    expect(screen.getByText("选择部门")).toBeDefined();
  });

  it("shows the selection count and max in multiple mode", () => {
    render(
      <DepartmentBrowse
        multiple
        maxCount={5}
        defaultValue={[{ id: "1-1", name: "Child One" }]}
        departments={customDepartments}
      />,
    );
    fireEvent.click(screen.getByText("Child One"));
    expect(screen.getByText("已选 1 个部门")).toBeDefined();
    expect(screen.getByText("最多 5")).toBeDefined();
  });

  it("expands and collapses a parent node via the chevron", () => {
    render(<DepartmentBrowse departments={customDepartments} />);
    fireEvent.click(screen.getByText("选择部门..."));
    // Children visible when dialog opens (level<2 expands by default).
    expect(screen.getByText("Child One")).toBeDefined();
    expect(screen.getByText("Child Two")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("./department-browse");
    expect(mod.DepartmentBrowse).toBeDefined();
  });

  it("defaults data-size to default and applies sm (issue #29)", () => {
    const { rerender } = render(<DepartmentBrowse departments={[]} />);
    expect(
      document
        .querySelector('[data-slot="department-browse"]')
        ?.getAttribute("data-size"),
    ).toBe("default");
    rerender(<DepartmentBrowse departments={[]} size="sm" />);
    const root = document.querySelector(
      '[data-slot="department-browse"]',
    ) as HTMLElement;
    expect(root.getAttribute("data-size")).toBe("sm");
    expect(root.querySelector(".min-h-7")?.className).toMatch(/min-h-7/);
    expect(root.querySelector(".h-7")?.className).toMatch(/\bh-7\b/);
  });

  it("does not emit Base UI nativeButton console error on mount (#45 sibling)", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<DepartmentBrowse departments={[]} />);
    const joined = spy.mock.calls.map((c) => String(c[0] ?? "")).join("\n");
    expect(joined).not.toMatch(/nativeButton/i);
    spy.mockRestore();
  });
});
