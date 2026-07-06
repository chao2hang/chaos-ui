import type { Meta, StoryObj } from "@storybook/react";
import { MediaRecorder } from "@/components/business/media-recorder";

const meta = {
  title: "Business/Dialogs/MediaRecorder",
  component: MediaRecorder,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MediaRecorder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ScreenRecording: Story = {
  args: { screen: true },
};

export const CustomMimeType: Story = {
  args: { mimeType: "audio/webm" },
};

export const MaxDuration: Story = {
  args: { maxDuration: 30 },
};

export const WithCallbacks: Story = {
  args: {
    onStart: () => {},
    onStop: (blob) => { void blob; },
  },
};
