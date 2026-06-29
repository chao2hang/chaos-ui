import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { ModalProvider } from "@/components/ui/modal-provider";
import { Modal } from "@/lib/modal";

const meta: Meta = {
  title: "Feedback / Modal (Static API)",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <ModalProvider />
        <Story />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "全局命令式模态框 API (`Modal.confirm` / `Modal.info` 等)。需要在应用根挂载 `<ModalProvider />` 才能使用。兼容 antd `Modal.confirm` 调用方式。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Confirm: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Button
        variant="destructive"
        onClick={() => {
          Modal.confirm({
            title: "确认删除?",
            content: "此操作不可撤销,确定要删除这条记录吗?",
            okText: "删除",
            cancelText: "取消",
            okVariant: "destructive",
            onOk: async () => {
              await new Promise((r) => setTimeout(r, 1000));
            },
          });
        }}
      >
        Modal.confirm
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          Modal.info({
            title: "系统提示",
            content: "当前版本将在 30 天后过期,请及时续费。",
          });
        }}
      >
        Modal.info
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          Modal.warning({
            title: "余额不足",
            content: "您的账户余额不足,请充值后继续操作。",
          });
        }}
      >
        Modal.warning
      </Button>
      <Button
        onClick={() => {
          Modal.success({
            title: "操作成功",
            content: "数据已保存到服务器。",
          });
        }}
      >
        Modal.success
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          Modal.error({
            title: "操作失败",
            content: "服务器发生内部错误,请稍后重试。",
          });
        }}
      >
        Modal.error
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          Modal.closeAll();
        }}
      >
        关闭全部
      </Button>
    </div>
  ),
};

export const WithAsyncOnOk: Story = {
  render: () => (
    <div className="p-4">
      <Button
        onClick={() => {
          Modal.confirm({
            title: "异步提交",
            content: "点击确认后,将模拟 2 秒网络请求。",
            okText: "提交",
            cancelText: "取消",
            onOk: async () => {
              await new Promise((r) => setTimeout(r, 2000));
            },
          });
        }}
      >
        异步 onOk
      </Button>
    </div>
  ),
};

export const DisallowMaskClose: Story = {
  render: () => (
    <div className="p-4">
      <Button
        onClick={() => {
          Modal.info({
            title: "不可点击遮罩关闭",
            content: "此弹窗设置了 maskClosable=false,只能通过按钮关闭。",
            maskClosable: false,
          });
        }}
      >
        maskClosable=false
      </Button>
    </div>
  ),
};
