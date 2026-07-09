import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Mentions } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof Mentions> = {
  title: "Components/Mentions",
  component: Mentions,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

const users = [
  { value: "alice", label: "Alice" },
  { value: "bob", label: "Bob" },
  { value: "charlie", label: "Charlie" },
];

export const Default: Story = {
  args: {
    options: users,
    placeholder: "Type @ to mention...",
  },
};
