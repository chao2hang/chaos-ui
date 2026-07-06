import type { Meta, StoryObj } from "@storybook/react";
import { Watermark } from "@/components/ui/watermark";

const meta = {
  title: "Components/Watermark",
  component: Watermark,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Watermark>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default text watermark on a card-shaped container. */
export const Default: Story = {
  args: {
    text: "Chaos UI",
    className: "relative h-64 w-full max-w-xl rounded-lg border bg-card p-6",
  },
  render: (args) => (
    <Watermark {...args}>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Confidential document</h3>
        <p className="text-muted-foreground text-sm">
          The watermark repeats diagonally behind this content.
        </p>
      </div>
    </Watermark>
  ),
};

/** Higher opacity, larger font, and vertical rotation. */
export const HighContrast: Story = {
  args: {
    text: "TOP SECRET",
    fontSize: 24,
    rotate: -30,
    opacity: 0.25,
    className: "relative h-64 w-full max-w-xl rounded-lg border bg-card p-6",
  },
  render: (args) => (
    <Watermark {...args}>
      <p className="text-muted-foreground max-w-sm text-sm">
        Restricted material. Do not distribute outside the authorized channels.
      </p>
    </Watermark>
  ),
};

/** Tight gap for a denser tile pattern. */
export const DenseTile: Story = {
  args: {
    text: "DRAFT",
    gap: [120, 60],
    fontSize: 14,
    rotate: -20,
    className: "relative h-64 w-full max-w-xl rounded-lg border bg-card p-6",
  },
  render: (args) => (
    <Watermark {...args}>
      <p className="text-muted-foreground text-sm">
        Draft content that must not ship without review.
      </p>
    </Watermark>
  ),
};

/** Custom color watermark. */
export const CustomColor: Story = {
  args: {
    text: "CHAOS",
    color: "rgba(220, 38, 38, 0.15)",
    fontSize: 20,
    className: "relative h-64 w-full max-w-xl rounded-lg border bg-card p-6",
  },
  render: (args) => (
    <Watermark {...args}>
      <p className="text-muted-foreground text-sm">
        A red-tinted watermark for internal-only content.
      </p>
    </Watermark>
  ),
};
