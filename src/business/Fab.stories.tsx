import type { Meta, StoryObj } from "@storybook/react"
import { Fab, FabSpeedDial, BackTop } from "@/components/business/fab"
import {
  PlusIcon,
  EditIcon,
  ShareIcon,
  TrashIcon,
  DownloadIcon,
  ChevronUpIcon,
} from "lucide-react"

const meta = {
  title: "Business/Fab",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="relative h-72 overflow-hidden rounded-md border">
      <p className="p-4 text-sm text-muted-foreground">右下角浮动按钮</p>
      <Fab icon={<PlusIcon />} label="新建" onClick={() => console.info("click")} />
    </div>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="relative h-72 overflow-hidden rounded-md border">
      <p className="p-4 text-sm text-muted-foreground">不同位置</p>
      <Fab icon={<PlusIcon />} position="bottom-right" />
      <Fab icon={<EditIcon />} position="bottom-left" />
      <Fab icon={<ShareIcon />} position="bottom-center" />
    </div>
  ),
}

export const SpeedDialExample: Story = {
  render: () => (
    <div className="relative h-72 overflow-hidden rounded-md border">
      <p className="p-4 text-sm text-muted-foreground">点击主按钮展开操作</p>
      <FabSpeedDial
        icon={<PlusIcon />}
        actions={[
          { label: "编辑", icon: <EditIcon />, onClick: () => console.info("edit") },
          { label: "分享", icon: <ShareIcon />, onClick: () => console.info("share") },
          { label: "导出", icon: <DownloadIcon />, onClick: () => console.info("export") },
          { label: "删除", icon: <TrashIcon />, onClick: () => console.info("delete") },
        ]}
      />
    </div>
  ),
}

export const BackTopExample: Story = {
  render: () => (
    <div className="relative h-72 overflow-auto rounded-md border">
      <div className="h-[600px] p-4 text-sm text-muted-foreground">
        向下滚动查看返回顶部按钮
      </div>
      <BackTop />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
