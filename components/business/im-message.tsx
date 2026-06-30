"use client";
import { cn } from "@/lib/utils";

/**
 * @component ImMessage
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <ImMessage />
 * ```
 * IM 消息气泡
 */
export interface ImMessageProps {
  className?: string;
}

function ImMessage({ className }: ImMessageProps) {
  return <div data-slot="im-message" className={cn("", className)} />;
}

export { ImMessage };
