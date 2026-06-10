import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarIcon } from "lucide-react"
export default function HoverCardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Hover Card</h1>
      <p className="mt-2 text-muted-foreground">Rich preview card shown on hover.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">User Profile</h2>
        <p className="text-sm">Hover over <HoverCard>
          <HoverCardTrigger className="inline font-medium text-primary underline underline-offset-4 cursor-pointer">@johndoe</HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-3">
              <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">John Doe</h4>
                <p className="text-xs text-muted-foreground">Full-stack developer.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarIcon className="size-3" />Joined March 2024</div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard> to see the card.</p>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Positioning</h2>
        <div className="flex flex-wrap gap-8">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <HoverCard key={side}>
              <HoverCardTrigger className="rounded-md border px-3 py-1.5 text-sm cursor-pointer hover:bg-muted">Hover ({side})</HoverCardTrigger>
              <HoverCardContent side={side}><p className="text-sm">Content on {side}</p></HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </section>
    </div>
  )
}
