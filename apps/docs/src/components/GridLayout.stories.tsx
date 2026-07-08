import type { Meta, StoryObj } from "@storybook/react"
import { GridLayout, GridItem } from "@/components/ui/grid-layout"
import { Card, CardContent } from "@/components/ui/card"

const meta: Meta<typeof GridLayout> = {
  title: "Components/GridLayout",
  component: GridLayout,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <GridLayout columns={3}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4 text-center">{i + 1}</CardContent>
        </Card>
      ))}
    </GridLayout>
  ),
}

export const FourColumns: Story = {
  render: () => (
    <GridLayout columns={4}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4 text-center">{i + 1}</CardContent>
        </Card>
      ))}
    </GridLayout>
  ),
}

export const AutoColumns: Story = {
  render: () => (
    <GridLayout columns="auto">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4 text-center">Auto {i + 1}</CardContent>
        </Card>
      ))}
    </GridLayout>
  ),
}

export const WithSpan: Story = {
  render: () => (
    <GridLayout columns={4}>
      <GridItem span={2}>
        <Card><CardContent className="p-4 text-center">Span 2</CardContent></Card>
      </GridItem>
      <Card><CardContent className="p-4 text-center">1</CardContent></Card>
      <Card><CardContent className="p-4 text-center">1</CardContent></Card>
      <GridItem span={4}>
        <Card><CardContent className="p-4 text-center">Full Width</CardContent></Card>
      </GridItem>
    </GridLayout>
  ),
}
