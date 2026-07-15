import type { Meta, StoryObj } from "@storybook/react";
import { OrderLineEditor } from "@/components/business/order-line-editor";

const meta = {
  title: "Business/OrderLineEditor",
  component: OrderLineEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { data: [] },
} satisfies Meta<typeof OrderLineEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [{ id: "1", sku: "", qty: 1, price: 0 }],
    skuOptions: [{ value: "sku-1", label: "示例商品", price: 10 }],
    currency: "CNY",
  },
  render: (args) => (
    <div className="bg-card max-w-3xl space-y-3 rounded-xl border p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">OrderLineEditor</p>
          <p className="text-muted-foreground text-xs">
            轻预设演示。复杂下单（赠送 / 单位换算）请用 LineEditor 自组列。
          </p>
        </div>
        <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-[11px]">
          Thin preset
        </span>
      </div>
      <div className="rounded-lg border border-dashed p-3">
        <OrderLineEditor {...args} />
      </div>
    </div>
  ),
};
