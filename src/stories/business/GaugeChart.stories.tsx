import type { Meta, StoryObj } from "@storybook/react";
import { GaugeChart } from "@/components/business/gauge-chart";

const meta = {
  title: "Business/Charts/GaugeChart",
  component: GaugeChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof GaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default gauge at 64/100. */
export const Default: Story = {};

/** Healthy CPU utilization — green arc. */
export const CpuHealthy: Story = {
  args: {
    value: 42,
    min: 0,
    max: 100,
    label: "CPU %",
    color: "var(--success)",
  },
};

/** Warning-level memory pressure — yellow arc. */
export const MemoryWarning: Story = {
  args: {
    value: 78,
    min: 0,
    max: 100,
    label: "内存 %",
    color: "var(--warning)",
  },
};

/** Critical disk usage — red arc. */
export const DiskCritical: Story = {
  args: {
    value: 94,
    min: 0,
    max: 100,
    label: "磁盘 %",
    color: "var(--destructive)",
  },
};

/** Custom range (temperature in Celsius). */
export const TemperatureRange: Story = {
  args: {
    value: 22,
    min: -20,
    max: 50,
    label: "温度 °C",
    color: "var(--info)",
  },
};
