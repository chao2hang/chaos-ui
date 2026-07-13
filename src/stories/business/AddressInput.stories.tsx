import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AddressInput } from "@/components/business/address-input";

const meta = {
  title: "Business/AddressInput",
  component: AddressInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AddressInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ShippingAddress: Story = {
  render: () => {
    const [v, setV] = useState({
      province: "上海市",
      city: "上海市",
      district: "黄浦区",
      street: "南京东路",
      detail: "外滩 18 号",
    } as any);
    return (
      <div className="w-full max-w-xl space-y-2">
        <label className="text-sm font-medium">收货地址</label>
        <AddressInput value={v} onChange={setV} showGeolocation={false} />
      </div>
    );
  },
};

export const WithGeolocation: Story = {
  render: () => {
    const [v, setV] = useState({
      province: "浙江省",
      city: "杭州市",
      district: "西湖区",
      street: "文三路",
      detail: "华星时代广场",
      lat: 30.2741,
      lng: 120.1551,
    } as any);
    return (
      <div className="w-full max-w-xl space-y-2">
        <label className="text-sm font-medium">带经纬度</label>
        <AddressInput value={v} onChange={setV} showGeolocation />
      </div>
    );
  },
};
