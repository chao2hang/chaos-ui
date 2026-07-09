import type { Meta, StoryObj } from "@storybook/react";
import { Tour, type TourStep } from "@chaos_team/chaos-ui/ui";
import { useState } from "react";
import { Button } from "@chaos_team/chaos-ui/ui";

const meta = {
  title: "Business/Tour",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const steps: TourStep[] = [
  {
    target: "#tour-step-1",
    title: "欢迎来到工作台",
    description: "这是工作台的入口。你可以在这里看到所有项目的概览。",
    placement: "bottom",
  },
  {
    target: "#tour-step-2",
    title: "创建项目",
    description: "点击这里快速创建一个新项目。",
    placement: "right",
  },
  {
    target: "#tour-step-3",
    title: "通知中心",
    description: "所有项目相关的通知会汇总到这里。",
    placement: "left",
  },
  {
    target: "#tour-step-4",
    title: "准备好了",
    description: "开始你的协作之旅吧！",
  },
];

function Page() {
  return (
    <div className="grid h-screen grid-cols-[200px_1fr_200px] gap-4 p-8">
      <aside className="bg-card rounded-md border p-4">
        <div
          id="tour-step-1"
          className="bg-primary/10 rounded p-2 text-sm font-medium"
        >
          工作台
        </div>
      </aside>
      <main className="bg-card rounded-md border p-4">
        <div
          id="tour-step-2"
          className="bg-success/10 rounded p-2 text-sm font-medium"
        >
          + 新建项目
        </div>
        <div className="text-muted-foreground mt-6 text-xs">主内容区</div>
      </main>
      <aside className="bg-card rounded-md border p-4">
        <div
          id="tour-step-3"
          className="bg-warning/10 rounded p-2 text-sm font-medium"
        >
          通知
        </div>
        <div
          id="tour-step-4"
          className="bg-muted mt-4 rounded p-2 text-sm font-medium"
        >
          头像
        </div>
      </aside>
    </div>
  );
}

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Page />
        <div className="fixed top-4 left-1/2 z-[10000] -translate-x-1/2">
          <Button size="sm" onClick={() => setOpen(true)}>
            重新开始引导
          </Button>
        </div>
        <Tour
          steps={steps}
          open={open}
          onOpenChange={setOpen}
          onComplete={() => console.info("complete")}
          onSkip={() => console.info("skip")}
        />
      </>
    );
  },
};

export const OpenOnce: Story = {
  render: () => (
    <>
      <Page />
      <Tour
        steps={steps}
        storageKey="storybook-tour-once"
        onComplete={() => console.info("complete")}
      />
    </>
  ),
};

export const CustomPlacement: Story = {
  render: () => {
    const custom: TourStep[] = [
      {
        target: "#tour-step-1",
        title: "顶部弹出",
        placement: "top",
        offset: 16,
        description: "popover 显示在目标元素上方",
      },
      {
        target: "#tour-step-2",
        title: "右侧弹出",
        placement: "right",
        description: "popover 显示在目标元素右侧",
      },
    ];
    return (
      <>
        <Page />
        <Tour steps={custom} open />
      </>
    );
  },
};

export const SingleStep: Story = {
  render: () => (
    <>
      <Page />
      <Tour
        steps={[
          {
            target: "#tour-step-2",
            title: "只有一个步骤",
            description: "下一步按钮会变成「完成」",
          },
        ]}
        open
      />
    </>
  ),
};

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
};
