import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Mentions } from "@/components/ui/mentions";

const meta = {
  title: "Components/Mentions",
  component: Mentions,
  tags: ["autodocs"],
} satisfies Meta<typeof Mentions>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = [
  { id: "1", name: "Alice", avatar: "" },
  { id: "2", name: "Bob", avatar: "" },
  { id: "3", name: "Charlie", avatar: "" },
];

export const Default: Story = {
  args: {
    placeholder: "Type @ to mention...",
    onSearch: async () => users,
  },
};
