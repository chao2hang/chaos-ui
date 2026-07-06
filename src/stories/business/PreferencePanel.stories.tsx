import type { Meta, StoryObj } from "@storybook/react";
import { PreferencePanel } from "@/components/business/preference-panel";

const noop = () => {};

const meta = {
  title: "Business/Nav/PreferencePanel",
  component: PreferencePanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { open: true, onOpenChange: noop },
} satisfies Meta<typeof PreferencePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  args: {
    open: true,
    onOpenChange: noop,
  },
};
