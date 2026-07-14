import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavigationTabsBar } from "@chaos_team/chaos-ui/layout";
import type { NavigationTabsBarTabItem } from "@chaos_team/chaos-ui/layout";
import {
  HomeIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
  UserIcon,
} from "@chaos_team/chaos-ui/ui-icons";

const meta: Meta<typeof NavigationTabsBar> = {
  title: "Layouts/NavigationTabsBar",
  component: NavigationTabsBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems: NavigationTabsBarTabItem[] = [
  {
    key: "home",
    label: "Home",
    icon: <HomeIcon className="size-4" />,
    closable: false,
  },
  { key: "search", label: "Search", icon: <SearchIcon className="size-4" /> },
  {
    key: "notifications",
    label: "Notifications",
    icon: <BellIcon className="size-4" />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingsIcon className="size-4" />,
  },
  { key: "profile", label: "Profile", icon: <UserIcon className="size-4" /> },
];

export const Default: Story = {
  render: () => {
    const [tab, setTab] = React.useState("home");
    return (
      <NavigationTabsBar
        items={defaultItems}
        activeKey={tab}
        onChange={setTab}
      />
    );
  },
};

export const WithClose: Story = {
  render: () => {
    const [tab, setTab] = React.useState("tab-1");
    const [tabs, setTabs] = React.useState<NavigationTabsBarTabItem[]>([
      {
        key: "tab-1",
        label: "Dashboard",
        icon: <HomeIcon className="size-4" />,
        closable: false,
      },
      {
        key: "tab-2",
        label: "Analytics",
        icon: <SearchIcon className="size-4" />,
      },
      { key: "tab-3", label: "Reports", icon: <BellIcon className="size-4" /> },
      {
        key: "tab-4",
        label: "Settings",
        icon: <SettingsIcon className="size-4" />,
      },
    ]);

    const handleClose = (key: string) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.key === key);
        if (idx === -1) return prev;
        const next = prev.filter((t) => t.key !== key);
        // If closing the active tab, switch to the nearest one
        if (tab === key) {
          const newIdx = Math.min(idx, next.length - 1);
          setTab(next[newIdx]?.key ?? "");
        }
        return next;
      });
    };

    return (
      <NavigationTabsBar
        items={tabs}
        activeKey={tab}
        onChange={setTab}
        onClose={handleClose}
      />
    );
  },
};

export const MiddleClickClose: Story = {
  render: () => {
    const [tab, setTab] = React.useState("tab-1");
    const [tabs, setTabs] = React.useState<NavigationTabsBarTabItem[]>([
      { key: "tab-1", label: "Dashboard", closable: false },
      { key: "tab-2", label: "Analytics" },
      { key: "tab-3", label: "Reports" },
      { key: "tab-4", label: "Settings" },
    ]);

    const handleClose = (key: string) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.key === key);
        if (idx === -1) return prev;
        const next = prev.filter((t) => t.key !== key);
        if (tab === key) {
          const newIdx = Math.min(idx, next.length - 1);
          setTab(next[newIdx]?.key ?? "");
        }
        return next;
      });
    };

    return (
      <div>
        <NavigationTabsBar
          items={tabs}
          activeKey={tab}
          onChange={setTab}
          onClose={handleClose}
        />
        <p className="text-muted-foreground mt-4 text-sm">
          Middle-click (scroll wheel click) on any closable tab to close it.
        </p>
      </div>
    );
  },
};

export const RightClickMenu: Story = {
  render: () => {
    const [tab, setTab] = React.useState("tab-1");
    const [tabs, setTabs] = React.useState<NavigationTabsBarTabItem[]>([
      {
        key: "tab-1",
        label: "Dashboard",
        icon: <HomeIcon className="size-4" />,
        closable: false,
      },
      {
        key: "tab-2",
        label: "Analytics",
        icon: <SearchIcon className="size-4" />,
      },
      { key: "tab-3", label: "Reports", icon: <BellIcon className="size-4" /> },
      {
        key: "tab-4",
        label: "Settings",
        icon: <SettingsIcon className="size-4" />,
      },
      { key: "tab-5", label: "Profile", icon: <UserIcon className="size-4" /> },
    ]);

    const handleClose = (key: string) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.key === key);
        if (idx === -1) return prev;
        const next = prev.filter((t) => t.key !== key);
        if (tab === key) {
          const newIdx = Math.min(idx, next.length - 1);
          setTab(next[newIdx]?.key ?? "");
        }
        return next;
      });
    };

    const handleCloseOthers = (key: string) => {
      setTabs((prev) =>
        prev.filter((t) => t.key === key || t.closable === false),
      );
      setTab(key);
    };

    const handleCloseToRight = (key: string) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.key === key);
        if (idx === -1) return prev;
        return prev.filter((_, i) => i <= idx);
      });
    };

    const handleCloseAll = () => {
      setTabs((prev) => prev.filter((t) => t.closable === false));
      const first = tabs.find((t) => t.closable === false);
      setTab(first?.key ?? "");
    };

    const handleRefresh = (key: string) => {
      // eslint-disable-next-line no-console
      console.log(`Refreshing tab: ${key}`);
    };

    return (
      <div>
        <NavigationTabsBar
          items={tabs}
          activeKey={tab}
          onChange={setTab}
          onClose={handleClose}
          onCloseOthers={handleCloseOthers}
          onCloseToRight={handleCloseToRight}
          onCloseAll={handleCloseAll}
          onRefresh={handleRefresh}
        />
        <p className="text-muted-foreground mt-4 text-sm">
          Right-click on any tab to open the context menu with Refresh, Close,
          Close Others, Close to Right, and Close All options.
        </p>
      </div>
    );
  },
};

/** Many long labels in a narrow strip — drag / wheel / chevrons (issue #21). */
export const OverflowDragScroll: Story = {
  render: () => {
    const [tab, setTab] = React.useState("tab-1");
    const items: NavigationTabsBarTabItem[] = [
      {
        key: "tab-1",
        label: "采购申请单-2026-Q3-批次A",
        icon: <HomeIcon className="size-4" />,
        closable: false,
      },
      {
        key: "tab-2",
        label: "销售订单明细-华东大区",
        icon: <SearchIcon className="size-4" />,
      },
      {
        key: "tab-3",
        label: "库存调拨-跨仓复核",
        icon: <BellIcon className="size-4" />,
      },
      {
        key: "tab-4",
        label: "财务对账-应付账龄",
        icon: <SettingsIcon className="size-4" />,
      },
      {
        key: "tab-5",
        label: "主数据-物料档案维护",
        icon: <UserIcon className="size-4" />,
      },
      {
        key: "tab-6",
        label: "生产工单-装配线-07",
        icon: <SearchIcon className="size-4" />,
      },
      {
        key: "tab-7",
        label: "质量管理-来料检验记录",
        icon: <BellIcon className="size-4" />,
      },
      {
        key: "tab-8",
        label: "系统设置-组织与权限",
        icon: <SettingsIcon className="size-4" />,
      },
    ];

    return (
      <div className="max-w-md">
        <NavigationTabsBar
          items={items}
          activeKey={tab}
          onChange={setTab}
          onClose={() => undefined}
        />
        <p className="text-muted-foreground mt-4 text-sm">
          Drag the tab strip horizontally, use the mouse wheel, or click the
          chevrons when overflow. Short click still switches tabs.
        </p>
      </div>
    );
  },
};
