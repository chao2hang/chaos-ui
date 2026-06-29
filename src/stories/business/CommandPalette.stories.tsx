import type { Meta, StoryObj } from "@storybook/react";
import { CommandPalette } from "@/components/business/command-palette";
import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  SettingsIcon,
  FileTextIcon,
  PlusIcon,
} from "@/components/ui/icons";

const groups = [
  {
    id: "actions",
    label: "Actions",
    items: [
      {
        id: "new-project",
        label: "New project",
        description: "Create a new workspace project",
        icon: <PlusIcon className="size-4" />,
        shortcut: "mod+N",
        onSelect: () => undefined,
      },
      {
        id: "search",
        label: "Search",
        description: "Search across the app",
        icon: <SearchIcon className="size-4" />,
        shortcut: "mod+K",
        onSelect: () => undefined,
      },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    items: [
      {
        id: "settings",
        label: "Settings",
        description: "Open app preferences",
        icon: <SettingsIcon className="size-4" />,
        keywords: ["preferences", "configuration"],
        onSelect: () => undefined,
      },
      {
        id: "docs",
        label: "Documentation",
        description: "Read product docs",
        icon: <FileTextIcon className="size-4" />,
        keywords: ["guide", "help"],
        onSelect: () => undefined,
      },
    ],
  },
];

const meta = {
  title: "Business/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CommandPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CommandPalette
      trigger={<Button variant="outline">Open command palette</Button>}
      groups={groups}
    />
  ),
};

export const HiddenShortcut: Story = {
  render: () => (
    <CommandPalette
      trigger={<Button variant="secondary">Quick actions</Button>}
      groups={groups}
      showShortcut={false}
    />
  ),
};
