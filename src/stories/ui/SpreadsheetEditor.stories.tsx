import type { Meta, StoryObj } from "@storybook/react";
import { SpreadsheetEditor } from "@/components/ui/spreadsheet-editor";

const meta = {
  title: "Components/SpreadsheetEditor",
  component: SpreadsheetEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    columns: [
      { key: "name", title: "名称", editable: true },
      { key: "qty", title: "数量", type: "number", editable: true },
      { key: "price", title: "单价", type: "number", editable: true },
      {
        key: "status",
        title: "状态",
        type: "select",
        editable: true,
        options: [
          { label: "待审核", value: "pending" },
          { label: "已审核", value: "approved" },
          { label: "已驳回", value: "rejected" },
        ],
      },
      { key: "remark", title: "备注", editable: true },
    ],
    defaultData: [
      { id: "1", name: "笔记本电脑", qty: "10", price: "5999", status: "approved", remark: "" },
      { id: "2", name: "机械键盘", qty: "50", price: "499", status: "pending", remark: "需确认库存" },
      { id: "3", name: "显示器", qty: "20", price: "2499", status: "approved", remark: "" },
    ],
  },
} satisfies Meta<typeof SpreadsheetEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Empty: Story = {
  args: {
    defaultData: [{ id: "1" }],
  },
};

export const ReadOnlyColumns: Story = {
  args: {
    columns: [
      { key: "name", title: "名称", editable: true },
      { key: "qty", title: "数量", type: "number", editable: true },
      { key: "price", title: "单价（自动计算）", type: "number", editable: false },
      { key: "total", title: "小计", type: "number", editable: false },
    ],
    defaultData: [
      { id: "1", name: "商品A", qty: "10", price: "100", total: "1000" },
    ],
  },
};

export const WithoutToolbar: Story = {
  args: {
    showRowControls: false,
  },
};

export const WithoutRowNumbers: Story = {
  args: {
    showRowNumbers: false,
  },
};
