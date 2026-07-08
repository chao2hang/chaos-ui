import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default"],
      description: "The size of the switch",
    },
    checked: {
      control: "boolean",
      description: "Whether the switch is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Settings: Story = {
  render: () => (
    <div className="max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="wifi">Wi-Fi</Label>
        <Switch id="wifi" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="bluetooth">Bluetooth</Label>
        <Switch id="bluetooth" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="airplane">Airplane Mode</Label>
        <Switch id="airplane" />
      </div>
    </div>
  ),
};
