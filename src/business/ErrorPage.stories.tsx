import type { Meta, StoryObj } from "@storybook/react";
import { ShieldAlertIcon } from "@/components/ui/icons";
import { ErrorPage } from "@/components/business/error-page";

const meta = {
  title: "Business/ErrorPage",
  component: ErrorPage,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
  args: {
    status: 404,
    showBack: false,
  },
};

export const Unauthorized: Story = {
  args: {
    status: 403,
    showBack: false,
    illustration: <ShieldAlertIcon className="mx-auto size-12 text-warning" />,
  },
};

export const ServerError: Story = {
  args: {
    status: 500,
    title: "审批服务暂时异常",
    description:
      "系统没有拿到稳定响应。请稍后重试，或携带当前操作信息联系管理员。",
  },
};

export const Maintenance: Story = {
  args: {
    status: 503,
    title: "Reports are being rebuilt",
    description:
      "Campaign reporting is temporarily unavailable while new data is indexed.",
    showBack: false,
  },
};
