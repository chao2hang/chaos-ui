import type { Meta, StoryObj } from "@storybook/react";
import { MobileTabBar } from "@/components/business/mobile-tab-bar";
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  UserIcon,
  SettingsIcon,
} from "@/components/ui/icons";

const meta = {
  title: "Business/Mobile/MobileTabBar",
  component: MobileTabBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { tabs: [] },
} satisfies Meta<typeof MobileTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (id: string) => {
  void id;
};

const threeTabs = [
  { id: "home", label: "Home", icon: <HomeIcon className="size-5" /> },
  { id: "search", label: "Search", icon: <SearchIcon className="size-5" /> },
  { id: "profile", label: "Me", icon: <UserIcon className="size-5" /> },
];

const fiveTabs = [
  { id: "home", label: "Home", icon: <HomeIcon className="size-5" /> },
  { id: "explore", label: "Explore", icon: <SearchIcon className="size-5" /> },
  { id: "create", label: "Create", icon: <PlusIcon className="size-5" /> },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon className="size-5" />,
  },
  { id: "me", label: "Me", icon: <UserIcon className="size-5" /> },
];

export const Default: Story = {
  args: {
    tabs: threeTabs,
    activeId: "home",
    onSelect: noop,
  },
};

export const FiveTabs: Story = {
  args: {
    tabs: fiveTabs,
    activeId: "explore",
    onSelect: noop,
  },
};

export const NoIcons: Story = {
  args: {
    tabs: [
      { id: "all", label: "All" },
      { id: "unread", label: "Unread" },
      { id: "starred", label: "Starred" },
    ],
    activeId: "unread",
    onSelect: noop,
  },
};

export const SingleTab: Story = {
  args: {
    tabs: [
      { id: "home", label: "Home", icon: <HomeIcon className="size-5" /> },
    ],
    activeId: "home",
    onSelect: noop,
  },
};
