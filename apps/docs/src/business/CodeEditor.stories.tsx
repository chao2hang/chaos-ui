import type { Meta, StoryObj } from "@storybook/react";
import { CodeEditor } from "@/components/business/code-editor";

const sampleCode = `function greet(name: string): string {
  return \`Hello, \${name}!\`
}

console.log(greet("World"))`;

const meta: Meta<typeof CodeEditor> = {
  title: "Business/CodeEditor",
  component: CodeEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: sampleCode,
    language: "typescript",
  },
};

export const Readonly: Story = {
  args: {
    value: 'console.log("read only")',
    language: "javascript",
    readOnly: true,
  },
};

export const Python: Story = {
  args: {
    value: 'def hello():\n    print("Hello from Python!")',
    language: "text",
  },
};

export const Dark: Story = {
  args: {
    value: sampleCode,
    language: "typescript",
  },
  parameters: { backgrounds: { default: "dark" } },
};
