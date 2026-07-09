import type { Meta, StoryObj } from "@storybook/react";
import { OfficeDocPreview } from "@/components/ui/office-doc-preview";

const meta = {
  title: "Components/OfficeDocPreview",
  component: OfficeDocPreview,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    src: "https://example.com/report.docx",
    fileName: "季度报告.docx",
  },
} satisfies Meta<typeof OfficeDocPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WordDocument: Story = {
  args: {
    src: "https://example.com/report.docx",
    fileName: "季度报告.docx",
  },
};

export const ExcelSpreadsheet: Story = {
  args: {
    src: "https://example.com/data.xlsx",
    fileName: "财务报表.xlsx",
  },
};

export const PowerPoint: Story = {
  args: {
    src: "https://example.com/slides.pptx",
    fileName: "产品演示.pptx",
  },
};

export const GoogleEngine: Story = {
  args: {
    src: "https://example.com/doc.docx",
    fileName: "文档.docx",
    engine: "google",
  },
};

export const WithoutToolbar: Story = {
  args: {
    src: "https://example.com/doc.docx",
    fileName: "文档.docx",
    showToolbar: false,
  },
};

export const NoDownload: Story = {
  args: {
    src: "https://example.com/doc.docx",
    fileName: "机密文档.docx",
    allowDownload: false,
  },
};
