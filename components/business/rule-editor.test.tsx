import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RuleEditor } from "./rule-editor";
import type { RuleEditorProps, RuleItem } from "./rule-editor";

describe("RuleEditor", () => {
  it("renders the editor heading and add button", () => {
    render(<RuleEditor rules={[]} />);
    expect(screen.getByText("规则编辑器")).toBeDefined();
    expect(screen.getByRole("button", { name: "新增规则" })).toBeDefined();
  });

  it("renders existing rule field inputs and count", () => {
    render(
      <RuleEditor
        rules={[
          {
            id: "r1",
            field: "amount",
            operator: ">",
            value: 1000,
            action: "approve",
          },
        ]}
      />,
    );
    expect(screen.getByDisplayValue("amount")).toBeDefined();
    expect(screen.getByText("共 1 条规则。")).toBeDefined();
  });

  it("renders an empty state when there are no rules", () => {
    render(<RuleEditor rules={[]} />);
    expect(screen.getByText("暂无规则，请点击新增。")).toBeDefined();
  });

  it("exports types", () => {
    const _rule: RuleItem = {
      id: "x",
      field: "f",
      operator: "==",
      value: 1,
      action: "approve",
    };
    const _props: RuleEditorProps = { rules: [_rule] };
    expect(_rule.id).toBe("x");
    expect(_props.rules.length).toBe(1);
  });
});
