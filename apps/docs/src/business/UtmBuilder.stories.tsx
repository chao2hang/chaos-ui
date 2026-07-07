import type { Meta, StoryObj } from "@storybook/react";
import { UtmBuilder } from "@/components/business/utm-builder";

const meta = {
  title: "Business/UtmBuilder",
  component: UtmBuilder,
  tags: ["autodocs"],
} satisfies Meta<typeof UtmBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
