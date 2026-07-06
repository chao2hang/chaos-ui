import type { Meta, StoryObj } from "@storybook/react";
import { ChatBranch } from "@/components/business/chat-branch";

const meta = {
  title: "Business/Chat/ChatBranch",
  component: ChatBranch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatBranch>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (id: string) => {
  void id;
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Three branches — the second is active. */
export const ThreeBranches: Story = {
  args: {
    branches: [
      { id: "1", label: "Branch A" },
      { id: "2", label: "Branch B", active: true },
      { id: "3", label: "Branch C" },
    ],
    onSelect: noop,
  },
};

/** Two branches — first is active. */
export const TwoBranches: Story = {
  args: {
    branches: [
      { id: "1", label: "Main", active: true },
      { id: "2", label: "Alternative" },
    ],
    onSelect: noop,
  },
};

/** Many branches — use arrow keys to navigate. */
export const ManyBranches: Story = {
  args: {
    branches: Array.from({ length: 6 }, (_, i) => ({
      id: String(i + 1),
      label: `v${i + 1}`,
      active: i === 2,
    })),
    onSelect: noop,
  },
};

/** Single branch (navigation disabled effectively). */
export const SingleBranch: Story = {
  args: {
    branches: [{ id: "1", label: "Only Branch", active: true }],
    onSelect: noop,
  },
};
