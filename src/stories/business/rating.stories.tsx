import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "@/components/ui/rating";

const meta = {
  title: "Business/DataDisplay/Rating",
  component: Rating,
  tags: ["autodocs"],
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 3.5,
    allowHalf: true,
  },
};

export const Interactive: Story = {
  args: {
    defaultValue: 4,
    max: 5,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4.5,
    readonly: true,
    allowHalf: true,
  },
};

export const Small: Story = {
  args: {
    defaultValue: 3,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    defaultValue: 5,
    size: "lg",
  },
};

export const TenStar: Story = {
  args: {
    defaultValue: 7,
    max: 10,
    size: "sm",
  },
};
