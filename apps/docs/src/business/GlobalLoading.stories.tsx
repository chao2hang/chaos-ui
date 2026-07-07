import type { Meta, StoryObj } from "@storybook/react";
import { GlobalLoading } from "@/components/business/global-loading";

const meta = {
  title: "Business/GlobalLoading",
  component: GlobalLoading,
  tags: ["autodocs"],
} satisfies Meta<typeof GlobalLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
