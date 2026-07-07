import type { Meta, StoryObj } from "@storybook/react";
import { UnitConverter } from "@/components/business/unit-converter";

const meta = {
  title: "Business/UnitConverter",
  component: UnitConverter,
  tags: ["autodocs"],
} satisfies Meta<typeof UnitConverter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
