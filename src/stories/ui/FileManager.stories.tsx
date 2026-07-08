import type { Meta, StoryObj } from "@storybook/react";
import { FileManager } from "@/components/ui/file-manager";
import type { FileNode } from "@/components/ui/file-manager";

const sampleData: FileNode[] = [
  {
    id: "root",
    name: "工作空间",
    type: "folder",
    children: [
      {
        id: "proj",
        name: "项目文档",
        type: "folder",
        children: [
          {
            id: "req",
            name: "需求文档",
            type: "folder",
            children: [
              { id: "f1", name: "PRD_v2.1.docx", type: "file", extension: "docx", size: 204800, modifiedAt: "2026-07-08" },
              { id: "f2", name: "技术方案.md", type: "file", extension: "md", size: 12800, modifiedAt: "2026-07-05" },
            ],
          },
          {
            id: "design",
            name: "设计稿",
            type: "folder",
            children: [
              { id: "f3", name: "首页设计.png", type: "file", extension: "png", size: 512000, modifiedAt: "2026-07-03" },
              { id: "f4", name: "UI规范.sketch", type: "file", extension: "sketch", size: 2048000, modifiedAt: "2026-06-28" },
            ],
          },
        ],
      },
      {
        id: "reports",
        name: "报表",
        type: "folder",
        children: [
          { id: "f5", name: "月度汇总.xlsx", type: "file", extension: "xlsx", size: 35840, modifiedAt: "2026-07-08" },
          { id: "f6", name: "季度报告.pptx", type: "file", extension: "pptx", size: 512000, modifiedAt: "2026-06-30" },
          { id: "f7", name: "年度计划.pdf", type: "file", extension: "pdf", size: 1024000, modifiedAt: "2026-01-15" },
        ],
      },
      { id: "f8", name: "README.md", type: "file", extension: "md", size: 2400, modifiedAt: "2026-07-01" },
      { id: "f9", name: "会议纪要.txt", type: "file", extension: "txt", size: 500, modifiedAt: "2026-07-08" },
    ],
  },
];

const meta = {
  title: "Components/FileManager",
  component: FileManager,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    data: sampleData,
    defaultFolderId: "root",
  },
} satisfies Meta<typeof FileManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const GridView: Story = {
  args: {
    viewMode: "grid",
  },
};

export const NoSidebar: Story = {
  args: {
    showSidebar: false,
  },
};

export const NoToolbar: Story = {
  args: {
    showToolbar: false,
  },
};
