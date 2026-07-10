import type { Meta, StoryObj } from "@storybook/react";
import { ChartSuite } from "@/components/business/chart-suite";

const meta = {
  title: "Business/Charts/ChartSuite",
  component: ChartSuite,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChartSuite>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const simpleData = [
  { x: "Q1", y: 120 },
  { x: "Q2", y: 180 },
  { x: "Q3", y: 150 },
  { x: "Q4", y: 210 },
  { x: "Q5", y: 195 },
];

const seriesData = [
  { x: "Q1", y: 120, group: "营收" },
  { x: "Q2", y: 180, group: "营收" },
  { x: "Q3", y: 150, group: "营收" },
  { x: "Q4", y: 210, group: "营收" },
  { x: "Q1", y: 80, group: "支出" },
  { x: "Q2", y: 110, group: "支出" },
  { x: "Q3", y: 95, group: "支出" },
  { x: "Q4", y: 130, group: "支出" },
];

const scatterData = Array.from({ length: 15 }, (_, i) => ({
  x: i * 6,
  y: Math.round(2 * i * 6 + 10 + (i % 4) * 5),
}));

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Line chart via the dispatcher. */
export const Line: Story = {
  args: {
    type: "line",
    data: simpleData,
    height: 200,
  },
};

/** Bar chart via the dispatcher. */
export const Bar: Story = {
  args: {
    type: "bar",
    data: simpleData,
    height: 200,
  },
};

/** Pie chart via the dispatcher. */
export const Pie: Story = {
  args: {
    type: "pie",
    data: [
      { x: "线上", y: 58 },
      { x: "线下", y: 32 },
      { x: "其他", y: 10 },
    ],
  },
};

/** Radar chart via the dispatcher. */
export const Radar: Story = {
  args: {
    type: "radar",
    data: [
      { x: "速度", y: 80 },
      { x: "质量", y: 70 },
      { x: "成本", y: 60 },
      { x: "服务", y: 75 },
      { x: "创新", y: 50 },
    ],
  },
};

/** Scatter chart via the dispatcher. */
export const Scatter: Story = {
  args: {
    type: "scatter",
    data: scatterData,
    height: 240,
  },
};

/** Multi-series line using the `series` field to group rows. */
export const MultiSeriesLine: Story = {
  args: {
    type: "line",
    data: seriesData,
    series: "group",
    height: 220,
  },
};

/** Area chart (single series) via the dispatcher. */
export const Area: Story = {
  args: {
    type: "area",
    data: simpleData,
    height: 200,
  },
};

/** Multi-series area chart with gradient fill — renders all grouped series
 * as overlapping translucent areas, each with its own SVG gradient. */
export const MultiSeriesArea: Story = {
  name: "Area — Multi-Series Gradient",
  args: {
    type: "area",
    data: seriesData,
    series: "group",
    height: 220,
  },
};

/** Empty data renders the placeholder. */
export const Empty: Story = {
  args: {
    type: "bar",
    data: [],
  },
};
