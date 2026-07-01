import type { Meta, StoryObj } from "@storybook/react";
import {
  StarIcon,
  Loader2Icon,
  BellIcon,
  HomeIcon,
} from "@/components/ui/icons";
import { Icon } from "@/components/ui/icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs", "a11y"],
  argTypes: {
    size: {
      control: "select",
      options: ["inherit", "sm", "md", "lg", "xl"],
    },
    spin: { control: "boolean" },
    pulse: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: StarIcon,
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={StarIcon} size="inherit" />
      <Icon icon={StarIcon} size="sm" />
      <Icon icon={StarIcon} size="md" />
      <Icon icon={StarIcon} size="lg" />
      <Icon icon={StarIcon} size="xl" />
    </div>
  ),
};

export const Spin: Story = {
  args: {
    icon: Loader2Icon,
    size: "lg",
    spin: true,
  },
};

export const Pulse: Story = {
  args: {
    icon: BellIcon,
    size: "lg",
    pulse: true,
  },
};

export const CustomColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={HomeIcon} size="lg" className="text-primary" />
      <Icon icon={HomeIcon} size="lg" className="text-destructive" />
      <Icon icon={HomeIcon} size="lg" className="text-green-500" />
      <Icon icon={HomeIcon} size="lg" className="text-blue-500" />
    </div>
  ),
};
