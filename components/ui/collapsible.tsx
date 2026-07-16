"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

import { cn } from "@/lib/utils";

/**
 * @component Collapsible
 * @category ui/shell
 * @since 0.2.0
 * @description Root container for a collapsible/expandable section / 可折叠区域的根容器
 * @keywords collapsible, expandable, accordion, toggle, disclosure
 * @example
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content here</CollapsibleContent>
 * </Collapsible>
 */
function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

/**
 * @component CollapsibleTrigger
 * @category ui/shell
 * @since 0.2.0
 * @description Button that toggles the visibility of collapsible content / 切换可折叠内容可见性的按钮
 * @keywords collapsible, trigger, toggle, expand, collapse
 * @example
 * <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
 */
function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

/**
 * @component CollapsibleContent
 * @category ui/shell
 * @since 0.2.0
 * @description Content panel that shows/hides based on collapsible state, with height motion / 根据折叠状态显示/隐藏的内容面板（带高度过渡）
 * @keywords collapsible, content, panel, expandable, disclosure, motion
 * @example
 * <CollapsibleContent>
 *   <p>Hidden content revealed on expand</p>
 * </CollapsibleContent>
 */
function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(
        // Base UI sets --collapsible-panel-height; starting/ending force 0 for exit.
        // motion-reduce: snap without transition (issue #43 motion policy).
        "h-(--collapsible-panel-height) overflow-hidden text-sm transition-[height] duration-300 ease-in-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Panel>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
