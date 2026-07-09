import type { Meta, StoryObj } from "@storybook/react";
import { OrgTree } from "@/components/ui/org-tree";
import type { OrgTreeNode } from "@/components/ui/org-tree";

const meta = {
  title: "Components/OrgTree",
  component: OrgTree,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    searchable: false,
    selectable: "none",
  },
} satisfies Meta<typeof OrgTree>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: OrgTreeNode[] = [
  {
    id: "1",
    label: "星辰科技有限公司",
    description: "500人",
    children: [
      {
        id: "2",
        label: "技术中心",
        description: "120人",
        children: [
          {
            id: "4",
            label: "前端研发部",
            description: "35人",
            children: [
              { id: "10", label: "Web 组", description: "18人" },
              { id: "11", label: "移动端组", description: "12人" },
              { id: "12", label: "小程序组", description: "5人" },
            ],
          },
          {
            id: "5",
            label: "后端研发部",
            description: "40人",
            children: [
              { id: "13", label: "Java 组", description: "20人" },
              { id: "14", label: "Go 组", description: "12人" },
              { id: "15", label: "数据组", description: "8人" },
            ],
          },
          {
            id: "6",
            label: "测试部",
            description: "25人",
          },
          {
            id: "7",
            label: "运维部",
            description: "20人",
          },
        ],
      },
      {
        id: "3",
        label: "市场中心",
        description: "80人",
        children: [
          {
            id: "8",
            label: "品牌部",
            description: "30人",
          },
          {
            id: "9",
            label: "销售部",
            description: "50人",
            children: [
              { id: "16", label: "华东区", description: "20人" },
              { id: "17", label: "华南区", description: "18人" },
              { id: "18", label: "华北区", description: "12人" },
            ],
          },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    defaultExpandedKeys: ["1"],
  },
};

export const FullyExpanded: Story = {
  args: {
    data: sampleData,
    defaultExpandedKeys: ["1", "2", "3", "4", "5", "9"],
  },
};

export const SingleSelect: Story = {
  args: {
    data: sampleData,
    selectable: "single",
    defaultExpandedKeys: ["1", "2"],
  },
};

export const WithCheckboxes: Story = {
  args: {
    data: sampleData,
    checkable: true,
    defaultExpandedKeys: ["1", "2"],
  },
};

export const Searchable: Story = {
  args: {
    data: sampleData,
    searchable: true,
    selectable: "single",
  },
};

export const NoLines: Story = {
  args: {
    data: sampleData,
    showLine: false,
    defaultExpandedKeys: ["1", "2"],
  },
};

export const Empty: Story = {
  args: {
    data: [],
    searchable: true,
  },
};
