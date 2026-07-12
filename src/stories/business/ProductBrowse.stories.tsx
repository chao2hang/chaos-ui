import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ProductBrowse } from "@/components/business/product-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/ProductBrowse",
  component: ProductBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof ProductBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { id: "1", name: "酱油 500ml", sku: "SKU-001", unit: "瓶", price: 12.5 },
  { id: "2", name: "醋 500ml", sku: "SKU-002", unit: "瓶", price: 8 },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [picked, setPicked] = useState("");
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">业务选择 · ProductBrowse</p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <ProductBrowse
          open={open}
          onOpenChange={setOpen}
          items={demoItems}
          onSelect={(row) => {
            setPicked(String(row?.name ?? row?.id ?? ""));
            setOpen(false);
          }}
        />
      </div>
    );
  },
};
