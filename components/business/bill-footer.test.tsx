import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BillFooter } from "./bill-footer";
import type { BillFooterProps } from "./bill-footer";

describe("BillFooter", () => {
  it("exports BillFooter", () => {
    expect(BillFooter).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BillFooterProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders draft status buttons and fires callbacks", () => {
    const onSaveDraft = vi.fn();
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    render(
      <BillFooter
        status="draft"
        onSaveDraft={onSaveDraft}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />,
    );
    const save = screen.getByRole("button", { name: "存草稿" });
    const submit = screen.getByRole("button", { name: "提交" });
    const cancel = screen.getByRole("button", { name: "取消" });
    fireEvent.click(save);
    fireEvent.click(submit);
    fireEvent.click(cancel);
    expect(onSaveDraft).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("renders pending status buttons and fires callbacks", () => {
    const onApprove = vi.fn();
    const onReject = vi.fn();
    const onRecall = vi.fn();
    render(
      <BillFooter
        status="pending"
        onApprove={onApprove}
        onReject={onReject}
        onRecall={onRecall}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "审批通过" }));
    fireEvent.click(screen.getByRole("button", { name: "驳回" }));
    fireEvent.click(screen.getByRole("button", { name: "撤回" }));
    expect(onApprove).toHaveBeenCalledTimes(1);
    expect(onReject).toHaveBeenCalledTimes(1);
    expect(onRecall).toHaveBeenCalledTimes(1);
  });

  it("renders approved status buttons", () => {
    const onPrint = vi.fn();
    const onVoid = vi.fn();
    render(
      <BillFooter status="approved" onPrint={onPrint} onVoid={onVoid} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "打印" }));
    fireEvent.click(screen.getByRole("button", { name: "作废" }));
    expect(onPrint).toHaveBeenCalledTimes(1);
    expect(onVoid).toHaveBeenCalledTimes(1);
  });

  it("renders rejected status buttons (修改重提 + 作废)", () => {
    const onSubmit = vi.fn();
    const onVoid = vi.fn();
    render(
      <BillFooter status="rejected" onSubmit={onSubmit} onVoid={onVoid} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "修改重提" }));
    fireEvent.click(screen.getByRole("button", { name: "作废" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onVoid).toHaveBeenCalledTimes(1);
  });

  it("disables buttons when loading is true", () => {
    render(
      <BillFooter
        status="draft"
        onSaveDraft={vi.fn()}
        onSubmit={vi.fn()}
        loading
      />,
    );
    expect(screen.getByRole("button", { name: "存草稿" })).toHaveProperty(
      "disabled",
      true,
    );
    expect(screen.getByRole("button", { name: "提交" })).toHaveProperty(
      "disabled",
      true,
    );
  });

  it("only renders buttons whose handler is provided", () => {
    render(<BillFooter status="draft" onSubmit={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "存草稿" })).toBeNull();
    expect(screen.getByRole("button", { name: "提交" })).toBeDefined();
  });

  it("renders extra node in the left slot", () => {
    render(
      <BillFooter
        status="draft"
        extra={<button type="button">Extra</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Extra" })).toBeDefined();
  });

  it("renders no status buttons when status has no matching handlers", () => {
    render(<BillFooter status="approved" />);
    // approved only renders print/void when provided
    expect(screen.queryByRole("button")).toBeNull();
  });
});
