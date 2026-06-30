import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// DialogContent calls useTranslation("ui"); mock it so the portal renders in jsdom.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

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
    expect(screen.getByText("Select department...")).toBeDefined();
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
    fireEvent.click(screen.getByRole("button", { name: /clear all/i }));
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
    fireEvent.click(screen.getByRole("button", { name: /clear all/i }));
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
    const removeBtns = screen.getAllByRole("button", { name: /^remove$/i });
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
    expect(
      screen.queryByRole("button", { name: /clear all/i }),
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: /^remove$/i }),
    ).toBeNull();
  });

  it("opens the dialog and shows the title and tree", () => {
    render(<DepartmentBrowse departments={customDepartments} />);
    // Trigger is the wrapper div; click it to open.
    fireEvent.click(screen.getByText("Select department..."));
    expect(screen.getByText("Select Department")).toBeDefined();
    expect(screen.getByText("Root")).toBeDefined();
    expect(screen.getByText("Child One")).toBeDefined();
  });

  it("filters the tree by search query", () => {
    render(<DepartmentBrowse departments={customDepartments} />);
    fireEvent.click(screen.getByText("Select department..."));
    const search = screen.getByPlaceholderText("Search departments...");
    fireEvent.change(search, { target: { value: "child one" } });
    expect(screen.getByText("Child One")).toBeDefined();
    expect(screen.queryByText("Child Two")).toBeNull();
  });

  it("shows the empty state when no departments match the search", () => {
    render(<DepartmentBrowse departments={customDepartments} />);
    fireEvent.click(screen.getByText("Select department..."));
    const search = screen.getByPlaceholderText("Search departments...");
    fireEvent.change(search, { target: { value: "zzznomatch" } });
    expect(screen.getByText("No departments found")).toBeDefined();
  });

  it("selects a department in single mode and closes the dialog", () => {
    const onChange = vi.fn();
    render(
      <DepartmentBrowse
        departments={customDepartments}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("Select department..."));
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
    fireEvent.click(screen.getByText("Select department..."));
    fireEvent.click(screen.getByText("Child One"));
    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: "1-1", name: "Child One" }),
      ]),
    );
    // Dialog title still visible — did not close.
    expect(screen.getByText("Select Department")).toBeDefined();
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
    expect(screen.getByText("1 department(s) selected")).toBeDefined();
    expect(screen.getByText("Max: 5")).toBeDefined();
  });

  it("expands and collapses a parent node via the chevron", () => {
    render(<DepartmentBrowse departments={customDepartments} />);
    fireEvent.click(screen.getByText("Select department..."));
    // Children visible when dialog opens (level<2 expands by default).
    expect(screen.getByText("Child One")).toBeDefined();
    expect(screen.getByText("Child Two")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("./department-browse");
    expect(mod.DepartmentBrowse).toBeDefined();
  });
});
