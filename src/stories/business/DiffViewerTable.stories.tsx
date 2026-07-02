import type { Meta, StoryObj } from "@storybook/react";
import { DiffViewerTable } from "@/components/business/diff-viewer-table";
import type { DiffColumn } from "@/components/business/diff-viewer-table";

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

type OrderRow = Record<string, unknown> & {
  id: string;
  product: string;
  sku: string;
  qty: number;
  price: number;
  status: string;
};

/* -------------------------------------------------------------------------- */
/*  Column definitions                                                        */
/* -------------------------------------------------------------------------- */

const orderColumns: DiffColumn<OrderRow>[] = [
  { key: "product", title: "Product" },
  { key: "sku", title: "SKU" },
  { key: "qty", title: "Quantity", align: "right" as const },
  {
    key: "price",
    title: "Price",
    align: "right" as const,
    render: (value) => `$${Number(value).toFixed(2)}`,
  },
  { key: "status", title: "Status" },
];

/* -------------------------------------------------------------------------- */
/*  Default data                                                              */
/* -------------------------------------------------------------------------- */

const defaultBefore: OrderRow[] = [
  { id: "o1", product: "Wireless Mouse", sku: "WM-001", qty: 100, price: 29.99, status: "Active" },
  { id: "o2", product: "USB-C Cable", sku: "UC-002", qty: 500, price: 9.99, status: "Active" },
  { id: "o3", product: "Desk Lamp", sku: "DL-003", qty: 50, price: 45.00, status: "Active" },
  { id: "o4", product: "Notebook A5", sku: "NB-004", qty: 200, price: 4.50, status: "Active" },
  { id: "o5", product: "Webcam HD", sku: "WC-005", qty: 75, price: 69.99, status: "Active" },
];

const defaultAfter: OrderRow[] = [
  { id: "o1", product: "Wireless Mouse", sku: "WM-001", qty: 100, price: 29.99, status: "Active" },
  { id: "o2", product: "USB-C Cable", sku: "UC-002", qty: 350, price: 8.99, status: "Active" },
  { id: "o3", product: "Desk Lamp Pro", sku: "DL-003", qty: 50, price: 55.00, status: "Premium" },
  { id: "o5", product: "Webcam HD", sku: "WC-005", qty: 75, price: 69.99, status: "Active" },
  { id: "o6", product: "Keyboard Mech", sku: "KB-006", qty: 120, price: 89.99, status: "New" },
  { id: "o7", product: "Monitor Stand", sku: "MS-007", qty: 30, price: 35.00, status: "New" },
];
// o4 removed, o2 changed (qty + price), o3 changed (product + price + status), o6 added, o7 added

/* -------------------------------------------------------------------------- */
/*  Meta                                                                      */
/* -------------------------------------------------------------------------- */

const meta = {
  title: "Business/DiffViewerTable",
  component: DiffViewerTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DiffViewerTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default unified view with sample order data. */
export const Default: Story = {
  args: {
    before: defaultBefore,
    after: defaultAfter,
    rowKey: "id",
    columns: orderColumns as any,
    showSummary: true,
    viewMode: "unified",
  },
};

/** Side-by-side comparison view. */
export const SideBySide: Story = {
  args: {
    before: defaultBefore,
    after: defaultAfter,
    rowKey: "id",
    columns: orderColumns as any,
    showSummary: true,
    viewMode: "side-by-side",
  },
};

/** Show only changed rows (added, removed, changed). */
export const ShowChangesOnly: Story = {
  args: {
    before: defaultBefore,
    after: defaultAfter,
    rowKey: "id",
    columns: orderColumns as any,
    showSummary: true,
    viewMode: "unified",
    showChangesOnly: true,
  },
};

/** Dark mode preview. */
export const DarkMode: Story = {
  args: {
    before: defaultBefore,
    after: defaultAfter,
    rowKey: "id",
    columns: orderColumns as any,
    showSummary: true,
    viewMode: "unified",
    className: "dark",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
