import type { Meta, StoryObj } from "@storybook/react";
import {
  H1,
  H2,
  H3,
  H4,
  Text,
  Paragraph,
  Blockquote,
  InlineCode,
  Lead,
  Large,
  Small,
  Muted,
  List,
} from "@/components/ui/typography";

const meta = {
  title: "Components/Typography",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default `Text` primitive. */
export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
  },
};

/** All heading levels H1–H6. */
export const Headings: Story = {
  render: () => (
    <div className="space-y-2">
      <H1>Heading level 1</H1>
      <H2>Heading level 2</H2>
      <H3>Heading level 3</H3>
      <H4>Heading level 4</H4>
    </div>
  ),
};

/** All text variants. */
export const TextVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text>default</Text>
      <Text variant="muted">muted</Text>
      <Text variant="primary">primary</Text>
      <Text variant="secondary">secondary</Text>
      <Text variant="destructive">destructive</Text>
      <Text variant="success">success</Text>
      <Text variant="warning">warning</Text>
    </div>
  ),
};

/** Text weight scale. */
export const TextWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};

/** Decorative modifiers (italic, underline, strike). */
export const Decorations: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text italic>Italic text</Text>
      <Text underline>Underlined text</Text>
      <Text strike>Strikethrough text</Text>
    </div>
  ),
};

/** Paragraph, Lead, Blockquote and InlineCode. */
export const Prose: Story = {
  render: () => (
    <article className="max-w-prose space-y-4">
      <Lead>
        Lead paragraph — sets the tone for the article, larger and softer.
      </Lead>
      <Paragraph>
        This is a regular paragraph. It uses <InlineCode>InlineCode</InlineCode>{" "}
        for short code fragments and <Blockquote>blockquote</Blockquote> for
        callouts below.
      </Paragraph>
      <Blockquote>
        &ldquo;A well-designed type system rewards patience.&rdquo;
      </Blockquote>
      <List>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </List>
      <Large>Large — for a slightly emphasized inline label.</Large>
      <Small>Small — for meta and captions.</Small>
      <Muted>Muted — for secondary text such as timestamps.</Muted>
    </article>
  ),
};

/** Truncated text within a fixed-width container. */
export const Truncated: Story = {
  render: () => (
    <div className="w-64">
      <Text truncate>
        Truncated single-line text that overflows the fixed 16rem container and
        gets cut off with an ellipsis.
      </Text>
    </div>
  ),
};
