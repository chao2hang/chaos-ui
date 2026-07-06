import type { Meta, StoryObj } from "@storybook/react";
import { Affix } from "@/components/ui/affix";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Affix",
  component: Affix,
  tags: ["autodocs"],
  parameters: { layout: "pinned" },
  args: { children: "Affix content" },
} satisfies Meta<typeof Affix>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (affixed: boolean) => {
  void affixed;
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Affixed to the top with a 80px offset — scrolls within the panel. */
export const TopOffset: Story = {
  render: () => (
    <div className="h-64 w-full max-w-md overflow-y-scroll border">
      <div className="text-muted-foreground h-32 p-4 text-sm">
        Scroll down — the affixed bar sticks to the top at 80px.
      </div>
      <Affix offsetTop={80} onChange={noop}>
        <div className="bg-primary text-primary-foreground flex items-center justify-between px-4 py-2">
          <span className="text-sm font-medium">Sticky action bar</span>
          <Button size="sm" variant="secondary">
            Save
          </Button>
        </div>
      </Affix>
      <div className="text-muted-foreground h-64 p-4 text-sm">
        More scrollable content below the affix point.
      </div>
    </div>
  ),
};

/** Disabled — affix does not engage. */
export const Disabled: Story = {
  args: {
    offsetTop: 0,
    disabled: true,
    children: <div className="bg-muted px-4 py-2 text-sm">Affix disabled</div>,
  },
};
