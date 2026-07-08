import type { Meta, StoryObj } from "@storybook/react";
import { MapView } from "@/components/business/map-view";

const markers = [
  {
    id: "1",
    position: [39.9042, 116.4074] as [number, number],
    title: "北京",
    description: "首都",
  },
  {
    id: "2",
    position: [31.2304, 121.4737] as [number, number],
    title: "上海",
    description: "魔都",
  },
  {
    id: "3",
    position: [23.1291, 113.2644] as [number, number],
    title: "广州",
    description: "花城",
  },
];

const meta: Meta<typeof MapView> = {
  title: "Business/MapView",
  component: MapView,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    center: [35.8617, 104.1954],
    zoom: 4,
    markers,
  },
};

export const ZoomedIn: Story = {
  args: {
    center: [39.9042, 116.4074],
    zoom: 13,
    markers: [markers[0]],
    height: 500,
  },
};

export const Dark: Story = {
  args: {
    center: [35.8617, 104.1954],
    zoom: 4,
    markers,
  },
  parameters: { backgrounds: { default: "dark" } },
};
