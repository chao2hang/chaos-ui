import type { Meta, StoryObj } from "@storybook/react";
import { BrowseDialog } from "@/components/business/browse-dialog";
import type { BrowseLoadResult } from "@/components/business/browse-dialog";

interface DemoItem {
  id: string;
  name: string;
  code: string;
  status: string;
}

const demoColumns = [
  { key: "id", title: "ID", width: 80 },
  { key: "name", title: "Name" },
  { key: "code", title: "Code", width: 120 },
  {
    key: "status",
    title: "Status",
    width: 100,
    render: (value: unknown) => (
      <span
        className={
          value === "active" ? "text-green-600" : "text-muted-foreground"
        }
      >
        {String(value)}
      </span>
    ),
  },
];

const mockData: DemoItem[] = Array.from({ length: 45 }, (_, i) => ({
  id: `item-${i + 1}`,
  name: `Item ${i + 1}`,
  code: `CODE-${String(i + 1).padStart(3, "0")}`,
  status: i % 3 === 0 ? "inactive" : "active",
}));

const demoLoadData = async (params: {
  keyword: string;
  page: number;
  pageSize: number;
}): Promise<BrowseLoadResult<DemoItem>> => {
  await new Promise((r) => setTimeout(r, 300));
  const filtered = mockData.filter(
    (item) =>
      !params.keyword ||
      item.name.toLowerCase().includes(params.keyword.toLowerCase()) ||
      item.code.toLowerCase().includes(params.keyword.toLowerCase()),
  );
  const start = (params.page - 1) * params.pageSize;
  return {
    rows: filtered.slice(start, start + params.pageSize),
    total: filtered.length,
  };
};

const meta = {
  title: "Business/Pickers/BrowseDialog",
  component: BrowseDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof BrowseDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    loadData: demoLoadData as any,
    columns: demoColumns as any,
    title: "Select Items",
  },
};

export const WithSelection: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    loadData: demoLoadData as any,
    columns: demoColumns as any,
    title: "Select Items",
    defaultValue: [mockData[0], mockData[2]] as any,
    maxSelect: 5,
  },
};

export const WithTree: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    loadData: demoLoadData as any,
    columns: demoColumns as any,
    title: "Browse Categories",
    tree: {
      loadTree: async () => [
        {
          id: "cat-1",
          label: "Electronics",
          count: 12,
          children: [
            { id: "cat-1-1", label: "Phones", count: 5 },
            { id: "cat-1-2", label: "Laptops", count: 7 },
          ],
        },
        {
          id: "cat-2",
          label: "Furniture",
          count: 8,
          children: [
            { id: "cat-2-1", label: "Desks", count: 3 },
            { id: "cat-2-2", label: "Chairs", count: 5 },
          ],
        },
        { id: "cat-3", label: "Stationery", count: 15 },
      ],
    },
  },
};
