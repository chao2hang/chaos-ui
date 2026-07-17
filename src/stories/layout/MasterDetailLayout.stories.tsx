import type { Meta, StoryObj } from "@storybook/react";
import { MasterDetailLayout } from "@/components/layout/master-detail-layout";
import { Card, CardSection, CardContent } from "@/components/ui";

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

/* -------------------------------------------------------------------------- */
/*  FE-10 (#60): dual-Card equal-height recipes                               */
/* -------------------------------------------------------------------------- */

/**
 * FE-10 recommended: both slots render `Card className="h-full"` with the same
 * `size`, and `chromeBorder={false}` so the Card border is the only divider.
 * The two Cards equalize height (M1) with no double right border (M2).
 */
export const Fe10DualCardEqualHeight: Story = {
  args: {
    sidebarWidth: 320,
    gap: "md",
    chromeBorder: false,
    sidebar: (
      <Card className="h-full" size="sm">
        <CardSection title="商品分类">
          <CardContent>
            <div className="space-y-1 py-2 text-sm">
              <div className="bg-primary/10 text-primary rounded px-2 py-1.5">
                饮料
              </div>
              <div className="text-muted-foreground px-2 py-1.5">零食</div>
            </div>
          </CardContent>
        </CardSection>
      </Card>
    ),
    main: (
      <Card className="h-full" size="sm">
        <CardSection title="商品管理">
          <CardContent>
            <div className="space-y-2 py-2 text-sm">
              <div>可乐 · ¥3.00 · 100 件</div>
              <div>果汁 · ¥5.00 · 60 件</div>
              <div>薯片 · ¥8.00 · 200 件</div>
              <div className="h-32" />
            </div>
          </CardContent>
        </CardSection>
      </Card>
    ),
  },
};

/**
 * Don't: left `size="sm"` right default → CardSection title rows 12 vs 16 do not
 * align. Also `chromeBorder` defaults to `true`, so the aside border plus the
 * Card border create a double line.
 */
export const DontMismatchedCardSize: Story = {
  args: {
    sidebarWidth: 320,
    gap: "md",
    sidebar: (
      <Card className="h-full" size="sm">
        <CardSection title="左栏 sm">
          <CardContent>短内容</CardContent>
        </CardSection>
      </Card>
    ),
    main: (
      <Card className="h-full">
        <CardSection title="右栏 default">
          <CardContent>
            <div className="h-40" />
          </CardContent>
        </CardSection>
      </Card>
    ),
  },
};

/** Resizable sidebar — drag the right edge of the master to resize (#67). Double-click resets. */
export const Resizable: Story = {
  args: {
    sidebarWidth: 300,
    resizable: true,
    minSidebarWidth: 200,
    maxSidebarWidth: 500,
    sidebar: sampleSidebar,
    main: sampleMain,
  },
};
