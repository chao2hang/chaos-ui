import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BatchSelector } from "@/components/business/batch-selector";
import type { BatchNode } from "@/components/business/batch-selector";

const SAMPLE_BATCHES: BatchNode[] = [
  {
    id: "b1",
    batchNo: "B-2024-001",
    productName: "Organic Wheat Flour",
    quantity: 5000,
    status: "completed",
    productionDate: "2024-01-15",
    expiryDate: "2025-01-15",
    children: [
      {
        id: "b1a",
        batchNo: "B-2024-001-A",
        productName: "Organic Wheat Flour (Line 1)",
        quantity: 2500,
        status: "completed",
        productionDate: "2024-01-15",
        expiryDate: "2025-01-15",
      },
      {
        id: "b1b",
        batchNo: "B-2024-001-B",
        productName: "Organic Wheat Flour (Line 2)",
        quantity: 2500,
        status: "in-progress",
        productionDate: "2024-01-16",
        expiryDate: "2025-01-16",
      },
    ],
  },
  {
    id: "b2",
    batchNo: "B-2024-002",
    productName: "Rice Noodles",
    quantity: 3000,
    status: "in-progress",
    productionDate: "2024-03-01",
    expiryDate: "2024-09-01",
  },
  {
    id: "b3",
    batchNo: "B-2024-003",
    productName: "Soy Sauce",
    quantity: 10000,
    status: "pending",
    productionDate: "2024-04-01",
  },
  {
    id: "b4",
    batchNo: "B-2023-099",
    productName: "Chili Paste",
    quantity: 2000,
    status: "expired",
    productionDate: "2023-01-01",
    expiryDate: "2023-12-31",
  },
];

function MultiSelectExample(args: React.ComponentProps<typeof BatchSelector>) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="space-y-3">
      <BatchSelector
        {...args}
        data={SAMPLE_BATCHES}
        value={selected}
        onChange={(ids) => setSelected(ids)}
        mode="multiple"
      />
      <p className="text-muted-foreground text-sm">
        Selected: {selected.join(", ") || "none"}
      </p>
    </div>
  );
}

function SingleSelectExample(args: React.ComponentProps<typeof BatchSelector>) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="space-y-3">
      <BatchSelector
        {...args}
        data={SAMPLE_BATCHES}
        value={selected}
        onChange={(ids) => setSelected(ids)}
        mode="single"
        title="Select a Batch"
      />
      <p className="text-muted-foreground text-sm">
        Selected: {selected[0] ?? "none"}
      </p>
    </div>
  );
}

const meta = {
  title: "Business/BatchSelector",
  component: BatchSelector,
  tags: ["autodocs"],
} satisfies Meta<typeof BatchSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default single-mode selector */
export const Default: Story = {
  args: {} as any,
  render: (args) => <SingleSelectExample {...args} />,
} as Story;

/** Multiple selection mode with checkboxes */
export const MultipleMode: Story = {
  args: {} as any,
  render: (args) => <MultiSelectExample {...args} />,
} as Story;

/** With status badges visible */
export const WithStatus: Story = {
  args: {} as any,
  render: (args) => <MultiSelectExample {...args} showStatus />,
} as Story;

/** With inline metadata display for selected items */
export const WithMetadata: Story = {
  args: {} as any,
  render: (args) => <MultiSelectExample {...args} showMetadata />,
} as Story;

/** Dark mode */
export const DarkMode: Story = {
  args: {} as any,
  render: (args) => <MultiSelectExample {...args} showStatus showMetadata />,
  parameters: {
    themes: { themeOverride: "dark" },
  },
};
