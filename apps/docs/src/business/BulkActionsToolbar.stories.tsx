import type { Meta, StoryObj } from "@storybook/react"
import { BulkActionsToolbar } from "@/components/business/bulk-actions-toolbar"
import { TrashIcon, DownloadIcon, TagIcon, ArchiveIcon } from "lucide-react"

const meta: Meta<typeof BulkActionsToolbar> = {
  title: "Business/BulkActionsToolbar",
  component: BulkActionsToolbar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">已选择 3 / 10 项</p>
      <BulkActionsToolbar
        count={10}
        selectedCount={3}
        onClear={() => console.info("clear")}
        actions={[
          { label: "删除", icon: <TrashIcon />, onClick: () => console.info("delete"), variant: "destructive" },
          { label: "导出", icon: <DownloadIcon />, onClick: () => console.info("export") },
          { label: "打标签", icon: <TagIcon />, onClick: () => console.info("tag") },
          { label: "归档", icon: <ArchiveIcon />, onClick: () => console.info("archive") },
        ]}
      />
    </div>
  ),
}

export const HiddenWhenEmpty: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">无选择时不渲染工具栏</p>
      <BulkActionsToolbar
        count={10}
        selectedCount={0}
        onClear={() => console.info("clear")}
        actions={[{ label: "删除", onClick: () => console.info("delete") }]}
      />
    </div>
  ),
}

export const DisabledActions: Story = {
  render: () => (
    <BulkActionsToolbar
      count={5}
      selectedCount={2}
      onClear={() => console.info("clear")}
      actions={[
        { label: "可用", onClick: () => console.info("ok") },
        { label: "禁用", onClick: () => console.info("nope"), disabled: true },
      ]}
    />
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
