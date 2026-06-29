import type { Meta, StoryObj } from "@storybook/react";
import { RemoteSelect } from "@/components/business/remote-select";

const meta = {
  title: "Business/RemoteSelect",
  component: RemoteSelect,
  tags: ["autodocs", "a11y"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof RemoteSelect>;

export default meta;
type Story = StoryObj;

const mockFetcher = (keyword: string) =>
  new Promise<{ label: string; value: string }[]>((resolve) => {
    setTimeout(() => {
      const base = ["Alice", "Bob", "Carol", "David", "Eve", "Frank"];
      const filtered = base
        .filter((n) => n.toLowerCase().includes(keyword.toLowerCase()))
        .map((n) => ({ label: n, value: n.toLowerCase() }));
      resolve(filtered);
    }, 400);
  });

export const Basic: Story = {
  render: () => <RemoteSelect fetcher={mockFetcher} placeholder="选择用户" />,
};

export const WithInitialOptions: Story = {
  render: () => (
    <RemoteSelect
      fetcher={mockFetcher}
      initialOptions={[
        { label: "Alice", value: "alice" },
        { label: "Bob", value: "bob" },
      ]}
      placeholder="选择用户"
    />
  ),
};

export const Controlled: Story = {
  render: () => (
    <RemoteSelect
      fetcher={mockFetcher}
      value="alice"
      onChange={() => {}}
      placeholder="选择用户"
    />
  ),
};

export const MinKeywordLength: Story = {
  render: () => (
    <RemoteSelect fetcher={mockFetcher} minKeywordLength={2} placeholder="至少输入2字" />
  ),
};
