import type { Meta, StoryObj } from "@storybook/react";
import { UserBrowse, type User } from "@/components/ui/user-browse";
import { useState } from "react";

const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Design",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    department: "Marketing",
  },
];

const meta = {
  title: "Components/UserBrowse",
  component: UserBrowse,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof UserBrowse>;

export default meta;
type Story = StoryObj;

function DefaultUserBrowse() {
  const [value, setValue] = useState<User | undefined>();
  return (
    <div className="w-[300px]">
      <UserBrowse
        users={sampleUsers}
        value={value as User}
        onChange={(next) => setValue(Array.isArray(next) ? undefined : next)}
        placeholder="Select user..."
      />
    </div>
  );
}

function MultipleUserBrowse() {
  const [value, setValue] = useState<User[]>([]);
  return (
    <div className="w-[300px]">
      <UserBrowse
        users={sampleUsers}
        value={value}
        onChange={(next) =>
          setValue(Array.isArray(next) ? next : next ? [next] : [])
        }
        multiple
        placeholder="Select users..."
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultUserBrowse />,
};

export const WithDefault: Story = {
  args: {
    users: sampleUsers,
    defaultValue: { id: "1", name: "John Doe", email: "john@example.com" },
  },
};

export const Multiple: Story = {
  render: () => <MultipleUserBrowse />,
};

export const WithMaxCount: Story = {
  render: () => (
    <div className="w-[300px]">
      <UserBrowse
        users={sampleUsers}
        multiple
        maxCount={3}
        placeholder="Select up to 3 users..."
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    users: sampleUsers,
    disabled: true,
    defaultValue: { id: "1", name: "John Doe", email: "john@example.com" },
  },
};
