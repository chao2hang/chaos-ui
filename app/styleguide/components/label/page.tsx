import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
export default function LabelPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Label</h1>
      <p className="mt-2 text-muted-foreground">Form label for associating text with controls.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <div className="space-y-3 max-w-sm"><Label>Default label</Label><Label className="text-base">Larger</Label><Label className="text-xs text-muted-foreground">Muted</Label></div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Controls</h2>
        <div className="space-y-4 max-w-sm">
          <div className="space-y-1.5"><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="John Doe" /></div>
          <div className="flex items-center gap-2"><Checkbox id="terms" /><Label htmlFor="terms">Accept terms</Label></div>
          <div className="flex items-center gap-2"><Switch id="notif" /><Label htmlFor="notif">Enable notifications</Label></div>
        </div>
      </section>
    </div>
  )
}
