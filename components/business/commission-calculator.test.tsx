import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CommissionCalculator } from "./commission-calculator";
import type { CommissionTier, CommissionDeal } from "./commission-calculator";

vi.mock("@/components/ui/icons", () => ({
  PlusIcon: (p: Record<string, unknown>) => <svg data-testid="plus" {...p} />,
  Trash2Icon: (p: Record<string, unknown>) => <svg data-testid="trash" {...p} />,
}));

const tiers: CommissionTier[] = [
  { from: 0, to: 100000, rate: 3 },
  { from: 100000, to: 500000, rate: 5 },
  { from: 500000, to: Infinity, rate: 8 },
];

const deals: CommissionDeal[] = [
  { id: "d1", rep: "Alice", dealNo: "DEAL-001", customer: "Acme Corp", amount: 80000, date: "2026-06-01" },
  { id: "d2", rep: "Alice", dealNo: "DEAL-002", customer: "Globex", amount: 200000, date: "2026-06-15" },
  { id: "d3", rep: "Bob", dealNo: "DEAL-003", customer: "Initech", amount: 600000, date: "2026-06-20", overridePct: 10 },
];

describe("CommissionCalculator", () => {
  it("renders with data-slot", () => {
    const { container } = render(<CommissionCalculator tiers={tiers} deals={deals} />);
    expect(container.querySelector('[data-slot="commission-calculator"]')).toBeTruthy();
  });

  it("renders title", () => {
    render(<CommissionCalculator tiers={tiers} deals={deals} />);
    expect(screen.getByText("Commission Calculator")).toBeTruthy();
  });

  it("renders tier badges", () => {
    render(<CommissionCalculator tiers={tiers} deals={deals} currencySymbol="¥" />);
    expect(screen.getByText(/¥0–¥100,000/)).toBeTruthy();
    expect(screen.getByText(/¥100,000–¥500,000/)).toBeTruthy();
    expect(screen.getByText(/¥500,000\+/)).toBeTruthy();
  });

  it("renders all deal rows", () => {
    render(<CommissionCalculator tiers={tiers} deals={deals} />);
    expect(screen.getByText("DEAL-001")).toBeTruthy();
    expect(screen.getByText("DEAL-002")).toBeTruthy();
    expect(screen.getByText("DEAL-003")).toBeTruthy();
  });

  it("renders rep names", () => {
    render(<CommissionCalculator tiers={tiers} deals={deals} />);
    expect(screen.getAllByText("Alice").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Bob").length).toBeGreaterThan(0);
  });

  it("renders total sales", () => {
    render(<CommissionCalculator tiers={tiers} deals={deals} />);
    // 80000 + 200000 + 600000 = 880000
    expect(screen.getByText(/¥880,000\.00/)).toBeTruthy();
  });

  it("calculates commission for tier 1 deal", () => {
    render(<CommissionCalculator tiers={tiers} deals={[deals[0]!]} />);
    // 80000 * 3% = 2400
    expect(screen.getByText(/¥2,400\.00/)).toBeTruthy();
  });

  it("calculates commission across tiers", () => {
    render(<CommissionCalculator tiers={tiers} deals={[deals[1]!]} />);
    // 200000: first 100000 @ 3% = 3000, next 100000 @ 5% = 5000, total = 8000
    expect(screen.getByText(/¥8,000\.00/)).toBeTruthy();
  });

  it("calculates commission with override", () => {
    render(<CommissionCalculator tiers={tiers} deals={[deals[2]!]} />);
    // 600000: 100000*3% + 400000*5% + 100000*8% = 3000 + 20000 + 8000 = 31000
    // Override 10%: 31000 * 0.9 = 27900
    expect(screen.getByText(/¥27,900\.00/)).toBeTruthy();
  });

  it("renders rep summary cards", () => {
    const { container } = render(<CommissionCalculator tiers={tiers} deals={deals} />);
    const cards = container.querySelectorAll('[data-slot="rep-card"]');
    expect(cards.length).toBe(2);
  });

  it("shows quota badge when met", () => {
    render(<CommissionCalculator tiers={tiers} deals={deals} quota={500000} quotaBonusRate={1} />);
    // Alice total = 280000 < 500000, no quota met
    // Bob total = 600000 >= 500000, quota met
    expect(screen.getByText("Quota Met")).toBeTruthy();
  });

  it("renders quota badge in tier display", () => {
    render(<CommissionCalculator tiers={tiers} deals={deals} quota={500000} quotaBonusRate={1} />);
    expect(screen.getByText(/Quota:/)).toBeTruthy();
  });

  it("shows empty state when no deals", () => {
    render(<CommissionCalculator tiers={tiers} deals={[]} />);
    expect(screen.getByText("No deals")).toBeTruthy();
  });

  it("calls onDealsChange when adding deal", () => {
    const onChange = vi.fn();
    render(<CommissionCalculator tiers={tiers} deals={deals} onDealsChange={onChange} />);
    fireEvent.click(screen.getByText("Add Deal"));
    expect(onChange.mock.calls[0]![0]!!.length).toBe(4);
  });

  it("calls onDealsChange when removing deal", () => {
    const onChange = vi.fn();
    render(<CommissionCalculator tiers={tiers} deals={deals} onDealsChange={onChange} />);
    fireEvent.click(screen.getAllByLabelText("Remove deal")[0]!);
    expect(onChange.mock.calls[0]![0]!!.length).toBe(2);
  });

  it("applies custom className", () => {
    const { container } = render(<CommissionCalculator tiers={tiers} deals={deals} className="my-cc" />);
    const el = container.querySelector('[data-slot="commission-calculator"]') as HTMLElement;
    expect(el.className).toContain("my-cc");
  });
});
