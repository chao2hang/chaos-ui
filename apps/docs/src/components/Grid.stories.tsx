import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "@/components/ui/grid";

const meta = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted flex h-12 items-center justify-center rounded text-xs">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    children: [
      <Cell key="1">1</Cell>,
      <Cell key="2">2</Cell>,
      <Cell key="3">3</Cell>,
      <Cell key="4">4</Cell>,
      <Cell key="5">5</Cell>,
      <Cell key="6">6</Cell>,
    ],
  },
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    gap: 4,
    children: [
      <Cell key="1">1</Cell>,
      <Cell key="2">2</Cell>,
      <Cell key="3">3</Cell>,
      <Cell key="4">4</Cell>,
      <Cell key="5">5</Cell>,
      <Cell key="6">6</Cell>,
    ],
  },
};
