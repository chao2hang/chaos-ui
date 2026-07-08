import type { Meta, StoryObj } from "@storybook/react";
import { MessageProvider } from "@/components/ui/message-provider";

const meta: Meta<typeof MessageProvider> = {
  title: "Components/MessageProvider",
  component: MessageProvider,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
