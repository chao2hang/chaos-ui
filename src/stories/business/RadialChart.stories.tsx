import type { Meta, StoryObj } from "@storybook/react";
import { RadialChart } from "@/components/business/radial-chart";

const meta = {
  title: "Business/Charts/RadialChart",
  component: RadialChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof RadialChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default radial chart at 66/100 achievement. */
export const Default: Story = {};

/** Task completion progress with brand color. */
export const TaskProgress: Story = {
  args: {
    value: 82,
    max: 100,
    label: "任务完成率",
    color: "var(--brand-500)",
    size: 140,
  },
};

/** Small radial suitable for inline KPI cards. */
export const CompactKPI: Story = {
  args: {
    value: 45,
    max: 100,
    label: "转化",
    color: "var(--info)",
    size: 88,
  },
};

/** Large hero radial with a warning-level value. */
export const HeroWarning: Story = {
  args: {
    value: 92,
    max: 100,
    label: "SLA",
    color: "var(--warning)",
    size: 200,
  },
};

/** Custom max — quota out of 200. */
export const CustomMax: Story = {
  args: {
    value: 145,
    max: 200,
    label: "配额使用",
    color: "var(--chart-2)",
    size: 130,
  },
};
