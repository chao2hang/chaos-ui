import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExpenseLineEditor } from "./expense-line-editor";
import type {
  ExpenseLineEditorProps,
  ExpenseLine,
  CategoryOption,
} from "./expense-line-editor";

const categories: CategoryOption[] = [
  { label: "差旅", value: "travel" },
  { label: "餐饮", value: "meal" },
];

describe("expense-line-editor", () => {
  it("exports ExpenseLineEditor", () => {
    expect(ExpenseLineEditor).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ExpenseLineEditorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ExpenseLine | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: CategoryOption | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });

  it("renders Chinese column headers by default (issue #19)", () => {
    render(
      <ExpenseLineEditor data={[]} categories={categories} currency="¥" />,
    );
    expect(screen.getByText("类别")).toBeDefined();
    expect(screen.getByText("摘要")).toBeDefined();
    expect(screen.getByText("金额（¥）")).toBeDefined();
    expect(screen.getByText("备注")).toBeDefined();
  });

  it("renders empty hint and add-row button", () => {
    render(<ExpenseLineEditor data={[]} categories={categories} />);
    expect(screen.getByText("添加行")).toBeDefined();
  });

  it("renders provided rows with amount formatted", () => {
    render(
      <ExpenseLineEditor
        data={[
          {
            id: "1",
            category: "travel",
            summary: "机票",
            amount: 1200.5,
            remark: "北京",
          },
          {
            id: "2",
            category: "meal",
            summary: "午餐",
            amount: 80,
            remark: "",
          },
        ]}
        categories={categories}
      />,
    );
    expect(screen.getByText("机票")).toBeDefined();
    expect(screen.getByText("午餐")).toBeDefined();
    expect(screen.getByText("¥1200.50")).toBeDefined();
    expect(screen.getByText("¥80.00")).toBeDefined();
    // category label resolved via render
    expect(screen.getByText("差旅")).toBeDefined();
    expect(screen.getByText("餐饮")).toBeDefined();
  });

  it("computes total amount in footer", () => {
    render(
      <ExpenseLineEditor
        data={[
          { id: "1", summary: "a", amount: 100 },
          { id: "2", summary: "b", amount: 50.5 },
        ]}
        categories={categories}
        currency="$"
      />,
    );
    expect(screen.getByText("合计：$150.50")).toBeDefined();
    expect(screen.getByText("2 行")).toBeDefined();
  });

  it("handles null amounts gracefully in total", () => {
    render(
      <ExpenseLineEditor
        data={[{ id: "1", summary: "a" }]}
        categories={categories}
      />,
    );
    expect(screen.getByText("合计：¥0.00")).toBeDefined();
    expect(screen.getByText("1 行")).toBeDefined();
  });

  it("adds a row in uncontrolled mode and notifies onChange", () => {
    const onChange = vi.fn();
    render(
      <ExpenseLineEditor
        defaultData={[]}
        categories={categories}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("添加行"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const last = onChange.mock.calls.at(-1)![0];
    expect(last).toHaveLength(1);
  });

  it("renders category column with Select category option label", () => {
    render(
      <ExpenseLineEditor
        data={[{ id: "1", summary: "x", amount: 10, category: "travel" }]}
        categories={categories}
      />,
    );
    // category render resolves the value to its label
    expect(screen.getByText("差旅")).toBeDefined();
  });

  it("renders summary and remark as display values", () => {
    render(
      <ExpenseLineEditor
        data={[{ id: "1", summary: "初始", amount: 10, remark: "备注说明" }]}
        categories={[]}
      />,
    );
    expect(screen.getByText("初始")).toBeDefined();
    expect(screen.getByText("备注说明")).toBeDefined();
  });

  it("renders dash for missing summary in display", () => {
    render(
      <ExpenseLineEditor data={[{ id: "1", amount: 10 }]} categories={[]} />,
    );
    expect(screen.getByText("—")).toBeDefined();
  });

  it("hides add-row button and 操作 column when readOnly", () => {
    render(
      <ExpenseLineEditor
        data={[{ id: "1", summary: "x", amount: 10 }]}
        categories={categories}
        readOnly
      />,
    );
    expect(screen.queryByText("添加行")).toBeNull();
    expect(screen.queryByText("操作")).toBeNull();
    // footer still rendered in readOnly (zh default, issue #19)
    expect(screen.getByText(/合计：/)).toBeDefined();
  });

  it("uses custom currency symbol in amount header", () => {
    render(<ExpenseLineEditor data={[]} currency="€" />);
    expect(screen.getByText("金额（€）")).toBeDefined();
  });

  it("renders dash for missing amount in read-only display", () => {
    render(
      <ExpenseLineEditor
        data={[{ id: "1", summary: "x" }]}
        readOnly
        categories={[]}
      />,
    );
    // amount render shows "—" when value is null/undefined
    expect(screen.getByText("—")).toBeDefined();
  });
});
