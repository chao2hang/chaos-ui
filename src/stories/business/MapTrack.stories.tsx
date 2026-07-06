import type { Meta, StoryObj } from "@storybook/react";
import { MapTrack } from "@/components/business/map-track";

const points = [
  { lng: 116.38, lat: 39.90, time: "09:00" },
  { lng: 116.39, lat: 39.91, time: "09:15" },
  { lng: 116.40, lat: 39.92, time: "09:30" },
  { lng: 116.41, lat: 39.93, time: "09:45" },
];

const meta = { title: "Business/Map/MapTrack", component: MapTrack, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof MapTrack>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { points } };
export const Playing: Story = { args: { points, playing: true, speed: 5, color: "#16a34a" } };
export const SinglePoint: Story = { args: { points: points.slice(0, 1) } };
export const WithCallbacks: Story = { args: { points, onStart: () => {}, onEnd: () => {} } };
