import type { Meta, StoryObj } from "@storybook/react";
import { MapMarkerCluster } from "@/components/business/map-marker";

const markers = [
  { id: "1", lng: 116.397428, lat: 39.90923, label: "Beijing" },
  { id: "2", lng: 121.473701, lat: 31.230416, label: "Shanghai" },
  { id: "3", lng: 113.264385, lat: 23.129112, label: "Guangzhou" },
];

const meta = { title: "Business/Map/MapMarkerCluster", component: MapMarkerCluster, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof MapMarkerCluster>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { markers } };
export const NoCluster: Story = { args: { markers, cluster: false } };
export const Single: Story = { args: { markers: markers.slice(0, 1) } };
