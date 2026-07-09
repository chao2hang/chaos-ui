import type { Meta, StoryObj } from "@storybook/react";
import { H1, H3, Paragraph, Muted, InlineCode } from "@/components/ui/typography";

const meta: Meta<typeof H1> = {
  title: "Components/Typography",
  component: H1,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  args: { children: "Heading 1" },
};

export const Subtitle: Story = {
  render: () => <H3>A descriptive subtitle for sections</H3>,
};

export const Body: Story = {
  render: () => <Paragraph>This is a paragraph of body text used for regular content.</Paragraph>,
};

export const MutedText: Story = {
  render: () => <Muted>Muted secondary text</Muted>,
};

export const Code: Story = {
  render: () => <InlineCode>const value = 42;</InlineCode>,
};
