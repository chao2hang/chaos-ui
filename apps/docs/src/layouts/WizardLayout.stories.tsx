import type { Meta, StoryObj } from "@storybook/react";
import { WizardLayout } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof WizardLayout> = {
  title: "Layouts/WizardLayout",
  component: WizardLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
