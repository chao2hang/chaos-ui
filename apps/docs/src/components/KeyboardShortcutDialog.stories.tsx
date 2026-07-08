import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardShortcutDialog } from "@/components/ui/keyboard-shortcut-dialog";

const meta: Meta<typeof KeyboardShortcutDialog> = {
  title: "Components/KeyboardShortcutDialog",
  component: KeyboardShortcutDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
