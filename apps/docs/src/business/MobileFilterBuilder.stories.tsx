import type { Meta, StoryObj } from "@storybook/react";
import { MobileFilterBuilder } from "@/components/business/mobile-filter-builder";

const meta = {
  title: "Business/MobileFilterBuilder",
  component: MobileFilterBuilder,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileFilterBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
