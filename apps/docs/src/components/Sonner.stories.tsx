import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const meta: Meta<typeof Toaster> = {
  title: "Components/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  parameters: { layout: "centered" },

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast("Default notification")}>
          Show Default
        </Button>
        <Button variant="outline" onClick={() => toast.success("Success!")}>
          Show Success
        </Button>
        <Button variant="outline" onClick={() => toast.error("Error!")}>
          Show Error
        </Button>
      </div>
    </div>
  ),
};
