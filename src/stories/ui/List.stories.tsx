import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from "@/components/ui/list";

const meta = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  { title: "Design review", desc: "Review the new dashboard mockups" },
  { title: "Sync with backend", desc: "Align on the API contract for v2" },
  { title: "Ship release", desc: "Cut the 0.8.0 release notes" },
];

export const Default: Story = {
  render: () => (
    <List>
      {data.map((d) => (
        <ListItem key={d.title} description={d.desc}>
          {d.title}
        </ListItem>
      ))}
    </List>
  ),
};

export const Bordered: Story = {
  render: () => (
    <List bordered>
      {data.map((d) => (
        <ListItem key={d.title} description={d.desc}>
          {d.title}
        </ListItem>
      ))}
    </List>
  ),
};

export const Small: Story = {
  render: () => (
    <List bordered size="sm">
      {data.map((d) => (
        <ListItem key={d.title}>{d.title}</ListItem>
      ))}
    </List>
  ),
};

export const WithExtra: Story = {
  render: () => (
    <List bordered>
      {data.map((d, i) => (
        <ListItem
          key={d.title}
          description={d.desc}
          extra={
            <span className="text-muted-foreground text-xs">#{i + 1}</span>
          }
        >
          {d.title}
        </ListItem>
      ))}
    </List>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <List direction="horizontal" bordered>
      {data.map((d) => (
        <ListItem key={d.title}>{d.title}</ListItem>
      ))}
    </List>
  ),
};
