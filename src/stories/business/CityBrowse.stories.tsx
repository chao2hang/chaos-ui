import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CityBrowse } from "@/components/business/city-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/CityBrowse",
  component: CityBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof CityBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { code: "CQ", name: "重庆", province: "重庆市" },
  { code: "SH", name: "上海", province: "上海市" },
  { code: "HZ", name: "杭州", province: "浙江省" },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [picked, setPicked] = useState("");
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">业务选择 · CityBrowse</p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <CityBrowse
          open={open}
          onOpenChange={setOpen}
          items={demoItems}
          onSelect={(row) => {
            setPicked(String(row?.name ?? row?.code ?? ""));
            setOpen(false);
          }}
        />
      </div>
    );
  },
};
