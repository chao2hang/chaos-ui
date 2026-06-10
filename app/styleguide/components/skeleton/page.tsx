import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function SkeletonPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Skeleton</h1>
        <p className="mt-2 text-muted-foreground">
          A placeholder preview of content before it loads. Use to reduce perceived loading time.
        </p>
      </div>

      {/* Text Skeleton */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Text</h2>
          <p className="text-sm text-muted-foreground">Placeholder lines for text content.</p>
        </div>
        <Card>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </section>

      {/* Card Skeleton */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Card</h2>
          <p className="text-sm text-muted-foreground">Skeleton layout mimicking a card structure.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-32 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-32 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/5" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Table Row Skeleton */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Table Rows</h2>
          <p className="text-sm text-muted-foreground">Skeleton rows simulating a data table.</p>
        </div>
        <Card>
          <CardContent className="space-y-0">
            {/* Header */}
            <div className="flex items-center gap-4 py-3">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="ml-auto h-4 w-[80px]" />
            </div>
            <Separator />
            {/* Rows */}
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 py-3">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[180px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="ml-auto h-4 w-[80px]" />
                </div>
                {i < 4 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Avatar Skeleton */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Avatar</h2>
          <p className="text-sm text-muted-foreground">Skeleton shapes for avatar and user info.</p>
        </div>
        <Card>
          <CardContent className="space-y-4">
            {/* Single avatar with text */}
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <Separator />
            {/* Avatar row */}
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="ml-auto h-8 w-16 rounded-lg" />
            </div>
            <Separator />
            {/* Avatar group */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <Skeleton
                    key={i}
                    className="size-8 rounded-full ring-2 ring-background"
                  />
                ))}
              </div>
              <Skeleton className="h-3 w-24" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* List Skeleton */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">List</h2>
          <p className="text-sm text-muted-foreground">Skeleton layout for list items with various content.</p>
        </div>
        <Card>
          <CardContent className="space-y-0">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 py-3">
                  <Skeleton className="size-5 shrink-0 rounded" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton
                      className="h-4"
                      style={{ width: `${60 + (i % 3) * 12}%` }}
                    />
                    <Skeleton
                      className="h-3"
                      style={{ width: `${40 + (i % 4) * 10}%` }}
                    />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
                {i < 5 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
