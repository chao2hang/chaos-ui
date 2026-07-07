import type { Meta, StoryObj } from "@storybook/react";
import { AdminSider } from "@/components/layout/admin-sider";
import { Button } from "@/components/ui/button";
import { HomeIcon, SettingsIcon, UserIcon } from "lucide-react";

const meta = {
  title: "Layouts/AdminSider",
  component: AdminSider,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AdminSider>;

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
    items: menuItems,
    selectedKey: "home",
  },
};
