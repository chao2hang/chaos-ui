import type { Meta, StoryObj } from "@storybook/react";
import { RoleAssignment } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof RoleAssignment> = {
  title: "Business/RoleAssignment",
  component: RoleAssignment,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RoleAssignment
      principals={[]}
      roles={[]}
      onChange={() => {}}
      readOnly={false}
    />
  ),
};
