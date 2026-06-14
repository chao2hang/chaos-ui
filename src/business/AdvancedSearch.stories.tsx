import type { Meta, StoryObj } from "@storybook/react"
import { AdvancedSearch } from "@/components/business/advanced-search"

const fields = [
  {
    key: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "paused", label: "Paused" },
      { value: "draft", label: "Draft" },
    ],
  },
  {
    key: "owner",
    label: "Owner",
    options: [
      { value: "growth", label: "Growth" },
      { value: "finance", label: "Finance" },
    ],
  },
]

const meta = {
  title: "Business/AdvancedSearch",
  component: AdvancedSearch,
  tags: ["autodocs", "a11y"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AdvancedSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    fields,
    defaultValues: { query: "summer" },
    onSearch: () => undefined,
  },
}

export const WithSavedFilters: Story = {
  args: {
    fields,
    savedSearches: [
      { id: "active-growth", label: "Active growth", values: { status: "active", owner: "growth" } },
      { id: "drafts", label: "Drafts", values: { status: "draft" } },
    ],
    onSearch: () => undefined,
    onSaveSearch: () => undefined,
  },
}

