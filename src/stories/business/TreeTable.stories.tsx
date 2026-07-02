import type { Meta, StoryObj } from "@storybook/react";
import { TreeTable } from "@/components/business/tree-table";
import type { TreeTableColumn } from "@/components/business/tree-table";

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

type OrgNode = Record<string, unknown> & {
  id: string;
  name: string;
  role: string;
  headcount: number;
  children?: OrgNode[];
};

/* -------------------------------------------------------------------------- */
/*  Default nested data                                                       */
/* -------------------------------------------------------------------------- */

const orgData: OrgNode[] = [
  {
    id: "ceo",
    name: "Alice Chen",
    role: "CEO",
    headcount: 150,
    children: [
      {
        id: "cto",
        name: "Bob Smith",
        role: "CTO",
        headcount: 60,
        children: [
          {
            id: "fe-lead",
            name: "Carol Wu",
            role: "Frontend Lead",
            headcount: 20,
            children: [
              { id: "fe-1", name: "Dave Park", role: "Senior Engineer", headcount: 1 },
              { id: "fe-2", name: "Eve Lin", role: "Engineer", headcount: 1 },
              { id: "fe-3", name: "Frank Zhou", role: "Engineer", headcount: 1 },
            ],
          },
          {
            id: "be-lead",
            name: "Grace Kim",
            role: "Backend Lead",
            headcount: 25,
            children: [
              { id: "be-1", name: "Hank Lee", role: "Senior Engineer", headcount: 1 },
              { id: "be-2", name: "Iris Zhang", role: "Engineer", headcount: 1 },
            ],
          },
          { id: "infra-lead", name: "Jack Ma", role: "Infra Lead", headcount: 15 },
        ],
      },
      {
        id: "cmo",
        name: "Karen Li",
        role: "CMO",
        headcount: 30,
        children: [
          { id: "mkt-1", name: "Leo Wang", role: "Content Lead", headcount: 10 },
          { id: "mkt-2", name: "Mia Xu", role: "Growth Lead", headcount: 12 },
        ],
      },
      {
        id: "cfo",
        name: "Nathan Zhao",
        role: "CFO",
        headcount: 20,
        children: [
          { id: "fin-1", name: "Olivia Qian", role: "Controller", headcount: 8 },
        ],
      },
    ],
  },
];

const orgColumns: TreeTableColumn<OrgNode>[] = [
  { key: "name", title: "Name", sortable: true },
  { key: "role", title: "Role", sortable: true },
  { key: "headcount", title: "Headcount", width: 120, align: "right", sortable: true },
];

/* -------------------------------------------------------------------------- */
/*  Meta                                                                      */
/* -------------------------------------------------------------------------- */

const meta = {
  title: "Business/TreeTable",
  component: TreeTable,
  tags: ["autodocs"],
} satisfies Meta<typeof TreeTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default tree table with nested org-chart data. */
export const Default: Story = {
  args: {
    columns: orgColumns as any,
    data: orgData,
    rowKey: "id",
    defaultExpandedKeys: ["ceo", "cto"],
    caption: "Organization Chart",
  },
};

/** Flat data with parentKey converted to a tree automatically. */
export const FlatData: Story = {
  args: {
    columns: [
      { key: "name", title: "Department" },
      { key: "budget", title: "Budget", align: "right" as const },
    ],
    data: [
      { id: "root", name: "Company", budget: "$10M", parentId: null },
      { id: "eng", name: "Engineering", budget: "$4M", parentId: "root" },
      { id: "fe", name: "Frontend", budget: "$1.5M", parentId: "eng" },
      { id: "be", name: "Backend", budget: "$2M", parentId: "eng" },
      { id: "infra", name: "Infrastructure", budget: "$0.5M", parentId: "eng" },
      { id: "mkt", name: "Marketing", budget: "$3M", parentId: "root" },
      { id: "content", name: "Content", budget: "$1M", parentId: "mkt" },
      { id: "growth", name: "Growth", budget: "$2M", parentId: "mkt" },
      { id: "ops", name: "Operations", budget: "$3M", parentId: "root" },
    ],
    rowKey: "id",
    parentKey: "parentId",
    defaultExpandedKeys: ["root", "eng", "mkt"],
  },
};

/** Lazy loading children on expand. */
export const LazyLoad: Story = {
  args: {
    columns: orgColumns as any,
    data: [
      { id: "ceo", name: "Alice Chen", role: "CEO", headcount: 150 },
      { id: "cto", name: "Bob Smith", role: "CTO", headcount: 60 },
      { id: "cmo", name: "Karen Li", role: "CMO", headcount: 30 },
    ],
    rowKey: "id",
    onExpandRow: async (row: Record<string, unknown>) => {
      await new Promise((r) => setTimeout(r, 800));
      const id = row.id as string;
      if (id === "ceo") {
        return [
          { id: "ceo-direct-1", name: "VP Engineering", role: "VP", headcount: 40 },
          { id: "ceo-direct-2", name: "VP Sales", role: "VP", headcount: 35 },
        ];
      }
      if (id === "cto") {
        return [
          { id: "cto-1", name: "Frontend Team", role: "Team", headcount: 20 },
          { id: "cto-2", name: "Backend Team", role: "Team", headcount: 25 },
          { id: "cto-3", name: "Infra Team", role: "Team", headcount: 15 },
        ];
      }
      return [
        { id: "cmo-1", name: "Content Team", role: "Team", headcount: 10 },
        { id: "cmo-2", name: "Growth Team", role: "Team", headcount: 12 },
      ];
    },
  },
};

/** Multiple selection with parent-child linkage. */
export const Selectable: Story = {
  args: {
    columns: orgColumns as any,
    data: orgData,
    rowKey: "id",
    selectable: "multiple",
    selectedKeys: [],
    defaultExpandedKeys: ["ceo", "cto", "cmo"],
    caption: "Select team members",
  },
};

/** Large dataset with 100+ rows and deep nesting. */
export const LargeDataset: Story = {
  render: () => {
    const buildTree = (prefix: string, depth: number, breadth: number): OrgNode[] => {
      if (depth <= 0) return [];
      return Array.from({ length: breadth }, (_, i) => {
        const id = `${prefix}-${i}`;
        return {
          id,
          name: `Node ${id}`,
          role: `Level ${4 - depth}`,
          headcount: Math.floor(Math.random() * 50) + 1,
          children: depth > 1 ? buildTree(id, depth - 1, 3) : undefined,
        };
      });
    };
    const largeData = buildTree("root", 4, 4);
    return (
      <TreeTable
        columns={orgColumns}
        data={largeData}
        rowKey="id"
        defaultExpandedKeys={["root-0", "root-1", "root-2", "root-3"]}
        caption={`Large tree dataset (${4 + 4 * 3 + 4 * 9 + 4 * 27} nodes)`}
      />
    );
  },
};

/** Striped rows for better readability. */
export const Striped: Story = {
  args: {
    columns: orgColumns as any,
    data: orgData,
    rowKey: "id",
    striped: true,
    defaultExpandedKeys: ["ceo", "cto", "cmo", "cfo"],
    caption: "Striped tree table",
  },
};

/** Dark mode preview. */
export const DarkMode: Story = {
  args: {
    columns: orgColumns as any,
    data: orgData,
    rowKey: "id",
    defaultExpandedKeys: ["ceo", "cto"],
    caption: "Dark mode tree table",
    className: "dark",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
