import type { Meta, StoryObj } from "@storybook/react";
import { TagsInput } from "@/components/ui/tags-input";
import { useState } from "react";

const meta: Meta<typeof TagsInput> = {
  title: "Components/TagsInput",
  component: TagsInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["react", "typescript"]);
    return (
      <div className="w-[400px]">
        <TagsInput value={tags} onChange={setTags} placeholder="Add tag..." />
      </div>
    );
  },
};

export const WithDefault: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["javascript", "css", "html"]);
    return (
      <div className="w-[400px]">
        <TagsInput value={tags} onChange={setTags} placeholder="Add more..." />
      </div>
    );
  },
};
