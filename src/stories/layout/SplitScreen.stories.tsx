import type { Meta, StoryObj } from "@storybook/react";
import { SplitScreen } from "@/components/layout/split-screen";

const meta = {
  title: "Layouts/SplitScreen",
  component: SplitScreen,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SplitScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Horizontal split — editor on the left, preview on the right. */
export const HorizontalEditorPreview: Story = {
  args: {
    className: "h-[400px]",
    left: (
      <div className="bg-muted/50 flex h-full items-center justify-center text-sm">
        Editor pane
      </div>
    ),
    right: (
      <div className="bg-primary/5 flex h-full items-center justify-center text-sm">
        Preview pane
      </div>
    ),
  },
};

/** Vertical split — top and bottom panes. */
export const VerticalTopBottom: Story = {
  args: {
    direction: "vertical",
    className: "h-[400px]",
    left: (
      <div className="bg-muted/50 flex h-full items-center justify-center text-sm">
        Top pane
      </div>
    ),
    right: (
      <div className="bg-primary/5 flex h-full items-center justify-center text-sm">
        Bottom pane
      </div>
    ),
  },
};

/** Login / marketing split — form on the left, brand panel on the right. */
export const AuthSplit: Story = {
  args: {
    className: "h-[400px]",
    left: (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <h2 className="text-lg font-semibold">Sign in to Chaos UI</h2>
        <p className="text-muted-foreground text-sm">Welcome back.</p>
      </div>
    ),
    right: (
      <div className="bg-primary text-primary-foreground flex h-full items-center justify-center p-8">
        <p className="max-w-xs text-center text-sm">
          &ldquo;A design system that scales with your team.&rdquo;
        </p>
      </div>
    ),
  },
};

/** Only one pane populated — the other renders empty. */
export const SinglePane: Story = {
  args: {
    className: "h-[300px]",
    left: (
      <div className="bg-muted/50 flex h-full items-center justify-center text-sm">
        Only the left pane has content.
      </div>
    ),
  },
};
