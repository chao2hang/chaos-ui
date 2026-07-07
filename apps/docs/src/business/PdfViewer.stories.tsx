import type { Meta, StoryObj } from "@storybook/react";
import { PDFViewer } from "@/components/business/pdf-viewer";

const meta = {
  title: "Business/PdfViewer",
  component: PDFViewer,
  tags: ["autodocs"],
} satisfies Meta<typeof PDFViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
