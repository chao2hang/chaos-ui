import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiCurrencyInput } from "./multi-currency-input";

vi.mock("@/components/ui/icons", () => ({
  ArrowRightIcon: (p: Record<string, unknown>) => <svg data-testid="arrow-right" {...p} />,
}));

const rates = {
  USD: 7.25,
  EUR: 7.85,
  GBP: 9.2,
  JPY: 0.045,
  HKD: 0.93,
};

describe("MultiCurrencyInput", () => {
  it("renders with data-slot", () => {
    const { container } = render(<MultiCurrencyInput value={100} currency="USD" rates={rates} />);
    expect(container.querySelector('[data-slot="multi-currency-input"]')).toBeTruthy();
  });

  it("shows conversion from USD to CNY", () => {
    render(<MultiCurrencyInput value={100} currency="USD" baseCurrency="CNY" rates={rates} />);
    const conversion = screen.getByTestId("arrow-right").parentElement;
    // 100 USD * 7.25 = 725 CNY
    expect(conversion?.textContent).toContain("725.00");
    expect(conversion?.textContent).toContain("CNY");
  });

  it("calls onChange when amount is changed", () => {
    const onChange = vi.fn();
    render(<MultiCurrencyInput value={100} currency="USD" rates={rates} onChange={onChange} />);
    const amountInput = screen.getByLabelText("Amount");
    fireEvent.change(amountInput, { target: { value: "200" } });
    expect(onChange).toHaveBeenCalledWith(200, 1450, "USD", 7.25);
  });

  it("calls onCurrencyChange when currency is changed", () => {
    const onCurrencyChange = vi.fn();
    const onChange = vi.fn();
    render(
      <MultiCurrencyInput
        value={100}
        currency="USD"
        rates={rates}
        onCurrencyChange={onCurrencyChange}
        onChange={onChange}
      />,
    );
    const select = screen.getByLabelText("Currency");
    fireEvent.change(select, { target: { value: "EUR" } });
    expect(onCurrencyChange).toHaveBeenCalledWith("EUR");
    // 100 EUR * 7.85 = 785
    expect(onChange).toHaveBeenCalledWith(100, 785, "EUR", 7.85);
  });

  it("shows exchange rate input when allowRateOverride is true", () => {
    render(<MultiCurrencyInput value={100} currency="USD" rates={rates} />);
    expect(screen.getByLabelText("Exchange rate")).toBeTruthy();
  });

  it("hides exchange rate input when allowRateOverride is false", () => {
    render(
      <MultiCurrencyInput value={100} currency="USD" rates={rates} allowRateOverride={false} />,
    );
    expect(screen.queryByLabelText("Exchange rate")).toBeNull();
  });

  it("calls onRateChange when rate is changed", () => {
    const onRateChange = vi.fn();
    const onChange = vi.fn();
    render(
      <MultiCurrencyInput
        value={100}
        currency="USD"
        rates={rates}
        onRateChange={onRateChange}
        onChange={onChange}
      />,
    );
    const rateInput = screen.getByLabelText("Exchange rate");
    fireEvent.change(rateInput, { target: { value: "7.5" } });
    expect(onRateChange).toHaveBeenCalledWith(7.5);
    // 100 * 7.5 = 750
    expect(onChange).toHaveBeenCalledWith(100, 750, "USD", 7.5);
  });

  it("shows same currency note when source equals base", () => {
    render(<MultiCurrencyInput value={100} currency="CNY" baseCurrency="CNY" />);
    expect(screen.getByText("Same currency")).toBeTruthy();
    expect(screen.getByText("No conversion needed")).toBeTruthy();
  });

  it("uses manual rate when provided", () => {
    render(
      <MultiCurrencyInput value={100} currency="USD" baseCurrency="CNY" rate={7.1} rates={rates} />,
    );
    const conversion = screen.getByTestId("arrow-right").parentElement;
    // 100 * 7.1 = 710
    expect(conversion?.textContent).toContain("710.00");
  });

  it("disables inputs in read-only mode", () => {
    render(<MultiCurrencyInput value={100} currency="USD" rates={rates} readOnly />);
    expect(screen.getByLabelText("Amount")).toBeDisabled();
    expect(screen.getByLabelText("Currency")).toBeDisabled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <MultiCurrencyInput value={100} currency="USD" rates={rates} className="custom-currency" />,
    );
    const el = container.querySelector('[data-slot="multi-currency-input"]') as HTMLElement;
    expect(el.className).toContain("custom-currency");
  });
});
