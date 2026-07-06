import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MobileShareSheet } from "@/components/mobile/mobile-share-sheet";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Mobile/MobileShareSheet",
  component: MobileShareSheet,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MobileShareSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

const defaultPlatforms = [
  { id: "wechat", label: "WeChat", color: "#07c160", onClick: noop },
  { id: "weibo", label: "Weibo", color: "#e6162d", onClick: noop },
  { id: "qq", label: "QQ", color: "#12b7f5", onClick: noop },
  { id: "link", label: "Copy link", onClick: noop },
];

function Harness({
  initialOpen = true,
  ...rest
}: {
  initialOpen?: boolean;
  title?: string;
  platforms?: typeof defaultPlatforms;
}) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open share sheet</Button>
      <MobileShareSheet
        open={open}
        onClose={() => setOpen(false)}
        platforms={rest.platforms ?? defaultPlatforms}
        {...(rest.title ? { title: rest.title } : {})}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <Harness />,
};

export const CustomTitle: Story = {
  render: () => <Harness title="Share to friends" />,
};

export const FewPlatforms: Story = {
  render: () => (
    <Harness
      platforms={[
        { id: "wechat", label: "WeChat", color: "#07c160", onClick: noop },
        { id: "link", label: "Copy link", onClick: noop },
      ]}
    />
  ),
};

export const Closed: Story = {
  render: () => <Harness initialOpen={false} />,
};
