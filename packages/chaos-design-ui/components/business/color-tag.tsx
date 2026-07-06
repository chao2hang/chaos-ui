"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const colorTagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      color: {
        red: "border-red-200 bg-red-50 text-red-700",
        orange: "border-orange-200 bg-orange-50 text-orange-700",
        yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
        green: "border-green-200 bg-green-50 text-green-700",
        blue: "border-blue-200 bg-blue-50 text-blue-700",
        purple: "border-purple-200 bg-purple-50 text-purple-700",
        pink: "border-pink-200 bg-pink-50 text-pink-700",
        gray: "border-gray-200 bg-gray-50 text-gray-600",
      },
    },
    defaultVariants: { color: "gray" },
  },
);

interface ColorTagProps
  extends React.ComponentProps<"span">, VariantProps<typeof colorTagVariants> {
  label: string;
  dot?: boolean;
}

const colorDotMap: Record<string, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  gray: "bg-gray-400",
};

function ColorTag({
  color = "gray",
  label,
  dot = true,
  className,
  ...props
}: ColorTagProps) {
  return (
    <span
      data-slot="color-tag"
      className={cn(colorTagVariants({ color }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn("size-1.5 rounded-full", colorDotMap[color ?? "gray"])}
          aria-hidden
        />
      )}
      {label}
    </span>
  );
}

export { ColorTag, colorTagVariants };
export type { ColorTagProps };
