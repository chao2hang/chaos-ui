import type { Meta, StoryObj } from "@storybook/react";
import { ModalProvider } from "@/components/ui/modal-provider";

const meta: Meta<typeof ModalProvider> = {
  title: "Components/ModalProvider",
  component: ModalProvider,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
