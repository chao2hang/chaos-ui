import type { Meta, StoryObj } from "@storybook/react";
import { AuthGuard } from "@/components/business/auth-guard";

const meta = {
  title: "Business/AuthGuard",
  component: AuthGuard,
  tags: ["autodocs"],
} satisfies Meta<typeof AuthGuard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
