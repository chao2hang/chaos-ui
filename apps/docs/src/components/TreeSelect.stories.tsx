import type { Meta, StoryObj } from "@storybook/react";
import { TreeSelect, type TreeNode } from "@/components/ui/tree-select";
import { useState } from "react";

const sampleData: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    children: [
      { id: "1-1", label: "Work" },
      { id: "1-2", label: "Personal" },
    ],
  },
  {
    id: "2",
    label: "Images",
    children: [
      { id: "2-1", label: "Photo1.jpg" },
      { id: "2-2", label: "Photo2.png" },
    ],
  },
];

const meta: Meta<typeof TreeSelect> = {
  title: "Components/TreeSelect",
  component: TreeSelect,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div className="w-[300px]">
        <TreeSelect
          data={sampleData}
          value={value}
          onChange={setValue}
          placeholder="Select..."
        />
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <TreeSelect
          data={sampleData}
          value={value}
          onChange={setValue}
          multiple
          placeholder="Select items..."
        />
      </div>
    );
  },
};

export const WithDefault: Story = {
  args: {
    data: sampleData,
    defaultValue: "1-1",
  },
};
