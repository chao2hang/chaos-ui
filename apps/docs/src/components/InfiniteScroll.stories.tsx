import type { Meta, StoryObj } from "@storybook/react";
import { InfiniteScroll } from "@/components/ui/infinite-scroll";

const meta: Meta<typeof InfiniteScroll> = {
  title: "Components/InfiniteScroll",
  component: InfiniteScroll,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
