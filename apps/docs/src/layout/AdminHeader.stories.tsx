import type { Meta, StoryObj } from "@storybook/react";
import { AdminHeader } from "@/components/layout/admin-header";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof AdminHeader> = {
  title: "Layouts/AdminHeader",
  component: AdminHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },

};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: "Chaos Admin",
    actions: (
      <Button variant="outline" size="sm">
        Settings
      </Button>
    ),
  },
};

export const WithChildren: Story = {
  args: {
    logo: "My Dashboard",
    children: (
      <nav className="flex items-center gap-2 text-sm">
        <a href="#" className="hover:underline">
          Home
        </a>
        <a href="#" className="hover:underline">
          Projects
        </a>
      </nav>
    ),
  },
};
