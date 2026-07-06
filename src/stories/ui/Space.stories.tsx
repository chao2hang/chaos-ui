import type { Meta, StoryObj } from "@storybook/react";
import { Space } from "@/components/ui/space";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Components/Space",
  component: Space,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Space>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default horizontal medium spacing. */
export const Default: Story = {
  args: {
    children: (
      <>
        <Button size="sm">Action</Button>
        <Button size="sm" variant="outline">
          Secondary
        </Button>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
      </>
    ),
  },
};

/** Vertical stack. */
export const Vertical: Story = {
  args: {
    direction: "vertical",
    children: (
      <>
        <Button className="w-40" size="sm">
          Save
        </Button>
        <Button className="w-40" size="sm" variant="outline">
          Save as draft
        </Button>
        <Button className="w-40" size="sm" variant="ghost">
          Discard
        </Button>
      </>
    ),
  },
};

/** All built-in size steps. */
export const SizeScale: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size}>
          <div className="text-muted-foreground mb-1 text-xs">
            size = {size}
          </div>
          <Space size={size}>
            <Badge>one</Badge>
            <Badge>two</Badge>
            <Badge>three</Badge>
          </Space>
        </div>
      ))}
    </div>
  ),
};

/** Custom pixel gap. */
export const CustomGap: Story = {
  args: {
    size: 24,
    children: (
      <>
        <Badge>alpha</Badge>
        <Badge>beta</Badge>
        <Badge>gamma</Badge>
      </>
    ),
  },
};

/** Wrap enabled for long rows. */
export const Wrapping: Story = {
  render: () => (
    <div className="w-64">
      <Space size="sm" wrap>
        {Array.from({ length: 12 }, (_, i) => (
          <Badge key={i}>tag-{i + 1}</Badge>
        ))}
      </Space>
    </div>
  ),
};

/** Alignment options. */
export const AlignBaseline: Story = {
  args: {
    align: "baseline",
    children: (
      <>
        <span className="text-3xl font-bold">Chaos</span>
        <span className="text-muted-foreground text-sm">UI toolkit</span>
      </>
    ),
  },
};
