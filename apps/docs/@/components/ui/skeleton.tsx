import { cn } from "@/lib/utils";

/**
 * @component Skeleton
 * @category ui/primitives
 * @since 0.2.0
 * @description Pulsing placeholder for loading states, mimics the shape of content yet to load / 脉冲加载占位符，模拟尚未加载的内容形状
 * @keywords skeleton, loading, placeholder, shimmer, 骨架屏
 * @example
 * <Skeleton className="h-4 w-[200px]" />
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
