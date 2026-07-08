import type { Meta, StoryObj } from "@storybook/react";
import { MasterDetailLayout } from "@/components/layout/master-detail-layout";

const meta: Meta<typeof MasterDetailLayout> = {
  title: "Layouts/MasterDetailLayout",
  component: MasterDetailLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const masterList = (
  <div className="p-4">
    <h3 className="mb-2 font-semibold">Items</h3>
    {["Item A", "Item B", "Item C"].map((item) => (
      <div
        key={item}
        className="hover:bg-muted cursor-pointer rounded px-3 py-2 text-sm"
      >
        {item}
      </div>
    ))}
  </div>
);

const detailPanel = (
  <div className="p-4">
    <h3 className="mb-2 font-semibold">Detail</h3>
    <p className="text-muted-foreground text-sm">
      Select an item to view details.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    master: masterList,
    detail: detailPanel,
  },
};
