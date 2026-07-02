import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SPCControlChart } from "./spc-control-chart";
import type { SPCSample } from "./spc-control-chart";

// Generate in-control data: values around 50 ± 1
function genSamples(seed: number, count: number): SPCSample[] {
  const samples: SPCSample[] = [];
  for (let i = 0; i < count; i++) {
    const v = 50 + Math.sin(i * seed) * 1.5 + (i % 3) * 0.3;
    samples.push({ label: `S${i + 1}`, value: parseFloat(v.toFixed(2)) });
  }
  return samples;
}

const inControl = genSamples(1, 25);

const outOfControl: SPCSample[] = [
  ...genSamples(1, 10),
  { label: "S11", value: 60 }, // way beyond 3σ (if σ ~ 1)
  ...genSamples(1, 10).slice(0, 10).map((s, i) => ({ label: `S${12 + i}`, value: s.value })),
];

describe("SPCControlChart", () => {
  it("renders with data-slot", () => {
    const { container } = render(<SPCControlChart samples={inControl} />);
    expect(container.querySelector('[data-slot="spc-control-chart"]')).toBeTruthy();
  });

  it("renders chart title", () => {
    render(<SPCControlChart samples={inControl} title="Temperature Control" />);
    expect(screen.getByText("Temperature Control")).toBeTruthy();
  });

  it("renders default title", () => {
    render(<SPCControlChart samples={inControl} />);
    expect(screen.getByText("SPC Control Chart")).toBeTruthy();
  });

  it("renders CL badge", () => {
    render(<SPCControlChart samples={inControl} unit="mm" />);
    expect(screen.getByText(/CL:/)).toBeTruthy();
  });

  it("renders sigma badge", () => {
    render(<SPCControlChart samples={inControl} />);
    expect(screen.getByText(/σ:/)).toBeTruthy();
  });

  it("renders Cpk badge", () => {
    render(<SPCControlChart samples={inControl} />);
    expect(screen.getByText(/Cpk:/)).toBeTruthy();
  });

  it("renders SVG chart", () => {
    const { container } = render(<SPCControlChart samples={inControl} />);
    const svg = container.querySelector('[data-slot="spc-chart-svg"]');
    expect(svg).toBeTruthy();
  });

  it("renders summary stats", () => {
    render(<SPCControlChart samples={inControl} unit="mm" />);
    expect(screen.getByText(/n = 25/)).toBeTruthy();
    expect(screen.getByText(/Min =/)).toBeTruthy();
    expect(screen.getByText(/Max =/)).toBeTruthy();
    expect(screen.getByText(/Range =/)).toBeTruthy();
  });

  it("shows in-control badge when no violations", () => {
    render(<SPCControlChart samples={inControl} centerLine={50} sigma={1} />);
    expect(screen.getByText("Process in control")).toBeTruthy();
  });

  it("detects out-of-control violations", () => {
    render(<SPCControlChart samples={outOfControl} centerLine={50} sigma={1} />);
    expect(screen.getByText(/Out of control/)).toBeTruthy();
  });

  it("shows violation count badge", () => {
    const { container } = render(<SPCControlChart samples={outOfControl} centerLine={50} sigma={1} />);
    const badge = container.querySelector('[data-slot="violation-badge"]');
    expect(badge).toBeTruthy();
  });

  it("accepts custom UCL/LCL", () => {
    render(<SPCControlChart samples={inControl} centerLine={50} sigma={2} ucl={56} lcl={44} />);
    expect(screen.getByText(/UCL: 56\.00/)).toBeTruthy();
    expect(screen.getByText(/LCL: 44\.00/)).toBeTruthy();
  });

  it("accepts unit suffix", () => {
    render(<SPCControlChart samples={inControl} unit="mm" centerLine={50} sigma={1} />);
    expect(screen.getByText(/CL: 50\.00mm/)).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(<SPCControlChart samples={inControl} className="my-spc" />);
    const el = container.querySelector('[data-slot="spc-control-chart"]') as HTMLElement;
    expect(el.className).toContain("my-spc");
  });

  it("handles empty samples gracefully", () => {
    const { container } = render(<SPCControlChart samples={[]} />);
    expect(container.querySelector('[data-slot="spc-control-chart"]')).toBeTruthy();
  });

  it("handles single sample", () => {
    render(<SPCControlChart samples={[{ label: "S1", value: 50 }]} />);
    expect(screen.getByText(/n = 1/)).toBeTruthy();
  });
});
