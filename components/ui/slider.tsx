"use client";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

/**
 * @component Slider
 * @category ui/data-entry
 * @since 0.2.0
 * @description Range slider root component for selecting a value within a range / 范围滑块根组件，用于在范围内选择一个值
 * @keywords slider, range, input, 滑块
 * @example
 * <Slider value={50} min={0} max={100}>
 *   <SliderControl>
 *     <SliderTrack>
 *       <SliderIndicator />
 *     </SliderTrack>
 *     <SliderThumb />
 *   </SliderControl>
 * </Slider>
 */
function Slider({ className, ...props }: SliderPrimitive.Root.Props) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component SliderControl
 * @category ui/data-entry
 * @since 0.2.0
 * @description Interactive control area wrapping the slider track and thumb / 包裹滑动条轨道和滑块的可交互控制区域
 * @keywords slider, control, interactive, 滑块控制
 * @example
 * <SliderControl>
 *   <SliderTrack><SliderIndicator /></SliderTrack>
 *   <SliderThumb />
 * </SliderControl>
 */
function SliderControl({ className, ...props }: SliderPrimitive.Control.Props) {
  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      className={cn("relative flex w-full items-center select-none", className)}
      {...props}
    />
  );
}

/**
 * @component SliderTrack
 * @category ui/data-entry
 * @since 0.2.0
 * @description The visual track/rail that the slider thumb moves along / 滑块拖动手柄移动的视觉轨道
 * @keywords slider, track, rail, 滑块轨道
 * @example
 * <SliderTrack>
 *   <SliderIndicator />
 * </SliderTrack>
 */
function SliderTrack({ className, ...props }: SliderPrimitive.Track.Props) {
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn(
        "bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component SliderIndicator
 * @category ui/data-entry
 * @since 0.2.0
 * @description The filled portion of the slider track indicating the current value / 滑动条轨道的填充部分，指示当前值
 * @keywords slider, indicator, fill, progress, 滑块指示器
 * @example
 * <SliderIndicator />
 */
function SliderIndicator({
  className,
  ...props
}: SliderPrimitive.Indicator.Props) {
  return (
    <SliderPrimitive.Indicator
      data-slot="slider-indicator"
      className={cn("bg-primary absolute h-full", className)}
      {...props}
    />
  );
}

/**
 * @component SliderThumb
 * @category ui/data-entry
 * @since 0.2.0
 * @description Draggable handle for the slider, representing the current value position / 滑块的可拖动手柄，代表当前值位置
 * @keywords slider, thumb, handle, drag, 滑块手柄
 * @example
 * <SliderThumb />
 */
function SliderThumb({ className, ...props }: SliderPrimitive.Thumb.Props) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "border-primary bg-background focus-visible:ring-ring/50 block size-4 rounded-full border-2 shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb };
