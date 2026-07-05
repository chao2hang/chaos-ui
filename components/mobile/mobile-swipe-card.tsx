"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MobileSwipeCardProps {
  /** Array of card contents to swipe through. */
  children: React.ReactNode[];
  /** Height of the card stack. */
  height?: number;
  /** Called when the last card is swiped away. */
  onComplete?: () => void;
  /** Additional class names. */
  className?: string;
}

/**
 * @component MobileSwipeCard
 * @category mobile/interaction
 * @since 1.1.0
 * @description Tinder-style swipeable card stack for mobile product browsing or onboarding / Tinder 风格的滑动卡片栈，适用于移动端商品浏览或引导页
 * @keywords mobile, swipe, card, tinder, stack, browse
 * @example
 * <MobileSwipeCard height={400}>
 *   <div>Card 1</div>
 *   <div>Card 2</div>
 * </MobileSwipeCard>
 */
function MobileSwipeCard({
  children,
  height = 400,
  onComplete,
  className,
}: MobileSwipeCardProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [swiping, setSwiping] = React.useState(false);
  const [offsetX, setOffsetX] = React.useState(0);
  const [direction, setDirection] = React.useState<"left" | "right" | null>(null);
  const startRef = React.useRef<{ x: number; y: number } | null>(null);

  const cards = React.Children.toArray(children);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (swiping) return;
    startRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!startRef.current || swiping) return;
    const dx = e.clientX - startRef.current.x;
    setOffsetX(dx);
    setDirection(dx > 30 ? "right" : dx < -30 ? "left" : null);
  };

  const handlePointerUp = () => {
    if (!startRef.current) return;
    const dx = offsetX;

    if (Math.abs(dx) > 80) {
      // Swipe away
      setSwiping(true);
      setDirection(null);

      setTimeout(() => {
        setSwiping(false);
        setOffsetX(0);
        startRef.current = null;
        if (currentIndex < cards.length - 1) {
          setCurrentIndex((i) => i + 1);
        } else {
          onComplete?.();
        }
      }, 200);
    } else {
      // Snap back
      setOffsetX(0);
      setDirection(null);
    }
    startRef.current = null;
  };

  const visibleCards = cards.slice(currentIndex, currentIndex + 2).reverse();

  if (cards.length === 0) {
    return (
      <div className={cn("flex items-center justify-center text-muted-foreground", className)} style={{ height }}>
        No more cards
      </div>
    );
  }

  return (
    <div
      data-slot="mobile-swipe-card"
      className={cn("relative overflow-hidden", className)}
      style={{ height }}
    >
      {visibleCards.map((child, i) => {
        const isTop = i === 0;
        const scale = isTop ? 1 : 0.95;
        const translateY = isTop ? 0 : -8;

        return (
          <div
            key={currentIndex + visibleCards.length - 1 - i}
            className={cn(
              "absolute inset-0 rounded-2xl border bg-card p-4 shadow-lg transition-transform",
              isTop && "cursor-grab active:cursor-grabbing",
            )}
            style={{
              transform: `translateX(${isTop ? offsetX : 0}px) translateY(${translateY}px) scale(${scale})`,
              rotate: isTop ? `${offsetX * 0.05}deg` : "0deg",
              transition: swiping ? "transform 0.2s ease-out" : undefined,
              zIndex: i + 1,
            }}
            onPointerDown={isTop ? handlePointerDown : undefined}
            onPointerMove={isTop ? handlePointerMove : undefined}
            onPointerUp={isTop ? handlePointerUp : undefined}
          >
            {child}

            {/* Direction indicators */}
            {isTop && direction === "right" && (
              <div className="absolute top-4 right-4 rounded-lg bg-success/20 px-2 py-1 text-xs font-bold text-success">
                LIKE
              </div>
            )}
            {isTop && direction === "left" && (
              <div className="absolute top-4 left-4 rounded-lg bg-destructive/20 px-2 py-1 text-xs font-bold text-destructive">
                NOPE
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { MobileSwipeCard };
