import type { Meta, StoryObj } from "@storybook/react";
import { MobileGeolocation } from "@/components/business/mobile-geolocation";

const meta = {
  title: "Business/Mobile/MobileGeolocation",
  component: MobileGeolocation,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileGeolocation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLocateHandler: Story = {
  args: {
    onLocate: (coords) => {
      void coords;
    },
  },
};
