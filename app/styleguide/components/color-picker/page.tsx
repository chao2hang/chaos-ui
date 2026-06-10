"use client"
import * as React from "react"
import { ColorPicker } from "@/components/ui/color-picker"
export default function ColorPickerPage() {
  const [color, setColor] = React.useState("#3b82f6")
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Color Picker</h1>
      <p className="mt-2 text-muted-foreground">Color selection with picker and preset swatches.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <div className="flex items-center gap-4">
          <ColorPicker value={color} onChange={setColor} />
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-md border" style={{ backgroundColor: color }} />
            <span className="text-sm font-mono">{color}</span>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Custom Presets</h2>
        <ColorPicker value={color} onChange={setColor} presets={["#ef4444", "#f97316", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"]} />
      </section>
    </div>
  )
}
