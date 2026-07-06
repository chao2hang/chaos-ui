import type { Meta, StoryObj } from "@storybook/react";
import { PrintTemplateBuilder, type PrintTemplateModel } from "@/components/business/print-template-builder";

const sampleTemplate: PrintTemplateModel = {
  title: "Invoice Template",
  fields: [
    { label: "Company", key: "company" },
    { label: "Invoice No.", key: "invoiceId" },
    { label: "Date", key: "date" },
    { label: "Total", key: "total" },
  ],
};

const meta = {
  title: "Business/Print/PrintTemplateBuilder",
  component: PrintTemplateBuilder,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PrintTemplateBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTemplate: Story = {
  args: { template: sampleTemplate },
};

export const WithChangeCallback: Story = {
  args: {
    template: sampleTemplate,
    onChange: (tmpl) => { void tmpl; },
  },
};
