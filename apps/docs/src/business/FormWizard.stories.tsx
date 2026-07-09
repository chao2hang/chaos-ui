import type { Meta, StoryObj } from "@storybook/react";
import { FormWizard } from "@chaos_team/chaos-ui/business";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Textarea } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof FormWizard> = {
  title: "Business/FormWizard",
  component: FormWizard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormWizard
      steps={[
        {
          title: "Account",
          description: "Create your account",
          render: () => (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Your email" />
              </div>
            </div>
          ),
        },
        {
          title: "Profile",
          description: "Tell us about yourself",
          render: () => (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea placeholder="A short bio" />
              </div>
            </div>
          ),
        },
        {
          title: "Confirm",
          description: "Review and submit",
          render: () => (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Click Submit to create your account.
              </p>
            </div>
          ),
        },
      ]}
      onComplete={() => alert("Wizard completed!")}
    />
  ),
};
