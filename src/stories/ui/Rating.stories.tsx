import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "@/components/ui/rating";

const meta = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (v: number) => {
  void v;
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default 5-star rating, pre-set to 3. */
export const Default: Story = {
  args: {
    defaultValue: 3,
    onChange: noop,
  },
};

/** Controlled value at 5 stars. */
export const FiveStars: Story = {
  args: {
    value: 5,
    onChange: noop,
  },
};

/** Large size. */
export const Large: Story = {
  args: {
    value: 4,
    size: "lg",
    onChange: noop,
  },
};

/** Read-only — interaction disabled. */
export const Readonly: Story = {
  args: {
    value: 4,
    readonly: true,
  },
};

/** Half-star allowed (value 3.5). */
export const AllowHalf: Story = {
  args: {
    value: 3.5,
    allowHalf: true,
    onChange: noop,
  },
};

/** 10-star scale. */
export const TenStars: Story = {
  args: {
    value: 7,
    max: 10,
    size: "sm",
    onChange: noop,
  },
};
