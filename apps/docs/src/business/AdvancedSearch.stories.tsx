import type { Meta, StoryObj } from "@storybook/react";
import { AdvancedSearch } from "@/components/business/advanced-search";

const meta: Meta<typeof AdvancedSearch> = {
  title: "Business/AdvancedSearch",
  component: AdvancedSearch,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
