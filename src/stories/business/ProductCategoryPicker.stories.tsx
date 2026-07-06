import type { Meta, StoryObj } from "@storybook/react";
import { ProductCategoryPicker } from "@/components/business/product-category-picker";

const meta = { title: "Business/Pickers/ProductCategoryPicker", component: ProductCategoryPicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof ProductCategoryPicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "cat-1", label: "Electronics" }, { value: "cat-2", label: "Clothing" }, { value: "cat-3", label: "Books" }], placeholder: "Select category" } };
export const WithValue: Story = { args: { options: [{ value: "cat-1", label: "Electronics" }], value: "cat-1" } };
