import type { Meta, StoryObj } from "@storybook/react";
import { WizardLayout } from "@/components/layout/wizard-layout";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Layouts/WizardLayout",
  component: WizardLayout,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof WizardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

const steps = [
  { id: "account", title: "Account", description: "Set up your login" },
  { id: "profile", title: "Profile", description: "Tell us about you" },
  {
    id: "preferences",
    title: "Preferences",
    description: "Customize your workspace",
  },
  { id: "review", title: "Review", description: "Confirm and finish" },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** First step of a 4-step wizard. */
export const Step1: Story = {
  args: {
    steps,
    current: 0,
    onComplete: noop,
    children: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Create your account</h3>
        <p className="text-muted-foreground text-sm">
          Step 1 of 4 — enter your email and choose a password.
        </p>
      </div>
    ),
  },
};

/** Middle step — half-way through. */
export const Step2: Story = {
  args: {
    steps,
    current: 1,
    onComplete: noop,
    children: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Build your profile</h3>
        <p className="text-muted-foreground text-sm">
          Step 2 of 4 — add a display name and avatar.
        </p>
      </div>
    ),
  },
};

/** Final review step — Complete button wired. */
export const FinalStep: Story = {
  args: {
    steps,
    current: 3,
    onComplete: noop,
    children: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Review and finish</h3>
        <p className="text-muted-foreground text-sm">
          Step 4 of 4 — review your settings and click Complete.
        </p>
        <Button onClick={noop}>Complete setup</Button>
      </div>
    ),
  },
};

/** Two-step wizard — minimal. */
export const TwoSteps: Story = {
  args: {
    steps: [
      { id: "import", title: "Import" },
      { id: "confirm", title: "Confirm" },
    ],
    current: 0,
    onComplete: noop,
    children: (
      <p className="text-muted-foreground text-sm">
        A minimal two-step wizard with no descriptions.
      </p>
    ),
  },
};

/** Long wizard — 6 steps, currently on step 4. */
export const LongWizard: Story = {
  args: {
    steps: [
      { id: "s1", title: "Connect", description: "Link your account" },
      { id: "s2", title: "Map", description: "Map your fields" },
      { id: "s3", title: "Transform", description: "Apply rules" },
      { id: "s4", title: "Validate", description: "Check data" },
      { id: "s5", title: "Schedule", description: "Pick a cadence" },
      { id: "s6", title: "Deploy", description: "Go live" },
    ],
    current: 3,
    onComplete: noop,
    children: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Validate your data</h3>
        <p className="text-muted-foreground text-sm">
          Step 4 of 6 — we found 0 errors.
        </p>
      </div>
    ),
  },
};
