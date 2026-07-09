import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function MobileListItemSkeleton({
  className,
  ...props
}: MobileSkeletonProps) {
  return (
    <div
      className={cn("flex items-center gap-3 border-b p-3", className)}
      {...props}
    >
      <div className="bg-muted size-10 shrink-0 animate-pulse rounded-full" />
      <div className="flex-1 space-y-1.5">
        <div className="bg-muted h-3 w-2/3 animate-pulse rounded" />
        <div className="bg-muted h-2 w-1/2 animate-pulse rounded" />
      </div>
      <div className="bg-muted size-6 animate-pulse rounded" />
    </div>
  );
}

export function MobileCardSkeleton({
  className,
  ...props
}: MobileSkeletonProps) {
  return (
    <div
      className={cn("space-y-3 rounded-lg border p-4", className)}
      {...props}
    >
      <div className="bg-muted h-4 w-1/3 animate-pulse rounded" />
      <div className="space-y-2">
        <div className="bg-muted h-3 w-full animate-pulse rounded" />
        <div className="bg-muted h-3 w-5/6 animate-pulse rounded" />
      </div>
      <div className="flex justify-between">
        <div className="bg-muted h-8 w-16 animate-pulse rounded" />
        <div className="bg-muted h-8 w-16 animate-pulse rounded" />
      </div>
    </div>
  );
}

export function MobileDetailSkeleton({
  className,
  ...props
}: MobileSkeletonProps) {
  return (
    <div className={cn("space-y-4 p-4", className)} {...props}>
      <div className="flex items-center gap-3">
        <div className="bg-muted size-12 animate-pulse rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
          <div className="bg-muted h-3 w-1/4 animate-pulse rounded" />
        </div>
      </div>
      <div className="bg-muted aspect-video animate-pulse rounded" />
      <div className="space-y-2">
        <div className="bg-muted h-3 w-full animate-pulse rounded" />
        <div className="bg-muted h-3 w-11/12 animate-pulse rounded" />
        <div className="bg-muted h-3 w-4/5 animate-pulse rounded" />
        <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
      </div>
    </div>
  );
}
