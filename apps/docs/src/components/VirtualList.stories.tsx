import type { Meta, StoryObj } from "@storybook/react";
import { VirtualList } from "@/components/ui/virtual-list";
import { Skeleton } from "@/components/ui/skeleton";

interface Item {
  id: number;
  name: string;
  description: string;
}

const generateData = (count: number): Item[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

const meta: Meta<typeof VirtualList> = {
  title: "Components/VirtualList",
  component: VirtualList,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: generateData(100),
    estimateSize: 50,
    height: 300,
    renderItem: (item: Item) => (
      <div className="flex items-center border-b px-4 py-2">
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
      </div>
    ),
  } as any,
};

export const LargeDataset: Story = {
  args: {
    data: generateData(10000),
    estimateSize: 50,
    height: 300,
    renderItem: (item: Item) => (
      <div className="flex items-center border-b px-4 py-2">
        <p className="font-medium">{item.name}</p>
      </div>
    ),
  } as any,
};

export const WithLoading: Story = {
  args: {
    data: generateData(50),
    estimateSize: 50,
    height: 300,
    loading: true,
    loadingComponent: (
      <div className="flex items-center gap-2 p-4">
        <Skeleton className="size-4 rounded-full" />
        <span className="text-muted-foreground text-sm">Loading more...</span>
      </div>
    ),
    renderItem: (item: Item) => (
      <div className="border-b px-4 py-2">
        <p className="font-medium">{item.name}</p>
      </div>
    ),
  } as any,
};
