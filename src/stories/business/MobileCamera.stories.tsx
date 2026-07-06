import type { Meta, StoryObj } from "@storybook/react";
import { MobileCamera } from "@/components/business/mobile-camera";

const meta = {
  title: "Business/Mobile/MobileCamera",
  component: MobileCamera,
  tags: ["autodocs"],
  parameters: { layout: "pinned" },
} satisfies Meta<typeof MobileCamera>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Live camera capture. The component falls back to a "denied" or
 * "unsupported" state in environments without camera access (like Storybook's
 * iframe). All states are intentional demo surfaces.
 */
export const Default: Story = {};

export const WithCaptureHandler: Story = {
  args: {
    onCapture: (blob) => {
      void blob;
    },
  },
};
