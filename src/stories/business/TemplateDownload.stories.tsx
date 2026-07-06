import type { Meta, StoryObj } from "@storybook/react";
import { TemplateDownload } from "@/components/business/template-download";

const templates = [
  { id: "1", name: "Employee import template", url: "/templates/employees.csv", type: "csv" as const },
  { id: "2", name: "Product import template", url: "/templates/products.xlsx", type: "xlsx" as const },
];

const meta = { title: "Business/Forms/TemplateDownload", component: TemplateDownload, tags: ["autodocs"], parameters: { layout: "padded" }, args: { templates: [] } } satisfies Meta<typeof TemplateDownload>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { templates } };
export const Single: Story = { args: { templates: templates.slice(0, 1) } };
export const WithCallback: Story = { args: { templates, onDownload: (t) => { void t; } } };
