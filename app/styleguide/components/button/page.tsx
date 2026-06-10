import { Button } from "@/components/ui/button"
import { Mail, ChevronRight, Loader2, Plus, Search, Trash2 } from "lucide-react"

export default function ButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Button</h1>
      <p className="mt-2 text-muted-foreground">
        Interactive button component with multiple variants, sizes, and states.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Disabled</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Default</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="link" disabled>Link</Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Loading</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>
            <Loader2 className="animate-spin" />
            Loading...
          </Button>
          <Button variant="outline" disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Icon</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <Mail />
            Login with Email
          </Button>
          <Button variant="outline">
            Send
            <ChevronRight />
          </Button>
          <Button variant="destructive">
            <Trash2 />
            Delete
          </Button>
          <Button variant="secondary">
            <Search />
            Search
          </Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Icon Only</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-xs"><Plus /></Button>
          <Button size="icon-sm"><Plus /></Button>
          <Button size="icon"><Plus /></Button>
          <Button size="icon-lg"><Plus /></Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="icon" variant="outline"><Search /></Button>
          <Button size="icon" variant="ghost"><Trash2 /></Button>
          <Button size="icon" variant="destructive"><Trash2 /></Button>
          <Button size="icon" variant="secondary"><Mail /></Button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Variant + Size Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium text-muted-foreground">Variant</th>
                <th className="p-2 text-left font-medium text-muted-foreground">xs</th>
                <th className="p-2 text-left font-medium text-muted-foreground">sm</th>
                <th className="p-2 text-left font-medium text-muted-foreground">default</th>
                <th className="p-2 text-left font-medium text-muted-foreground">lg</th>
              </tr>
            </thead>
            <tbody>
              {(["default", "secondary", "destructive", "outline", "ghost", "link"] as const).map((v) => (
                <tr key={v} className="border-b">
                  <td className="p-2 font-mono text-xs">{v}</td>
                  {(["xs", "sm", "default", "lg"] as const).map((s) => (
                    <td key={s} className="p-2">
                      <Button variant={v} size={s}>Aa</Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
