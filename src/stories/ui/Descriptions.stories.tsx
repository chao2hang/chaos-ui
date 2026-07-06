import type { Meta, StoryObj } from "@storybook/react";
import { Descriptions } from "@/components/ui/descriptions";

const meta = {
  title: "Components/Descriptions",
  component: Descriptions,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Descriptions>;

export default meta;
type Story = StoryObj<typeof meta>;

const orderItems = [
  { label: "Order ID", value: "A2B3-C4D5" },
  { label: "Status", value: "Shipped" },
  { label: "Customer", value: "Alice Chen" },
  { label: "Total", value: "$1,680.00" },
  { label: "Placed at", value: "2026-07-01 09:24" },
  { label: "Shipped at", value: "2026-07-04 15:10" },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default 3-column horizontal descriptions. */
export const Default: Story = {
  args: {
    title: "Order details",
    items: orderItems,
    column: 3,
  },
};

/** Bordered variant. */
export const Bordered: Story = {
  args: {
    title: "Order details",
    items: orderItems,
    column: 2,
    bordered: true,
  },
};

/** Vertical layout — labels above values. */
export const Vertical: Story = {
  args: {
    title: "Order details",
    items: orderItems,
    column: 3,
    layout: "vertical",
    bordered: true,
  },
};

/** Small size. */
export const Small: Story = {
  args: {
    items: orderItems.slice(0, 4),
    column: 2,
    size: "sm",
    bordered: true,
  },
};

/** Compact variant — dense two-column layout. */
export const Compact: Story = {
  args: {
    items: orderItems,
    column: 2,
    variant: "compact",
  },
};
