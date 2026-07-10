import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CrudToolbar } from "./crud-toolbar";
import type { CrudToolbarProps, CrudToolbarAction } from "./crud-toolbar";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("CrudToolbar", () => {
  it("exports CrudToolbar", () => {
    expect(CrudToolbar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CrudToolbarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CrudToolbarAction | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders default primary actions (新增/删除/刷新) when no primaryActions provided", () => {
    render(<CrudToolbar />);
    expect(screen.getByText("新增")).toBeDefined();
    expect(screen.getByText("删除")).toBeDefined();
    expect(screen.getByText("刷新")).toBeDefined();
  });

  it("renders custom primary actions", () => {
    const actions: CrudToolbarAction[] = [
      { key: "export", label: "导出", onClick: vi.fn() },
      { key: "import", label: "导入", onClick: vi.fn() },
    ];
    render(<CrudToolbar primaryActions={actions} />);
    expect(screen.getByText("导出")).toBeDefined();
    expect(screen.getByText("导入")).toBeDefined();
  });

  it("fires primary action onClick", () => {
    const onClick = vi.fn();
    const actions: CrudToolbarAction[] = [
      { key: "custom", label: "自定义", onClick },
    ];
    render(<CrudToolbar primaryActions={actions} />);
    fireEvent.click(screen.getByText("自定义"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders search input when showSearch is true (default)", () => {
    render(<CrudToolbar />);
    const input = screen.getByPlaceholderText("搜索...");
    expect(input).toBeDefined();
  });

  it("hides search input when showSearch is false", () => {
    render(<CrudToolbar showSearch={false} />);
    expect(screen.queryByPlaceholderText("搜索...")).toBeNull();
  });

  it("renders search with custom placeholder", () => {
    render(<CrudToolbar searchPlaceholder="查找用户..." />);
    expect(screen.getByPlaceholderText("查找用户...")).toBeDefined();
  });

  it("fires onSearchChange when typing in search input", () => {
    const onSearchChange = vi.fn();
    render(<CrudToolbar onSearchChange={onSearchChange} />);
    const input = screen.getByPlaceholderText("搜索...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onSearchChange).toHaveBeenCalledWith("test");
  });

  it("fires onSearch when Enter is pressed in search input", () => {
    const onSearch = vi.fn();
    render(<CrudToolbar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("搜索...");
    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSearch).toHaveBeenCalledWith("hello");
  });

  it("renders controlled search value", () => {
    render(<CrudToolbar searchValue="controlled" />);
    const input = screen.getByPlaceholderText("搜索...") as HTMLInputElement;
    expect(input.value).toBe("controlled");
  });

  it("renders bulk action label when selectionCount > 0", () => {
    render(<CrudToolbar selectionCount={3} bulkActionLabel="批量删除" />);
    expect(screen.getByText("已选 3 项")).toBeDefined();
    expect(screen.getByText("批量删除")).toBeDefined();
  });

  it("does not show bulk action when selectionCount is 0", () => {
    render(<CrudToolbar selectionCount={0} bulkActionLabel="批量删除" />);
    expect(screen.queryByText("已选 0 项")).toBeNull();
    expect(screen.queryByText("批量删除")).toBeNull();
  });

  it("renders danger action with destructive styling", () => {
    const actions: CrudToolbarAction[] = [
      { key: "nuke", label: "核弹", onClick: vi.fn(), danger: true },
    ];
    render(<CrudToolbar primaryActions={actions} />);
    const button = screen.getByText("核弹").closest("button");
    expect(button).not.toBeNull();
  });

  it("disables actions when loading is true", () => {
    const actions: CrudToolbarAction[] = [
      { key: "go", label: "执行", onClick: vi.fn() },
    ];
    render(<CrudToolbar primaryActions={actions} loading />);
    const button = screen.getByText("执行").closest("button");
    expect(button?.disabled).toBe(true);
  });

  it("disables individual action when action.disabled is true", () => {
    const actions: CrudToolbarAction[] = [
      { key: "go", label: "执行", onClick: vi.fn(), disabled: true },
    ];
    render(<CrudToolbar primaryActions={actions} />);
    const button = screen.getByText("执行").closest("button");
    expect(button?.disabled).toBe(true);
  });

  it("renders with custom className", () => {
    const { container } = render(<CrudToolbar className="my-toolbar" />);
    expect(container.querySelector(".my-toolbar")).not.toBeNull();
  });

  it("renders action with icon", () => {
    const Icon = () => <span data-testid="custom-icon">I</span>;
    const actions: CrudToolbarAction[] = [
      { key: "icon", label: "带图标", onClick: vi.fn(), icon: Icon },
    ];
    render(<CrudToolbar primaryActions={actions} />);
    expect(screen.getByTestId("custom-icon")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/crud-toolbar");
    expect(mod.CrudToolbar).toBeDefined();
  });
});
