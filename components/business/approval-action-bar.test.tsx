import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ApprovalActionBar } from "./approval-action-bar";
import type { ApprovalActionBarProps } from "./approval-action-bar";

describe("ApprovalActionBar", () => {
  it("renders approve and reject buttons", () => {
    render(<ApprovalActionBar onApprove={() => {}} onReject={() => {}} />);
    expect(screen.getByRole("button", { name: "通过" })).toBeDefined();
    expect(screen.getByRole("button", { name: "驳回" })).toBeDefined();
  });

  it("renders the transfer button when onTransfer is provided", () => {
    render(<ApprovalActionBar onTransfer={() => {}} />);
    expect(screen.getByRole("button", { name: "转交" })).toBeDefined();
  });

  it("omits the transfer button when onTransfer is not provided", () => {
    render(<ApprovalActionBar />);
    expect(screen.queryByRole("button", { name: "转交" })).toBeNull();
  });

  it("renders the current status", () => {
    render(<ApprovalActionBar status="待审批" />);
    expect(screen.getByText("当前状态：待审批")).toBeDefined();
  });

  it("calls onApprove when the approve button is clicked", () => {
    const onApprove = vi.fn();
    render(<ApprovalActionBar onApprove={onApprove} />);
    fireEvent.click(screen.getByRole("button", { name: "通过" }));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it("calls onReject when the reject button is clicked", () => {
    const onReject = vi.fn();
    render(<ApprovalActionBar onReject={onReject} />);
    fireEvent.click(screen.getByRole("button", { name: "驳回" }));
    expect(onReject).toHaveBeenCalledTimes(1);
  });

  it("exports types", () => {
    const _tc: ApprovalActionBarProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
