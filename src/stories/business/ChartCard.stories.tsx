import type { Meta, StoryObj } from "@storybook/react";
import { ChartCard } from "@/components/business/chart-card";
import { SparkChart } from "@/components/business/spark-chart";
import { DonutChart } from "@/components/business/donut-chart";
import { BarChart } from "@/components/business/bar-chart";

const meta = {
  title: "Business/Charts/ChartCard",
  component: ChartCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Metric card wrapping a sparkline. */
export const WithSparkline: Story = {
  args: {
    title: "月度活跃用户",
    description: "过去 30 天",
    children: (
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold">128,540</span>
        <SparkChart
          data={[80, 85, 82, 90, 95, 92, 100, 105, 110, 128]}
          color="var(--success)"
          width={140}
          height={36}
        />
      </div>
    ),
    footer: <span className="text-muted-foreground text-xs">同比 +18.2%</span>,
  },
};

/** KPI card wrapping a donut chart. */
export const WithDonut: Story = {
  args: {
    title: "任务完成率",
    description: "本季度",
    children: (
      <DonutChart
        data={[
          { label: "已完成", value: 78, color: "var(--brand-500)" },
          { label: "进行中", value: 15, color: "var(--info)" },
          { label: "阻塞", value: 7, color: "var(--destructive)" },
        ]}
        centerLabel="78%"
        size={140}
        thickness={14}
      />
    ),
  },
};

/** Reporting card wrapping a bar chart. */
export const WithBarChart: Story = {
  args: {
    title: "季度营收",
    description: "2026 财年",
    children: (
      <BarChart
        data={[
          { label: "Q1", value: 320, color: "var(--chart-1)" },
          { label: "Q2", value: 450, color: "var(--chart-2)" },
          { label: "Q3", value: 380, color: "var(--chart-3)" },
          { label: "Q4", value: 520, color: "var(--chart-4)" },
        ]}
        height={180}
      />
    ),
    footer: (
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>单位：万元</span>
        <span>更新于 2026-07-06</span>
      </div>
    ),
  },
};

/** Bare card without description or footer. */
export const Minimal: Story = {
  args: {
    title: "简洁卡片",
    children: (
      <p className="text-muted-foreground text-sm">
        ChartCard 用作图表内容的语义化容器。
      </p>
    ),
  },
};
