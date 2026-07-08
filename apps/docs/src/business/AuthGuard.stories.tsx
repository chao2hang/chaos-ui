import type { Meta, StoryObj } from "@storybook/react";
import { AuthGuard } from "@/components/business/auth-guard";

const meta: Meta<typeof AuthGuard> = {
  title: "Business/AuthGuard",
  component: AuthGuard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
