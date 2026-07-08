import type { Meta, StoryObj } from "@storybook/react";
import { SchemaForm } from "@/components/ui/schema-form";

const meta: Meta<typeof SchemaForm> = {
  title: "Components/SchemaForm",
  component: SchemaForm,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
