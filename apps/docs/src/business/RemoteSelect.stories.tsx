import type { Meta, StoryObj } from "@storybook/react";
import { RemoteSelect } from "@/components/business/remote-select";

const meta = {
  title: "Business/RemoteSelect",
  component: RemoteSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof RemoteSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
