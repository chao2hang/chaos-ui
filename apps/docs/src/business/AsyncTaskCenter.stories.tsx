import type { Meta, StoryObj } from "@storybook/react";
import { AsyncTaskCenter } from "@/components/business/async-task-center";

const meta = {
  title: "Business/AsyncTaskCenter",
  component: AsyncTaskCenter,
  tags: ["autodocs"],
} satisfies Meta<typeof AsyncTaskCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
