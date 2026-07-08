import type { Meta, StoryObj } from "@storybook/react";
import { PDFViewer } from "@/components/business/pdf-viewer";

const meta: Meta<typeof PDFViewer> = {
  title: "Business/PDFViewer",
  component: PDFViewer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://example.com/document.pdf",
    title: "项目报告.pdf",
  },
};

export const WithoutTitle: Story = {
  args: {
    src: "https://example.com/document.pdf",
  },
};

export const Dark: Story = {
  args: {
    src: "https://example.com/document.pdf",
    title: "暗色主题预览",
  },
  parameters: { backgrounds: { default: "dark" } },
};
