import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CrudPage } from "./crud-page";
import type { CrudPageProps, FormField } from "./crud-page";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

const filterFields = [{ key: "name", label: "名称", type: "input" as const }];

const columns = [
  { key: "name", title: "名称" },
  { key: "age", title: "年龄" },
];

const dataSource = [
  { id: "1", name: "Alice", age: 30 },
  { id: "2", name: "Bob", age: 25 },
];

describe("CrudPage", () => {
  it("exports CrudPage", () => {
    expect(CrudPage).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CrudPageProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FormField | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders the page title", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
      />,
    );
    expect(screen.getByText("用户管理")).toBeDefined();
  });

  it("renders table data rows", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
      />,
    );
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
  });

  it("renders column headers", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
      />,
    );
    // Column headers appear in both filter form labels and table headers
    const headers = screen.getAllByText("名称");
    expect(headers.length).toBeGreaterThanOrEqual(1);
    // Verify table header specifically
    const thElements = screen.getAllByText("年龄");
    expect(thElements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders refresh button when onRefresh is provided", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
        onRefresh={vi.fn()}
      />,
    );
    expect(screen.getByText("刷新")).toBeDefined();
  });

  it("renders add button when onAdd is provided", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
        onAdd={vi.fn()}
      />,
    );
    expect(screen.getByText("新增")).toBeDefined();
  });

  it("fires onRefresh when refresh button is clicked", () => {
    const onRefresh = vi.fn();
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
        onRefresh={onRefresh}
      />,
    );
    fireEvent.click(screen.getByText("刷新"));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it("fires onAdd when add button is clicked", () => {
    const onAdd = vi.fn();
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
        onAdd={onAdd}
      />,
    );
    fireEvent.click(screen.getByText("新增"));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("renders operation column with edit and delete when callbacks provided", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("操作")).toBeDefined();
    const editButtons = screen.getAllByText("编辑");
    expect(editButtons.length).toBe(2);
    const deleteButtons = screen.getAllByText("删除");
    expect(deleteButtons.length).toBe(2);
  });

  it("fires onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
        onDelete={onDelete}
      />,
    );
    const deleteButtons = screen.getAllByText("删除");
    fireEvent.click(deleteButtons[0]!);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("fires onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
        onEdit={onEdit}
      />,
    );
    const editButtons = screen.getAllByText("编辑");
    fireEvent.click(editButtons[0]!);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("renders custom actions alongside built-in ones", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
        onRefresh={vi.fn()}
        actions={<button>自定义操作</button>}
      />,
    );
    expect(screen.getByText("刷新")).toBeDefined();
    expect(screen.getByText("自定义操作")).toBeDefined();
  });

  it("renders filter bar with search button", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
      />,
    );
    expect(screen.getByText("查询")).toBeDefined();
  });

  it("renders empty table when dataSource is empty", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={[]}
        onSearch={vi.fn()}
      />,
    );
    expect(screen.getByText("暂无数据")).toBeDefined();
  });

  it("does not render action bar when no actions or callbacks", () => {
    render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
      />,
    );
    expect(screen.queryByText("刷新")).toBeNull();
    expect(screen.queryByText("新增")).toBeNull();
  });

  it("renders with className prop", () => {
    const { container } = render(
      <CrudPage
        title="用户管理"
        filterFields={filterFields}
        columns={columns}
        dataSource={dataSource}
        onSearch={vi.fn()}
        className="custom-class"
      />,
    );
    expect(container.querySelector(".custom-class")).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/crud-page");
    expect(mod.CrudPage).toBeDefined();
  });
});
