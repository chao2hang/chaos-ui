import type { Meta, StoryObj } from "@storybook/react";
import { MobilePageHeader } from "@/components/business/mobile-page-header";

const meta: Meta<typeof MobilePageHeader> = {
  title: "Business/MobilePageHeader",
  component: MobilePageHeader,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
