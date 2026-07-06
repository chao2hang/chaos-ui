import type { Meta, StoryObj } from "@storybook/react";
import { MapChart } from "@/components/business/map-chart";

const meta = {
  title: "Business/Charts/MapChart",
  component: MapChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Regional sales overview for East China. */
export const EastChinaSales: Story = {
  args: {
    region: "华东地区",
    data: [
      { name: "上海", value: 8200 },
      { name: "杭州", value: 5400 },
      { name: "南京", value: 3900 },
      { name: "苏州", value: 3200 },
      { name: "宁波", value: 2100 },
    ],
  },
};

/** National store distribution map. */
export const NationalStores: Story = {
  args: {
    region: "全国门店分布",
    data: [
      { name: "广东", value: 45 },
      { name: "江苏", value: 38 },
      { name: "浙江", value: 32 },
      { name: "北京", value: 28 },
      { name: "上海", value: 26 },
      { name: "四川", value: 18 },
      { name: "湖北", value: 15 },
      { name: "山东", value: 14 },
    ],
  },
};

/** Small region with a few markers. */
export const CompactRegion: Story = {
  args: {
    region: "深圳片区",
    data: [
      { name: "南山", value: 120 },
      { name: "福田", value: 95 },
      { name: "宝安", value: 60 },
    ],
  },
};
