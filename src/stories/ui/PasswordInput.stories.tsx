import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PasswordInput } from "@/components/ui/password-input";

const meta = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs", "a11y"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Input size variant",
    },
    showToggle: {
      control: "boolean",
      description: "Show/hide password toggle button",
    },
    strengthMeter: {
      control: "boolean",
      description: "Show password strength meter",
    },
    disabled: {
      control: "boolean",
    },
    readOnly: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: "Enter password",
    showToggle: true,
  },
};

export const WithStrengthMeter: Story = {
  args: {
    placeholder: "Enter password",
    strengthMeter: true,
    showToggle: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <PasswordInput size="sm" placeholder="Small" />
      <PasswordInput size="default" placeholder="Default" />
      <PasswordInput size="lg" placeholder="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    defaultValue: "secret123",
  },
};

/**
 * Demonstrates compatibility with react-hook-form's `{...field}` spread.
 * The `onChange` prop accepts both `(value: string) => void` and standard
 * `React.ChangeEventHandler<HTMLInputElement>`, so users can spread field
 * props directly without manually extracting `value` and `onChange`.
 */
export const ReactHookFormCompat: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    // Simulate react-hook-form's field object (onChange receives an event)
    const field = {
      name: "password",
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      },
      onBlur: () => {},
      ref: () => {},
    };

    return (
      <div className="flex w-80 flex-col gap-2">
        <PasswordInput {...field} placeholder="Spread field props directly" />
        <p className="text-muted-foreground text-xs">
          Current value: {value || "(empty)"}
        </p>
      </div>
    );
  },
};

/**
 * Simplified onChange signature: `(value: string) => void`.
 */
export const SimplifiedOnChange: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="flex w-80 flex-col gap-2">
        <PasswordInput
          placeholder="Simplified onChange"
          value={value}
          onChange={setValue}
        />
        <p className="text-muted-foreground text-xs">
          Current value: {value || "(empty)"}
        </p>
      </div>
    );
  },
};
