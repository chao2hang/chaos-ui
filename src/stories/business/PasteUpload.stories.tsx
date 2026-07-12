import type { Meta, StoryObj } from "@storybook/react";
import { PasteUpload } from "@/components/business/paste-upload";

const meta = {
  title: "Business/PasteUpload",
  component: PasteUpload,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {},
} satisfies Meta<typeof PasteUpload>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="bg-card max-w-3xl space-y-3 rounded-xl border p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">PasteUpload</p>
          <p className="text-muted-foreground text-xs">业务场景演示</p>
        </div>
        <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-[11px]">
          Live
        </span>
      </div>
      <div className="rounded-lg border border-dashed p-3">
        <PasteUpload {...args} />
      </div>
    </div>
  ),
};
