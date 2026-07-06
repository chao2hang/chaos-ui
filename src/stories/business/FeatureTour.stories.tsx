import type { Meta, StoryObj } from "@storybook/react";
import { FeatureTour } from "@/components/business/feature-tour";

const meta = {
  title: "Business/Nav/FeatureTour",
  component: FeatureTour,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { steps: [], open: false },
} satisfies Meta<typeof FeatureTour>;

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { target: "#nav-dashboard", title: "Dashboard", content: "View all your KPIs at a glance." },
  { target: "#nav-reports", title: "Reports", content: "Generate and download reports." },
  { target: "#nav-settings", title: "Settings", content: "Configure your workspace." },
];

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <p className="text-sm text-muted-foreground mb-4">Tour UI rendered here.</p>
      <FeatureTour steps={steps} open onClose={() => {}} />
    </div>
  ),
};

export const SingleStep: Story = {
  render: () => (
    <div className="p-4">
      <FeatureTour steps={steps.slice(0, 1)} open onClose={() => {}} />
    </div>
  ),
};
