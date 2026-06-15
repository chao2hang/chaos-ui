import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const formGridVariants = cva("grid gap-4", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
    gap: {
      sm: "gap-2",
      default: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    columns: 2,
    gap: "default",
  },
})

interface FormGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formGridVariants> {
  children: React.ReactNode
}

function FormGrid({
  className,
  columns,
  gap,
  children,
  ...props
}: FormGridProps) {
  return (
    <div
      data-slot="form-grid"
      className={cn(formGridVariants({ columns, gap, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

interface FormGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4
  children: React.ReactNode
}

function FormGridItem({
  className,
  span,
  children,
  ...props
}: FormGridItemProps) {
  return (
    <div
      data-slot="form-grid-item"
      className={cn(
        span === 2 && "sm:col-span-2",
        span === 3 && "sm:col-span-2 lg:col-span-3",
        span === 4 && "sm:col-span-2 lg:col-span-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { FormGrid, FormGridItem, formGridVariants }
export type { FormGridProps, FormGridItemProps }
