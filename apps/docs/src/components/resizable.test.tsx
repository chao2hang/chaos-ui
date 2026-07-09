import { describe, it, expect, vi } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@chaos_team/chaos-ui/ui"

describe("Resizable", () => {
  it("renders the panel group, panels, and handle with the expected slots", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    )
    expect(container.querySelector('[data-slot="resizable-panel-group"]')).toBeTruthy()
    expect(container.querySelectorAll('[data-slot="resizable-panel"]')).toHaveLength(2)
    expect(container.querySelector('[data-slot="resizable-handle"]')).toBeTruthy()
  })

  it("applies the direction to the panel group and handle", () => {
    const { container } = render(
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const group = container.querySelector('[data-slot="resizable-panel-group"]') as HTMLElement
    const handle = container.querySelector('[data-slot="resizable-handle"]') as HTMLElement
    expect(group.getAttribute("data-direction")).toBe("vertical")
    expect(group.className).toContain("flex-col")
    expect(handle.getAttribute("data-direction")).toBe("vertical")
    expect(handle.className).toContain("cursor-row-resize")
  })

  it("applies the panel's default size as inline width", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const panel = container.querySelectorAll('[data-slot="resizable-panel"]')[0] as HTMLElement
    expect(panel.style.width).toBe("40%")
  })

  it("renders the visible handle affordance when withHandle is true", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const handle = container.querySelector('[data-slot="resizable-handle"]') as HTMLElement
    expect(handle.querySelector("div")).toBeTruthy()
  })

  it("supports collapsible panels", () => {
    const onResize = vi.fn()
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel collapsible collapsedSize={5} onResize={onResize}>One</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>,
    )
    const panel = container.querySelectorAll('[data-slot="resizable-panel"]')[0] as HTMLElement
    // Verify panel renders with correct initial state
    expect(panel.getAttribute("data-collapsed")).toBe("false")
    expect(onResize).toHaveBeenCalledWith(50)
  })
})
