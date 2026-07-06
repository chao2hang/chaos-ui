import type { Meta, StoryObj } from "@storybook/react";
import { BackTop } from "@/components/ui/back-top";

const meta = {
  title: "Components/BackTop",
  component: BackTop,
  tags: ["autodocs"],
  parameters: { layout: "pinned" },
} satisfies Meta<typeof BackTop>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default back-to-top button appears after scrolling 400px. */
export const Default: Story = {
  render: () => (
    <div className="relative h-80 w-full max-w-md overflow-y-scroll border">
      <div className="space-y-2 p-4">
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="text-muted-foreground text-sm">
            Line {i + 1} — scroll down to reveal the back-to-top button.
          </p>
        ))}
      </div>
      <BackTop onClick={noop} />
    </div>
  ),
};

/** Lower visibility threshold (120px) and custom position. */
export const LowThreshold: Story = {
  render: () => (
    <div className="relative h-80 w-full max-w-md overflow-y-scroll border">
      <div className="space-y-2 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-muted-foreground text-sm">
            Line {i + 1}
          </p>
        ))}
      </div>
      <BackTop
        visibilityHeight={120}
        position={{ right: 16, bottom: 16 }}
        onClick={noop}
      />
    </div>
  ),
};

/** Custom children — a labelled pill instead of the default icon. */
export const CustomChildren: Story = {
  render: () => (
    <div className="relative h-80 w-full max-w-md overflow-y-scroll border">
      <div className="space-y-2 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-muted-foreground text-sm">
            Line {i + 1}
          </p>
        ))}
      </div>
      <BackTop visibilityHeight={80} onClick={noop}>
        <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs">
          Top
        </span>
      </BackTop>
    </div>
  ),
};
