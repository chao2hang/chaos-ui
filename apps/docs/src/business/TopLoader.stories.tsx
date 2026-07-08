import type { Meta, StoryObj } from "@storybook/react";
import { TopLoader } from "@/components/business/top-loader";

const meta: Meta<typeof TopLoader> = {
  title: "Business/TopLoader",
  component: TopLoader,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
