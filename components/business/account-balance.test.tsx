import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AccountBalance } from "./account-balance";
import type { AccountBalanceProps } from "./account-balance";

describe("AccountBalance", () => {
  it("renders the label and formatted currency", () => {
    render(<AccountBalance balance={1234.5} />);
    expect(screen.getByText("账户余额")).toBeDefined();
    expect(screen.getByText("¥1,234.50")).toBeDefined();
  });

  it("renders the trend with an up arrow when positive", () => {
    render(<AccountBalance balance={100} trend={5} />);
    expect(screen.getByLabelText("趋势 5%")).toBeDefined();
    expect(screen.getByText("5%")).toBeDefined();
  });

  it("renders the trend with a down arrow when negative", () => {
    render(<AccountBalance balance={100} trend={-3} />);
    expect(screen.getByLabelText("趋势 -3%")).toBeDefined();
    expect(screen.getByText("3%")).toBeDefined();
  });

  it("omits the trend when not provided", () => {
    render(<AccountBalance balance={100} />);
    expect(screen.queryByText("0%")).toBeNull();
  });

  it("respects a custom currency", () => {
    render(<AccountBalance balance={1000} currency="USD" />);
    // USD formatting in zh-CN locale renders as US$1,000.00
    expect(screen.getByText("US$1,000.00")).toBeDefined();
  });

  it("exports types", () => {
    const _tc: AccountBalanceProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
