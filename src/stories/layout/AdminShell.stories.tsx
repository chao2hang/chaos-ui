import type { Meta, StoryObj } from "@storybook/react";
import {
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
  FileTextIcon,
  PackageIcon,
} from "@/components/ui/icons";
import { AdminShell } from "@/components/layout/admin-shell";

const meta: Meta<typeof AdminShell> = {
  title: "Layouts/AdminShell",
  component: AdminShell,
  tags: ["autodocs", "a11y"],
};

export default meta;

type Story = StoryObj<typeof AdminShell>;

const menuItems = [
  { key: "home", label: "Home", icon: <HomeIcon className="size-4" /> },
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboardIcon className="size-4" />,
  },
  { key: "users", label: "Users", icon: <UsersIcon className="size-4" /> },
  {
    key: "orders",
    label: "Orders",
    icon: <FileTextIcon className="size-4" />,
    children: [
      { key: "orders-all", label: "All Orders" },
      { key: "orders-pending", label: "Pending" },
    ],
  },
  {
    key: "products",
    label: "Products",
    icon: <PackageIcon className="size-4" />,
    disabled: true,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingsIcon className="size-4" />,
  },
];

export const FullAdminShell: Story = {
  args: {
    logo: <span className="text-lg font-bold">Chaos Admin</span>,
    menuItems,
    selectedMenuKey: "home",
    user: {
      name: "Admin User",
      email: "admin@chaos-ui.dev",
      role: "Administrator",
    },
    notificationCount: 5,
    notifications: [
      {
        id: "1",
        title: "New order #1234",
        description: "Customer placed a new order",
        timestamp: Date.now() - 60000,
        type: "info",
      },
      {
        id: "2",
        title: "Payment received",
        description: "$500 from Acme Corp",
        timestamp: Date.now() - 3600000,
        type: "success",
      },
    ],
    tabs: [
      { key: "home", label: "Home", closable: false },
      { key: "orders", label: "Orders" },
      { key: "analytics", label: "Analytics" },
    ],
    activeTabKey: "home",
    breadcrumb: [{ label: "Home", href: "#" }, { label: "Dashboard" }],
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin panel. Use the sidebar to navigate.
        </p>
      </div>
    ),
  },
};

export const Minimal: Story = {
  args: {
    menuItems: menuItems.slice(0, 3),
    showSearch: false,
    children: (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Minimal Setup</h1>
      </div>
    ),
  },
};

export const WithoutTabs: Story = {
  args: {
    logo: <span className="text-lg font-bold">NoTabs App</span>,
    menuItems,
    user: { name: "User", email: "user@test.com" },
    children: (
      <div className="p-6">
        <h1 className="text-xl font-semibold">No Tabs Layout</h1>
      </div>
    ),
  },
};
