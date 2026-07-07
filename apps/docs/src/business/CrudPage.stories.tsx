import type { Meta, StoryObj } from "@storybook/react";
import { CrudPage } from "@/components/business/crud-page";

const meta = {
  title: "Business/CrudPage",
  component: CrudPage,
  tags: ["autodocs"],
} satisfies Meta<typeof CrudPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
