import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "@/components/layout/app-shell";

const meta: Meta<typeof AppShell> = {
  title: "Layouts/AppShell",
  component: AppShell,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
