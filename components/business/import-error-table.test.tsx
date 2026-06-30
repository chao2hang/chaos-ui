import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImportErrorTable } from "./import-error-table";
import type { ImportErrorTableProps } from "./import-error-table";

describe("import-error-table", () => {
  it("exports ImportErrorTable", () => {
    expect(ImportErrorTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ImportErrorTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders the error count and a row per error", () => {
    render(
      <ImportErrorTable
        errors={[
          { row: 3, field: "amount", value: "abc", message: "金额必须为数字" },
          { row: 7, message: "缺少必填字段" },
        ]}
      />,
    );
    expect(screen.getByText("导入错误")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("金额必须为数字")).toBeDefined();
    expect(screen.getByText("缺少必填字段")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("7")).toBeDefined();
  });

  it("shows the empty state when there are no errors", () => {
    render(<ImportErrorTable errors={[]} />);
    expect(screen.getByText("没有导入错误")).toBeDefined();
  });

  it("renders an export button and fires onExport on click", () => {
    const onExport = vi.fn();
    render(
      <ImportErrorTable
        errors={[{ row: 1, message: "boom" }]}
        onExport={onExport}
      />,
    );
    const btn = screen.getByRole("button", { name: /导出错误/ });
    fireEvent.click(btn);
    expect(onExport).toHaveBeenCalledTimes(1);
  });

  it("omits the export button when onExport is not provided", () => {
    render(<ImportErrorTable errors={[{ row: 1, message: "boom" }]} />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
