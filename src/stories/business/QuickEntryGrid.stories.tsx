import type { Meta, StoryObj } from "@storybook/react";
import { QuickEntryGrid } from "@/components/business/quick-entry-grid";

const meta = {
  title: "Business/QuickEntryGrid",
  component: QuickEntryGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { entries: [] },
} satisfies Meta<typeof QuickEntryGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="bg-card max-w-3xl space-y-3 rounded-xl border p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">QuickEntryGrid</p>
          <p className="text-muted-foreground text-xs">业务场景演示</p>
        </div>
        <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-[11px]">
          Live
        </span>
      </div>
      <div className="rounded-lg border border-dashed p-3">
        <QuickEntryGrid {...args} />
      </div>
    </div>
  ),
};
