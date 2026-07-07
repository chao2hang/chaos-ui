import type { Meta, StoryObj } from "@storybook/react";
import { EditToolbar } from "@/components/business/edit-toolbar";

const meta = {
  title: "Business/EditToolbar",
  component: EditToolbar,
  tags: ["autodocs"],
} satisfies Meta<typeof EditToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
