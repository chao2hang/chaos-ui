import type { Meta, StoryObj } from "@storybook/react";
import { EditableTreeTable } from "@/components/business/editable-tree-table";
import type { EditableTreeTableColumn } from "@/components/business/editable-tree-table";

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

type BomNode = Record<string, unknown> & {
  id: string;
  name: string;
  qty: number;
  unit: string;
  cost: number;
  children?: BomNode[];
};

/* -------------------------------------------------------------------------- */
/*  Default data                                                              */
/* -------------------------------------------------------------------------- */

const simpleData: BomNode[] = [
  { id: "1", name: "Widget Alpha", qty: 100, unit: "pcs", cost: 5.5 },
  { id: "2", name: "Widget Beta", qty: 50, unit: "pcs", cost: 12.0 },
  { id: "3", name: "Material X", qty: 200, unit: "kg", cost: 1.25 },
];

const simpleColumns: EditableTreeTableColumn<BomNode>[] = [
  { key: "name", title: "Name" },
  {
    key: "qty",
    title: "Quantity",
    editable: true,
    editorType: "number",
  },
  {
    key: "unit",
    title: "Unit",
    editable: true,
    editorType: "select",
    editorOptions: [
      { value: "pcs", label: "Pieces" },
      { value: "kg", label: "Kilograms" },
      { value: "m", label: "Meters" },
      { value: "L", label: "Liters" },
    ],
  },
  {
    key: "cost",
    title: "Unit Cost",
    align: "right" as const,
    editable: true,
    editorType: "number",
    render: (value) => `$${Number(value).toFixed(2)}`,
  },
];

/* -------------------------------------------------------------------------- */
/*  BOM nested data                                                           */
/* -------------------------------------------------------------------------- */

const bomData: BomNode[] = [
  {
    id: "assy-1",
    name: "Main Assembly",
    qty: 1,
    unit: "pcs",
    cost: 250.0,
    children: [
      {
        id: "sub-1",
        name: "Frame Sub-Assembly",
        qty: 1,
        unit: "pcs",
        cost: 120.0,
        children: [
          { id: "part-1", name: "Steel Frame", qty: 1, unit: "pcs", cost: 80.0 },
          { id: "part-2", name: "Bolts M8", qty: 12, unit: "pcs", cost: 0.5 },
          { id: "part-3", name: "Welding Wire", qty: 0.5, unit: "kg", cost: 15.0 },
        ],
      },
      {
        id: "sub-2",
        name: "Electronics Sub-Assembly",
        qty: 1,
        unit: "pcs",
        cost: 95.0,
        children: [
          { id: "part-4", name: "PCB Board", qty: 1, unit: "pcs", cost: 45.0 },
          { id: "part-5", name: "Wiring Harness", qty: 2, unit: "m", cost: 8.0 },
          { id: "part-6", name: "Sensors", qty: 4, unit: "pcs", cost: 12.0 },
        ],
      },
      { id: "part-7", name: "Paint Coating", qty: 0.3, unit: "L", cost: 35.0 },
    ],
  },
];

const bomColumns: EditableTreeTableColumn<BomNode>[] = [
  { key: "name", title: "Part Name" },
  {
    key: "qty",
    title: "Quantity",
    width: 120,
    editable: true,
    editorType: "number",
  },
  {
    key: "unit",
    title: "Unit",
    width: 120,
    editable: true,
    editorType: "select",
    editorOptions: [
      { value: "pcs", label: "Pieces" },
      { value: "kg", label: "Kilograms" },
      { value: "m", label: "Meters" },
      { value: "L", label: "Liters" },
    ],
  },
  {
    key: "cost",
    title: "Unit Cost",
    width: 120,
    align: "right" as const,
    editable: true,
    editorType: "number",
    render: (value) => `$${Number(value).toFixed(2)}`,
  },
];

/* -------------------------------------------------------------------------- */
/*  Meta                                                                      */
/* -------------------------------------------------------------------------- */

const meta = {
  title: "Business/EditableTreeTable",
  component: EditableTreeTable,
  tags: ["autodocs"],
} satisfies Meta<typeof EditableTreeTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default BOM editing with name/qty/unit columns editable. */
export const Default: Story = {
  args: {
    columns: bomColumns as any,
    data: bomData,
    rowKey: "id",
    showToolbar: true,
    editMode: true,
  },
};

/** Validation: qty must be > 0, cost must be non-negative. */
export const WithValidation: Story = {
  args: {
    columns: [
      { key: "name", title: "Name" },
      {
        key: "qty",
        title: "Quantity",
        editable: true,
        editorType: "number",
        validate: (value) => {
          const num = Number(value);
          if (isNaN(num) || num <= 0) return "Quantity must be positive";
          if (num > 10000) return "Quantity cannot exceed 10,000";
          return null;
        },
      },
      {
        key: "cost",
        title: "Cost",
        align: "right" as const,
        editable: true,
        editorType: "number",
        validate: (value) => {
          const num = Number(value);
          if (isNaN(num) || num < 0) return "Cost must be non-negative";
          return null;
        },
        render: (value) => `$${Number(value).toFixed(2)}`,
      },
    ],
    data: simpleData,
    rowKey: "id",
    showToolbar: true,
    editMode: true,
  },
};

/** Read-only mode: editMode=false disables all editing controls. */
export const ReadOnly: Story = {
  args: {
    columns: simpleColumns as any,
    data: simpleData,
    rowKey: "id",
    showToolbar: true,
    editMode: false,
  },
};

/** Dark mode preview. */
export const DarkMode: Story = {
  args: {
    columns: simpleColumns as any,
    data: simpleData,
    rowKey: "id",
    showToolbar: true,
    editMode: true,
    className: "dark",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
