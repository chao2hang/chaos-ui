import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock message and messageCenter before importing notify
vi.mock("@/lib/message", () => ({
  message: {
    success: vi.fn(() => "success-id"),
    error: vi.fn(() => "error-id"),
    warning: vi.fn(() => "warning-id"),
    info: vi.fn(() => "info-id"),
    loading: vi.fn(() => "loading-id"),
    destroy: vi.fn(),
  },
}));

vi.mock("@/components/business/message-center", () => ({
  messageCenter: {
    push: vi.fn(),
    setItems: vi.fn(),
    setUnread: vi.fn(),
    markRead: vi.fn(),
    markAllRead: vi.fn(),
    clear: vi.fn(),
    open: vi.fn(),
  },
}));

import { notify } from "./notify";
import { message } from "@/lib/message";
import { messageCenter } from "@/components/business/message-center";

describe("notify", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("delegates success to message.success", () => {
    notify.success("保存成功");
    expect(message.success).toHaveBeenCalledWith("保存成功", undefined);
  });

  it("delegates error to message.error with options", () => {
    notify.error("失败", { duration: 5 });
    expect(message.error).toHaveBeenCalledWith("失败", { duration: 5 });
  });

  it("delegates warning to message.warning", () => {
    notify.warning("警告");
    expect(message.warning).toHaveBeenCalledWith("警告", undefined);
  });

  it("delegates info to message.info", () => {
    notify.info("提示");
    expect(message.info).toHaveBeenCalledWith("提示", undefined);
  });

  it("loading returns a handle with success/error/dismiss", () => {
    const handle = notify.loading("加载中");
    expect(message.loading).toHaveBeenCalled();
    expect(typeof handle.success).toBe("function");
    expect(typeof handle.error).toBe("function");
    expect(typeof handle.dismiss).toBe("function");

    handle.success("完成");
    expect(message.success).toHaveBeenCalled();

    handle.error("出错了");
    expect(message.error).toHaveBeenCalled();

    handle.dismiss();
    expect(message.destroy).toHaveBeenCalled();
  });

  it("inbox pushes to messageCenter without toast by default", () => {
    notify.inbox({ title: "审批通过", body: "报销单已审批", href: "/flow/1" });
    expect(messageCenter.push).toHaveBeenCalledTimes(1);
    const pushed = (messageCenter.push as ReturnType<typeof vi.fn>).mock
      .calls[0]![0];
    expect(pushed.title).toBe("审批通过");
    expect(pushed.body).toBe("报销单已审批");
    expect(pushed.href).toBe("/flow/1");
    expect(pushed.read).toBe(false);
    expect(pushed.id).toMatch(/^notify-/);
    // No toast by default
    expect(message.info).not.toHaveBeenCalled();
  });

  it("inbox shows toast when alsoToast is true", () => {
    notify.inbox({
      title: "新消息",
      alsoToast: true,
      toastType: "success",
    });
    expect(messageCenter.push).toHaveBeenCalledTimes(1);
    expect(message.success).toHaveBeenCalledWith("新消息");
  });

  it("inbox defaults to info toast when alsoToast without toastType", () => {
    notify.inbox({ title: "提醒", alsoToast: true });
    expect(message.info).toHaveBeenCalledWith("提醒");
  });

  it("inbox passes category and level", () => {
    notify.inbox({
      title: "系统告警",
      category: "alert",
      level: "error",
    });
    const pushed = (messageCenter.push as ReturnType<typeof vi.fn>).mock
      .calls[0]![0];
    expect(pushed.category).toBe("alert");
    expect(pushed.level).toBe("error");
  });

  it("inbox generates unique ids", () => {
    notify.inbox({ title: "A" });
    notify.inbox({ title: "B" });
    const calls = (messageCenter.push as ReturnType<typeof vi.fn>).mock.calls;
    expect(calls[0]![0].id).not.toBe(calls[1]![0].id);
  });
});
