import type { Meta, StoryObj } from "@storybook/react";
import { InfiniteScroll } from "@chaos_team/chaos-ui/ui";

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
