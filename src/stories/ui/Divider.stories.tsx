import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "@/components/ui/divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Plain horizontal divider between two blocks. */
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <p className="text-muted-foreground text-sm">Above the divider.</p>
      <Divider />
      <p className="text-muted-foreground text-sm">Below the divider.</p>
    </div>
  ),
};

/** Divider with centered inline text. */
export const WithText: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Divider>OR</Divider>
    </div>
  ),
};

/** Text aligned to the left. */
export const TextLeft: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Divider orientation="left">Section title</Divider>
    </div>
  ),
};

/** Text aligned to the right. */
export const TextRight: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Divider orientation="right">2026 · Q3</Divider>
    </div>
  ),
};

/** Dashed style. */
export const Dashed: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <p className="text-sm">Above</p>
      <Divider dashed />
      <p className="text-sm">Below</p>
    </div>
  ),
};

/** Vertical divider — inline separator. */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-2 text-sm">
      <span>Home</span>
      <Divider type="vertical" />
      <span>Products</span>
      <Divider type="vertical" />
      <span>Contact</span>
    </div>
  ),
};

/** Plain text — no bolder heading treatment. */
export const PlainText: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Divider plain>plain caption</Divider>
    </div>
  ),
};
