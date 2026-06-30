import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InvoiceManager } from "./invoice-manager";
import type { InvoiceManagerProps } from "./invoice-manager";

describe("InvoiceManager", () => {
  it("renders invoice numbers and total summary", () => {
    render(
      <InvoiceManager
        invoices={[
          { id: "i1", number: "INV-001", amount: 1200, status: "pending" },
          { id: "i2", number: "INV-002", amount: 800, status: "issued" },
        ]}
      />,
    );
    expect(screen.getByText("INV-001")).toBeDefined();
    expect(screen.getByText("INV-002")).toBeDefined();
    expect(screen.getByText(/共 2 张/)).toBeDefined();
    expect(screen.getByRole("region", { name: "发票管理" })).toBeDefined();
  });

  it("shows empty state when no invoices", () => {
    render(<InvoiceManager invoices={[]} />);
    expect(screen.getByText("暂无发票")).toBeDefined();
  });

  it("invokes onIssue when issuing a pending invoice", () => {
    const onIssue = vi.fn(() => Promise.resolve());
    render(
      <InvoiceManager
        invoices={[{ id: "i1", number: "INV-001", amount: 1200, status: "pending" }]}
        onIssue={onIssue}
      />,
    );
    fireEvent.click(screen.getByLabelText("开具发票 INV-001"));
    expect(onIssue).toHaveBeenCalledWith("i1");
  });

  it("shows the loading label while issuing then resets after resolve", async () => {
    let resolveIssue: () => void = () => {};
    const onIssue = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveIssue = resolve;
        }),
    );
    render(
      <InvoiceManager
        invoices={[{ id: "i1", number: "INV-001", amount: 1200, status: "pending" }]}
        onIssue={onIssue}
      />,
    );
    fireEvent.click(screen.getByLabelText("开具发票 INV-001"));
    // mid-flight: button disabled with "开具中"
    const issuingButton = screen.getByLabelText("开具发票 INV-001");
    expect(issuingButton).toBeDisabled();
    expect(screen.getByText("开具中")).toBeDefined();
    resolveIssue();
    await waitFor(() => {
      expect(screen.getByText("开具")).toBeDefined();
    });
  });

  it("renders an issue button for draft invoices", () => {
    render(
      <InvoiceManager
        invoices={[{ id: "i3", number: "INV-003", amount: 500, status: "draft" }]}
      />,
    );
    expect(screen.getByLabelText("开具发票 INV-003")).toBeDefined();
    expect(screen.getByText("草稿")).toBeDefined();
  });

  it("does not render issue button for issued or void invoices", () => {
    render(
      <InvoiceManager
        invoices={[
          { id: "i2", number: "INV-002", amount: 800, status: "issued" },
          { id: "i4", number: "INV-004", amount: 100, status: "void" },
        ]}
      />,
    );
    expect(screen.queryByLabelText("开具发票 INV-002")).toBeNull();
    expect(screen.queryByLabelText("开具发票 INV-004")).toBeNull();
    expect(screen.getByText("已开具")).toBeDefined();
    expect(screen.getByText("已作废")).toBeDefined();
  });

  it("falls back to the raw status label for unknown statuses", () => {
    render(
      <InvoiceManager
        invoices={[{ id: "i5", number: "INV-005", amount: 300, status: "archived" }]}
      />,
    );
    expect(screen.getByText("archived")).toBeDefined();
  });

  it("renders invoices inside a list", () => {
    render(
      <InvoiceManager
        invoices={[{ id: "i1", number: "INV-001", amount: 1200, status: "pending" }]}
      />,
    );
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <InvoiceManager invoices={[]} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: InvoiceManagerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
