import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "@chaos_team/chaos-ui/ui";
import { useState } from "react";

const meta: Meta<typeof Rating> = {
  title: "Business/Rating",
  component: Rating,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState(3);
    return (
      <div className="space-y-3">
        <Rating value={v} onChange={setV} />
        <p className="text-muted-foreground text-xs">当前：{v} 星</p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Rating size="sm" defaultValue={3} />
      <Rating size="default" defaultValue={4} />
      <Rating size="lg" defaultValue={5} />
    </div>
  ),
};

export const HalfStar: Story = {
  render: () => (
    <Rating
      defaultValue={3.5}
      allowHalf
      onChange={(v) => console.info("rate", v)}
    />
  ),
};

export const Readonly: Story = {
  render: () => (
    <div className="space-y-2">
      <Rating value={4} readonly />
      <Rating value={5} readonly />
      <Rating value={3.5} readonly allowHalf />
    </div>
  ),
};

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
};
