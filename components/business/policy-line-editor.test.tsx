import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PolicyLineEditor } from "./policy-line-editor";
import type { PolicyLineEditorProps } from "./policy-line-editor";

describe("PolicyLineEditor", () => {
  it("exports a Props type", () => {
    const t: PolicyLineEditorProps = { rows: [] };
    expect(t.rows).toEqual([]);
  });

  it("renders an empty state when rows is empty", () => {
    render(<PolicyLineEditor rows={[]} />);
    expect(screen.getByText("暂无政策明细")).toBeDefined();
  });

  it("renders column headers and an add button", () => {
    render(<PolicyLineEditor rows={[]} />);
    expect(screen.getByText("政策名称")).toBeDefined();
    expect(screen.getByText("额度")).toBeDefined();
    expect(screen.getByText("使用量")).toBeDefined();
    expect(screen.getByRole("button", { name: "新增政策" })).toBeDefined();
  });

  it("renders the usage progress text for a row", () => {
    render(
      <PolicyLineEditor
        rows={[
          {
            id: "1",
            name: "满100减20",
            type: "discount",
            condition: "≥100",
            reward: "-20",
            quota: 1000,
            used: 120,
          },
        ]}
      />,
    );
    expect(screen.getByText("120 / 1000")).toBeDefined();
  });
});
