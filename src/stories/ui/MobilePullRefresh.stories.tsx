import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MobilePullRefresh } from "@/components/ui/mobile-pull-refresh";

const meta = {
  title: "Components/MobilePullRefresh",
  component: MobilePullRefresh,
  tags: ["autodocs"],
  parameters: { layout: "pinned" },
} satisfies Meta<typeof MobilePullRefresh>;

export default meta;
type Story = StoryObj<typeof meta>;

const List = () => (
  <ul className="divide-y">
    {Array.from({ length: 12 }).map((_, i) => (
      <li key={i} className="px-4 py-3 text-sm">
        Item {i + 1}
      </li>
    ))}
  </ul>
);

export const Default: Story = {
  render: () => (
    <div className="mx-auto h-full max-w-sm overflow-y-scroll border">
      <MobilePullRefresh
        onRefresh={() => new Promise((r) => setTimeout(r, 1200))}
      >
        <List />
      </MobilePullRefresh>
    </div>
  ),
};

export const LowThreshold: Story = {
  render: () => (
    <div className="mx-auto h-full max-w-sm overflow-y-scroll border">
      <MobilePullRefresh
        threshold={40}
        onRefresh={() => new Promise((r) => setTimeout(r, 800))}
      >
        <List />
      </MobilePullRefresh>
    </div>
  ),
};

export const ControlledRefreshing: Story = {
  render: () => {
    const Controlled = () => {
      const [refreshing, setRefreshing] = React.useState(true);
      return (
        <div className="mx-auto h-full max-w-sm overflow-y-scroll border">
          <MobilePullRefresh
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 1500);
            }}
          >
            <List />
          </MobilePullRefresh>
        </div>
      );
    };
    return <Controlled />;
  },
};
