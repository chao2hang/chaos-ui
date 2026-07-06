import type { Meta, StoryObj } from "@storybook/react";
import { MobileForm } from "@/components/mobile/mobile-form";
import { MobileFormField } from "@/components/mobile/mobile-form-field";
import { MobileInput } from "@/components/mobile/mobile-input";
import { MobileTextarea } from "@/components/mobile/mobile-textarea";
import { MobileButton } from "@/components/mobile/mobile-button";

const meta = {
  title: "Mobile/MobileForm",
  component: MobileForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: null },
} satisfies Meta<typeof MobileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-sm p-4">
      <MobileForm>
        <MobileFormField label="Name" required>
          <MobileInput placeholder="Enter your name" />
        </MobileFormField>
        <MobileFormField label="Email" required>
          <MobileInput type="email" placeholder="Enter your email" />
        </MobileFormField>
        <MobileFormField label="Message">
          <MobileTextarea placeholder="Enter your message" />
        </MobileFormField>
        <MobileButton>Submit</MobileButton>
      </MobileForm>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="max-w-sm p-4">
      <MobileForm>
        <MobileFormField label="Username" required error="Username is taken">
          <MobileInput placeholder="Try another" aria-invalid />
        </MobileFormField>
        <MobileFormField label="Password" required>
          <MobileInput type="password" placeholder="Enter your password" />
        </MobileFormField>
        <MobileButton>Submit</MobileButton>
      </MobileForm>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="max-w-sm p-4">
      <MobileForm>
        <MobileFormField
          label="Workspace name"
          description="Shown to teammates on invites"
          required
        >
          <MobileInput placeholder="Acme Inc." />
        </MobileFormField>
        <MobileButton>Create</MobileButton>
      </MobileForm>
    </div>
  ),
};
