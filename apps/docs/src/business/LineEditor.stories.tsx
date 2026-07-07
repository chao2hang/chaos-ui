import type { Meta, StoryObj } from "@storybook/react";
import { LineEditor } from "@/components/business/line-editor";

const meta = {
  title: "Business/LineEditor",
  component: LineEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof LineEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
