import type { Meta, StoryObj } from "@storybook/react";
import { AdminSider } from "@/components/layout/admin-sider";
import type { MenuItem } from "@/components/layout/admin-sider";
import {
  LayoutDashboardIcon,
  UsersIcon,
  SettingsIcon,
  PackageIcon,
  FileTextIcon,
} from "lucide-react";

const meta = {
  title: "Layouts/AdminSider",
  component: AdminSider,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AdminSider>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};
const noopItem = (item: MenuItem) => {
  void item;
};

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboardIcon className="size-4" />,
  },
  {
    key: "users",
    label: "Users",
    icon: <UsersIcon className="size-4" />,
    badge: "12",
    children: [
      { key: "users-list", label: "All users" },
      { key: "users-roles", label: "Roles" },
      { key: "users-permissions", label: "Permissions" },
    ],
  },
  {
    key: "products",
    label: "Products",
    icon: <PackageIcon className="size-4" />,
    disabled: true,
  },
  {
    key: "documents",
    label: "Documents",
    icon: <FileTextIcon className="size-4" />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingsIcon className="size-4" />,
  },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Expanded sidebar with a full menu and a selected item. */
export const Expanded: Story = {
  args: {
    menuItems,
    selectedKey: "users-list",
    onItemClick: noopItem,
    onCollapse: noop,
    logo: <span className="text-sm font-semibold">Chaos</span>,
  },
};

/** Collapsed (icon-only) sidebar. */
export const Collapsed: Story = {
  args: {
    menuItems,
    selectedKey: "dashboard",
    collapsed: true,
    onItemClick: noopItem,
    onCollapse: noop,
  },
};

/** With a footer slot (user profile, version). */
export const WithFooter: Story = {
  args: {
    menuItems,
    selectedKey: "settings",
    onItemClick: noopItem,
    logo: <span className="text-sm font-semibold">Chaos Admin</span>,
    footer: (
      <div className="text-muted-foreground border-t p-3 text-xs">v2.4.0</div>
    ),
  },
};

/** Empty sidebar — only logo. */
export const Empty: Story = {
  args: {
    menuItems: [],
    logo: <span className="text-sm font-semibold">Chaos</span>,
  },
};

/**
 * Accordion expand: only one top-level group open at a time (issue #43).
 * Submenu height motion uses Collapsible; toggle OS reduced-motion to verify snap.
 */
export const AccordionExpand: Story = {
  args: {
    menuItems,
    menuExpandMode: "accordion",
    selectedKey: "users-list",
    onItemClick: noopItem,
    onCollapse: noop,
    logo: <span className="text-sm font-semibold">Chaos</span>,
  },
};

/** Mobile drawer open — overlay fade + slide enter/exit (issue #43). */
export const MobileOpen: Story = {
  args: {
    menuItems,
    mobileOpen: true,
    onMobileOpenChange: noop,
    onItemClick: noopItem,
    onCollapse: noop,
    logo: <span className="text-sm font-semibold">Chaos</span>,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
