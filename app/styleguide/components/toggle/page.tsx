"use client"

import * as React from "react"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ListIcon,
  ListOrderedIcon,
  LayoutGridIcon,
  LayoutListIcon,
  EyeIcon,
} from "lucide-react"

export default function TogglePage() {
  const [singleValue, setSingleValue] = React.useState<string[]>([])
  const [multiValue, setMultiValue] = React.useState<string[]>(["bold"])

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Toggle</h1>
        <p className="mt-2 text-muted-foreground">
          A two-state button that can be either on or off. Supports variants, sizes, and grouped toggles.
        </p>
      </div>

      {/* Default Toggle */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Default</h2>
          <p className="text-sm text-muted-foreground">Basic toggle in default and outline variants.</p>
        </div>
        <Card>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <Toggle>Default</Toggle>
              <Toggle variant="outline">Outline</Toggle>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* With Text and Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Icons</h2>
          <p className="text-sm text-muted-foreground">Toggle buttons with icons for toolbar-style interfaces.</p>
        </div>
        <Card>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              <Toggle variant="outline" size="sm">
                <BoldIcon data-icon="inline-start" />
                Bold
              </Toggle>
              <Toggle variant="outline" size="sm">
                <ItalicIcon data-icon="inline-start" />
                Italic
              </Toggle>
              <Toggle variant="outline" size="sm">
                <UnderlineIcon data-icon="inline-start" />
                Underline
              </Toggle>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Sizes</h2>
          <p className="text-sm text-muted-foreground">Toggle buttons in small, default, and large sizes.</p>
        </div>
        <Card>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <Toggle size="sm">Small</Toggle>
              <Toggle size="default">Default</Toggle>
              <Toggle size="lg">Large</Toggle>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-wrap items-center gap-3">
              <Toggle variant="outline" size="sm">
                <EyeIcon data-icon="inline-start" />
                Small
              </Toggle>
              <Toggle variant="outline" size="default">
                <EyeIcon data-icon="inline-start" />
                Default
              </Toggle>
              <Toggle variant="outline" size="lg">
                <EyeIcon data-icon="inline-start" />
                Large
              </Toggle>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Disabled</h2>
          <p className="text-sm text-muted-foreground">Disabled toggle states.</p>
        </div>
        <Card>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <Toggle disabled>Disabled</Toggle>
              <Toggle variant="outline" disabled>
                Disabled Outline
              </Toggle>
              <Toggle disabled pressed>
                Disabled Pressed
              </Toggle>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Toggle Group - Multiple */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Toggle Group (Multiple)</h2>
          <p className="text-sm text-muted-foreground">Multiple toggles that can be independently activated.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Text formatting</p>
              <ToggleGroup multiple value={multiValue} onValueChange={setMultiValue}>
                <ToggleGroupItem value="bold">
                  <BoldIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <ItalicIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <UnderlineIcon />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">List type</p>
              <ToggleGroup multiple>
                <ToggleGroupItem value="bullet">
                  <ListIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="numbered">
                  <ListOrderedIcon />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Toggle Group - Single */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Toggle Group (Single)</h2>
          <p className="text-sm text-muted-foreground">Single-select toggle group where only one item can be active.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Text alignment</p>
              <ToggleGroup value={singleValue} onValueChange={setSingleValue}>
                <ToggleGroupItem value="left">
                  <AlignLeftIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenterIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRightIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="justify">
                  <AlignJustifyIcon />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Layout</p>
              <ToggleGroup>
                <ToggleGroupItem value="grid">
                  <LayoutGridIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="list">
                  <LayoutListIcon />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Toggle Group - Outline Variant */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Toggle Group Outline</h2>
          <p className="text-sm text-muted-foreground">Toggle group with outline variant and different sizes.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Outline - default</p>
              <ToggleGroup variant="outline">
                <ToggleGroupItem value="left">
                  <AlignLeftIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenterIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRightIcon />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Outline - small</p>
              <ToggleGroup variant="outline" size="sm">
                <ToggleGroupItem value="bold">
                  <BoldIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <ItalicIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <UnderlineIcon />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Outline - large</p>
              <ToggleGroup variant="outline" size="lg">
                <ToggleGroupItem value="left">
                  <AlignLeftIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenterIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRightIcon />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Toggle Group - Spacing */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Toggle Group Spacing</h2>
          <p className="text-sm text-muted-foreground">Toggle groups with spacing=0 for a connected button look.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Connected (spacing=0)</p>
              <ToggleGroup variant="outline" spacing={0}>
                <ToggleGroupItem value="left">
                  <AlignLeftIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenterIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRightIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="justify">
                  <AlignJustifyIcon />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Connected with text</p>
              <ToggleGroup variant="outline" spacing={0}>
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month">Month</ToggleGroupItem>
                <ToggleGroupItem value="year">Year</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
