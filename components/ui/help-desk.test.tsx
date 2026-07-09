import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { HelpDesk } from "@/components/ui/help-desk";
import type { Ticket } from "@/components/ui/help-desk";

const sampleTickets: Ticket[] = [
  {
    id: "T-001",
    title: "登录页面报错",
    description: "点击登录后显示500错误",
    status: "open",
    priority: "high",
    assignee: "李工",
    createdAt: "2026-07-08 10:00",
    updatedAt: "2026-07-08T10:00:00",
    replies: [
      {
        id: "r1",
        author: "李工",
        content: "正在排查中，请稍等",
        createdAt: "2026-07-08 10:30",
        isStaff: true,
      },
    ],
  },
  {
    id: "T-002",
    title: "需要重置密码",
    status: "resolved",
    priority: "medium",
    createdAt: "2026-07-07",
    updatedAt: "2026-07-07T15:00:00",
  },
];

describe("HelpDesk", () => {
  it("renders ticket list", () => {
    const { container } = render(<HelpDesk tickets={sampleTickets} />);
    expect(container.textContent).toContain("登录页面报错");
    expect(container.textContent).toContain("需要重置密码");
  });

  it("selects a ticket on click", async () => {
    const onSelectTicket = vi.fn();
    const { container } = render(
      <HelpDesk tickets={sampleTickets} onSelectTicket={onSelectTicket} />,
    );

    const btn = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("登录页面报错"),
    );
    expect(btn).not.toBeNull();

    await act(async () => {
      if (btn) fireEvent.click(btn);
    });

    expect(onSelectTicket).toHaveBeenCalled();
  });

  it("shows ticket detail when selected", async () => {
    const { container } = render(
      <HelpDesk tickets={sampleTickets} selectedTicketId="T-001" />,
    );
    expect(container.textContent).toContain("登录页面报错");
    expect(container.textContent).toContain("李工");
  });

  it("shows replies in ticket detail", () => {
    const { container } = render(
      <HelpDesk tickets={sampleTickets} selectedTicketId="T-001" />,
    );
    expect(container.textContent).toContain("正在排查中");
  });

  it("filters tickets by status", async () => {
    const { container } = render(<HelpDesk tickets={sampleTickets} />);

    // Click "已解决" filter
    const filters = Array.from(container.querySelectorAll("button"));
    const resolvedBtn = filters.find((b) => b.textContent === "已解决");
    if (resolvedBtn) {
      await act(async () => {
        fireEvent.click(resolvedBtn);
      });
      expect(container.textContent).toContain("需要重置密码");
      expect(container.textContent).not.toContain("登录页面报错");
    }
  });

  it("renders empty state", () => {
    const { container } = render(<HelpDesk tickets={[]} />);
    expect(container.textContent).toContain("暂无工单");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/help-desk");
    expect(mod.HelpDesk).toBeDefined();
  });
});
