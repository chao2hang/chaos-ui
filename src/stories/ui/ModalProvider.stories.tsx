import type { Meta, StoryObj } from "@storybook/react";
import { modalStore } from "@/lib/modal-store";
import { ModalProvider } from "@/components/ui/modal-provider";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/ModalProvider",
  component: ModalProvider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ModalProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Demo = () => (
  <div className="flex flex-wrap gap-2">
    <Button
      onClick={() =>
        modalStore.push({
          kind: "confirm",
          title: "Delete project",
          content: "This permanently deletes the project. Continue?",
          okText: "Delete",
          okVariant: "destructive",
          cancelText: "Cancel",
        })
      }
    >
      Confirm (destructive)
    </Button>
    <Button
      variant="outline"
      onClick={() =>
        modalStore.push({
          kind: "confirm",
          title: "Publish changes",
          content: "Publish the current draft to production?",
          okText: "Publish",
        })
      }
    >
      Confirm (default)
    </Button>
    <Button
      variant="ghost"
      onClick={() =>
        modalStore.push({
          kind: "info",
          title: "Heads up",
          content: "Your free trial ends in 3 days.",
          okText: "Got it",
        })
      }
    >
      Info
    </Button>
    <Button
      variant="ghost"
      onClick={() =>
        modalStore.push({
          kind: "success",
          title: "All set",
          content: "Your changes have been saved.",
        })
      }
    >
      Success
    </Button>
    <Button
      variant="ghost"
      onClick={() =>
        modalStore.push({
          kind: "warning",
          title: "Careful",
          content: "You are about to switch environments.",
        })
      }
    >
      Warning
    </Button>
    <Button
      variant="ghost"
      onClick={() =>
        modalStore.push({
          kind: "error",
          title: "Something went wrong",
          content: "The server returned a 500 response.",
        })
      }
    >
      Error
    </Button>
  </div>
);

export const Default: Story = {
  render: () => (
    <>
      <ModalProvider />
      <Demo />
    </>
  ),
};
