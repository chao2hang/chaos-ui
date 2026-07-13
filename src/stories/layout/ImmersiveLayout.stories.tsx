import type { Meta, StoryObj } from "@storybook/react";
import { ImmersiveLayout } from "@/components/layout/immersive-layout";

const meta = {
  title: "Layout/ImmersiveLayout",
  component: ImmersiveLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ImmersiveLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FullscreenEditor: Story = {
  render: () => (
    <div className="h-[420px] overflow-hidden border">
      <ImmersiveLayout
        header={<div className="text-sm font-medium">全屏编辑 · 促销页</div>}
        showExitButton
        onExit={() => console.log("exit")}
      >
        <div className="text-muted-foreground p-6 text-sm">
          沉浸式内容区（图表 / 设计器 / 预览）
        </div>
      </ImmersiveLayout>
    </div>
  ),
};
