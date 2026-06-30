import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileTabBar } from "./mobile-tab-bar";
import type { MobileTabBarProps } from "./mobile-tab-bar";

const tabs = [
  { id: "home", label: "首页" },
  { id: "orders", label: "订单" },
  { id: "me", label: "我的" },
];

describe("MobileTabBar", () => {
  it("renders all tab labels", () => {
    render(<MobileTabBar tabs={tabs} activeId="home" />);
    expect(screen.getByText("首页")).toBeDefined();
    expect(screen.getByText("订单")).toBeDefined();
    expect(screen.getByText("我的")).toBeDefined();
  });

  it("marks the active tab as selected", () => {
    render(<MobileTabBar tabs={tabs} activeId="orders" />);
    const orderTab = screen.getByRole("tab", { name: "订单" });
    expect(orderTab.getAttribute("aria-selected")).toBe("true");
  });

  it("defaults active to the first tab", () => {
    render(<MobileTabBar tabs={tabs} />);
    const homeTab = screen.getByRole("tab", { name: "首页" });
    expect(homeTab.getAttribute("aria-selected")).toBe("true");
  });

  it("invokes onSelect with the tab id on click", () => {
    let selected = "";
    render(<MobileTabBar tabs={tabs} activeId="home" onSelect={(id) => (selected = id)} />);
    fireEvent.click(screen.getByRole("tab", { name: "我的" }));
    expect(selected).toBe("me");
  });

  it("exports types", () => {
    const _t: MobileTabBarProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
