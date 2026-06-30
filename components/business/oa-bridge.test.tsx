import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { OaBridge } from "./oa-bridge";
import type { OaBridgeProps } from "./oa-bridge";

describe("OaBridge", () => {
  it("renders bill type and id", () => {
    render(<OaBridge billId="EXP-2026-001" billType="报销单" />);
    expect(screen.getByText("报销单 · EXP-2026-001")).toBeDefined();
    expect(screen.getByText("提交至 OA")).toBeDefined();
    expect(screen.getByRole("region", { name: "OA 系统桥接" })).toBeDefined();
  });

  it("renders the descriptive paragraph mentioning the bill type", () => {
    render(<OaBridge billId="EXP-001" billType="报销单" />);
    expect(screen.getByText(/将该报销单推送至 OA 系统/)).toBeDefined();
  });

  it("shows the submitting state while in flight", () => {
    let resolveIssue: () => void = () => {};
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveIssue = resolve;
        }),
    );
    render(<OaBridge billId="EXP-001" billType="报销单" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("提交至 OA"));
    const button = screen.getByText("提交中").closest("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    resolveIssue();
  });

  it("shows success state after submit resolves and disables the button", async () => {
    const onSubmit = vi.fn(() => Promise.resolve());
    render(<OaBridge billId="EXP-001" billType="报销单" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("提交至 OA"));
    await waitFor(() => {
      expect(screen.getByText(/已提交至 OA 系统/)).toBeDefined();
      expect(screen.getByText("已提交")).toBeDefined();
    });
    expect(screen.getByText("已提交").closest("button")).toBeDisabled();
    expect(onSubmit).toHaveBeenCalledWith("EXP-001");
  });

  it("shows the success status region", async () => {
    const onSubmit = vi.fn(() => Promise.resolve());
    render(<OaBridge billId="EXP-001" billType="报销单" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("提交至 OA"));
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeDefined();
    });
  });

  it("shows error state when submit rejects with an Error", async () => {
    const onSubmit = vi.fn(() => Promise.reject(new Error("网络超时")));
    render(<OaBridge billId="EXP-001" billType="报销单" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("提交至 OA"));
    await waitFor(() => {
      expect(screen.getByText(/提交失败：网络超时/)).toBeDefined();
    });
    expect(screen.getByRole("alert")).toBeDefined();
  });

  it("falls back to a generic message when the rejection is not an Error", async () => {
    const onSubmit = vi.fn(() => Promise.reject("boom"));
    render(<OaBridge billId="EXP-001" billType="报销单" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("提交至 OA"));
    await waitFor(() => {
      expect(screen.getByText(/提交失败：提交失败/)).toBeDefined();
    });
  });

  it("allows retry after an error", async () => {
    let calls = 0;
    const onSubmit = vi.fn(() => {
      calls += 1;
      return calls === 1
        ? Promise.reject(new Error("首次失败"))
        : Promise.resolve();
    });
    render(<OaBridge billId="EXP-001" billType="报销单" onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("提交至 OA"));
    await waitFor(() => {
      expect(screen.getByText(/提交失败：首次失败/)).toBeDefined();
    });
    // button reverts to the idle label and is enabled
    fireEvent.click(screen.getByText("提交至 OA"));
    await waitFor(() => {
      expect(screen.getByText("已提交")).toBeDefined();
    });
  });

  it("applies a custom className", () => {
    const { container } = render(
      <OaBridge billId="EXP-001" billType="报销单" className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: OaBridgeProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
