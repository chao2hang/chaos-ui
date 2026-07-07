import type { Meta, StoryObj } from "@storybook/react";
import { MobileTabs } from "@/components/business/mobile-tabs";

const meta = {
  title: "Business/MobileTabs",
  component: MobileTabs,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
