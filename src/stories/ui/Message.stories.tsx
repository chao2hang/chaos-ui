import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { MessageProvider } from "@/components/ui/message-provider";
import { ModalProvider } from "@/components/ui/modal-provider";
import { message } from "@/lib/message";

const meta: Meta = {
  title: "Components/Message (Static API)",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <MessageProvider />
        <ModalProvider />
        <Story />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "全局命令式消息提示 API。需要在应用根挂载 `<MessageProvider />` 才能使用。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function useTrigger() {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <Button
        onClick={() => {
          message.success("保存成功!");
        }}
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          message.error("保存失败,请重试");
        }}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          message.warning("这是一条警告");
        }}
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          message.info("新版本已发布");
        }}
      >
        Info
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          message.loading("正在加载...", { key: "load-1" });
          setTimeout(() => {
            message.success("加载完成", { key: "load-1" });
          }, 1500);
        }}
      >
        Loading → Success
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          const p = new Promise<string>((resolve) => {
            setTimeout(() => resolve("ok"), 1500);
          });
          message.promise(p, {
            loading: "提交中...",
            success: "提交成功",
            error: "提交失败",
          });
        }}
      >
        Promise
      </Button>
    </div>
  );
}

export const Basic: Story = {
  render: () => useTrigger(),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Button
        onClick={() =>
          message.success("用户已创建", {
            description: "您可以前往用户管理页查看详情",
          })
        }
      >
        带 description
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          message.error("网络错误", {
            description: "请检查您的网络连接后重试",
            duration: 5,
          })
        }
      >
        长 duration
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          message.destroy();
        }}
      >
        关闭全部
      </Button>
    </div>
  ),
};
