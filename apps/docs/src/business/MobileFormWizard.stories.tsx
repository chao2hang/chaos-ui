import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormWizard } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileFormWizard> = {
  title: "Business/MobileFormWizard",
  component: MobileFormWizard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MobileFormWizard steps={{}} onComplete={() => {}} />,
};
