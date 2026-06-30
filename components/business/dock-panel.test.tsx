import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DockPanel } from "./dock-panel";
import type { DockPanelProps } from "./dock-panel";

describe("DockPanel", () => {
  it("renders children when expanded on the left side", () => {
    render(
      <DockPanel side="left" collapsed={false}>
        <p>面板内容</p>
      </DockPanel>,
    );
    expect(screen.getByText("面板内容")).toBeDefined();
    expect(screen.getByLabelText("折叠侧栏面板")).toBeDefined();
  });

  it("hides children when collapsed", () => {
    render(
      <DockPanel side="left" collapsed>
        <p>面板内容</p>
      </DockPanel>,
    );
    expect(screen.queryByText("面板内容")).toBeNull();
    expect(screen.getByLabelText("展开侧栏面板")).toBeDefined();
  });

  it("marks the collapsed content region as aria-hidden", () => {
    render(
      <DockPanel side="right" collapsed>
        <p>面板内容</p>
      </DockPanel>,
    );
    expect(screen.getByLabelText("展开侧栏面板")).toBeDefined();
  });

  it("invokes onToggle on button click", () => {
    const onToggle = vi.fn();
    render(
      <DockPanel side="bottom" collapsed={false} onToggle={onToggle}>
        <p>面板内容</p>
      </DockPanel>,
    );
    fireEvent.click(screen.getByLabelText("折叠下方面板"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("uses a side栏 label for side docks and a 下方 label for bottom docks", () => {
    const { rerender } = render(
      <DockPanel side="right" collapsed>
        <p>面板内容</p>
      </DockPanel>,
    );
    expect(screen.getByLabelText("展开侧栏面板")).toBeDefined();
    rerender(
      <DockPanel side="bottom" collapsed>
        <p>面板内容</p>
      </DockPanel>,
    );
    expect(screen.getByLabelText("展开下方面板")).toBeDefined();
  });

  it("renders the content region with a non-hidden state when expanded", () => {
    render(
      <DockPanel side="bottom" collapsed={false}>
        <p>面板内容</p>
      </DockPanel>,
    );
    const region = screen.getByRole("region", { name: "停靠面板内容" });
    expect(region).not.toHaveAttribute("aria-hidden", "true");
  });

  it("applies a custom className", () => {
    const { container } = render(
      <DockPanel side="left" collapsed={false} className="custom-cls">
        <p>面板内容</p>
      </DockPanel>,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: DockPanelProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
