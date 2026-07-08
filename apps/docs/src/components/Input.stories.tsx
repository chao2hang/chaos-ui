import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
        "date",
      ],
      description: "The type of the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "0",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: "Required field",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Hello World",
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Invalid input",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email-input">Email</Label>
      <Input id="email-input" type="email" placeholder="Enter your email" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="relative max-w-sm">
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <Input className="pl-8" placeholder="Search..." />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Input placeholder="Default" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Required" required />
      <Input placeholder="Invalid" aria-invalid />
    </div>
  ),
};
