import type { Meta, StoryObj } from "@storybook/react";
import { QuickEntryGrid } from "@/components/business/quick-entry-grid";
import { HomeIcon, SettingsIcon, UsersIcon } from "@/components/ui/icons";

const noop = () => {};
const entries = [
  { id: "1", icon: <HomeIcon className="size-5" />, label: "Dashboard", onClick: noop },
  { id: "2", icon: <UsersIcon className="size-5" />, label: "Team", onClick: noop },
  { id: "3", icon: <SettingsIcon className="size-5" />, label: "Settings", onClick: noop },
];

const meta = { title: "Business/Forms/QuickEntryGrid", component: QuickEntryGrid, tags: ["autodocs"], parameters: { layout: "padded" }, args: { entries: [] } } satisfies Meta<typeof QuickEntryGrid>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { entries } };
export const Single: Story = { args: { entries: entries.slice(0, 1) } };
