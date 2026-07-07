import type { Meta, StoryObj } from "@storybook/react";
import { MobileAuthLayout } from "@/components/business/mobile-auth-layout";

const meta = {
  title: "Business/MobileAuthLayout",
  component: MobileAuthLayout,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileAuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
