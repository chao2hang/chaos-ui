import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tour } from "@/components/ui/tour";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Tour",
  component: Tour,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { steps: [] },
} satisfies Meta<typeof Tour>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

const Harness = ({
  open,
  onOpenChange,
  steps,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: React.ComponentProps<typeof Tour>["steps"];
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex gap-2">
      <Button id="tour-inbox">Inbox</Button>
      <Button id="tour-compose" variant="outline">
        Compose
      </Button>
      <Button id="tour-settings" variant="ghost">
        Settings
      </Button>
    </div>
    <Button onClick={() => onOpenChange(true)}>Start tour</Button>
    <Tour
      steps={steps}
      open={open}
      onOpenChange={onOpenChange}
      onComplete={noop}
      onSkip={noop}
    />
  </div>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Harness
        open={open}
        onOpenChange={setOpen}
        steps={[
          {
            target: "#tour-inbox",
            title: "Inbox",
            description: "All incoming messages land here.",
            placement: "bottom",
          },
          {
            target: "#tour-compose",
            title: "Compose",
            description: "Write a new message from scratch.",
            placement: "bottom",
          },
          {
            target: "#tour-settings",
            title: "Settings",
            description: "Configure notifications and signatures.",
            placement: "bottom",
          },
        ]}
      />
    );
  },
};

export const AutoOpen: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <Harness
        open={open}
        onOpenChange={setOpen}
        steps={[
          {
            target: "#tour-inbox",
            title: "Welcome",
            description: "This tour appears automatically on mount.",
            placement: "right",
          },
        ]}
      />
    );
  },
};

export const MultiplePlacements: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Harness
        open={open}
        onOpenChange={setOpen}
        steps={[
          {
            target: "#tour-inbox",
            title: "Top placement",
            description: "Popover rendered above the target.",
            placement: "top",
          },
          {
            target: "#tour-compose",
            title: "Left placement",
            description: "Popover rendered to the left.",
            placement: "left",
          },
          {
            target: "#tour-settings",
            title: "Right placement",
            description: "Popover rendered to the right.",
            placement: "right",
          },
        ]}
      />
    );
  },
};
