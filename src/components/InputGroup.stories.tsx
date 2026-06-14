import type { Meta, StoryObj } from "@storybook/react";
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
