import type { Meta, StoryObj } from "@storybook/react";
import { AdminHeader } from "@/components/layout/admin-header";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";

const meta = {
  title: "Layouts/AdminHeader",
  component: AdminHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AdminHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const noopSearch = (v: string) => {
  void v;
};
const noopClick = () => {};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Full admin header with breadcrumb, search, notifications, and user menu. */
export const FullHeader: Story = {
  args: {
    logo: <span className="text-sm font-semibold">Chaos Admin</span>,
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Users", href: "/users" },
      { label: "Permissions" },
    ],
    showSearch: true,
    searchPlaceholder: "Search users, permissions, roles…",
    onSearch: noopSearch,
    notificationCount: 3,
    onNotificationClick: noopClick,
    userMenu: (
      <Button variant="ghost" size="sm">
        <UserIcon className="mr-1 size-4" /> Alice
      </Button>
    ),
  },
};

/** Sticky header (fixed top on scroll). */
export const Sticky: Story = {
  args: {
    logo: <span className="text-sm font-semibold">Chaos Admin</span>,
    sticky: true,
    showSearch: true,
    onSearch: noopSearch,
    notificationCount: 12,
    onNotificationClick: noopClick,
  },
};

/** No search, no notifications — minimal header. */
export const Minimal: Story = {
  args: {
    logo: <span className="text-sm font-semibold">Chaos</span>,
    showSearch: false,
  },
};

/** With custom action buttons on the right. */
export const WithActions: Story = {
  args: {
    logo: <span className="text-sm font-semibold">Chaos Admin</span>,
    showSearch: true,
    onSearch: noopSearch,
    actions: (
      <>
        <Button size="sm" variant="outline">
          Docs
        </Button>
        <Button size="sm">Deploy</Button>
      </>
    ),
  },
};

/** Notification badge shows 99+ for large counts. */
export const HighNotifications: Story = {
  args: {
    logo: <span className="text-sm font-semibold">Chaos Admin</span>,
    notificationCount: 142,
    onNotificationClick: noopClick,
  },
};
