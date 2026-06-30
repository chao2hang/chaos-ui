import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileListItem } from "./mobile-list-item";
import type { MobileListItemProps } from "./mobile-list-item";

describe("MobileListItem", () => {
  it("renders the title and subtitle", () => {
    render(<MobileListItem title="张三" subtitle="销售部" />);
    expect(screen.getByText("张三")).toBeDefined();
    expect(screen.getByText("销售部")).toBeDefined();
  });

  it("renders trailing content", () => {
    render(<MobileListItem title="订单" trailing={<span>已发货</span>} />);
    expect(screen.getByText("已发货")).toBeDefined();
  });

  it("invokes onClick on click and Enter/Space keys", () => {
    let called = 0;
    render(<MobileListItem title="点击" onClick={() => (called += 1)} />);
    const node = screen.getByRole("button", { name: "点击" });
    fireEvent.click(node);
    fireEvent.keyDown(node, { key: "Enter" });
    fireEvent.keyDown(node, { key: " " });
    expect(called).toBe(3);
  });

  it("does not render as interactive without onClick", () => {
    render(<MobileListItem title="只读" />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByText("只读")).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileListItemProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
