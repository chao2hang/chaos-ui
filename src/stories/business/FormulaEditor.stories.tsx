import type { Meta, StoryObj } from "@storybook/react"
import { FormulaEditor } from "@/components/business/formula-editor"
import type { FormulaVariable, FormulaFunction } from "@/components/business/formula-editor"

const meta = {
  title: "Business/FormulaEditor",
  component: FormulaEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof FormulaEditor>

export default meta
type Story = StoryObj<typeof meta>

const sampleVariables: FormulaVariable[] = [
  { name: "unitPrice", label: "Unit Price", type: "number", category: "Pricing", sampleValue: 25.99 },
  { name: "quantity", label: "Quantity", type: "number", category: "Inventory", sampleValue: 100 },
  { name: "discount", label: "Discount Rate", type: "number", category: "Pricing", sampleValue: 0.15 },
  { name: "taxRate", label: "Tax Rate", type: "number", category: "Pricing", sampleValue: 0.08 },
  { name: "shipping", label: "Shipping Cost", type: "number", category: "Logistics", sampleValue: 9.99 },
  { name: "weight", label: "Weight (kg)", type: "number", category: "Logistics", sampleValue: 2.5 },
]

const sampleFunctions: FormulaFunction[] = [
  {
    name: "SUM",
    label: "Sum",
    args: [{ name: "values", type: "number...1" }],
    returnType: "number",
    description: "Add all values together",
    category: "Math",
  },
  {
    name: "AVG",
    label: "Average",
    args: [{ name: "values", type: "number...1" }],
    returnType: "number",
    description: "Calculate the average of values",
    category: "Math",
  },
  {
    name: "MIN",
    label: "Minimum",
    args: [{ name: "values", type: "number...1" }],
    returnType: "number",
    description: "Return the smallest value",
    category: "Math",
  },
  {
    name: "MAX",
    label: "Maximum",
    args: [{ name: "values", type: "number...1" }],
    returnType: "number",
    description: "Return the largest value",
    category: "Math",
  },
  {
    name: "ABS",
    label: "Absolute",
    args: [{ name: "value", type: "number" }],
    returnType: "number",
    description: "Return the absolute value",
    category: "Math",
  },
  {
    name: "ROUND",
    label: "Round",
    args: [
      { name: "value", type: "number" },
      { name: "decimals", type: "number", description: "Number of decimal places" },
    ],
    returnType: "number",
    description: "Round to specified decimal places",
    category: "Math",
  },
]

export const Default: Story = {
  args: {
    variables: sampleVariables,
    functions: sampleFunctions,
    placeholder: "Enter formula, e.g. $unitPrice * $quantity * (1 - $discount)",
  },
}

export const WithPreview: Story = {
  args: {
    value: "$unitPrice * $quantity * (1 - $discount) + $shipping",
    variables: sampleVariables,
    functions: sampleFunctions,
    showPreview: true,
    sampleValues: {
      unitPrice: 25.99,
      quantity: 100,
      discount: 0.15,
      taxRate: 0.08,
      shipping: 9.99,
      weight: 2.5,
    },
  },
}

export const WithValidation: Story = {
  args: {
    variables: sampleVariables,
    functions: sampleFunctions,
    validator: (formula: string) => {
      if (formula.includes("/") && formula.match(/\/\s*0/)) {
        return "Potential division by zero detected";
      }
      return null;
    },
    placeholder: "Try entering a formula with division by zero...",
  },
}

export const Disabled: Story = {
  args: {
    value: "$unitPrice * $quantity",
    variables: sampleVariables,
    functions: sampleFunctions,
    disabled: true,
  },
}

export const Dark: Story = {
  args: {
    value: "SUM($unitPrice, $shipping) * $quantity",
    variables: sampleVariables,
    functions: sampleFunctions,
    showPreview: true,
    sampleValues: {
      unitPrice: 25.99,
      quantity: 100,
      discount: 0.15,
      taxRate: 0.08,
      shipping: 9.99,
      weight: 2.5,
    },
  },
  parameters: { backgrounds: { default: "dark" } },
}
