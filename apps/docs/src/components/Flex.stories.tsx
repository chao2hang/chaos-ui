import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "@/components/ui/flex";

const meta: Meta<typeof Flex> = {
  title: "Components/Flex",
  component: Flex,
  tags: ["autodocs"],

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted flex h-12 w-12 items-center justify-center rounded text-xs">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    children: [
      <Box key="1">1</Box>,
      <Box key="2">2</Box>,
      <Box key="3">3</Box>,
    ],
  },
};

export const WithGap: Story = {
  args: {
    gap: 4,
    children: [
      <Box key="1">1</Box>,
      <Box key="2">2</Box>,
      <Box key="3">3</Box>,
    ],
  },
};

export const Column: Story = {
  args: {
    direction: "column",
    gap: 2,
    children: [
      <Box key="1">1</Box>,
      <Box key="2">2</Box>,
      <Box key="3">3</Box>,
    ],
  },
};

export const Centered: Story = {
  args: {
    justify: "center",
    align: "center",
    className: "h-24 border rounded",
    children: [<Box key="1">1</Box>, <Box key="2">2</Box>],
  },
};
