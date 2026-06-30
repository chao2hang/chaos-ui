import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TabPin } from "./tab-pin";

describe("TabPin", () => {
  it("renders the tab label", () => {
    render(<TabPin id="tab-1" label="销售订单" />);
    expect(screen.getByText("销售订单")).toBeDefined();
    expect(screen.getByTitle("销售订单")).toBeDefined();
  });

  it("invokes onPin with the tab id when the pin button is clicked", () => {
    const onPin = vi.fn();
    render(<TabPin id="tab-1" label="销售订单" onPin={onPin} />);
    fireEvent.click(screen.getByRole("button", { name: "固定 销售订单" }));
    expect(onPin).toHaveBeenCalledWith("tab-1");
  });

  it("toggles aria-pressed and the accessible name when pinned", () => {
    const onPin = vi.fn();
    render(<TabPin id="tab-1" label="销售订单" pinned onPin={onPin} />);
    const btn = screen.getByRole("button", { name: "取消固定 销售订单" });
    expect(btn.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(btn);
    expect(onPin).toHaveBeenCalledWith("tab-1");
  });

  it("defaults to unpinned", () => {
    render(<TabPin id="tab-1" label="草稿" />);
    const btn = screen.getByRole("button", { name: "固定 草稿" });
    expect(btn.getAttribute("aria-pressed")).toBe("false");
  });
});
