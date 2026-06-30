import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PromotionRuleEditor } from "./promotion-rule-editor";
import type { PromotionRuleEditorProps } from "./promotion-rule-editor";

describe("PromotionRuleEditor", () => {
  it("exports a Props type", () => {
    const t: PromotionRuleEditorProps = {};
    expect(t.className).toBeUndefined();
  });

  it("renders the heading and add button by default", () => {
    render(<PromotionRuleEditor />);
    expect(screen.getByText("促销规则")).toBeDefined();
    expect(screen.getByRole("button", { name: "新增规则" })).toBeDefined();
  });

  it("renders field labels for the default rule", () => {
    render(<PromotionRuleEditor />);
    expect(screen.getByText("规则名称")).toBeDefined();
    expect(screen.getByText("门槛")).toBeDefined();
    expect(screen.getByText("比较")).toBeDefined();
    expect(screen.getByText("奖励类型")).toBeDefined();
    expect(screen.getByText("数值")).toBeDefined();
  });

  it("renders the default starter rule with its name and a rule-1 badge", () => {
    render(<PromotionRuleEditor />);
    expect(screen.getByText("规则 1")).toBeDefined();
    expect(screen.getByDisplayValue("满99减10")).toBeDefined();
  });

  it("renders the action label for the default discount action", () => {
    render(<PromotionRuleEditor />);
    // default rule action is "discount" -> "折扣"
    expect(screen.getByText("折扣")).toBeDefined();
  });

  it("adds a new rule when the add button is clicked", () => {
    const onChange = vi.fn();
    render(<PromotionRuleEditor onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "新增规则" }));
    expect(screen.getByText("规则 2")).toBeDefined();
    expect(onChange).toHaveBeenCalledTimes(1);
    // new rule has empty name -> second name input is blank
    const nameInputs = screen.getAllByRole("textbox");
    expect(nameInputs.length).toBeGreaterThanOrEqual(2);
  });

  it("removes a rule when its delete button is clicked", () => {
    render(<PromotionRuleEditor />);
    expect(screen.getByText("规则 1")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "删除规则 1" }));
    expect(screen.queryByText("规则 1")).toBeNull();
    expect(screen.queryByDisplayValue("满99减10")).toBeNull();
  });

  it("updates the rule name when typing into the name input", () => {
    const onChange = vi.fn();
    render(<PromotionRuleEditor onChange={onChange} />);
    const nameInput = screen.getByDisplayValue("满99减10");
    fireEvent.change(nameInput, { target: { value: "满199减30" } });
    expect((nameInput as HTMLInputElement).value).toBe("满199减30");
    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
    expect(lastCall?.[0]?.name).toBe("满199减30");
  });

  it("updates the threshold when typing into the threshold input", () => {
    const onChange = vi.fn();
    render(<PromotionRuleEditor onChange={onChange} />);
    const thresholdInput = screen.getByLabelText("门槛");
    fireEvent.change(thresholdInput, { target: { value: "199", valueAsNumber: 199 } });
    expect((thresholdInput as HTMLInputElement).value).toBe("199");
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
    expect(lastCall?.[0]?.threshold).toBe(199);
  });

  it("updates the amount when typing into the amount input", () => {
    const onChange = vi.fn();
    render(<PromotionRuleEditor onChange={onChange} />);
    const amountInput = screen.getByLabelText("数值");
    fireEvent.change(amountInput, { target: { value: "30", valueAsNumber: 30 } });
    expect((amountInput as HTMLInputElement).value).toBe("30");
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
    expect(lastCall?.[0]?.amount).toBe(30);
  });

  it("renders custom initial rules passed via the rules prop", () => {
    render(
      <PromotionRuleEditor
        rules={[
          { id: "r1", name: "满100减20", threshold: 100, operator: "gte", action: "gift", amount: 1 },
        ]}
      />,
    );
    expect(screen.getByDisplayValue("满100减20")).toBeDefined();
    expect(screen.getByText("规则 1")).toBeDefined();
    // action "gift" -> "赠品"
    expect(screen.getByText("赠品")).toBeDefined();
  });

  it("re-syncs local rules when the rules prop changes", () => {
    const initial = [
      { id: "r1", name: "规则A", threshold: 10, operator: "gte" as const, action: "discount" as const, amount: 1 },
    ];
    const next = [
      { id: "r2", name: "规则B", threshold: 20, operator: "lte" as const, action: "coupon" as const, amount: 5 },
    ];
    const { rerender } = render(<PromotionRuleEditor rules={initial} />);
    expect(screen.getByDisplayValue("规则A")).toBeDefined();
    rerender(<PromotionRuleEditor rules={next} />);
    expect(screen.getByDisplayValue("规则B")).toBeDefined();
    expect(screen.queryByDisplayValue("规则A")).toBeNull();
  });

  it("renders the rule placeholder text in the name input", () => {
    render(
      <PromotionRuleEditor
        rules={[
          { id: "r1", name: "", threshold: 0, operator: "gte", action: "discount", amount: 0 },
        ]}
      />,
    );
    const nameInput = screen.getByPlaceholderText("如：满199减30");
    expect(nameInput).toBeDefined();
  });

  it("shows one rule index badge per rule after adding multiple", () => {
    render(<PromotionRuleEditor />);
    fireEvent.click(screen.getByRole("button", { name: "新增规则" }));
    fireEvent.click(screen.getByRole("button", { name: "新增规则" }));
    expect(screen.getByText("规则 1")).toBeDefined();
    expect(screen.getByText("规则 2")).toBeDefined();
    expect(screen.getByText("规则 3")).toBeDefined();
  });
});
