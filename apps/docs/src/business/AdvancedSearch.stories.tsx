import type { Meta, StoryObj } from "@storybook/react";
import { AdvancedSearch } from "@/components/business/advanced-search";

const meta = {
  title: "Business/AdvancedSearch",
  component: AdvancedSearch,
  tags: ["autodocs"],
} satisfies Meta<typeof AdvancedSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
