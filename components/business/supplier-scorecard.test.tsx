import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SupplierScorecard } from "./supplier-scorecard";
import type { Supplier } from "./supplier-scorecard";

vi.mock("@/components/ui/icons", () => ({
  StarIcon: (p: Record<string, unknown>) => <svg data-testid="star" {...p} />,
}));

const supplier: Supplier = {
  id: "1",
  name: "Acme Manufacturing Co.",
  code: "SUP-001",
  category: "Electronics",
  period: "2026 Q2",
  previousScore: 82,
  criteria: [
    { id: "quality", name: "Quality", score: 92, weight: 30, trend: "up" },
    {
      id: "delivery",
      name: "On-Time Delivery",
      score: 85,
      weight: 25,
      trend: "stable",
    },
    {
      id: "price",
      name: "Price Competitiveness",
      score: 78,
      weight: 20,
      trend: "down",
      comment: "Recent price increase of 5%",
    },
    {
      id: "service",
      name: "Service & Support",
      score: 88,
      weight: 15,
      trend: "up",
    },
    {
      id: "compliance",
      name: "Compliance",
      score: 95,
      weight: 10,
      trend: "stable",
    },
  ],
};

describe("SupplierScorecard", () => {
  it("renders with data-slot", () => {
    const { container } = render(<SupplierScorecard supplier={supplier} />);
    expect(
      container.querySelector('[data-slot="supplier-scorecard"]'),
    ).toBeTruthy();
  });

  it("renders supplier name and code", () => {
    render(<SupplierScorecard supplier={supplier} />);
    expect(screen.getByText("Acme Manufacturing Co.")).toBeTruthy();
    expect(screen.getByText(/SUP-001/)).toBeTruthy();
  });

  it("renders all criterion names", () => {
    render(<SupplierScorecard supplier={supplier} />);
    expect(screen.getByText("Quality")).toBeTruthy();
    expect(screen.getByText("On-Time Delivery")).toBeTruthy();
    expect(screen.getByText("Price Competitiveness")).toBeTruthy();
    expect(screen.getByText("Service & Support")).toBeTruthy();
    expect(screen.getByText("Compliance")).toBeTruthy();
  });

  it("shows weighted total score", () => {
    const { container } = render(<SupplierScorecard supplier={supplier} />);
    const overallScore = container.querySelector(
      '[data-slot="supplier-overall-score"]',
    );
    expect(overallScore).toBeTruthy();
    // Weighted: 92*0.3 + 85*0.25 + 78*0.2 + 88*0.15 + 95*0.1 = 87.15,
    // which the scorecard rounds to one decimal -> "87.1".
    expect(overallScore?.textContent).toContain("87.1");
  });

  it("shows weighted total in footer", () => {
    render(<SupplierScorecard supplier={supplier} />);
    expect(screen.getByText("Weighted Total Score")).toBeTruthy();
  });

  it("shows previous score comparison", () => {
    render(<SupplierScorecard supplier={supplier} />);
    // 87.6 - 82 = 5.6 increase
    expect(screen.getByText(/vs prev/)).toBeTruthy();
  });

  it("renders criterion comment when provided", () => {
    render(<SupplierScorecard supplier={supplier} />);
    expect(screen.getByText("Recent price increase of 5%")).toBeTruthy();
  });

  it("shows rating tier badge", () => {
    render(<SupplierScorecard supplier={supplier} />);
    // Score ~87.6 → tier B
    expect(screen.getByText(/Good/)).toBeTruthy();
  });

  it("renders criteria count", () => {
    const { container } = render(<SupplierScorecard supplier={supplier} />);
    const criteria = container.querySelectorAll(
      '[data-slot="supplier-criterion"]',
    );
    expect(criteria.length).toBe(5);
  });

  it("applies custom className", () => {
    const { container } = render(
      <SupplierScorecard supplier={supplier} className="custom-scorecard" />,
    );
    const el = container.querySelector(
      '[data-slot="supplier-scorecard"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-scorecard");
  });

  it("hides bars when showBars is false", () => {
    const { container } = render(
      <SupplierScorecard supplier={supplier} showBars={false} />,
    );
    // No progress bars should be rendered
    const bars = container.querySelectorAll(
      ".h-2.overflow-hidden.rounded-full",
    );
    expect(bars.length).toBe(0);
  });

  it("handles empty criteria", () => {
    const emptySupplier: Supplier = { id: "2", name: "Empty", criteria: [] };
    render(<SupplierScorecard supplier={emptySupplier} />);
    expect(screen.getByText("Empty")).toBeTruthy();
  });
});
