import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangleIcon, ArchiveIcon } from "@/components/ui/icons";
import { ConfirmDialog } from "@/components/business/confirm-dialog";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;
type ConfirmDialogProps = React.ComponentProps<typeof ConfirmDialog>;

function ConfirmDialogDemo(args: ConfirmDialogProps) {
  const [open, setOpen] = React.useState(args.open ?? true);
  const [confirmed, setConfirmed] = React.useState(false);

  return (
    <div className="flex min-h-48 flex-col items-start gap-3">
      <Button onClick={() => setOpen(true)}>Open confirmation</Button>
      {confirmed && (
        <p className="text-success text-sm">
          The confirm action has been recorded.
        </p>
      )}
      <ConfirmDialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        onConfirm={async () => {
          await args.onConfirm?.();
          setConfirmed(true);
        }}
      />
    </div>
  );
}

export const Default: Story = {
  args: {
    title: "Archive campaign?",
    description:
      "The campaign will be hidden from active dashboards but can be restored later.",
    confirmText: "Archive",
    cancelText: "Keep active",
    icon: <ArchiveIcon className="size-4" />,
  },
  render: (args) => <ConfirmDialogDemo {...args} />,
};

export const Destructive: Story = {
  args: {
    title: "Delete saved audience?",
    description:
      "This action cannot be undone and all linked automations will lose this audience.",
    confirmText: "Delete audience",
    variant: "destructive",
    icon: <AlertTriangleIcon className="text-destructive size-4" />,
  },
  render: (args) => <ConfirmDialogDemo {...args} />,
};

export const Loading: Story = {
  args: {
    open: true,
    title: "Publishing changes",
    description:
      "Please wait while the campaign configuration is being published.",
    confirmText: "Publishing...",
    loading: true,
  },
};

export const LongZhContent: Story = {
  args: {
    title: "从 OA 同步部门",
    description:
      "将从泛微 e-cology 拉取部门/组织并写入本地。已存在的编码会按规则更新名称与上下级关系，不会删除本地独有节点。同步可能需要数十秒，期间请勿重复操作。是否继续？",
    confirmText: "开始同步",
    cancelText: "取消",
  },
  render: (args) => <ConfirmDialogDemo {...args} />,
};
