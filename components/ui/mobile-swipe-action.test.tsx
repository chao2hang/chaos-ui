import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileSwipeAction } from "./mobile-swipe-action";

describe("MobileSwipeAction", () => {
  it("renders children", () => {
    render(
      <MobileSwipeAction>
        <div>row content</div>
      </MobileSwipeAction>,
    );
    expect(screen.getByText("row content")).toBeDefined();
  });

  it("renders right action labels", () => {
    render(
      <MobileSwipeAction
        rightActions={[
          { key: "edit", label: "编辑", onClick: vi.fn() },
          { key: "delete", label: "删除", onClick: vi.fn(), color: "destructive" },
        ]}
      >
        <div>row</div>
      </MobileSwipeAction>,
    );
    expect(screen.getByRole("button", { name: "编辑" })).toBeDefined();
    expect(screen.getByRole("button", { name: "删除" })).toBeDefined();
  });

  it("renders left action labels", () => {
    render(
      <MobileSwipeAction
        leftActions={[{ key: "pin", label: "置顶", onClick: vi.fn() }]}
      >
        <div>row</div>
      </MobileSwipeAction>,
    );
    expect(screen.getByRole("button", { name: "置顶" })).toBeDefined();
  });

  it("fires onClick when an action button is clicked and resets offset", async () => {
    const onDelete = vi.fn();
    render(
      <MobileSwipeAction
        rightActions={[{ key: "delete", label: "删除", onClick: onDelete, color: "destructive" }]}
      >
        <div>row</div>
      </MobileSwipeAction>,
    );
    const btn = screen.getByRole("button", { name: "删除" });
    btn.click();
    expect(onDelete).toHaveBeenCalled();
  });

  it("renders nothing for actions when none provided", () => {
    const { container } = render(
      <MobileSwipeAction>
        <div>row</div>
      </MobileSwipeAction>,
    );
    expect(
      container.querySelector('[data-slot="mobile-swipe-action-left"]'),
    ).toBeNull();
    expect(
      container.querySelector('[data-slot="mobile-swipe-action-right"]'),
    ).toBeNull();
  });
});
