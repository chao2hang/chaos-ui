import type { Meta, StoryObj } from "@storybook/react";
import { MobileGeolocation } from "@/components/business/mobile-geolocation";

const meta = {
  title: "Business/MobileGeolocation",
  component: MobileGeolocation,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileGeolocation>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLocate: (coords: unknown) => {
      console.log(coords);
    },
  } as any,
};
