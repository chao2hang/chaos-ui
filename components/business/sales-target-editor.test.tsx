import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SalesTargetEditor } from "./sales-target-editor";
import type { SalesTargetEditorProps } from "./sales-target-editor";

describe("SalesTargetEditor", () => {
  it("exports a Props type", () => {
    const t: SalesTargetEditorProps = { rows: [] };
    expect(t.rows).toEqual([]);
  });

  it("renders an empty state when rows is empty", () => {
    render(<SalesTargetEditor rows={[]} />);
    expect(screen.getByText("暂无目标数据")).toBeDefined();
  });

  it("renders column headers and an add button", () => {
    render(<SalesTargetEditor rows={[]} />);
    expect(screen.getByText("年度")).toBeDefined();
    expect(screen.getByText("区域")).toBeDefined();
    expect(screen.getByText("Q1")).toBeDefined();
    expect(screen.getByText("年度合计")).toBeDefined();
    expect(screen.getByRole("button", { name: "新增目标" })).toBeDefined();
  });

  it("renders the year and formatted annual total for a row", () => {
    render(
      <SalesTargetEditor
        rows={[
          {
            id: "1",
            year: 2026,
            region: "华东",
            q1: 100,
            q2: 120,
            q3: 130,
            q4: 150,
            annual: 500,
          },
        ]}
      />,
    );
    expect(screen.getByText("2026")).toBeDefined();
    expect(screen.getByText("500")).toBeDefined();
  });
});
