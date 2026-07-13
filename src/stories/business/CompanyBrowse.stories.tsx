import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CompanyBrowse } from "@/components/business/company-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/CompanyBrowse",
  component: CompanyBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof CompanyBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  {
    id: "1",
    name: "示例科技有限公司",
    code: "EX01",
    taxNo: "91310000MA1KXXXX",
  },
  { id: "2", name: "示例贸易有限公司", code: "EX02" },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [picked, setPicked] = useState("");
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">业务选择 · CompanyBrowse</p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <CompanyBrowse
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
