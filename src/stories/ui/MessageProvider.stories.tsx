import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { MessageProvider } from "@/components/ui/message-provider";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/MessageProvider",
  component: MessageProvider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MessageProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Demo = () => (
  <div className="flex flex-wrap gap-2">
    <Button onClick={() => toast.success("Saved successfully")}>Success</Button>
    <Button variant="outline" onClick={() => toast.error("Failed to save")}>
      Error
    </Button>
    <Button
      variant="outline"
      onClick={() => toast.info("New update available")}
    >
      Info
    </Button>
    <Button variant="outline" onClick={() => toast.warning("Session expiring")}>
      Warning
    </Button>
    <Button variant="ghost" onClick={() => toast("Neutral message")}>
      Neutral
    </Button>
  </div>
);

export const TopRight: Story = {
  render: () => (
    <>
      <MessageProvider />
      <Demo />
    </>
  ),
};

export const TopCenter: Story = {
  render: () => (
    <>
      <MessageProvider position="top-center" />
      <Demo />
    </>
  ),
};

export const BottomRight: Story = {
  render: () => (
    <>
      <MessageProvider position="bottom-right" />
      <Demo />
    </>
  ),
};

export const StackLimit: Story = {
  render: () => (
    <>
      <MessageProvider position="top-right" visibleToasts={3} />
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Max 3 visible at once — click rapidly to see stacking.
        </p>
        <Demo />
      </div>
    </>
  ),
};
