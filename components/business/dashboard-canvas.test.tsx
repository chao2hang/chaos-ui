import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DashboardCanvas } from "./dashboard-canvas";
import type { DashboardCanvasProps } from "./dashboard-canvas";

describe("DashboardCanvas", () => {
  it("renders widget titles and positions", () => {
    render(
      <DashboardCanvas
        widgets={[{ id: "w1", title: "销售额", x: 0, y: 0, w: 6, h: 2 }]}
      />,
    );
    expect(screen.getByText("销售额")).toBeDefined();
    expect(screen.getByText("位置 0,0 · 尺寸 6×2")).toBeDefined();
    expect(screen.getByRole("region", { name: "仪表盘画布" })).toBeDefined();
  });

  it("shows empty state when no widgets", () => {
    render(<DashboardCanvas widgets={[]} />);
    expect(screen.getByText("画布为空，请添加 widget")).toBeDefined();
  });

  it("invokes onChange when removing a widget", () => {
    const onChange = vi.fn();
    render(
      <DashboardCanvas
        widgets={[{ id: "w1", title: "销售额", x: 0, y: 0, w: 6, h: 2 }]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("移除 销售额"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0]?.[0]).toHaveLength(0);
    // widget removed from view
    expect(screen.queryByText("销售额")).toBeNull();
  });

  it("moves widget right and reports new x position via onChange", () => {
    const onChange = vi.fn();
    render(
      <DashboardCanvas
        widgets={[{ id: "w1", title: "销售额", x: 0, y: 0, w: 6, h: 2 }]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("右移 销售额"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const moved = onChange.mock.calls[0]?.[0] as Array<{ x: number }>;
    expect(moved[0]?.x).toBe(1);
    expect(screen.getByText("位置 1,0 · 尺寸 6×2")).toBeDefined();
  });

  it("clamps widget x so it never exceeds the grid boundary", () => {
    const onChange = vi.fn();
    render(
      <DashboardCanvas
        widgets={[{ id: "w1", title: "销售额", x: 5, y: 0, w: 6, h: 2 }]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("右移 销售额"));
    const moved = onChange.mock.calls[0]?.[0] as Array<{ x: number }>;
    // COLS=12, w=6 => max x = 6
    expect(moved[0]?.x).toBe(6);
  });

  it("does not move widget left below x=0", () => {
    const onChange = vi.fn();
    render(
      <DashboardCanvas
        widgets={[{ id: "w1", title: "销售额", x: 0, y: 0, w: 6, h: 2 }]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("左移 销售额"));
    const moved = onChange.mock.calls[0]?.[0] as Array<{ x: number }>;
    expect(moved[0]?.x).toBe(0);
  });

  it("syncs items when widgets prop changes", () => {
    const { rerender } = render(
      <DashboardCanvas
        widgets={[{ id: "w1", title: "销售额", x: 0, y: 0, w: 6, h: 2 }]}
      />,
    );
    expect(screen.getByText("销售额")).toBeDefined();
    rerender(<DashboardCanvas widgets={[]} />);
    expect(screen.getByText("画布为空，请添加 widget")).toBeDefined();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <DashboardCanvas widgets={[]} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: DashboardCanvasProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
