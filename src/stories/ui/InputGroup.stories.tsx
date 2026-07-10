import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import { SearchIcon, MailIcon, InfoIcon } from "@/components/ui/icons";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
};

export const Email: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <MailIcon />
      </InputGroupAddon>
      <InputGroupInput type="email" placeholder="Email" />
      <InputGroupAddon align="inline-end">
        <InfoIcon className="text-muted-foreground" />
      </InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * InputGroupInput supports forwardRef, allowing react-hook-form's
 * field.ref to be forwarded to the underlying DOM input element.
 * This enables proper focus management and field registration.
 */
export const WithForwardRef: Story = {
  render: () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    return (
      <div className="flex w-80 flex-col gap-2">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput ref={inputRef} placeholder="Click button to focus" />
        </InputGroup>
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="text-primary w-fit text-sm hover:underline"
        >
          Focus the input via ref
        </button>
      </div>
    );
  },
};
