import type { Meta, StoryObj } from "@storybook/react";
import { ChatCodeBlock } from "@/components/business/chat-code-block";

const meta = {
  title: "Business/Chat/ChatCodeBlock",
  component: ChatCodeBlock,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatCodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** TypeScript snippet with language + filename. */
export const TypeScript: Story = {
  args: {
    code: `function greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("World"));`,
    language: "typescript",
    filename: "greet.ts",
  },
};

/** Python snippet. */
export const Python: Story = {
  args: {
    code: `def fibonacci(n: int) -> list[int]:\n    a, b = 0, 1\n    result = []\n    for _ in range(n):\n        result.append(a)\n        a, b = b, a + b\n    return result\n\nprint(fibonacci(10))`,
    language: "python",
    filename: "fib.py",
  },
};

/** Shell command — no filename. */
export const ShellCommand: Story = {
  args: {
    code: "npm install --save-exact react@latest react-dom@latest",
    language: "bash",
  },
};

/** Inline JSON payload. */
export const Json: Story = {
  args: {
    code: `{\n  "name": "chaos-ui",\n  "version": "1.0.0",\n  "type": "module"\n}`,
    language: "json",
    filename: "package.json",
  },
};

/** Short one-liner. */
export const OneLiner: Story = {
  args: {
    code: "const noop = () => {}",
    language: "typescript",
  },
};
