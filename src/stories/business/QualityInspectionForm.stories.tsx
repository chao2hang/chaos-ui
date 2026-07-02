import type { Meta, StoryObj } from "@storybook/react";
import { QualityInspectionForm } from "@/components/business/quality-inspection-form";
import type { InspectionTemplate } from "@/components/business/quality-inspection-form";

const meta = {
  title: "Business/QualityInspectionForm",
  component: QualityInspectionForm,
  tags: ["autodocs"],
} satisfies Meta<typeof QualityInspectionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const iqcTemplate: InspectionTemplate = {
  name: "IQC - Steel Sheet Inspection",
  description: "Incoming quality control for steel sheet raw materials",
  type: "IQC",
  fields: [
    { id: "thickness", label: "Thickness", type: "measurement", unit: "mm", specMin: 4.8, specMax: 5.2, required: true },
    { id: "width", label: "Width", type: "measurement", unit: "mm", specMin: 998, specMax: 1002 },
    { id: "length", label: "Length", type: "measurement", unit: "mm", specMin: 1995, specMax: 2005 },
    { id: "hardness", label: "Hardness", type: "measurement", unit: "HRC", specMin: 58, specMax: 62 },
    { id: "weight", label: "Weight", type: "measurement", unit: "kg", specMin: 74, specMax: 78 },
    { id: "visual", label: "Visual Check", type: "passfail", required: true },
    { id: "coating", label: "Coating Check", type: "passfail" },
  ],
};

export const Default: Story = {
  args: {
    template: iqcTemplate,
    inspector: "Zhang Wei",
  },
};

export const WithFailResult: Story = {
  args: {
    template: iqcTemplate,
    inspector: "Li Na",
    readOnly: true,
    values: {
      thickness: 5.8,
      width: 1000,
      length: 2000,
      hardness: 60,
      weight: 76,
      visual: "pass",
      coating: "fail",
    },
  },
};

export const ReadOnly: Story = {
  args: {
    template: iqcTemplate,
    readOnly: true,
    inspector: "Wang Fang",
    values: {
      thickness: 5.0,
      width: 1000,
      length: 2000,
      hardness: 60,
      weight: 76,
      visual: "pass",
      coating: "pass",
    },
  },
};

const groupedTemplate: InspectionTemplate = {
  name: "IPQC - Assembly Check",
  description: "In-process quality control during assembly",
  type: "IPQC",
  fields: [
    { id: "gap", label: "Gap Width", type: "measurement", unit: "mm", specMin: 0.1, specMax: 0.5, group: "Dimensions" },
    { id: "alignment", label: "Alignment", type: "measurement", unit: "mm", specMin: -0.1, specMax: 0.1, group: "Dimensions" },
    { id: "torque", label: "Bolt Torque", type: "measurement", unit: "Nm", specMin: 18, specMax: 22, group: "Fastening" },
    { id: "surface", label: "Surface Finish", type: "passfail", group: "Appearance" },
    { id: "color", label: "Color Match", type: "passfail", group: "Appearance" },
    { id: "notes", label: "Inspector Notes", type: "text", group: "Notes" },
  ],
};

export const GroupedFields: Story = {
  args: {
    template: groupedTemplate,
    inspector: "Chen Ming",
  },
};

export const DarkMode: Story = {
  args: {
    template: iqcTemplate,
    inspector: "Zhao Jun",
  },
  parameters: {
    backgrounds: { default: "dark" },
    theme: "dark",
  },
};
