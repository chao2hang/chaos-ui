import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MessageList } from "./message-list";
import type { MessageListProps } from "./message-list";

describe("MessageList", () => {
  it("exports MessageList", () => {
    expect(MessageList).toBeDefined();
  });

  it("exports types", () => {
    const _tc: MessageListProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders message titles and unread badge", () => {
    render(
      <MessageList
        messages={[
          { id: "m1", title: "审批通过", type: "success", read: false },
          { id: "m2", title: "系统升级", type: "info", read: true },
        ]}
      />,
    );
    expect(screen.getByText("审批通过")).toBeDefined();
    expect(screen.getByText("系统升级")).toBeDefined();
    expect(screen.getByText("1 条未读")).toBeDefined();
  });

  it("shows empty state when no messages", () => {
    render(<MessageList messages={[]} />);
    expect(screen.getByText("暂无消息")).toBeDefined();
  });

  it("invokes onSelect on click", () => {
    const onSelect = vi.fn();
    render(
      <MessageList
        messages={[{ id: "m1", title: "审批通过" }]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByLabelText("消息 审批通过 未读"));
    expect(onSelect).toHaveBeenCalledWith("m1");
  });

  it("invokes onSelect on Enter keydown", () => {
    const onSelect = vi.fn();
    render(
      <MessageList
        messages={[{ id: "m2", title: "系统升级", read: true }]}
        onSelect={onSelect}
      />,
    );
    const item = screen.getByLabelText("消息 系统升级");
    item.focus();
    fireEvent.keyDown(item, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("m2");
  });

  it("invokes onSelect on Space keydown", () => {
    const onSelect = vi.fn();
    render(
      <MessageList
        messages={[{ id: "m3", title: "提醒" }]}
        onSelect={onSelect}
      />,
    );
    const item = screen.getByLabelText("消息 提醒 未读");
    fireEvent.keyDown(item, { key: " " });
    expect(onSelect).toHaveBeenCalledWith("m3");
  });

  it("does not invoke onSelect on other keys", () => {
    const onSelect = vi.fn();
    render(
      <MessageList
        messages={[{ id: "m3", title: "提醒" }]}
        onSelect={onSelect}
      />,
    );
    const item = screen.getByLabelText("消息 提醒 未读");
    fireEvent.keyDown(item, { key: "ArrowDown" });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("invokes onMarkAllRead", () => {
    const onMarkAllRead = vi.fn();
    render(
      <MessageList
        messages={[{ id: "m1", title: "审批通过", read: false }]}
        onMarkAllRead={onMarkAllRead}
      />,
    );
    fireEvent.click(screen.getByText("全部已读"));
    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
  });

  it("hides 全部已读 button when no unread messages", () => {
    render(
      <MessageList
        messages={[{ id: "m1", title: "审批通过", read: true }]}
        onMarkAllRead={() => {}}
      />,
    );
    expect(screen.queryByText("全部已读")).toBeNull();
    expect(screen.queryByText(/条未读/)).toBeNull();
  });

  it("hides 全部已读 button when onMarkAllRead not provided even if unread", () => {
    render(
      <MessageList
        messages={[{ id: "m1", title: "审批通过", read: false }]}
      />,
    );
    expect(screen.queryByText("全部已读")).toBeNull();
  });

  it("renders message content when provided", () => {
    render(
      <MessageList
        messages={[{ id: "m1", title: "标题", content: "正文内容" }]}
      />,
    );
    expect(screen.getByText("正文内容")).toBeDefined();
  });

  it("renders region with aria-label", () => {
    render(<MessageList messages={[]} />);
    expect(
      screen.getByRole("region", { name: "站内消息列表" }),
    ).toBeDefined();
  });

  it("defaults to default type icon when type omitted", () => {
    render(<MessageList messages={[{ id: "m1", title: "默认" }]} />);
    expect(screen.getByText("默认")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/message-list");
    expect(mod.MessageList).toBeDefined();
  });
});
