import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CodeEditor } from "@/components/business/code-editor";
import { SqlEditor } from "@/components/business/sql-editor";
import { JsonEditor } from "@/components/business/json-editor";

const meta = {
  title: "Business/CodeEditor",
  component: CodeEditor,
  tags: ["autodocs", "a11y"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof CodeEditor>;

export default meta;
type Story = StoryObj;

export const JavaScript: Story = {
  args: {
    value: `function greet(name) {\n  const msg = \`Hello, \${name}!\`;\n  console.log(msg);\n  return msg;\n}\n\ngreet("World");`,
    language: "javascript",
    minHeight: 240,
  },
};

export const TypeScript: Story = {
  args: {
    value: `interface User {\n  id: number;\n  name: string;\n  email?: string;\n}\n\ntype UserResponse = Pick<User, "id" | "name">;\n\nasync function fetchUser(id: number): Promise<UserResponse> {\n  const res = await fetch(\`/api/users/\${id}\`);\n  return res.json();\n}`,
    language: "typescript",
    minHeight: 260,
  },
};

export const JSON: Story = {
  args: {
    value:
      '{\n  "name": "Alice",\n  "age": 30,\n  "email": "alice@example.com",\n  "roles": ["admin", "editor"],\n  "metadata": {\n    "lastLogin": "2026-07-04T10:30:00Z",\n    "loginCount": 142\n  }\n}',
    language: "json",
    minHeight: 280,
  },
};

export const ReadOnly: Story = {
  args: {
    value:
      'db.getCollection("orders").find(\n  { status: "pending" },\n  { _id: 0, orderId: 1, total: 1 }\n).sort({ createdAt: -1 }).limit(20);',
    language: "javascript",
    readOnly: true,
    minHeight: 180,
  },
};

export const NoLineNumbers: Story = {
  args: {
    value:
      "SELECT\n  u.name,\n  o.total\nFROM users u\nJOIN orders o ON o.user_id = u.id\nWHERE o.status = 'completed'\nORDER BY o.created_at DESC\nLIMIT 10;",
    language: "sql",
    lineNumbers: false,
    minHeight: 240,
  },
};

function SqlEditorDemo() {
  const [query, setQuery] = React.useState("SELECT * FROM users WHERE id = 1;");

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Live SQL Editor — MySQL dialect</p>
      <SqlEditor
        value={query}
        onChange={setQuery}
        dialect="mysql"
        minHeight={120}
      />
      {query && (
        <pre className="bg-muted rounded-md p-2 text-xs">
          Current value: {query}
        </pre>
      )}
    </div>
  );
}

export const LiveSqlEditor: Story = {
  render: () => <SqlEditorDemo />,
};

function JsonFormatDemo() {
  const [text, setText] = React.useState(
    '{"name":"Bob","age":25,"tags":["dev","ops"]}',
  );

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">JSON Editor with auto-format</p>
      <JsonEditor value={text} onChange={setText} autoFormat minHeight={180} />
    </div>
  );
}

export const JsonWithAutoFormat: Story = {
  render: () => <JsonFormatDemo />,
};
