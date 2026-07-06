import type { Meta, StoryObj } from "@storybook/react";
import { MapView } from "@/components/business/map-view";

const meta = { title: "Business/Map/MapView", component: MapView, tags: ["autodocs"], parameters: { layout: "fullscreen" } } satisfies Meta<typeof MapView>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CustomCenter: Story = { args: { center: [121.473701, 31.230416], zoom: 14, height: 500 } };
export const WithCallbacks: Story = { args: { onReady: (map) => { void map; }, onClick: (lnglat) => { void lnglat; } } };
