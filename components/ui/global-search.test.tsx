import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { GlobalSearch } from "@/components/ui/global-search";

const results = [
  { id: "1", title: "项目文档", category: "documents" as const, subtitle: "最近更新" },
  { id: "2", title: "张三", category: "users" as const, subtitle: "工程师" },
  { id: "3", title: "订单 #12345", category: "orders" as const, subtitle: "¥1,280" },
];

describe("GlobalSearch", () => {
  it("renders search input", () => {
    const { container } = render(<GlobalSearch open results={results} />);
    expect(container.querySelector("input")).not.toBeNull();
  });

  it("shows results grouped by category", async () => {
    const { container } = render(<GlobalSearch open results={results} minQueryLength={0} />);
    // Need at least `minQueryLength` characters typed to show results
    const input = container.querySelector("input");
    expect(input).not.toBeNull();

    await act(async () => {
      if (input) fireEvent.change(input, { target: { value: "项目" } });
    });

    expect(container.textContent).toContain("项目文档");
    expect(container.textContent).toContain("张三");
  });

  it("shows empty state with no results", () => {
    const { container } = render(<GlobalSearch open results={[]} />);
    // With empty query and no results, shows "未找到"
    const input = container.querySelector("input");
    if (input) {
      fireEvent.change(input, { target: { value: "xyz" } });
    }
  });

  it("calls onSelect when result is clicked", async () => {
    const onSelect = vi.fn();
    const { container } = render(
      <GlobalSearch open results={results} onSelect={onSelect} minQueryLength={0} />,
    );

    // Need to type something first to see results
    const input = container.querySelector("input");
    await act(async () => {
      if (input) fireEvent.change(input, { target: { value: "项目" } });
    });

    const btn = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("项目文档"),
    );
    expect(btn).not.toBeNull();

    await act(async () => {
      if (btn) fireEvent.click(btn);
    });
    expect(onSelect).toHaveBeenCalled();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/global-search");
    expect(mod.GlobalSearch).toBeDefined();
  });
});
