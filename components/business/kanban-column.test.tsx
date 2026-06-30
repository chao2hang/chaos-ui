import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KanbanColumn } from "./kanban-column";
import type { KanbanColumnProps } from "./kanban-column";

describe("KanbanColumn", () => {
  it("renders title and card titles", () => {
    render(
      <KanbanColumn
        title="待处理"
        cards={[
          { id: "c1", title: "对接支付通道", label: "P0" },
          { id: "c2", title: "对账修复" },
        ]}
      />,
    );
    expect(screen.getByText("待处理")).toBeDefined();
    expect(screen.getByText("对接支付通道")).toBeDefined();
    expect(screen.getByText("对账修复")).toBeDefined();
    expect(screen.getByText("P0")).toBeDefined();
    expect(screen.getByRole("group", { name: "看板列 待处理" })).toBeDefined();
  });

  it("renders the assignee when provided", () => {
    render(
      <KanbanColumn
        title="待处理"
        cards={[{ id: "c1", title: "卡片", assignee: "张三" }]}
      />,
    );
    expect(screen.getByText("张三")).toBeDefined();
  });

  it("shows card count badge", () => {
    render(<KanbanColumn title="进行中" cards={[{ id: "c1", title: "A" }]} />);
    expect(screen.getByText("1")).toBeDefined();
  });

  it("shows empty state when no cards", () => {
    render(<KanbanColumn title="空列" cards={[]} />);
    expect(screen.getByText("暂无卡片")).toBeDefined();
  });

  it("uses the default title when none provided", () => {
    render(<KanbanColumn cards={[]} />);
    expect(screen.getByText("未命名列")).toBeDefined();
  });

  it("invokes onCardClick on click", () => {
    const onCardClick = vi.fn();
    render(
      <KanbanColumn
        title="待处理"
        cards={[{ id: "c1", title: "卡片" }]}
        onCardClick={onCardClick}
      />,
    );
    fireEvent.click(screen.getByLabelText("卡片 卡片"));
    expect(onCardClick).toHaveBeenCalledWith("c1");
  });

  it("invokes onCardClick when Enter is pressed on a card", () => {
    const onCardClick = vi.fn();
    render(
      <KanbanColumn
        title="待处理"
        cards={[{ id: "c1", title: "卡片" }]}
        onCardClick={onCardClick}
      />,
    );
    const card = screen.getByLabelText("卡片 卡片");
    fireEvent.keyDown(card, { key: "Enter" });
    expect(onCardClick).toHaveBeenCalledWith("c1");
  });

  it("invokes onCardClick when Space is pressed on a card", () => {
    const onCardClick = vi.fn();
    render(
      <KanbanColumn
        title="待处理"
        cards={[{ id: "c1", title: "卡片" }]}
        onCardClick={onCardClick}
      />,
    );
    const card = screen.getByLabelText("卡片 卡片");
    fireEvent.keyDown(card, { key: " " });
    expect(onCardClick).toHaveBeenCalledWith("c1");
  });

  it("does not invoke onCardClick for unrelated keys", () => {
    const onCardClick = vi.fn();
    render(
      <KanbanColumn
        title="待处理"
        cards={[{ id: "c1", title: "卡片" }]}
        onCardClick={onCardClick}
      />,
    );
    const card = screen.getByLabelText("卡片 卡片");
    fireEvent.keyDown(card, { key: "Tab" });
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it("invokes onAddCard", () => {
    const onAddCard = vi.fn();
    render(<KanbanColumn title="待处理" onAddCard={onAddCard} />);
    fireEvent.click(screen.getByText("新增卡片"));
    expect(onAddCard).toHaveBeenCalledTimes(1);
  });

  it("renders cards inside a list", () => {
    render(<KanbanColumn title="待处理" cards={[{ id: "c1", title: "卡片" }]} />);
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("renders with a custom accent without crashing", () => {
    render(
      <KanbanColumn title="待处理" accent="emerald" cards={[]} />,
    );
    expect(screen.getByText("待处理")).toBeDefined();
  });

  it("falls back to primary accent for an unknown accent value", () => {
    render(
      <KanbanColumn title="待处理" accent="unknown-accent" cards={[]} />,
    );
    expect(screen.getByText("待处理")).toBeDefined();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <KanbanColumn title="待处理" cards={[]} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: KanbanColumnProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
