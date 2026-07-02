import type { Meta, StoryObj } from "@storybook/react";
import { SPCControlChart } from "@/components/business/spc-control-chart";
import type { SPCSample } from "@/components/business/spc-control-chart";

const meta = {
  title: "Business/SPCControlChart",
  component: SPCControlChart,
  tags: ["autodocs"],
} satisfies Meta<typeof SPCControlChart>;
export default meta;
type Story = StoryObj<typeof meta>;

function gen(count: number, base: number, noise: number, seed: number): SPCSample[] {
  const arr: SPCSample[] = [];
  for (let i = 0; i < count; i++) {
    const v = base + Math.sin(i * seed) * noise + (i % 5) * 0.1;
    arr.push({ label: `#${i + 1}`, value: parseFloat(v.toFixed(2)) });
  }
  return arr;
}

export const InControl: Story = {
  args: {
    title: "Bore Diameter — CNC Station 3",
    samples: gen(30, 25.0, 0.15, 0.7),
    unit: "mm",
    yLabel: "Diameter (mm)",
    centerLine: 25.0,
    sigma: 0.15,
    ucl: 25.45,
    lcl: 24.55,
  },
};

export const OutOfControl: Story = {
  args: {
    title: "Temperature — Reactor A",
    samples: [
      ...gen(8, 180, 2, 0.5),
      { label: "#9", value: 195 },
      { label: "#10", value: 197 },
      { label: "#11", value: 193 },
      ...gen(8, 182, 2, 0.6),
      { label: "#20", value: 168 },
      ...gen(5, 181, 2, 0.8),
    ],
    unit: "°C",
    yLabel: "Temperature (°C)",
    centerLine: 180,
    sigma: 3,
    ucl: 189,
    lcl: 171,
  },
};

export const TightProcess: Story = {
  args: {
    title: "Resistivity — Wafer Test",
    samples: gen(25, 1.25, 0.005, 0.3),
    unit: "Ω",
    yLabel: "Resistivity (Ω·cm)",
  },
};

export const FewSamples: Story = {
  args: {
    title: "Quick Check — 5 Samples",
    samples: [
      { label: "A", value: 10.1 },
      { label: "B", value: 10.3 },
      { label: "C", value: 9.9 },
      { label: "D", value: 10.0 },
      { label: "E", value: 10.2 },
    ],
    unit: "mm",
  },
};
