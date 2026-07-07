import type { Meta, StoryObj } from "@storybook/react";
import { MobileButton } from "@/components/business/mobile-button";

const meta = {
  title: "Business/MobileButton",
  component: MobileButton,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
