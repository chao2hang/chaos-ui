import type { Meta, StoryObj } from "@storybook/react";
import { TopLoader } from "@/components/business/top-loader";

const meta = {
  title: "Business/TopLoader",
  component: TopLoader,
  tags: ["autodocs"],
} satisfies Meta<typeof TopLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
