import type { Meta, StoryObj } from "@storybook/react";
import { MobilePageHeader } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobilePageHeader> = {
  title: "Business/MobilePageHeader",
  component: MobilePageHeader,
  tags: ["autodocs"],
  args: {
    title: "订单详情",
    description: "ERP / 企业级移动端场景的粘性页面头部",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBack: () => {},
    onMenu: () => {},
  },
};

export const WithoutActions: Story = {
  args: {},
};

export const WithBreadcrumb: Story = {
  args: {
    onBack: () => {},
    breadcrumbItems: [
      { label: "首页", href: "#" },
      { label: "订单", href: "#" },
      { label: "订单详情" },
    ],
  },
};
