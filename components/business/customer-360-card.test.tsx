import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Customer360Card } from "./customer-360-card";
import type { CustomerMetric, CustomerContact, CustomerActivity } from "./customer-360-card";

const metrics: CustomerMetric[] = [
  { label: "Total Orders", value: 156, trend: "up", delta: "+12%" },
  { label: "Open Tickets", value: 3, trend: "down", delta: "-2" },
  { label: "Avg Order", value: "¥12,500", trend: "flat", delta: "0%" },
  { label: "Satisfaction", value: "4.8/5", trend: "up", delta: "+0.3" },
];

const contacts: CustomerContact[] = [
  { id: "c1", name: "John Smith", title: "CFO", phone: "+86-138-0000-0001", email: "john@acme.com", isPrimary: true },
  { id: "c2", name: "Jane Doe", title: "Procurement Manager", phone: "+86-138-0000-0002", email: "jane@acme.com" },
];

const activities: CustomerActivity[] = [
  { id: "a1", type: "order", title: "Order #ORD-2026-001", date: "2026-06-28", description: "¥128,000 order placed" },
  { id: "a2", type: "call", title: "Sales call", date: "2026-06-25", description: "Discussed Q3 expansion plans" },
  { id: "a3", type: "ticket", title: "Support ticket #TK-456", date: "2026-06-20", description: "Login issue resolved" },
];

describe("Customer360Card", () => {
  it("renders with data-slot", () => {
    const { container } = render(<Customer360Card name="Acme Corp" />);
    expect(container.querySelector('[data-slot="customer-360-card"]')).toBeTruthy();
  });

  it("renders customer name", () => {
    render(<Customer360Card name="Acme Corp" />);
    expect(screen.getByText("Acme Corp")).toBeTruthy();
  });

  it("renders industry text", () => {
    render(<Customer360Card name="Acme Corp" industry="Manufacturing" />);
    expect(screen.getByText("Manufacturing")).toBeTruthy();
  });

  it("renders tier badge", () => {
    render(<Customer360Card name="Acme Corp" tier="platinum" />);
    expect(screen.getByText("Platinum")).toBeTruthy();
  });

  it("renders health score", () => {
    render(<Customer360Card name="Acme Corp" healthScore={85} />);
    const healthEl = screen.getByText("85");
    expect(healthEl).toBeTruthy();
    expect(screen.getByText("Health")).toBeTruthy();
  });

  it("renders metrics", () => {
    render(<Customer360Card name="Acme Corp" metrics={metrics} />);
    expect(screen.getByText("Total Orders")).toBeTruthy();
    expect(screen.getByText("156")).toBeTruthy();
    expect(screen.getByText("Open Tickets")).toBeTruthy();
    expect(screen.getByText("Satisfaction")).toBeTruthy();
  });

  it("renders trend indicators", () => {
    render(<Customer360Card name="Acme Corp" metrics={metrics} />);
    expect(screen.getByText("+12%")).toBeTruthy();
    expect(screen.getByText("-2")).toBeTruthy();
  });

  it("renders contacts", () => {
    render(<Customer360Card name="Acme Corp" contacts={contacts} />);
    expect(screen.getByText("John Smith")).toBeTruthy();
    expect(screen.getByText("Jane Doe")).toBeTruthy();
    expect(screen.getByText("Primary")).toBeTruthy();
  });

  it("renders activities", () => {
    render(<Customer360Card name="Acme Corp" activities={activities} />);
    expect(screen.getByText("Order #ORD-2026-001")).toBeTruthy();
    expect(screen.getByText("Sales call")).toBeTruthy();
    expect(screen.getByText("Support ticket #TK-456")).toBeTruthy();
  });

  it("renders lifetime value", () => {
    render(<Customer360Card name="Acme Corp" lifetimeValue={1850000} currencySymbol="¥" />);
    expect(screen.getByText("Lifetime Value")).toBeTruthy();
    expect(screen.getByText(/¥1,850,000/)).toBeTruthy();
  });

  it("renders tags", () => {
    render(<Customer360Card name="Acme Corp" tags={["VIP", "Enterprise", "Strategic"]} />);
    expect(screen.getByText("VIP")).toBeTruthy();
    expect(screen.getByText("Enterprise")).toBeTruthy();
    expect(screen.getByText("Strategic")).toBeTruthy();
  });

  it("shows empty state when no data", () => {
    render(<Customer360Card name="New Customer" />);
    expect(screen.getByText(/No customer data available/)).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(<Customer360Card name="Acme" className="my-360" />);
    const el = container.querySelector('[data-slot="customer-360-card"]') as HTMLElement;
    expect(el.className).toContain("my-360");
  });
});
