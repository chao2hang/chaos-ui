import type { Meta, StoryObj } from "@storybook/react";
import { MobileInput } from "@/components/business/mobile-input";

const meta = {
  title: "Business/MobileInput",
  component: MobileInput,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
