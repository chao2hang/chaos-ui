import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ApplicationForm } from "./application-form";
import type { ApplicationFormProps } from "./application-form";

describe("ApplicationForm", () => {
  it("renders the open-account title", () => {
    render(<ApplicationForm type="open" />);
    expect(screen.getByText("开户申请")).toBeDefined();
  });

  it("renders the close-account title", () => {
    render(<ApplicationForm type="close" />);
    expect(screen.getByText("销户申请")).toBeDefined();
  });

  it("renders the change-account title", () => {
    render(<ApplicationForm type="change" />);
    expect(screen.getByText("变更申请")).toBeDefined();
  });

  it("renders the reason textarea", () => {
    render(<ApplicationForm type="open" />);
    expect(screen.getByPlaceholderText("请输入申请事由")).toBeDefined();
    expect(screen.getByRole("button", { name: "提交申请" })).toBeDefined();
  });

  it("submits the form with type and reason", () => {
    const onSubmit = vi.fn();
    render(<ApplicationForm type="open" onSubmit={onSubmit} />);
    const textarea = screen.getByPlaceholderText("请输入申请事由");
    fireEvent.change(textarea, { target: { value: "业务扩张" } });
    fireEvent.click(screen.getByRole("button", { name: "提交申请" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ type: "open", reason: "业务扩张" });
  });

  it("exports types", () => {
    const _tc: ApplicationFormProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
