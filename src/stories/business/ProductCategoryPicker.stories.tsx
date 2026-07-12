import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ProductCategoryPicker } from "@/components/business/product-category-picker";

const demoOptions = [
  { value: "p1", label: "调味品" },
  { value: "p2", label: "酱油", parent: "p1" },
];

const meta = {
  title: "Business/ProductCategoryPicker",
  component: ProductCategoryPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    options: demoOptions,
    placeholder: "请选择",
  },
} satisfies Meta<typeof ProductCategoryPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(demoOptions[0]!.value);
    return (
      <div className="max-w-sm space-y-2">
        <p className="text-sm font-semibold">ProductCategoryPicker</p>
        <ProductCategoryPicker
          value={value}
          onChange={(v) => setValue(v ?? "")}
          options={demoOptions}
          placeholder="请选择"
        />
        <p className="text-muted-foreground text-xs">当前：{value || "空"}</p>
      </div>
    );
  },
};
