import type { Meta, StoryObj } from "@storybook/react";
import { MobileInfiniteScroll } from "@/components/business/mobile-infinite-scroll";

const meta = {
  title: "Business/Mobile/MobileInfiniteScroll",
  component: MobileInfiniteScroll,
  tags: ["autodocs"],
  parameters: { layout: "pinned" },
  args: { onLoadMore: () => {} },
} satisfies Meta<typeof MobileInfiniteScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleList = ({ count = 8 }: { count?: number }) => (
  <ul className="divide-y">
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="px-4 py-3 text-sm">
        Item {i + 1}
      </li>
    ))}
  </ul>
);

export const Default: Story = {
  render: () => (
    <div className="mx-auto h-96 max-w-sm overflow-y-scroll rounded-lg border">
      <MobileInfiniteScroll hasMore onLoadMore={() => {}}>
        <SampleList count={8} />
      </MobileInfiniteScroll>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="mx-auto h-96 max-w-sm overflow-y-scroll rounded-lg border">
      <MobileInfiniteScroll hasMore loading onLoadMore={() => {}}>
        <SampleList count={6} />
      </MobileInfiniteScroll>
    </div>
  ),
};

export const Exhausted: Story = {
  render: () => (
    <div className="mx-auto h-96 max-w-sm overflow-y-scroll rounded-lg border">
      <MobileInfiniteScroll hasMore={false} onLoadMore={() => {}}>
        <SampleList count={5} />
      </MobileInfiniteScroll>
    </div>
  ),
};
