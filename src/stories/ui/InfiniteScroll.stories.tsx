import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";
import { InfiniteScroll } from "@/components/ui/infinite-scroll";

const meta: Meta<typeof InfiniteScroll> = {
  title: "Components/InfiniteScroll",
  component: InfiniteScroll,
  tags: ["autodocs", "a11y"],
};

export default meta;

type Story = StoryObj<typeof InfiniteScroll>;

function generateItems(start: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `Item #${start + i}`,
    desc: `Description for item ${start + i}`,
  }));
}

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState(() => generateItems(1, 10));
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadMore = useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        const next = items.length + 1;
        setItems((prev) => [...prev, ...generateItems(next, 10)]);
        if (next > 40) setHasMore(false);
        setLoading(false);
      }, 1000);
    }, [items.length]);

    return (
      <div className="max-h-96 overflow-y-auto">
        <InfiniteScroll
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        >
          {items.map((item) => (
            <div key={item.id} className="border-b p-4">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    hasMore: true,
    children: (
      <div className="p-4">
        <p>Content area</p>
      </div>
    ),
  },
};

export const NoMoreData: Story = {
  args: {
    hasMore: false,
    endMessage: "🎉 All items loaded!",
    children: (
      <div className="p-4">
        <p>Content area</p>
      </div>
    ),
  },
};

export const CustomLoader: Story = {
  args: {
    loading: true,
    hasMore: true,
    loader: (
      <div className="flex items-center gap-2">
        <span className="bg-primary size-3 animate-pulse rounded-full" />
        <span className="text-muted-foreground text-sm">Fetching...</span>
      </div>
    ),
    children: (
      <div className="p-4">
        <p>Content area</p>
      </div>
    ),
  },
};
