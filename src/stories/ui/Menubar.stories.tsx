import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Menubar } from "@/components/ui/menubar";

const meta = {
  title: "Components/Menubar",
  component: Menubar,
  tags: ["autodocs", "a11y"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The direction of keyboard navigation",
    },
    disabled: {
      control: "boolean",
      description: "Whether the menubar ignores interaction",
    },
  },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = ["File", "Edit", "View", "Help"];

function MenubarDemo({
  disabled = false,
  orientation = "horizontal",
}: {
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  const [activeItem, setActiveItem] = useState("File");
  const isVertical = orientation === "vertical";

  return (
    <div className="space-y-3">
      <Menubar
        disabled={disabled}
        orientation={orientation}
        className={
          isVertical ? "h-auto w-40 flex-col items-stretch" : undefined
        }
      >
        {menuItems.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={activeItem === item}
            disabled={disabled}
            onClick={() => setActiveItem(item)}
            className={
              isVertical
                ? "rounded-md px-3 py-1 text-left text-sm hover:bg-accent aria-pressed:bg-accent disabled:pointer-events-none"
                : "rounded-md px-3 py-1 text-sm hover:bg-accent aria-pressed:bg-accent disabled:pointer-events-none"
            }
          >
            {item}
          </button>
        ))}
      </Menubar>
      <p className="text-sm text-muted-foreground">
        Active menu:{" "}
        <span className="font-medium text-foreground">{activeItem}</span>
      </p>
    </div>
  );
}

export const Default: Story = {
  args: {
    disabled: false,
    orientation: "horizontal",
  },
  render: ({ disabled, orientation }) => (
    <MenubarDemo
      disabled={disabled ?? false}
      orientation={(orientation ?? "horizontal") as "horizontal" | "vertical"}
    />
  ),
};

export const Vertical: Story = {
  render: () => <MenubarDemo orientation="vertical" />,
};

export const Disabled: Story = {
  render: () => <MenubarDemo disabled />,
};
