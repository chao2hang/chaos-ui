import type { Meta, StoryObj } from "@storybook/react";
import { ConfigProvider } from "@/components/ui/config-provider";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof ConfigProvider> = {
  title: "Components/ConfigProvider",
  component: ConfigProvider,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>Button with config</Button>,
  },
};
