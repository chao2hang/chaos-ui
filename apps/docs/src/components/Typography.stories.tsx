import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@/components/ui/typography";

const meta = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  args: { variant: "h1", children: "Heading 1" },
};

export const Subtitle: Story = {
  args: { variant: "h3", children: "A descriptive subtitle for sections" },
};

export const Body: Story = {
  args: {
    variant: "p",
    children: "This is a paragraph of body text used for regular content.",
  },
};

export const Muted: Story = {
  args: { variant: "muted", children: "Muted secondary text" },
};

export const Code: Story = {
  args: { variant: "code", children: "const value = 42;" },
};
