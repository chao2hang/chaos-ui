import type { Meta, StoryObj } from "@storybook/react";
import { ExpenseLineEditor } from "@/components/business/expense-line-editor";

const demoCategories = [
  { label: "Travel", value: "travel" },
  { label: "Meals", value: "meals" },
  { label: "Office Supplies", value: "office" },
  { label: "Software", value: "software" },
  { label: "Other", value: "other" },
];

const defaultLines = [
  {
    id: "1",
    category: "travel",
    summary: "Flight to Shanghai",
    amount: 2500,
    remark: "",
  },
  {
    id: "2",
    category: "meals",
    summary: "Client dinner",
    amount: 680,
    remark: "Receipt attached",
  },
  {
    id: "3",
    category: "office",
    summary: "Printer paper",
    amount: 120,
    remark: "",
  },
];

const meta = {
  title: "Business/Forms/ExpenseLineEditor",
  component: ExpenseLineEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof ExpenseLineEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultData: defaultLines,
    categories: demoCategories,
  },
};

export const WithCustomCurrency: Story = {
  args: {
    defaultData: defaultLines,
    categories: demoCategories,
    currency: "$",
  },
};

export const ReadOnly: Story = {
  args: {
    data: defaultLines,
    categories: demoCategories,
    readOnly: true,
  },
};

export const Empty: Story = {
  args: {
    categories: demoCategories,
    minRows: 3,
  },
};
