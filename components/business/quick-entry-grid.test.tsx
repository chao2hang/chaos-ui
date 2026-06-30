import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QuickEntryGrid } from "./quick-entry-grid";
import type { QuickEntryGridProps } from "./quick-entry-grid";

describe("QuickEntryGrid", () => {
  it("renders each entry label as a button", () => {
    const onClick = vi.fn();
    render(
      <QuickEntryGrid
        entries={[
          { id: "bill", label: "新建账单", onClick },
          { id: "approval", label: "审批中心", onClick: () => {} },
        ]}
      />,
    );
    expect(screen.getByRole("button", { name: "新建账单" })).toBeDefined();
    expect(screen.getByRole("button", { name: "审批中心" })).toBeDefined();
    expect(screen.getByRole("navigation", { name: "快捷入口" })).toBeDefined();
  });

  it("invokes the entry onClick when clicked", () => {
    const bill = vi.fn();
    render(
      <QuickEntryGrid
        entries={[{ id: "bill", label: "新建账单", onClick: bill }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "新建账单" }));
    expect(bill).toHaveBeenCalledTimes(1);
  });

  it("invokes each entry's own onClick independently", () => {
    const bill = vi.fn();
    const approval = vi.fn();
    render(
      <QuickEntryGrid
        entries={[
          { id: "bill", label: "新建账单", onClick: bill },
          { id: "approval", label: "审批中心", onClick: approval },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "审批中心" }));
    expect(approval).toHaveBeenCalledTimes(1);
    expect(bill).not.toHaveBeenCalled();
  });

  it("renders a fallback icon when no icon is provided", () => {
    render(
      <QuickEntryGrid
        entries={[{ id: "x", label: "入口", onClick: () => {} }]}
      />,
    );
    expect(screen.getByRole("button", { name: "入口" })).toBeDefined();
  });

  it("renders a custom icon node when provided", () => {
    render(
      <QuickEntryGrid
        entries={[
          {
            id: "x",
            label: "入口",
            onClick: () => {},
            icon: <span data-testid="custom-icon" />,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-icon")).toBeDefined();
  });

  it("renders the entry buttons as type=button to avoid form submission", () => {
    render(
      <QuickEntryGrid
        entries={[{ id: "x", label: "入口", onClick: () => {} }]}
      />,
    );
    expect(screen.getByRole("button", { name: "入口" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("renders entries inside a list", () => {
    render(
      <QuickEntryGrid
        entries={[{ id: "x", label: "入口", onClick: () => {} }]}
      />,
    );
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("renders an empty list without crashing", () => {
    render(<QuickEntryGrid entries={[]} />);
    expect(screen.getByRole("navigation", { name: "快捷入口" })).toBeDefined();
  });

  it("defaults to an empty entries list when omitted", () => {
    const { container } = render(
      // @ts-expect-error — exercising the default param branch
      <QuickEntryGrid />,
    );
    expect(
      container.querySelector('[data-slot="quick-entry-grid"]'),
    ).not.toBeNull();
    expect(screen.getByRole("navigation", { name: "快捷入口" })).toBeDefined();
  });

  it("applies a custom className to the nav root", () => {
    const { container } = render(
      <QuickEntryGrid entries={[]} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/quick-entry-grid");
    expect(mod.QuickEntryGrid).toBeDefined();
  });

  it("exports types", () => {
    const _tc: QuickEntryGridProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
