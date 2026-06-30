import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge, STATUS_BADGE_PRESETS } from "./status-badge";
import type {
  StatusBadgeProps,
  StatusPreset,
  StatusMapping,
  StatusEntry,
} from "./status-badge";

describe("StatusBadge", () => {
  it("exports StatusBadge", () => {
    expect(StatusBadge).toBeDefined();
  });

  it("exports STATUS_BADGE_PRESETS", () => {
    expect(STATUS_BADGE_PRESETS).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: StatusBadgeProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: StatusPreset | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: StatusMapping | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: StatusEntry | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });

  it("renders label from biz preset", () => {
    render(<StatusBadge value="approved" preset="biz" />);
    expect(screen.getByText("已通过")).toBeDefined();
  });

  it("renders draft from biz preset with default color", () => {
    const { container } = render(
      <StatusBadge value="draft" preset="biz" />,
    );
    expect(screen.getByText("草稿")).toBeDefined();
    const tag = container.querySelector('[data-slot="color-tag"]');
    expect(tag?.className).toContain("bg-muted");
  });

  it("renders pending with info color", () => {
    const { container } = render(
      <StatusBadge value="pending" preset="biz" />,
    );
    expect(screen.getByText("处理中")).toBeDefined();
    expect(container.querySelector('[data-slot="color-tag"]')?.className).toContain("bg-blue-50");
  });

  it("renders rejected with error color", () => {
    const { container } = render(
      <StatusBadge value="rejected" preset="biz" />,
    );
    expect(screen.getByText("已驳回")).toBeDefined();
    expect(container.querySelector('[data-slot="color-tag"]')?.className).toContain("bg-red-50");
  });

  it("active-inactive preset maps number 1/0 and true/false", () => {
    const { rerender } = render(<StatusBadge value={1} preset="active-inactive" />);
    expect(screen.getByText("激活")).toBeDefined();
    rerender(<StatusBadge value={0} preset="active-inactive" />);
    expect(screen.getByText("停用")).toBeDefined();
    rerender(<StatusBadge value={true} preset="active-inactive" />);
    expect(screen.getByText("激活")).toBeDefined();
    rerender(<StatusBadge value={false} preset="active-inactive" />);
    expect(screen.getByText("停用")).toBeDefined();
  });

  it("open-closed preset maps open/closed/done/todo", () => {
    const { rerender } = render(<StatusBadge value="open" preset="open-closed" />);
    expect(screen.getByText("进行中")).toBeDefined();
    rerender(<StatusBadge value="done" preset="open-closed" />);
    expect(screen.getByText("已完成")).toBeDefined();
  });

  it("custom mapping merges on top of preset", () => {
    render(
      <StatusBadge
        value="archived"
        preset="biz"
        mapping={{ archived: ["归档", "gold"] }}
      />,
    );
    expect(screen.getByText("归档")).toBeDefined();
  });

  it("custom mapping overrides preset label", () => {
    render(
      <StatusBadge
        value="approved"
        preset="biz"
        mapping={{ approved: ["OK", "success"] }}
      />,
    );
    expect(screen.getByText("OK")).toBeDefined();
  });

  it("uses only custom mapping when no preset", () => {
    render(
      <StatusBadge
        value="custom"
        mapping={{ custom: ["Custom", "warning"] }}
      />,
    );
    expect(screen.getByText("Custom")).toBeDefined();
  });

  it("falls back to raw value when no mapping matches", () => {
    render(<StatusBadge value="unknown" />);
    expect(screen.getByText("unknown")).toBeDefined();
  });

  it("label prop overrides mapped label", () => {
    render(<StatusBadge value="approved" preset="biz" label="Approved!" />);
    expect(screen.getByText("Approved!")).toBeDefined();
  });

  it("renders dot indicator when dot=true", () => {
    const { container } = render(
      <StatusBadge value="approved" preset="biz" dot />,
    );
    const dot = container.querySelector('[data-slot="color-tag"] span[aria-hidden="true"]');
    expect(dot).not.toBeNull();
  });

  it("applies size variants", () => {
    const { container, rerender } = render(
      <StatusBadge value="approved" preset="biz" size="sm" />,
    );
    expect(
      container.querySelector('[data-slot="color-tag"]')?.className,
    ).toContain("text-xs");
    rerender(<StatusBadge value="approved" preset="biz" size="lg" />);
    expect(
      container.querySelector('[data-slot="color-tag"]')?.className,
    ).toContain("text-sm");
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatusBadge value="approved" preset="biz" className="my-badge" />,
    );
    expect(
      container.querySelector('[data-slot="color-tag"]')?.className,
    ).toContain("my-badge");
  });

  it("PRESETS contain expected keys", () => {
    expect(STATUS_BADGE_PRESETS.biz.approved).toEqual(["已通过", "success"]);
    expect(STATUS_BADGE_PRESETS["active-inactive"]["1"]).toEqual(["激活", "success"]);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/status-badge");
    expect(mod.StatusBadge).toBeDefined();
  });
});
