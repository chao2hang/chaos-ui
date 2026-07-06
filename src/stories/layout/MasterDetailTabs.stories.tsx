import type { Meta, StoryObj } from "@storybook/react";
import { MasterDetailTabs } from "@/components/layout/master-detail-tabs";

const meta = {
  title: "Layouts/MasterDetailTabs",
  component: MasterDetailTabs,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MasterDetailTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (k: string) => {
  void k;
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Three detail tabs — Overview active by default. */
export const ThreeTabs: Story = {
  args: {
    master: (
      <div className="space-y-1 p-3">
        <p className="text-sm font-semibold">Records</p>
        {["Record A", "Record B", "Record C"].map((r, i) => (
          <div
            key={r}
            className={
              "rounded px-2 py-1.5 text-sm " +
              (i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground")
            }
          >
            {r}
          </div>
        ))}
      </div>
    ),
    details: {
      overview: {
        label: "Overview",
        content: (
          <div className="p-4 text-sm">
            <h2 className="mb-2 text-lg font-semibold">Record A</h2>
            <p className="text-muted-foreground">
              High-level summary of the selected record.
            </p>
          </div>
        ),
      },
      activity: {
        label: "Activity",
        content: (
          <ul className="divide-y p-4 text-sm">
            <li className="py-2">2026-07-06 — Status changed to Active</li>
            <li className="py-2">2026-07-04 — Created by Alice</li>
          </ul>
        ),
      },
      settings: {
        label: "Settings",
        content: (
          <div className="text-muted-foreground p-4 text-sm">
            Configure record preferences.
          </div>
        ),
      },
    },
    activeDetail: "overview",
    onDetailChange: noop,
  },
};

/** Single detail tab. */
export const SingleTab: Story = {
  args: {
    master: <p className="p-3 text-sm">Master list</p>,
    details: {
      only: {
        label: "Only",
        content: <p className="p-4 text-sm">Only one detail pane available.</p>,
      },
    },
    activeDetail: "only",
    onDetailChange: noop,
  },
};

/** Custom master width via CSS string. */
export const CustomMasterWidth: Story = {
  args: {
    masterWidth: "18rem",
    master: <p className="p-3 text-sm">Master is 18rem wide in this story.</p>,
    details: {
      a: {
        label: "A",
        content: <p className="p-4 text-sm">Detail pane A.</p>,
      },
      b: {
        label: "B",
        content: <p className="p-4 text-sm">Detail pane B.</p>,
      },
    },
    activeDetail: "a",
    onDetailChange: noop,
  },
};
