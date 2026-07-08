import type { Meta, StoryObj } from "@storybook/react";
import { ErrorLayout } from "@/components/layout/error-layout";

const meta: Meta<typeof ErrorLayout> = {
  title: "Layouts/ErrorLayout",
  component: ErrorLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
