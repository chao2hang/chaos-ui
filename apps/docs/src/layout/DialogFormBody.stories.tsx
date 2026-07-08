import type { Meta, StoryObj } from "@storybook/react";
import { DialogFormBody } from "@/components/layout/dialog-form-body";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof DialogFormBody> = {
  title: "Layouts/DialogFormBody",
  component: DialogFormBody,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DialogFormBody>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email" />
        </div>
      </div>
    </DialogFormBody>
  ),
};
