import type { Meta, StoryObj } from "@storybook/react";
import { RadarChart } from "@/components/business/radar-chart";

const meta = {
  title: "Business/Charts/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const capabilityAxes = ["速度", "质量", "成本", "服务", "创新"];

const singleSeries = [
  { name: "本期", values: [80, 70, 60, 75, 50], color: "var(--chart-1)" },
];

const comparisonSeries = [
  { name: "本期", values: [80, 70, 60, 75, 50], color: "var(--chart-1)" },
  {
    name: "上期",
    values: [65, 60, 55, 70, 45],
    color: "var(--muted-foreground)",
  },
];

const skillsAxes = ["前端", "后端", "架构", "沟通", "领导力", "测试", "运维"];
const teamSkills = [
  {
    name: "候选人 A",
    values: [85, 60, 70, 75, 55, 65, 50],
    color: "var(--brand-500)",
  },
  {
    name: "候选人 B",
    values: [50, 90, 85, 60, 70, 80, 65],
    color: "var(--brand-700)",
  },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default 5-axis radar with the component's built-in data. */
export const Default: Story = {};

/** Single series capability profile. */
export const CapabilityProfile: Story = {
  args: {
    axes: capabilityAxes,
    series: singleSeries,
  },
};

/** Two overlapping series comparing current vs previous period. */
export const PeriodComparison: Story = {
  args: {
    axes: capabilityAxes,
    series: comparisonSeries,
  },
};

/** Seven-axis skills assessment for two candidates. */
export const SkillsAssessment: Story = {
  args: {
    axes: skillsAxes,
    series: teamSkills,
    max: 100,
  },
};
