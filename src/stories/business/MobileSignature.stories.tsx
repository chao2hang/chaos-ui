import type { Meta, StoryObj } from "@storybook/react";
import { MobileSignature } from "@/components/business/mobile-signature";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/Mobile/MobileSignature",
  component: MobileSignature,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onSave: () => {} },
} satisfies Meta<typeof MobileSignature>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Hand-drawn signature pad. Renders a blank canvas plus clear / save actions;
 * Storybook's static iframe can't inject real touch events, but the canvas
 * itself, internal clear handling, and save flow are visible.
 */
export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-sm">
      <MobileSignature />
    </div>
  ),
};

export const WithSaveHandler: Story = {
  render: () => (
    <div className="mx-auto flex max-w-sm flex-col gap-2">
      <MobileSignature
        onSave={(blob) => {
          void blob;
        }}
      />
      <p className="text-muted-foreground text-xs">
        onSave receives a PNG blob of the drawn signature.
      </p>
    </div>
  ),
};

export const WithAdjacentButton: Story = {
  render: () => (
    <div className="mx-auto flex max-w-sm flex-col gap-3">
      <MobileSignature />
      <div className="flex justify-end">
        <Button size="sm">Continue</Button>
      </div>
    </div>
  ),
};
