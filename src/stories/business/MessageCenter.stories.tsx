import type { Meta, StoryObj } from "@storybook/react";
import {
  MessageCenter,
  useMessageCenter,
  type MessageItem,
} from "@/components/business/message-center";
import { notify } from "@/components/business/notify";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof MessageCenter> = {
  title: "Business/MessageCenter",
  component: MessageCenter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "顶栏消息中心（对齐 Ecology WeaMessageCenter）：铃铛 + 未读数 + 分类 tab + 列表 + push store。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageCenter>;

const initialItems: MessageItem[] = [
  {
    id: "1",
    title: "审批到达",
    description: "报销单 #123 待您审批",
    href: "/flow/123",
    read: false,
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    level: "info",
  },
  {
    id: "2",
    title: "系统告警",
    description: "库存低于安全线，请及时补货",
    read: false,
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    level: "warning",
  },
  {
    id: "3",
    title: "审批通过",
    description: "采购单 #456 已审批通过",
    href: "/po/456",
    read: true,
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    level: "success",
  },
];

export const Default: Story = {
  render: () => (
    <div className="flex h-16 items-center justify-end border-b px-4">
      <MessageCenter
        items={initialItems}
        unreadCount={2}
        tabs={[
          { key: "all", label: "全部" },
          { key: "todo", label: "待办" },
        ]}
      />
    </div>
  ),
};

export const WithPushDemo: Story = {
  render: () => {
    const { push, items, unreadCount } = useMessageCenter();
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              push({
                id: `m-${Date.now()}`,
                title: "新消息",
                description: `消息 ${items.length + 1}`,
                read: false,
                timestamp: new Date().toISOString(),
              })
            }
          >
            Push 消息
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              notify.inbox({
                title: "系统通知",
                body: "这是一条 notify.inbox 推送的消息",
                alsoToast: true,
              })
            }
          >
            notify.inbox
          </Button>
        </div>
        <div className="flex h-16 items-center justify-end border-b px-4">
          <MessageCenter items={items} unreadCount={unreadCount} />
        </div>
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => (
    <div className="flex h-16 items-center justify-end border-b px-4">
      <MessageCenter items={[]} unreadCount={0} />
    </div>
  ),
};
