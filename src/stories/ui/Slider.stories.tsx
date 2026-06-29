import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs", "a11y"],
  argTypes: {
    defaultValue: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      description: "The initial slider value",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The slider orientation",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

function SliderDemo({
  defaultValue = 50,
  disabled = false,
  orientation = "horizontal",
}: {
  defaultValue?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  const [value, setValue] = useState(defaultValue);
  const isVertical = orientation === "vertical";

  return (
    <div
      className={
        isVertical ? "flex items-center gap-4" : "w-full max-w-80 space-y-2"
      }
    >
      <Slider
        value={value}
        onValueChange={(nextValue) => setValue(toSingleValue(nextValue))}
        disabled={disabled}
        orientation={orientation}
        className={isVertical ? "h-48 w-6 items-stretch" : "w-full"}
      >
        <SliderControl
          className={isVertical ? "h-full w-full flex-col" : undefined}
        >
          <SliderTrack className={isVertical ? "h-full w-1.5" : undefined}>
            <SliderIndicator className={isVertical ? "w-full" : undefined} />
          </SliderTrack>
          <SliderThumb aria-label="Value" />
        </SliderControl>
      </Slider>
      <p className="text-sm text-muted-foreground">Value: {value}</p>
    </div>
  );
}

function RangeSliderDemo() {
  const [value, setValue] = useState<readonly number[]>([25, 75]);

  return (
    <div className="w-full max-w-80 space-y-2">
      <Slider
        value={value}
        onValueChange={(nextValue) => setValue(toRangeValue(nextValue))}
        minStepsBetweenValues={10}
      >
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb aria-label="Minimum value" />
          <SliderThumb aria-label="Maximum value" />
        </SliderControl>
      </Slider>
      <p className="text-sm text-muted-foreground">
        Range: {value[0]} - {value[1]}
      </p>
    </div>
  );
}

function SteppedSliderDemo() {
  const [value, setValue] = useState(40);

  return (
    <div className="w-full max-w-80 space-y-2">
      <Slider
        value={value}
        onValueChange={(nextValue) => setValue(toSingleValue(nextValue))}
        step={10}
      >
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb aria-label="Volume" />
        </SliderControl>
      </Slider>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <p className="text-sm text-muted-foreground">Value: {value}</p>
    </div>
  );
}

function toSingleValue(value: number | readonly number[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? 50;
  }

  return value ?? 50;
}

function toRangeValue(value: number | readonly number[]) {
  return Array.isArray(value) ? value : [value];
}

export const Default: Story = {
  args: {
    defaultValue: 50,
    disabled: false,
    orientation: "horizontal",
  },
  render: ({ defaultValue, disabled, orientation }) => (
    <SliderDemo
      key={`${toSingleValue(defaultValue)}-${orientation ?? "horizontal"}-${disabled ?? false}`}
      defaultValue={toSingleValue(defaultValue)}
      disabled={disabled ?? false}
      orientation={orientation ?? "horizontal"}
    />
  ),
};

export const Stepped: Story = {
  render: () => <SteppedSliderDemo />,
};

export const Range: Story = {
  render: () => <RangeSliderDemo />,
};

export const Vertical: Story = {
  render: () => <SliderDemo defaultValue={35} orientation="vertical" />,
};

export const Disabled: Story = {
  render: () => <SliderDemo defaultValue={60} disabled />,
};
