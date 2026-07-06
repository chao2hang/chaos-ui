import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Mentions } from "@/components/ui/mentions";

const meta = {
  title: "Components/Mentions",
  component: Mentions,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { options: [] },
} satisfies Meta<typeof Mentions>;

export default meta;
type Story = StoryObj<typeof meta>;

const teammates = [
  { value: "alice", label: "Alice Chen" },
  { value: "bob", label: "Bob Smith" },
  { value: "cara", label: "Cara Johnson" },
  { value: "dan", label: "Dan Williams", disabled: true },
  { value: "eve", label: "Eve Martinez" },
];

const noopString = (value: string) => {
  void value;
};

export const Default: Story = {
  args: {
    options: teammates,
    placeholder: "Type @ to mention a teammate…",
    onChange: noopString,
  },
};

export const WithInitialValue: Story = {
  args: {
    value: "Great work today, @alice — can you review with @bob?",
    options: teammates,
    onChange: noopString,
  },
};

export const CustomTrigger: Story = {
  args: {
    options: [
      { value: "todo", label: "todo" },
      { value: "wip", label: "wip" },
      { value: "done", label: "done" },
    ],
    trigger: "#",
    placeholder: "Type # to tag with a status…",
    onChange: noopString,
  },
};

export const MoreRows: Story = {
  args: {
    options: teammates,
    rows: 6,
    placeholder: "Write a longer message with mentions…",
    onChange: noopString,
  },
};

export const Disabled: Story = {
  args: {
    options: teammates,
    value: "Editing locked",
    disabled: true,
    onChange: noopString,
  },
};

/** Controlled version driven by React state. */
export const Controlled: Story = {
  render: () => {
    const ControlledMentions = () => {
      const [value, setValue] = React.useState("");
      return (
        <div className="flex flex-col gap-2">
          <Mentions
            options={teammates}
            value={value}
            onChange={setValue}
            placeholder="Try @alice or @bob"
          />
          <p className="text-muted-foreground text-xs">Value: {value || "—"}</p>
        </div>
      );
    };
    return <ControlledMentions />;
  },
};
