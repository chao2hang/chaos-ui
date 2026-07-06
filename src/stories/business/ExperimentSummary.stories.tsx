import type { Meta, StoryObj } from "@storybook/react";
import { ExperimentSummary } from "@/components/business/experiment-summary";

const variants = [
  { id: "control", name: "Control", sampleSize: 18420, conversionRate: 5.82 },
  {
    id: "a",
    name: "Free shipping CTA",
    sampleSize: 18390,
    conversionRate: 6.41,
    lift: 10.1,
    winner: true,
  },
  {
    id: "b",
    name: "Bundle savings CTA",
    sampleSize: 18112,
    conversionRate: 6.03,
    lift: 3.6,
  },
];

const meta = {
  title: "Business/ExperimentSummary",
  component: ExperimentSummary,
  tags: ["autodocs", "a11y"],
  args: {
    name: "Checkout offer headline test",
    status: "running",
    hypothesis:
      "A clearer savings message will increase bundle checkout conversion.",
    variants,
    primaryMetric: "Checkout conversion",
  },
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["draft", "running", "completed"],
    },
  },
} satisfies Meta<typeof ExperimentSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 xl:grid-cols-2">
      <ExperimentSummary
        name="Subject line holdout"
        status="draft"
        hypothesis="Shorter subject lines may improve open rate among dormant customers."
        variants={[
          { id: "control", name: "Control", sampleSize: 0, conversionRate: 0 },
          {
            id: "short",
            name: "Short headline",
            sampleSize: 0,
            conversionRate: 0,
          },
        ]}
        primaryMetric="Open rate"
      />
      <ExperimentSummary
        name="Cart reminder timing"
        status="completed"
        hypothesis="A same-day reminder beats a next-morning reminder for fresh goods."
        variants={[
          {
            id: "same-day",
            name: "Same day",
            sampleSize: 9200,
            conversionRate: 8.28,
            lift: 7.4,
            winner: true,
          },
          {
            id: "morning",
            name: "Next morning",
            sampleSize: 9188,
            conversionRate: 7.71,
          },
        ]}
        primaryMetric="Recovered carts"
      />
    </div>
  ),
};
