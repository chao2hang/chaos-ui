import type { Meta, StoryObj } from "@storybook/react";
import { MobileAuthLayout } from "@/components/mobile/mobile-auth-layout";
import { MobileCard } from "@/components/mobile/mobile-card";
import { MobileFormField } from "@/components/mobile/mobile-form-field";
import { MobileInput } from "@/components/mobile/mobile-input";
import { MobileButton } from "@/components/mobile/mobile-button";

const meta = {
  title: "Mobile/MobileAuthLayout",
  component: MobileAuthLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MobileAuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  args: {
    children: (
      <MobileCard title="Sign In" description="Enter your credentials">
        <div className="space-y-4">
          <MobileFormField label="Email" required>
            <MobileInput type="email" placeholder="Enter your email" />
          </MobileFormField>
          <MobileFormField label="Password" required>
            <MobileInput type="password" placeholder="Enter your password" />
          </MobileFormField>
          <MobileButton>Sign In</MobileButton>
        </div>
      </MobileCard>
    ),
  },
};

export const SignUp: Story = {
  args: {
    children: (
      <MobileCard title="Create account" description="Join Chaos UI in 30 seconds">
        <div className="space-y-4">
          <MobileFormField label="Full name" required>
            <MobileInput placeholder="Ada Lovelace" />
          </MobileFormField>
          <MobileFormField label="Email" required>
            <MobileInput type="email" placeholder="you@example.com" />
          </MobileFormField>
          <MobileFormField label="Password" required>
            <MobileInput type="password" placeholder="Choose a password" />
          </MobileFormField>
          <MobileButton>Create account</MobileButton>
        </div>
      </MobileCard>
    ),
  },
};
