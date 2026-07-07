import type { Meta, StoryObj } from "@storybook/react";
import { CrudToolbar } from "@/components/business/crud-toolbar";

const meta = {
  title: "Business/CrudToolbar",
  component: CrudToolbar,
  tags: ["autodocs"],
} satisfies Meta<typeof CrudToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
