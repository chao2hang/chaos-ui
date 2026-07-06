import type { Meta, StoryObj } from "@storybook/react";
import { PrintService, type PrintServiceJob } from "@/components/business/print-service";

const sampleJobs: PrintServiceJob[] = [
  { id: "1", title: "Invoice #INV-001", status: "pending" },
  { id: "2", title: "Report Q3", status: "printing" },
  { id: "3", title: "Label #LBL-42", status: "done" },
  { id: "4", title: "Receipt #RCP-88", status: "error" },
];

const meta = {
  title: "Business/Print/PrintService",
  component: PrintService,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PrintService>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  args: { jobs: sampleJobs },
};

export const Empty: Story = {
  args: { jobs: [] },
};

export const WithCallbacks: Story = {
  args: {
    jobs: sampleJobs,
    onPrint: (job) => { void job; },
    onRefresh: noop,
  },
};
