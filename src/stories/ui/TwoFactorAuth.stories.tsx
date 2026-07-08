import type { Meta, StoryObj } from "@storybook/react";
import { TwoFactorAuth } from "@/components/ui/two-factor-auth";

const meta = {
  title: "Components/TwoFactorAuth",
  component: TwoFactorAuth,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    codeLength: 6,
  },
} satisfies Meta<typeof TwoFactorAuth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Disabled: Story = {
  args: {
    enabled: false,
  },
};

export const SetupIntro: Story = {
  args: {
    setupMode: true,
  },
};

export const VerifyPhase: Story = {
  args: {
    enabled: true,
  },
};

export const FullSetupWizard: Story = {
  args: {
    setupMode: true,
  },
};

export const CustomCodeLength: Story = {
  args: {
    enabled: true,
    codeLength: 8,
  },
};
