import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SerialNumberManager } from "./serial-number-manager";

const baseRules = [
  { prefix: "BILL", dateFormat: "yyyyMMdd", zeroFill: 4, separator: "-" },
];

describe("SerialNumberManager", () => {
  it("renders the rule fields and a live preview", () => {
    render(<SerialNumberManager rules={baseRules} />);
    expect(screen.getByText("编号规则管理")).toBeDefined();
    expect(screen.getByLabelText("前缀")).toBeDefined();
    expect(screen.getByLabelText("日期格式")).toBeDefined();
    expect(screen.getByLabelText("补零位数")).toBeDefined();
    expect(screen.getByLabelText("分隔符")).toBeDefined();
    // preview begins with the prefix
    const preview = screen.getByText(/BILL/);
    expect(preview).toBeDefined();
  });

  it("renders an empty state when there are no rules", () => {
    render(<SerialNumberManager rules={[]} />);
    expect(screen.getByText(/暂无编号规则/)).toBeDefined();
  });

  it("adds a new rule when the add button is clicked", () => {
    const onChange = vi.fn();
    render(<SerialNumberManager rules={baseRules} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "新增规则" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    const emitted = onChange.mock.calls[0]?.[0] as Array<{ prefix: string }>;
    expect(emitted).toHaveLength(2);
    expect(emitted[1]?.prefix).toBe("NO");
  });

  it("updates a rule field and emits the change", () => {
    const onChange = vi.fn();
    render(<SerialNumberManager rules={baseRules} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("前缀"), {
      target: { value: "INV" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    const emitted = onChange.mock.calls[0]?.[0] as Array<{ prefix: string }>;
    expect(emitted[0]?.prefix).toBe("INV");
  });

  it("removes a rule via the delete button", () => {
    const onChange = vi.fn();
    render(<SerialNumberManager rules={baseRules} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "删除规则" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    const emitted = onChange.mock.calls[0]?.[0] as unknown[];
    expect(emitted).toHaveLength(0);
  });
});
