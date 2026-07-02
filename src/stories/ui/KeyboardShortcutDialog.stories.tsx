import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardShortcutDialog } from "@/components/ui/keyboard-shortcut-dialog";
import type { ShortcutGroup } from "@/components/ui/keyboard-shortcut-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const meta = {
  title: "Components/KeyboardShortcutDialog",
  component: KeyboardShortcutDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof KeyboardShortcutDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleGroups: ShortcutGroup[] = [
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["Ctrl", "K"], description: "Open command palette" },
      { keys: ["Ctrl", "B"], description: "Toggle sidebar" },
      { keys: ["Ctrl", "Tab"], description: "Switch tabs" },
      { keys: ["Alt", "Left"], description: "Go back" },
      { keys: ["Alt", "Right"], description: "Go forward" },
    ],
  },
  {
    title: "Editing",
    shortcuts: [
      { keys: ["Ctrl", "Z"], description: "Undo" },
      { keys: ["Ctrl", "Shift", "Z"], description: "Redo" },
      { keys: ["Ctrl", "C"], description: "Copy" },
      { keys: ["Ctrl", "V"], description: "Paste" },
      { keys: ["Ctrl", "A"], description: "Select all" },
    ],
  },
  {
    title: "File Operations",
    shortcuts: [
      { keys: ["Ctrl", "S"], description: "Save file" },
      { keys: ["Ctrl", "O"], description: "Open file" },
      { keys: ["Ctrl", "N"], description: "New file" },
      { keys: ["Ctrl", "W"], description: "Close file" },
      { keys: ["Ctrl", "P"], description: "Print" },
    ],
  },
];

function KeyboardShortcutDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Show Keyboard Shortcuts
      </Button>
      <KeyboardShortcutDialog
        open={open}
        onOpenChange={setOpen}
        groups={sampleGroups}
      />
    </>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <KeyboardShortcutDialogDemo />,
};
