import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormWizard } from "@/components/mobile/mobile-form-wizard";
import { MobileFormField } from "@/components/mobile/mobile-form-field";
import { MobileInput } from "@/components/mobile/mobile-input";

const meta = {
  title: "Mobile/MobileFormWizard",
  component: MobileFormWizard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileFormWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [
      {
        title: "Basics",
        description: "Name the campaign",
        render: ({ formData, updateField, errors }) => (
          <MobileFormField
            label="Campaign name"
            required
            {...(errors.name !== undefined && { error: errors.name })}
          >
            <MobileInput
              value={String(formData.name ?? "")}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Summer launch"
            />
          </MobileFormField>
        ),
        validate: (data): Record<string, string> => {
          if (!data.name) return { name: "Campaign name is required" };
          return {};
        },
      },
      {
        title: "Budget",
        description: "Set an initial budget",
        render: ({ formData, updateField }) => (
          <MobileFormField label="Budget">
            <MobileInput
              inputMode="numeric"
              value={String(formData.budget ?? "")}
              onChange={(event) => updateField("budget", event.target.value)}
              placeholder="50000"
            />
          </MobileFormField>
        ),
      },
    ],
  },
};

export const SingleStep: Story = {
  args: {
    steps: [
      {
        title: "Welcome",
        description: "Confirm to continue",
        render: () => <p className="text-sm text-muted-foreground">Review and finish.</p>,
      },
    ],
  },
};

export const ThreeSteps: Story = {
  args: {
    steps: [
      {
        title: "Account",
        description: "Basic info",
        render: ({ formData, updateField }) => (
          <MobileFormField label="Username" required>
            <MobileInput
              value={String(formData.username ?? "")}
              onChange={(e) => updateField("username", e.target.value)}
              placeholder="ada"
            />
          </MobileFormField>
        ),
        validate: (data): Record<string, string> =>
          data.username ? {} : { username: "Username is required" },
      },
      {
        title: "Workspace",
        description: "Pick a name",
        render: ({ formData, updateField }) => (
          <MobileFormField label="Workspace">
            <MobileInput
              value={String(formData.workspace ?? "")}
              onChange={(e) => updateField("workspace", e.target.value)}
              placeholder="Acme Inc."
            />
          </MobileFormField>
        ),
      },
      {
        title: "Confirm",
        description: "Review",
        render: () => <p className="text-sm text-muted-foreground">Looks good!</p>,
      },
    ],
  },
};
