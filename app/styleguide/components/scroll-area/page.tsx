import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
const tags = Array.from({ length: 50 }).map((_, i) => "v1.2.0-beta." + i)
export default function ScrollAreaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Scroll Area</h1>
      <p className="mt-2 text-muted-foreground">Custom styled scrollable container.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Vertical Scroll</h2>
        <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium">Tags</h4>
            {tags.map((tag) => (<div key={tag}><div className="text-sm">{tag}</div><Separator className="my-2" /></div>))}
          </div>
        </ScrollArea>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Fixed Height</h2>
        <ScrollArea className="h-48 w-full max-w-md rounded-md border">
          <div className="p-4 space-y-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-3 text-sm">
                <p className="font-medium">Item {i + 1}</p>
                <p className="text-muted-foreground">Scrollable list item.</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>
    </div>
  )
}
