import type { Meta, StoryObj } from "@storybook/react";
import { ReportBuilder } from "@/components/business/report-builder";

const meta = {
  title: "Business/ReportBuilder",
  component: ReportBuilder,
  tags: ["autodocs"],
} satisfies Meta<typeof ReportBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
