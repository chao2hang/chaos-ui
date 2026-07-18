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
import { UserMenu } from "@/components/business/user-menu";
import { NotificationCenter } from "@/components/business/notification-center";
import { PageChrome } from "@/components/business/page-chrome";
import { ListPageShell } from "@/components/business/list-page-shell";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof AdminShell> = {
  title: "Layouts/AdminShell",
  component: AdminShell,
  tags: ["autodocs", "a11y"],
  parameters: {
    docs: {
      description: {
        component:
          'AdminShell roots with `h-full min-h-0` (CUI-LAYOUT-04). Story canvas supplies a host box (`h-[70vh]`); real Next apps should set `html`/`body` (or a full-height ancestor) to `h-full` / `min-h-svh`, or pass `className="min-h-svh"` on the shell. Unlike AuthLayout, there is no default viewport fill. Desktop sider collapse defaults to the header far-left control (`collapseTrigger="header"`, issue #17); use `collapseTrigger="sider-edge"` for the legacy mid-sider handle. Content gutter (#57): `contentPadding` supports boolean / class string / `{ inline, top, bottom }`; with tabs, default top is tighter (`pt-2`).',
      },
    },
  },
  decorators: [
    (Story) => (
      // Host sets height; AdminShell fills with h-full (use className="min-h-svh" for viewport).
      <div className="h-[70vh] min-h-[420px] overflow-auto">
        <Story />
      </div>
    ),
  ],
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
  parameters: {
    docs: {
      description: {
        story:
          'Full chrome demo inside the meta host (`h-[70vh]`). App roots should use an html/body height chain or `className="min-h-svh"` — see height-chain notes on the docs site.',
      },
    },
  },
  args: {
    logo: <span className="text-lg font-bold">Chaos Admin</span>,
    menuItems,
    selectedMenuKey: "home",
    userMenu: (
      <UserMenu
        user={{
          name: "Admin User",
          email: "admin@chaos-ui.dev",
          role: "Administrator",
        }}
      />
    ),
    notification: (
      <NotificationCenter
        notifications={[
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
        ]}
      />
    ),
    tabs: [
      { key: "home", label: "Home", closable: false },
      { key: "orders", label: "Orders" },
      { key: "analytics", label: "Analytics" },
    ],
    activeTabKey: "home",
    breadcrumb: [{ label: "Home", href: "#" }, { label: "Dashboard" }],
    children: (
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin panel. Use the sidebar to navigate. With tabs,
          shell default content top is `pt-2` (#57).
        </p>
      </div>
    ),
  },
};

/** Multi-tabs + list: shell gutter (#57) + filter/toolbar same row (#58). */
export const TabsWithListChrome: Story = {
  name: "Tabs + list (gutter + inline toolbar)",
  parameters: {
    docs: {
      description: {
        story:
          "Tabs → content uses default `pt-2` (#57). CRUD actions sit on `ListPageShell` toolbar **beside** FilterBar (#58) — not `PageChrome.actions`.",
      },
    },
  },
  args: {
    logo: <span className="text-lg font-bold">Dict</span>,
    menuItems: menuItems.slice(0, 3),
    selectedMenuKey: "home",
    showSearch: false,
    tabs: [
      { key: "dict", label: "字典管理", closable: false },
      { key: "type", label: "类型" },
    ],
    activeTabKey: "dict",
    breadcrumb: [{ label: "基础数据" }, { label: "字典管理" }],
    children: (
      <PageChrome variant="list">
        <ListPageShell
          filterFields={[
            {
              key: "keyword",
              label: "关键词",
              type: "input",
              placeholder: "编码 / 名称",
            },
          ]}
          onSearch={() => {}}
          toolbar={
            <>
              <Button variant="outline" size="sm">
                刷新
              </Button>
              <Button size="sm">新增</Button>
            </>
          }
        >
          <div className="text-muted-foreground border-border rounded-md border border-dashed p-8 text-center text-sm">
            SearchTable — no full-width empty actions strip.
          </div>
        </ListPageShell>
      </PageChrome>
    ),
  },
};

/** Explicit directional padding for consumers who need lg horizontal. */
export const DirectionalContentPadding: Story = {
  name: "Directional contentPadding",
  args: {
    logo: <span className="text-lg font-bold">Gutter</span>,
    menuItems: menuItems.slice(0, 2),
    selectedMenuKey: "home",
    showSearch: false,
    tabs: [{ key: "home", label: "Home", closable: false }],
    activeTabKey: "home",
    contentPadding: {
      inline: "px-4 lg:px-6",
      top: "pt-2",
      bottom: "pb-6",
    },
    children: (
      <p className="text-muted-foreground text-sm">
        Object form: inline / top / bottom class strings.
      </p>
    ),
  },
};

/** Short content + consumer opt-in `min-h-svh` (still inside meta host box). */
export const WithMinHSvh: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Consumer escape hatch: `className="min-h-svh"` so the shell prefers viewport min-height when content is short. Prefer the Next root height chain for full apps; canvas still uses the meta host box.',
      },
    },
  },
  args: {
    logo: <span className="text-lg font-bold">MinHSvh</span>,
    menuItems: menuItems.slice(0, 3),
    selectedMenuKey: "home",
    className: "min-h-svh",
    showSearch: false,
    children: (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Short page</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Shell uses min-h-svh so sider height does not collapse to content.
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

/** Legacy mid-sider absolute collapse handle (issue #17). */
export const CollapseOnSiderEdge: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Opt into the pre-1.5.6 placement: `collapseTrigger="sider-edge"` keeps the absolute handle on the sider edge instead of the header.',
      },
    },
  },
  args: {
    logo: <span className="text-lg font-bold">Sider Edge</span>,
    menuItems,
    selectedMenuKey: "home",
    collapseTrigger: "sider-edge",
    breadcrumb: [{ label: "Home", href: "#" }, { label: "Dashboard" }],
    children: (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Sider-edge collapse</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Collapse control sits on the sider mid-edge (legacy).
        </p>
      </div>
    ),
  },
};

export const WithoutTabs: Story = {
  args: {
    logo: <span className="text-lg font-bold">NoTabs App</span>,
    menuItems,
    userMenu: <UserMenu user={{ name: "User", email: "user@test.com" }} />,
    children: (
      <div className="p-6">
        <h1 className="text-xl font-semibold">No Tabs Layout</h1>
      </div>
    ),
  },
};
