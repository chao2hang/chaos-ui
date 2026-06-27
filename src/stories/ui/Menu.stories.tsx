import type { Meta, StoryObj } from "@storybook/react";
import { Menu, MenuItem, MenuSubMenu, MenuDivider, MenuItemGroup } from "@/components/ui/menu";
import {
  HomeIcon,
  SettingsIcon,
  UsersIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  BarChart3Icon,
  BellIcon,
  FileTextIcon,
  FolderIcon,
} from "@/components/ui/icons";

const meta: Meta<typeof Menu> = {
  title: "Components / Menu",
  component: Menu,
  tags: ["autodocs"],
  argTypes: {
    mode: { control: "select", options: ["inline", "vertical", "horizontal"] },
    theme: { control: "select", options: ["light", "dark"] },
    selectable: { control: "boolean" },
    multiple: { control: "boolean" },
    inlineCollapsed: { control: "boolean" },
    inlineIndent: { control: "number" },
  },
  args: {
    mode: "inline",
    theme: "light",
    selectable: true,
    multiple: false,
    inlineCollapsed: false,
    inlineIndent: 24,
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const demoItems = [
  { key: "home", label: "首页", icon: <HomeIcon className="size-4" /> },
  { key: "orders", label: "订单管理", icon: <ShoppingCartIcon className="size-4" /> },
  {
    key: "system",
    label: "系统管理",
    icon: <SettingsIcon className="size-4" />,
    children: [
      { key: "users", label: "用户管理", icon: <UsersIcon className="size-4" /> },
      { key: "roles", label: "角色管理", icon: <ShieldCheckIcon className="size-4" /> },
      { key: "notifications", label: "通知设置", icon: <BellIcon className="size-4" /> },
    ],
  },
  {
    key: "reports",
    label: "报表中心",
    icon: <BarChart3Icon className="size-4" />,
    children: [
      { key: "sales-report", label: "销售报表" },
      { key: "inventory-report", label: "库存报表" },
    ],
  },
  { key: "docs", label: "文档", icon: <FileTextIcon className="size-4" /> },
  {
    key: "danger",
    label: "危险操作",
    icon: <FolderIcon className="size-4" />,
    danger: true,
  },
];

export const InlineLight: Story = {
  args: {
    mode: "inline",
    theme: "light",
    items: demoItems,
    defaultSelectedKeys: ["home"],
    defaultOpenKeys: ["system"],
  },
  render: (args: React.ComponentProps<typeof Menu>) => (
    <div className="w-[256px] rounded-lg border p-2">
      <Menu {...args} />
    </div>
  ),
};

export const InlineDark: Story = {
  args: {
    mode: "inline",
    theme: "dark",
    items: demoItems,
    defaultSelectedKeys: ["home"],
    defaultOpenKeys: ["system"],
  },
  render: (args: React.ComponentProps<typeof Menu>) => (
    <div className="w-[256px] rounded-lg overflow-hidden">
      <Menu {...args} />
    </div>
  ),
};

export const VerticalLight: Story = {
  args: {
    mode: "vertical",
    theme: "light",
    items: demoItems,
    defaultSelectedKeys: ["home"],
    defaultOpenKeys: ["system"],
  },
  render: (args: React.ComponentProps<typeof Menu>) => (
    <div className="w-[256px] rounded-lg border p-2">
      <Menu {...args} />
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    mode: "horizontal",
    theme: "light",
    items: [
      { key: "home", label: "首页", icon: <HomeIcon className="size-4" /> },
      { key: "orders", label: "订单管理", icon: <ShoppingCartIcon className="size-4" /> },
      {
        key: "system",
        label: "系统管理",
        icon: <SettingsIcon className="size-4" />,
        children: [
          { key: "users", label: "用户管理" },
          { key: "roles", label: "角色管理" },
        ],
      },
    ],
    defaultSelectedKeys: ["home"],
  },
  render: (args: React.ComponentProps<typeof Menu>) => (
    <div className="rounded-lg border p-2">
      <Menu {...args} />
    </div>
  ),
};

export const ChildComponentAPI: Story = {
  args: {
    mode: "inline",
    theme: "light",
    defaultSelectedKeys: ["home"],
    defaultOpenKeys: ["system"],
  },
  render: (args: React.ComponentProps<typeof Menu>) => (
    <div className="w-[256px] rounded-lg border p-2">
      <Menu {...args}>
        <MenuItem key="home" icon={<HomeIcon className="size-4" />}>
          首页
        </MenuItem>
        <MenuSubMenu
          key="system"
          title="系统管理"
          icon={<SettingsIcon className="size-4" />}
        >
          <MenuItem key="users" icon={<UsersIcon className="size-4" />}>
            用户管理
          </MenuItem>
          <MenuItem key="roles" icon={<ShieldCheckIcon className="size-4" />}>
            角色管理
          </MenuItem>
        </MenuSubMenu>
        <MenuDivider />
        <MenuItemGroup title="报表">
          <MenuItem key="sales" icon={<BarChart3Icon className="size-4" />}>
            销售报表
          </MenuItem>
        </MenuItemGroup>
      </Menu>
    </div>
  ),
};

export const Collapsed: Story = {
  args: {
    mode: "inline",
    theme: "dark",
    inlineCollapsed: true,
    items: demoItems,
    defaultSelectedKeys: ["home"],
  },
  render: (args: React.ComponentProps<typeof Menu>) => (
    <div className="w-[64px] rounded-lg overflow-hidden">
      <Menu {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  args: {
    mode: "inline",
    theme: "light",
    items: demoItems,
    selectedKeys: ["users"],
    openKeys: ["system"],
  },
  render: (args: React.ComponentProps<typeof Menu>) => (
    <div className="w-[256px] rounded-lg border p-2">
      <Menu {...args} />
      <p className="mt-2 text-xs text-muted-foreground">受控模式: selectedKeys=&#123;['users']&#125; openKeys=&#123;['system']&#125;</p>
    </div>
  ),
};
