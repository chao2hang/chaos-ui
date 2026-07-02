import type { Meta, StoryObj } from "@storybook/react";
import { BatchGenealogyTree } from "@/components/business/batch-genealogy-tree";
import type { BatchNode } from "@/components/business/batch-genealogy-tree";

const meta = {
  title: "Business/BatchGenealogyTree",
  component: BatchGenealogyTree,
  tags: ["autodocs"],
} satisfies Meta<typeof BatchGenealogyTree>;
export default meta;
type Story = StoryObj<typeof meta>;

const tree: BatchNode = {
  batchNo: "FG-2026-0789",
  product: "Industrial Control Module v3",
  type: "finished",
  quantity: 500,
  unit: "pcs",
  date: "2026-06-28",
  operator: "Alice Wang",
  status: "released",
  children: [
    {
      batchNo: "WIP-2026-0451",
      product: "PCB Assembly (Main Board)",
      type: "wip",
      quantity: 500,
      unit: "pcs",
      date: "2026-06-25",
      operator: "Bob Li",
      status: "released",
      children: [
        { batchNo: "RAW-LOT-A1023", product: "FR-4 PCB Substrate", type: "raw", quantity: 520, unit: "pcs", date: "2026-06-20", status: "released" },
        { batchNo: "RAW-LOT-B2054", product: "IC Chips (STM32F4)", type: "raw", quantity: 550, unit: "pcs", date: "2026-06-21", status: "released" },
      ],
    },
    {
      batchNo: "WIP-2026-0452",
      product: "Enclosure Assembly",
      type: "wip",
      quantity: 500,
      unit: "pcs",
      date: "2026-06-26",
      operator: "Carol Zhang",
      status: "quarantine",
      children: [
        { batchNo: "RAW-LOT-C3098", product: "Aluminum Housing", type: "raw", quantity: 510, unit: "pcs", date: "2026-06-22", status: "released" },
        {
          batchNo: "WIP-2026-0450",
          product: "Painted Housing (Black)",
          type: "wip",
          quantity: 510,
          unit: "pcs",
          date: "2026-06-24",
          operator: "Dave Chen",
          status: "released",
          children: [
            { batchNo: "RAW-LOT-D4012", product: "Powder Coating (Black)", type: "raw", quantity: 25, unit: "kg", date: "2026-06-23", status: "released" },
          ],
        },
      ],
    },
  ],
};

export const Default: Story = {
  args: { root: tree, direction: "backward" },
};

export const ForwardTrace: Story = {
  args: { root: tree, direction: "forward" },
};

export const SingleBatch: Story = {
  args: {
    root: {
      batchNo: "FG-2026-001",
      product: "Standalone Product",
      type: "finished",
      quantity: 100,
      unit: "pcs",
      date: "2026-06-28",
      status: "released",
    },
  },
};

export const WithScrap: Story = {
  args: {
    root: {
      batchNo: "FG-2026-0800",
      product: "Batch with Scrap",
      type: "finished",
      quantity: 450,
      unit: "pcs",
      date: "2026-06-28",
      status: "released",
      children: [
        { batchNo: "WIP-2026-0500", product: "Good Output", type: "wip", quantity: 450, unit: "pcs", date: "2026-06-27" },
        { batchNo: "SCRAP-2026-001", product: "Rejected Units", type: "scrap", quantity: 50, unit: "pcs", date: "2026-06-27", status: "rejected" },
      ],
    },
  },
};
