import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileActionSheet } from "./mobile-action-sheet";
import type { MobileActionSheetProps } from "./mobile-action-sheet";

const actions = [
  { label: "编辑", onClick: vi.fn() },
  { label: "删除", onClick: vi.fn(), danger: true },
];

describe("MobileActionSheet", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <MobileActionSheet open={false} onOpenChange={() => undefined} actions={[]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders action labels and a cancel button when open", () => {
    render(
      <MobileActionSheet open onOpenChange={() => undefined} actions={actions} />,
    );
    expect(screen.getByText("编辑")).toBeDefined();
    expect(screen.getByText("删除")).toBeDefined();
    expect(screen.getByText("取消")).toBeDefined();
  });

  it("invokes the action handler and closes on click", () => {
    const onOpenChange = vi.fn();
    render(
      <MobileActionSheet open onOpenChange={onOpenChange} actions={actions} />,
    );
    fireEvent.click(screen.getByText("编辑"));
    const editAction = actions.find((a) => a.label === "编辑");
    expect(editAction?.onClick).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes when the cancel button is clicked", () => {
    const onOpenChange = vi.fn();
    render(
      <MobileActionSheet open onOpenChange={onOpenChange} actions={[]} />,
    );
    fireEvent.click(screen.getByText("取消"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("exports types", () => {
    const _t: MobileActionSheetProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
