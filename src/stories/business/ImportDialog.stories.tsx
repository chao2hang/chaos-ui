import type { Meta, StoryObj } from "@storybook/react";
import { ImportDialog } from "@/components/business/import-dialog";

const meta = {
  title: "Business/Dialogs/ImportDialog",
  component: ImportDialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ImportDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <ImportDialog
        open
        onOpenChange={noop}
        title="Import contacts"
        importText="Upload & import"
        templateUrl="/templates/contacts.csv"
        onImport={(file) => { void file; }}
      />
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <div className="p-4">
      <ImportDialog
        open
        onOpenChange={noop}
        title="Bulk upload products"
        importText="Start upload"
        templateText="Download product template"
        accept=".csv,.xlsx"
        templateUrl="/templates/products.csv"
      />
    </div>
  ),
};
