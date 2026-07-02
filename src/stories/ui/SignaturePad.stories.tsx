import type { Meta, StoryObj } from "@storybook/react";
import { SignaturePad } from "@/components/ui/signature-pad";

const meta = {
  title: "Components/SignaturePad",
  component: SignaturePad,
  tags: ["autodocs"],
} satisfies Meta<typeof SignaturePad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithPenColor: Story = {
  args: {
    penColor: "#1d4ed8",
    placeholder: "Sign with blue pen",
  },
};

export const WithPenWidth: Story = {
  args: {
    penWidth: 5,
    penColor: "#dc2626",
    placeholder: "Thick red pen",
  },
};

export const WithGuideLine: Story = {
  args: {
    guideLine: true,
    placeholder: "Sign above the line",
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzMzMyI+UmVhZC1Pbmx5IFNpZ25hdHVyZTwvdGV4dD48L3N2Zz4=",
  },
};

export const CustomSize: Story = {
  args: {
    width: 500,
    height: 300,
    penColor: "#059669",
    placeholder: "500 x 300 canvas",
  },
};

export const CustomLabels: Story = {
  args: {
    saveLabel: "Submit",
    clearLabel: "Reset",
    placeholder: "Please sign below",
  },
};

export const NoActions: Story = {
  args: {
    showActions: false,
    placeholder: "No action buttons",
  },
};

export const DarkMode: Story = {
  args: {
    penColor: "#ffffff",
    className: "dark bg-zinc-900 p-4 rounded-lg",
    placeholder: "Dark mode signature",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const WithOnChange: Story = {
  render: () => {
    return (
      <SignaturePad
        onChange={(isEmpty) => {
          console.log("Signature isEmpty:", isEmpty);
        }}
        onSave={(data) => {
          console.log("Saved signature:", data.dataUrl.slice(0, 50) + "...");
        }}
      />
    );
  },
};
