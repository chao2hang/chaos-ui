import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Space } from "@/components/ui/space";

const meta = {
  title: "Components/Space",
  component: Space,
  tags: ["autodocs"],
} satisfies Meta<typeof Space>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-muted inline-flex h-8 items-center rounded px-3 text-xs">
    {children}
  </span>
);

export const Horizontal: Story = {
  args: {
    children: [
      <Item key="a">A</Item>,
      <Item key="b">B</Item>,
      <Item key="c">C</Item>,
    ],
  },
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
    children: [
      <Item key="a">A</Item>,
      <Item key="b">B</Item>,
      <Item key="c">C</Item>,
    ],
  },
};

export const LargeGap: Story = {
  args: {
    size: "large",
    children: [
      <Item key="a">A</Item>,
      <Item key="b">B</Item>,
      <Item key="c">C</Item>,
    ],
  },
};
