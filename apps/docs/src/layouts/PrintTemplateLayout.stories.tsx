import type { Meta, StoryObj } from "@storybook/react";
import { PrintTemplateLayout } from "@/components/layout/print-template-layout";

const meta: Meta<typeof PrintTemplateLayout> = {
  title: "Layouts/PrintTemplateLayout",
  component: PrintTemplateLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
