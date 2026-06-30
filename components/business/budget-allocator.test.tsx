import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BudgetAllocator } from "./budget-allocator";
import type { BudgetAllocatorProps } from "./budget-allocator";

describe("BudgetAllocator", () => {
  it("renders total, allocated percentage and category rows", () => {
    render(
      <BudgetAllocator
        total={100000}
        categories={[
          { id: "mkt", name: "市场", amount: 30000 },
          { id: "rnd", name: "研发", amount: 50000 },
        ]}
      />,
    );
    expect(screen.getByText("预算分配")).toBeDefined();
    expect(screen.getByText("市场")).toBeDefined();
    expect(screen.getByText("研发")).toBeDefined();
    expect(screen.getByText("已分配 80%")).toBeDefined();
  });

  it("shows empty state when no categories", () => {
    render(<BudgetAllocator total={1000} />);
    expect(screen.getByText("暂无分配类别")).toBeDefined();
  });

  it("defaults total to 0 and shows zero allocated", () => {
    render(<BudgetAllocator categories={[]} />);
    expect(screen.getByText("已分配 0%")).toBeDefined();
  });

  it("invokes onChange when increasing a category", () => {
    const onChange = vi.fn();
    render(
      <BudgetAllocator
        total={100000}
        categories={[{ id: "mkt", name: "市场", amount: 10000 }]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("增加 市场 预算"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const firstCall = onChange.mock.calls[0];
    expect(firstCall?.[0]).toHaveLength(1);
    expect((firstCall?.[0] as Array<{ amount: number }>)?.[0]?.amount).toBe(11000);
  });

  it("decreases amount via minus button but never below zero", () => {
    const onChange = vi.fn();
    render(
      <BudgetAllocator
        total={100000}
        categories={[{ id: "mkt", name: "市场", amount: 500 }]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("减少 市场 预算"));
    const updated = onChange.mock.calls[0]?.[0] as Array<{ amount: number }>;
    expect(updated[0]?.amount).toBe(0);
  });

  it("clamps amount to the cap when increasing beyond it", () => {
    const onChange = vi.fn();
    render(
      <BudgetAllocator
        total={100000}
        categories={[{ id: "mkt", name: "市场", amount: 59500, cap: 60000 }]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("增加 市场 预算"));
    const updated = onChange.mock.calls[0]?.[0] as Array<{ amount: number }>;
    expect(updated[0]?.amount).toBe(60000);
  });

  it("updates amount via the range slider input", () => {
    const onChange = vi.fn();
    render(
      <BudgetAllocator
        total={100000}
        categories={[{ id: "rnd", name: "研发", amount: 20000 }]}
        onChange={onChange}
      />,
    );
    const slider = screen.getByLabelText("研发 预算滑块");
    fireEvent.change(slider, { target: { value: "50000" } });
    const updated = onChange.mock.calls[0]?.[0] as Array<{ amount: number }>;
    expect(updated[0]?.amount).toBe(50000);
  });

  it("syncs internal state when the categories prop changes", () => {
    const { rerender } = render(
      <BudgetAllocator
        total={100000}
        categories={[{ id: "mkt", name: "市场", amount: 10000 }]}
      />,
    );
    expect(screen.getByText("已分配 10%")).toBeDefined();
    rerender(
      <BudgetAllocator
        total={100000}
        categories={[{ id: "mkt", name: "市场", amount: 60000 }]}
      />,
    );
    expect(screen.getByText("已分配 60%")).toBeDefined();
  });

  it("applies a custom className to the root", () => {
    const { container } = render(
      <BudgetAllocator total={100} categories={[]} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: BudgetAllocatorProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
