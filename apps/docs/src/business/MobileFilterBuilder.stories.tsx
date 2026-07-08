import type { Meta, StoryObj } from "@storybook/react";
import { MobileFilterBuilder } from "@/components/business/mobile-filter-builder";

const meta: Meta<typeof MobileFilterBuilder> = {
  title: "Business/MobileFilterBuilder",
  component: MobileFilterBuilder,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
