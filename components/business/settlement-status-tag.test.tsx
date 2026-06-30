import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SettlementStatusTag } from "./settlement-status-tag";

describe("SettlementStatusTag", () => {
  it("renders the unsettled status label", () => {
    render(<SettlementStatusTag status="unsettled" />);
    expect(screen.getByText("未结算")).toBeDefined();
    expect(screen.getByRole("status")).toBeDefined();
  });

  it("renders the partial status label", () => {
    render(<SettlementStatusTag status="partial" />);
    expect(screen.getByText("部分结算")).toBeDefined();
  });

  it("renders the settled status label", () => {
    render(<SettlementStatusTag status="settled" />);
    expect(screen.getByText("已结算")).toBeDefined();
  });

  it("renders the overdue status label", () => {
    render(<SettlementStatusTag status="overdue" />);
    expect(screen.getByText("逾期")).toBeDefined();
  });

  it("applies the data-slot attribute", () => {
    const { container } = render(<SettlementStatusTag status="settled" />);
    expect(container.querySelector('[data-slot="settlement-status-tag"]')).toBeDefined();
  });
});
