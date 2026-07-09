import type { Meta, StoryObj } from "@storybook/react";
import { MobileTabs } from "@/components/mobile/mobile-tabs";

const meta: Meta<typeof MobileTabs> = {
  title: "Business/MobileTabs",
  component: MobileTabs,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
