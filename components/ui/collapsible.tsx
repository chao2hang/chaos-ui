"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

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
 * @description Content panel that shows/hides based on collapsible state / 根据折叠状态显示/隐藏的内容面板
 * @keywords collapsible, content, panel, expandable, disclosure
 * @example
 * <CollapsibleContent>
 *   <p>Hidden content revealed on expand</p>
 * </CollapsibleContent>
 */
function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
