import type { Meta, StoryObj } from "@storybook/react";
import { GlobalLoadingProvider } from "@/components/business/global-loading";

const meta = {
  title: "Business/Nav/GlobalLoading",
  component: GlobalLoadingProvider,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { children: null },
} satisfies Meta<typeof GlobalLoadingProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div className="p-8 text-center"><p>Content loads behind the overlay.</p></div>,
    defaultTip: "Loading...",
  },
};
