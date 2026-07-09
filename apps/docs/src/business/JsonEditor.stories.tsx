import type { Meta, StoryObj } from "@storybook/react";
import { JsonEditor } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof JsonEditor> = {
  title: "Business/JsonEditor",
  component: JsonEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
