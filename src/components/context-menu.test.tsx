import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from "@/components/ui/context-menu"

describe("ContextMenu", () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  it("renders the trigger slot with a clickable surface", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Action</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    )
    const trigger = document.querySelector('[data-slot="context-menu-trigger"]')
    expect(trigger).toBeTruthy()
    expect(trigger?.textContent).toContain("Right-click me")
  })

  it("renders label, items, and separator slots when open", () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>x</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>Group</ContextMenuLabel>
            <ContextMenuItem>One</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Two</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>,
    )
    expect(document.querySelector('[data-slot="context-menu-label"]')).toBeTruthy()
    expect(document.querySelector('[data-slot="context-menu-separator"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-slot="context-menu-item"]')).toHaveLength(2)
  })

  it("supports checkbox and radio items when open", () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>x</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>Toggle me</ContextMenuCheckboxItem>
          <ContextMenuRadioGroup defaultValue="a">
            <ContextMenuRadioItem value="a">Option A</ContextMenuRadioItem>
            <ContextMenuRadioItem value="b">Option B</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>,
    )
    expect(document.querySelector('[data-slot="context-menu-checkbox-item"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-slot="context-menu-radio-item"]')).toHaveLength(2)
  })

  it("applies the destructive variant as a data attribute when open", () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>x</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    )
    const item = document.querySelector('[data-slot="context-menu-item"]')
    expect(item).toBeTruthy()
    expect(item?.getAttribute("data-variant")).toBe("destructive")
  })
})
