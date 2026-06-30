import { cn } from "@/lib/utils";

/**
 * @component CategoryBar
 * @category business/charts
 * @since 0.7.0
 * @description 分类条
 * @keywords category, bar
 * @example
 * <CategoryBar />
 */

interface CategoryBarProps {
  data: Array<{ label: string; value: number; color: string }>;
  className?: string;
}

function CategoryBar({ className }: CategoryBarProps) {
  return (
    <div data-slot="category-bar" className={cn("", className)}>
      {null}
    </div>
  );
}

export { CategoryBar };
export type { CategoryBarProps };
