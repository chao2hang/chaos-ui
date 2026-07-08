import type { Meta, StoryObj } from "@storybook/react";
import { AdminTabs } from "@/components/layout/admin-tabs";
import type { NavigationTabsBarTabItem as TabItem } from "@/components/layout/admin-tabs";
import { HomeIcon, FileTextIcon, SettingsIcon } from "lucide-react";

const meta = {
  title: "Layouts/AdminTabs",
  component: AdminTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AdminTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (k: string) => {
  void k;
};
const noopNoArgs = () => {};

const tabs: TabItem[] = [
  { key: "home", label: "Home", icon: <HomeIcon className="size-4" /> },
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

const manyTabs: TabItem[] = Array.from({ length: 8 }, (_, i) => ({
  key: `tab-${i + 1}`,
  label: `Tab ${i + 1}`,
  closable: i > 0,
}));

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default tabs — middle tab active. */
export const Default: Story = {
  args: {
    items: tabs,
    activeKey: "documents",
    onChange: noop,
  },
};

/** Single tab (no close affordance). */
export const SingleTab: Story = {
  args: {
    items: [{ key: "home", label: "Home", closable: false }],
    activeKey: "home",
    onChange: noop,
  },
};

/** Tab with disabled close (non-closable). */
export const NonClosable: Story = {
  args: {
    items: [
      { key: "home", label: "Home", closable: false },
      { key: "edit", label: "Editor", closable: false },
      { key: "preview", label: "Preview" },
    ],
    activeKey: "edit",
    onChange: noop,
    onClose: noop,
  },
};

/** Many tabs — horizontal scroll region. */
export const ManyTabs: Story = {
  args: {
    items: manyTabs,
    activeKey: "tab-4",
    onChange: noop,
    onClose: noop,
  },
};

/** All tab lifecycle callbacks wired (close / closeAll / closeOthers / closeToRight / refresh). */
export const WithLifecycleCallbacks: Story = {
  args: {
    items: tabs,
    activeKey: "documents",
    onChange: noop,
    onClose: noop,
    onCloseAll: noopNoArgs,
    onCloseOthers: noop,
    onCloseToRight: noop,
    onRefresh: noop,
  },
};
