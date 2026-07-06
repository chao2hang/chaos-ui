import type { Meta, StoryObj } from "@storybook/react";
import { PrintTemplateLayout } from "@/components/layout/print-template-layout";

const meta = {
  title: "Layouts/PrintTemplateLayout",
  component: PrintTemplateLayout,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PrintTemplateLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Invoice-style print template. */
export const Invoice: Story = {
  render: () => (
    <PrintTemplateLayout title="Invoice #INV-2026-07-06-001">
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Chaos UI Inc.</p>
            <p className="text-muted-foreground">123 Market Street</p>
            <p className="text-muted-foreground">San Francisco, CA 94103</p>
          </div>
          <div className="text-right">
            <p>Bill to: Alice Chen</p>
            <p className="text-muted-foreground">Due: 2026-07-20</p>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Qty</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Design system license</td>
              <td className="py-2 text-right">1</td>
              <td className="py-2 text-right">$1,200.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Support — 1 year</td>
              <td className="py-2 text-right">1</td>
              <td className="py-2 text-right">$480.00</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold" colSpan={2}>
                Total
              </td>
              <td className="py-2 text-right font-semibold">$1,680.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PrintTemplateLayout>
  ),
};

/** Cover sheet — title and short body. */
export const CoverSheet: Story = {
  render: () => (
    <PrintTemplateLayout title="Quarterly Report — Q3 2026">
      <p className="text-muted-foreground text-sm">
        Confidential. Prepared by the Platform Infrastructure team.
      </p>
    </PrintTemplateLayout>
  ),
};

/** Body-only — title rendered elsewhere. */
export const BodyOnly: Story = {
  render: () => (
    <PrintTemplateLayout>
      <p className="text-sm">
        A print template without a title — the consumer renders the heading
        separately.
      </p>
    </PrintTemplateLayout>
  ),
};
