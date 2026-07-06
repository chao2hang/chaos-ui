import type { Meta, StoryObj } from "@storybook/react";
import { PolicyLineEditor } from "@/components/business/policy-line-editor";

const meta = {
  title: "Business/Finance/PolicyLineEditor",
  component: PolicyLineEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { rows: [] },
} satisfies Meta<typeof PolicyLineEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: [
      { id: "1", name: "Policy A", type: "discount", condition: "≥100", reward: "-20", quota: 1000, used: 120 },
      { id: "2", name: "Policy B", type: "cashback", condition: "≥500", reward: "-50", quota: 500, used: 50 },
    ],
  },
};

export const Empty: Story = {};

export const WithChange: Story = {
  args: {
    rows: [
      { id: "1", name: "Policy A", type: "discount", condition: "≥100", reward: "-20", quota: 1000, used: 120 },
    ],
    onChange: (rows: unknown[]) => { void rows; },
  },
};
