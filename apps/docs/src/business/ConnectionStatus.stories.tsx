import type { Meta, StoryObj } from "@storybook/react";
import { ConnectionStatus } from "@/components/business/connection-status";
import React from "react";

const meta: Meta<typeof ConnectionStatus> = {
  title: "Business/ConnectionStatus",
  component: ConnectionStatus,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

function withNavigatorOnline(value: boolean) {
  return (Story: React.ComponentType) => {
    const Wrapper = () => {
      const original = React.useRef<boolean | null>(null);
      React.useEffect(() => {
        if (original.current === null) {
          original.current = navigator.onLine;
        }
        Object.defineProperty(navigator, "onLine", {
          value,
          configurable: true,
        });
        return () => {
          if (original.current !== null) {
            Object.defineProperty(navigator, "onLine", {
              value: original.current,
              configurable: true,
            });
          }
        };
      }, []);
      return <Story />;
    };
    Wrapper.displayName = `NavigatorOnline(${value})`;
    return <Wrapper />;
  };
}

export const Banner: Story = {
  args: {
    variant: "banner",
    showWhenOnline: true,
  },
};

export const Offline: Story = {
  args: {
    variant: "banner",
  },
  decorators: [withNavigatorOnline(false)],
};

export const Inline: Story = {
  args: { variant: "inline", showWhenOnline: true },
};

export const Toast: Story = {
  args: { variant: "toast" },
};
