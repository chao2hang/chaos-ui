import type { Meta, StoryObj } from "@storybook/react";
import { StatCardRow } from "@/components/business/stat-card-row";
import { DollarSignIcon, UsersIcon, ShoppingCartIcon } from "@/components/ui/icons";

const meta = {
  title: "Business/DataDisplay/StatCardRow",
  component: StatCardRow,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { cards: [] },
} satisfies Meta<typeof StatCardRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cards: [
      {
        title: "Revenue",
        value: "$45.2K",
        description: "Monthly recurring",
        icon: <DollarSignIcon className="size-5" />,
        trend: { value: 12.5, direction: "up" },
      },
      {
        title: "Users",
        value: "2,350",
        description: "Active accounts",
        icon: <UsersIcon className="size-5" />,
        trend: { value: 8.3, direction: "up" },
      },
      {
        title: "Orders",
        value: "482",
        description: "This month",
        icon: <ShoppingCartIcon className="size-5" />,
        trend: { value: 3.1, direction: "down" },
      },
    ],
  },
};

export const Single: Story = {
  args: {
    cards: [{
      title: "Total",
      value: "¥ 128,000",
      description: "Year to date",
    }],
  },
};
