import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Flex",
  component: Flex,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const Boxes = () => (
  <>
    <div className="bg-primary/10 rounded px-3 py-2 text-sm">One</div>
    <div className="bg-primary/10 rounded px-3 py-2 text-sm">Two</div>
    <div className="bg-primary/10 rounded px-3 py-2 text-sm">Three</div>
  </>
);

export const Default: Story = {
  args: { children: <Boxes /> },
};

export const Column: Story = {
  args: { direction: "col", gap: "md", children: <Boxes /> },
};

export const SpaceBetween: Story = {
  args: {
    justify: "between",
    align: "center",
    className: "w-full",
    children: (
      <>
        <span className="font-medium">Title</span>
        <Button size="sm">Action</Button>
      </>
    ),
  },
};

export const LargeGap: Story = {
  args: { gap: "xl", children: <Boxes /> },
};

export const Wrapping: Story = {
  args: {
    wrap: true,
    gap: "sm",
    className: "max-w-64",
    children: (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-primary/10 rounded px-3 py-2 text-sm">
            Item {i + 1}
          </div>
        ))}
      </>
    ),
  },
};

export const BaselineAlign: Story = {
  args: {
    align: "baseline",
    gap: "md",
    children: (
      <>
        <span className="text-xs">xs</span>
        <span className="text-base">base</span>
        <span className="text-2xl font-semibold">2xl</span>
      </>
    ),
  },
};

export const FlexRatio: Story = {
  name: "Flex Ratio (17:7)",
  render: () => (
    <Flex className="w-full gap-2">
      <Flex
        flex={17}
        className="bg-primary/10 rounded px-3 py-4 text-center text-sm"
      >
        flex=17 (wide)
      </Flex>
      <Flex
        flex={7}
        className="bg-primary/20 rounded px-3 py-4 text-center text-sm"
      >
        flex=7 (narrow)
      </Flex>
    </Flex>
  ),
};
