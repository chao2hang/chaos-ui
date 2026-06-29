import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  SavedFilters,
  type SavedFilter,
} from "@/components/business/saved-filters";

const savedFilters: SavedFilter[] = [
  {
    id: "high-value",
    name: "High value customers",
    filters: { lifetimeValue: { gte: 500 }, consent: true },
    createdAt: "2026-06-01",
    isPinned: true,
  },
  {
    id: "winback",
    name: "Winback candidates",
    filters: { lastPurchaseDays: { gte: 60 }, openedEmail: true },
    createdAt: "2026-06-05",
  },
  {
    id: "sms-ready",
    name: "SMS opted-in",
    filters: { smsConsent: true },
    createdAt: "2026-06-08",
  },
];

const meta = {
  title: "Business/SavedFilters",
  component: SavedFilters,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof SavedFilters>;

export default meta;
type Story = StoryObj<typeof meta>;
type SavedFiltersProps = React.ComponentProps<typeof SavedFilters>;

function SavedFiltersDemo(args: SavedFiltersProps) {
  const [filters, setFilters] = React.useState(args.filters);
  const [activeId, setActiveId] = React.useState(args.activeId);

  return (
    <div className="flex min-h-44 flex-col items-start gap-3 p-4">
      <SavedFilters
        {...args}
        filters={filters}
        {...(activeId !== undefined && { activeId })}
        onApply={(id) => {
          setActiveId(id);
          args.onApply?.(id);
        }}
        onSave={(name) => {
          setFilters((items) => [
            ...items,
            {
              id: name.toLowerCase().replace(/\s+/g, "-"),
              name,
              filters: { createdFromStory: true },
              createdAt: new Date().toISOString(),
            },
          ]);
          args.onSave?.(name);
        }}
        onDelete={(id) => {
          setFilters((items) => items.filter((item) => item.id !== id));
          if (activeId === id) setActiveId(undefined);
          args.onDelete?.(id);
        }}
        onPin={(id) => {
          setFilters((items) =>
            items.map((item) =>
              item.id === id ? { ...item, isPinned: !item.isPinned } : item,
            ),
          );
          args.onPin?.(id);
        }}
      />
      <p className="text-xs text-muted-foreground">
        Active filter: <span className="font-mono">{activeId ?? "none"}</span>
      </p>
    </div>
  );
}

export const Default: Story = {
  args: {
    filters: savedFilters,
    activeId: "high-value",
  },
  render: (args) => <SavedFiltersDemo {...args} />,
};

export const CustomLabel: Story = {
  args: {
    filters: savedFilters,
    activeId: "sms-ready",
    label: "Audience presets",
  },
  render: (args) => <SavedFiltersDemo {...args} />,
};

export const ReadOnly: Story = {
  args: {
    filters: savedFilters,
    activeId: "winback",
  },
};

export const Empty: Story = {
  args: {
    filters: [],
  },
  render: (args) => <SavedFiltersDemo {...args} />,
};
