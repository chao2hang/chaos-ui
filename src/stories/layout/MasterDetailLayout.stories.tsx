import type { Meta, StoryObj } from "@storybook/react";
import { MasterDetailLayout } from "@/components/layout/master-detail-layout";

const meta = {
  title: "Layouts/MasterDetailLayout",
  component: MasterDetailLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MasterDetailLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (open: boolean) => {
  void open;
};

const sampleSidebar = (
  <div className="space-y-1 p-3">
    <p className="text-sm font-semibold">Items</p>
    {["Alpha", "Beta", "Gamma", "Delta", "Epsilon"].map((name, i) => (
      <div
        key={name}
        className={
          "rounded px-2 py-1.5 text-sm " +
          (i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground")
        }
      >
        {name}
      </div>
    ))}
  </div>
);

const sampleMain = (
  <div className="space-y-3 p-4">
    <h2 className="text-lg font-semibold">Alpha</h2>
    <p className="text-muted-foreground text-sm">
      Selecting an item in the master list updates this main pane. The master
      can collapse into a drawer on narrow screens.
    </p>
    <dl className="grid grid-cols-2 gap-2 text-sm">
      <dt className="text-muted-foreground">ID</dt>
      <dd>alpha-001</dd>
      <dt className="text-muted-foreground">Created</dt>
      <dd>2026-07-01</dd>
      <dt className="text-muted-foreground">Owner</dt>
      <dd>Alice Chen</dd>
    </dl>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default master-detail with medium gap. */
export const Default: Story = {
  args: {
    sidebar: sampleSidebar,
    main: sampleMain,
    gap: "md",
  },
};

/** Wide master sidebar (320px) with small gap. */
export const WideMaster: Story = {
  args: {
    sidebar: sampleSidebar,
    main: sampleMain,
    sidebarWidth: 320,
    gap: "sm",
  },
};

/** Collapsible master — collapses to a drawer on narrow screens. */
export const Collapsible: Story = {
  args: {
    sidebar: sampleSidebar,
    main: sampleMain,
    collapsible: true,
    defaultMasterOpen: true,
    onMasterOpenChange: noop,
  },
};

/** Large gap between the two panes. */
export const LargeGap: Story = {
  args: {
    sidebar: sampleSidebar,
    main: sampleMain,
    gap: "lg",
  },
};

/** Collapsible on desktop too (not just mobile). */
export const CollapsibleDesktop: Story = {
  args: {
    sidebar: sampleSidebar,
    main: sampleMain,
    collapsible: true,
    collapsibleDesktop: true,
    defaultMasterOpen: true,
    onMasterOpenChange: noop,
  },
};
