import type { Meta, StoryObj } from "@storybook/react";
import { FormList, type FormListItem } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { useState } from "react";

interface EmailItem extends FormListItem {
  email: string;
  label: string;
}

const meta: Meta<typeof FormList> = {
  title: "Components/FormList",
  component: FormList,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState<EmailItem[]>([
      { id: "1", email: "john@example.com", label: "John" },
    ]);
    return (
      <FormList<EmailItem>
        value={items}
        onChange={setItems}
        onAdd={() => ({ id: `item-${Date.now()}`, email: "", label: "" })}
        renderItem={(item, index) => (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={item.label}
                onChange={(e) => {
                  const newValue = [...items];
                  newValue[index] = { ...item, label: e.target.value };
                  setItems(newValue);
                }}
                placeholder="Label"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={item.email}
                onChange={(e) => {
                  const newValue = [...items];
                  newValue[index] = { ...item, email: e.target.value };
                  setItems(newValue);
                }}
                placeholder="Email"
              />
            </div>
          </div>
        )}
        addButtonText="Add Email"
      />
    );
  },
};

export const WithMaxItems: Story = {
  render: () => {
    const [items, setItems] = useState<FormListItem[]>([]);
    return (
      <FormList
        value={items}
        onChange={setItems}
        onAdd={() => ({ id: `item-${Date.now()}`, value: "" })}
        renderItem={() => <Input placeholder="Enter value" />}
        maxItems={3}
        addButtonText="Add Item"
      />
    );
  },
};
