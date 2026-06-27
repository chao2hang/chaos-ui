import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline } from "@/components/ui/icons";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs", "a11y"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
    pressed: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Toggle" },
};

export const Pressed: Story = {
  args: { pressed: true, children: "Pressed" },
};

export const WithIcon: Story = {
  args: { children: <Bold className="size-4" />, "aria-label": "Toggle bold" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Toolbar: Story = {
  render: () => (
    <div className="flex items-center gap-1 border rounded-md p-1">
      <Toggle aria-label="Toggle bold" size="sm">
        <Bold className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic" size="sm">
        <Italic className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline" size="sm">
        <Underline className="size-4" />
      </Toggle>
    </div>
  ),
};
