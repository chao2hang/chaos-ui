import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentBrowse, type Department } from "@chaos_team/chaos-ui/ui";
import { useState } from "react";

const meta: Meta<typeof DepartmentBrowse> = {
  title: "Components/DepartmentBrowse",
  component: DepartmentBrowse,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Department | undefined>();
    return (
      <div className="w-[300px]">
        <DepartmentBrowse
          value={value}
          onChange={setValue as any}
          placeholder="Select department..."
        />
      </div>
    );
  },
};

export const WithDefault: Story = {
  args: {
    defaultValue: { id: "1-1", name: "Engineering", code: "ENG" },
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<Department[]>([]);
    return (
      <div className="w-[300px]">
        <DepartmentBrowse
          value={value}
          onChange={setValue as any}
          multiple
          placeholder="Select departments..."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: { id: "1-1", name: "Engineering", code: "ENG" },
  },
};
