import type { Meta, StoryObj } from "@storybook/react";
import { PDFViewer } from "@/components/business/pdf-viewer";

const meta: Meta<typeof PDFViewer> = {
  title: "Business/PdfViewer",
  component: PDFViewer,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
