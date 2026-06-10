"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function CheckboxRadioPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Checkbox & Radio</h1>
      <p className="mt-2 text-muted-foreground">
        Form controls for boolean selection (checkbox) and single-choice selection (radio group).
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Checkbox - Default</h2>
        <div className="flex items-center gap-4">
          <Checkbox />
          <Checkbox />
          <Checkbox />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Checkbox - Checked</h2>
        <div className="flex items-center gap-4">
          <Checkbox defaultChecked />
          <Checkbox checked />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Checkbox - Disabled</h2>
        <div className="flex items-center gap-4">
          <Checkbox disabled />
          <Checkbox disabled defaultChecked />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Checkbox - With Label</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="marketing" defaultChecked />
            <Label htmlFor="marketing">Receive marketing emails</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-label" disabled />
            <Label htmlFor="disabled-label">Disabled checkbox with label</Label>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Radio Group - Default</h2>
        <RadioGroup defaultValue="option-1" className="max-w-xs">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-1" id="r1" />
            <Label htmlFor="r1">Option 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-2" id="r2" />
            <Label htmlFor="r2">Option 2</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-3" id="r3" />
            <Label htmlFor="r3">Option 3</Label>
          </div>
        </RadioGroup>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Radio Group - With Description</h2>
        <RadioGroup defaultValue="comfortable" className="max-w-sm">
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <RadioGroupItem value="default" id="rd1" className="mt-0.5" />
            <div>
              <Label htmlFor="rd1">Default</Label>
              <p className="text-xs text-muted-foreground">Standard spacing for general use.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <RadioGroupItem value="comfortable" id="rd2" className="mt-0.5" />
            <div>
              <Label htmlFor="rd2">Comfortable</Label>
              <p className="text-xs text-muted-foreground">Increased spacing for easier scanning.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <RadioGroupItem value="compact" id="rd3" className="mt-0.5" />
            <div>
              <Label htmlFor="rd3">Compact</Label>
              <p className="text-xs text-muted-foreground">Reduced spacing to fit more content.</p>
            </div>
          </div>
        </RadioGroup>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Radio Group - Disabled</h2>
        <RadioGroup disabled defaultValue="option-1" className="max-w-xs">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-1" id="dr1" />
            <Label htmlFor="dr1">Option 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-2" id="dr2" />
            <Label htmlFor="dr2">Option 2</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-3" id="dr3" />
            <Label htmlFor="dr3">Option 3</Label>
          </div>
        </RadioGroup>
      </section>
    </div>
  )
}
