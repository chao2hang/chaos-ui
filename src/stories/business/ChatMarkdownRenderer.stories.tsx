import type { Meta, StoryObj } from "@storybook/react";
import { ChatMarkdownRenderer } from "@/components/business/chat-markdown-renderer";

const meta = {
  title: "Business/Chat/ChatMarkdownRenderer",
  component: ChatMarkdownRenderer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatMarkdownRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample content                                                            */
/* -------------------------------------------------------------------------- */

const kitchenSink = `# Kitchen Sink Example

Here is a paragraph with plain text. It flows naturally, spans multiple lines, and behaves like normal prose.

## Heading Level Two

### Heading Level Three

Some more prose before a list.

- First bullet point
- Second bullet point
- Third bullet point

Now an ordered list:

1. Step one
2. Step two
3. Step three

> This is a blockquote for citations or callouts.

Inline \`code\` should be visible in a code block:

\`\`\`
const value = 42;
console.log(value);
\`\`\`

That's the full set of features.`;

const simpleParagraphs = `Welcome to the chat!

This is a plain-text response with no formatting — just paragraphs and line breaks.

Let me know if you have any questions.`;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Kitchen-sink example covering all supported markdown segments. */
export const KitchenSink: Story = {
  args: { content: kitchenSink },
};

/** Simple paragraphs (no headers, no lists). */
export const PlainProse: Story = {
  args: { content: simpleParagraphs },
};

/** Only a code block. */
export const CodeOnly: Story = {
  args: {
    content: `\`\`\`\nfunction hello() {\n  return "world";\n}\n\`\`\``,
  },
};

/** Only quote + heading. */
export const QuoteWithHeading: Story = {
  args: {
    content: `## Wisdom\n\n> The best way to predict the future is to invent it.`,
  },
};
