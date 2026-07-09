import type { Meta, StoryObj } from "@storybook/react";
import {
  NotificationCenter,
  type NotificationItem,
} from "@chaos_team/chaos-ui/business";
import { useState } from "react";

const meta = {
  title: "Business/NotificationCenter",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const seed: NotificationItem[] = [
  {
    id: "1",
    title: "新评论",
    description: "李雷 评论了您的文档《Q1 OKR》",
    timestamp: Date.now() - 60_000,
    read: false,
    type: "info",
    action: { label: "查看", onClick: () => console.info("view") },
  },
  {
    id: "2",
    title: "部署成功",
    description: "v1.2.0 已发布到生产环境",
    timestamp: Date.now() - 3_600_000,
    read: false,
    type: "success",
  },
  {
    id: "3",
    title: "构建失败",
    description: "CI 流水线退出码 1，请检查单元测试",
    timestamp: Date.now() - 7_200_000,
    read: false,
    type: "error",
    action: { label: "查看日志", onClick: () => console.info("logs") },
  },
  {
    id: "4",
    title: "存储空间不足",
    description: "已使用 95%，请及时清理",
    timestamp: Date.now() - 86_400_000,
    read: true,
    type: "warning",
  },
  {
    id: "5",
    title: "欢迎使用",
    description: "点击这里查看产品入门指南",
    timestamp: Date.now() - 7 * 86_400_000,
    read: true,
    type: "info",
  },
];

export const Default: Story = {
  render: () => (
    <div className="flex h-[300px] items-start justify-center p-10">
      <NotificationCenter
        notifications={seed}
        onMarkRead={(id) => console.info("mark", id)}
        onMarkAllRead={() => console.info("all read")}
        onClear={() => console.info("clear")}
        onItemClick={(n) => console.info("item", n.id)}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [list, setList] = useState(seed);
    return (
      <div className="flex h-[300px] items-start justify-center p-10">
        <NotificationCenter
          notifications={list}
          onMarkRead={(id) =>
            setList((prev) =>
              prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
            )
          }
          onMarkAllRead={() =>
            setList((prev) => prev.map((n) => ({ ...n, read: true })))
          }
          onClear={() => setList([])}
        />
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => (
    <div className="flex h-[300px] items-start justify-center p-10">
      <NotificationCenter notifications={[]} emptyText="没有未读消息" />
    </div>
  ),
};

export const ManyUnread: Story = {
  render: () => {
    const many: NotificationItem[] = Array.from({ length: 120 }, (_, i) => ({
      id: String(i),
      title: `通知 #${i + 1}`,
      description: "测试通知内容",
      timestamp: Date.now() - i * 60_000,
      read: false,
      type: (["info", "success", "warning", "error"] as const)[i % 4],
    }));
    return (
      <div className="flex h-[400px] items-start justify-center p-10">
        <NotificationCenter notifications={many} />
      </div>
    );
  },
};

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
};
