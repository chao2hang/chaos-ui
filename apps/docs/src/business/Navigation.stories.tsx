import type { Meta, StoryObj } from "@storybook/react";
import { TopLoader } from "@/components/business/top-loader";
import { Anchor } from "@chaos_team/chaos-ui/ui";
import { SearchInput } from "@/components/business/search-input";
import { Dock } from "@/components/business/dock";
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  MessageCircleIcon,
  UserIcon,
  SettingsIcon,
} from "lucide-react";
import { useState } from "react";

const meta = {
  title: "Business/Navigation",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopLoaderExample: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    return (
      <div className="space-y-3">
        <div className="text-sm font-medium">TopLoader（页面切换进度条）</div>
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
          }}
          className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs"
        >
          触发加载
        </button>
        <TopLoader loading={loading} />
      </div>
    );
  },
};

export const AnchorExample: Story = {
  render: () => (
    <div className="grid grid-cols-[200px_1fr] gap-6">
      <div className="sticky top-4">
        <Anchor
          sections={[
            { id: "intro", label: "引言" },
            { id: "install", label: "安装" },
            { id: "usage", label: "使用方法" },
            { id: "advanced", label: "进阶" },
            { id: "faq", label: "常见问题" },
          ]}
        />
      </div>
      <div className="space-y-12">
        <section id="intro">
          <h2 className="text-xl font-bold">引言</h2>
          <p className="text-muted-foreground mt-2 text-sm">这是介绍章节...</p>
        </section>
        <section id="install" className="pt-8">
          <h2 className="text-xl font-bold">安装</h2>
          <p className="text-muted-foreground mt-2 text-sm">安装步骤...</p>
        </section>
        <section id="usage" className="pt-8">
          <h2 className="text-xl font-bold">使用方法</h2>
          <p className="text-muted-foreground mt-2 text-sm">使用说明...</p>
        </section>
        <section id="advanced" className="pt-8">
          <h2 className="text-xl font-bold">进阶</h2>
          <p className="text-muted-foreground mt-2 text-sm">高级用法...</p>
        </section>
        <section id="faq" className="pt-8">
          <h2 className="text-xl font-bold">常见问题</h2>
          <p className="text-muted-foreground mt-2 text-sm">FAQ...</p>
        </section>
      </div>
    </div>
  ),
};

export const SearchInputExample: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    return (
      <div className="max-w-md space-y-3">
        <div className="text-sm font-medium">SearchInput</div>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="搜索用户、文档、设置..."
          onSubmit={(v) => console.info("search", v)}
          results={
            query
              ? [
                  {
                    id: "1",
                    title: "产品路线图",
                    description: "2026 Q1 路线图文档",
                    group: "文档",
                  },
                  {
                    id: "2",
                    title: "Alice Chen",
                    description: "产品经理",
                    group: "用户",
                  },
                  {
                    id: "3",
                    title: "系统设置",
                    description: "账户与偏好",
                    group: "设置",
                  },
                  {
                    id: "4",
                    title: "API 文档",
                    description: "REST API 参考",
                    group: "文档",
                  },
                ]
              : []
          }
          onResultClick={(r) => console.info("click", r.title)}
        />
      </div>
    );
  },
};

export const DockExample: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <div className="flex h-32 items-end justify-center">
        <Dock
          items={[
            {
              key: "home",
              label: "首页",
              icon: <HomeIcon />,
              active: active === "home",
              onClick: () => setActive("home"),
            },
            {
              key: "search",
              label: "搜索",
              icon: <SearchIcon />,
              active: active === "search",
              onClick: () => setActive("search"),
            },
            {
              key: "messages",
              label: "消息",
              icon: <MessageCircleIcon />,
              badge: 3,
              active: active === "messages",
              onClick: () => setActive("messages"),
            },
            {
              key: "notifications",
              label: "通知",
              icon: <BellIcon />,
              badge: 12,
              active: active === "notifications",
              onClick: () => setActive("notifications"),
            },
            {
              key: "profile",
              label: "个人",
              icon: <UserIcon />,
              active: active === "profile",
              onClick: () => setActive("profile"),
            },
            {
              key: "settings",
              label: "设置",
              icon: <SettingsIcon />,
              active: active === "settings",
              onClick: () => setActive("settings"),
            },
          ]}
        />
      </div>
    );
  },
};

export const DockVerticalExample: Story = {
  render: () => (
    <div className="flex h-96 items-center justify-center">
      <Dock
        orientation="vertical"
        items={[
          { key: "home", label: "首页", icon: <HomeIcon />, active: true },
          { key: "search", label: "搜索", icon: <SearchIcon /> },
          {
            key: "messages",
            label: "消息",
            icon: <MessageCircleIcon />,
            badge: 5,
          },
          { key: "profile", label: "个人", icon: <UserIcon /> },
        ]}
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-5xl space-y-8">
      <section>
        <h3 className="mb-3 text-base font-semibold">TopLoader</h3>
        <TopLoaderDemoRender />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">SearchInput</h3>
        <div className="max-w-md">
          <SearchInput placeholder="搜索..." />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Dock 横向</h3>
        <div className="flex justify-center">
          <Dock
            items={[
              { key: "home", label: "首页", icon: <HomeIcon />, active: true },
              { key: "search", label: "搜索", icon: <SearchIcon /> },
              {
                key: "messages",
                label: "消息",
                icon: <MessageCircleIcon />,
                badge: 3,
              },
              { key: "settings", label: "设置", icon: <SettingsIcon /> },
            ]}
          />
        </div>
      </section>
    </div>
  ),
};

function TopLoaderDemoRender() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 3000);
        }}
        className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs"
      >
        触发加载
      </button>
      <TopLoader loading={loading} />
    </div>
  );
}
