import type { Meta, StoryObj } from "@storybook/react";
import { AdminSider } from "@chaos_team/chaos-ui/layout";
import { Button } from "@chaos_team/chaos-ui/ui";
import { HomeIcon, SettingsIcon, UserIcon } from "lucide-react";

const meta: Meta<typeof AdminSider> = {
  title: "Layouts/AdminSider",
  component: AdminSider,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { key: "home", label: "Home", icon: <HomeIcon className="size-4" /> },
  { key: "users", label: "Users", icon: <UserIcon className="size-4" /> },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingsIcon className="size-4" />,
  },
];

export const Default: Story = {
  args: {
    menuItems,
    selectedKey: "home",
  },
};
