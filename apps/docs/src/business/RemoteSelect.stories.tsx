import type { Meta, StoryObj } from "@storybook/react";
import { RemoteSelect } from "@/components/business/remote-select";

const meta: Meta<typeof RemoteSelect> = {
  title: "Business/RemoteSelect",
  component: RemoteSelect,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
