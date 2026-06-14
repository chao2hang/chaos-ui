import type { Meta, StoryObj } from "@storybook/react";
import {
  DepartmentBrowse,
  type Department,
} from "@/components/ui/department-browse";
import { useState } from "react";

const meta = {
  title: "Components/DepartmentBrowse",
  component: DepartmentBrowse,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof DepartmentBrowse>;

export default meta;
type Story = StoryObj;

function DefaultDepartmentBrowse() {
  const [value, setValue] = useState<Department | undefined>();
  return (
    <div className="w-[300px]">
      <DepartmentBrowse
        value={value as Department}
        onChange={(next) => setValue(Array.isArray(next) ? undefined : next)}
        placeholder="Select department..."
      />
    </div>
  );
}

function MultipleDepartmentBrowse() {
  const [value, setValue] = useState<Department[]>([]);
  return (
    <div className="w-[300px]">
      <DepartmentBrowse
        value={value}
        onChange={(next) =>
          setValue(Array.isArray(next) ? next : next ? [next] : [])
        }
        multiple
        placeholder="Select departments..."
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultDepartmentBrowse />,
};

export const WithDefault: Story = {
  args: {
    defaultValue: { id: "1-1", name: "Engineering", code: "ENG" },
  },
};

export const Multiple: Story = {
  render: () => <MultipleDepartmentBrowse />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: { id: "1-1", name: "Engineering", code: "ENG" },
  },
};
