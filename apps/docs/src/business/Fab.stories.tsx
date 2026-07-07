import type { Meta, StoryObj } from "@storybook/react";
import { Fab } from "@/components/business/fab";

const meta = {
  title: "Business/Fab",
  component: Fab,
  tags: ["autodocs"],
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
