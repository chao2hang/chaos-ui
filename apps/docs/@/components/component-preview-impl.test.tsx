import { act, render, screen } from "@testing-library/react"
import { useEffect, useState, type ComponentType } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { ComponentPreviewImpl } from "./component-preview-impl"

const mocks = vi.hoisted(() => ({
  previews: {} as Record<string, ComponentType>,
  storyPreviews: {} as Record<string, ComponentType>,
  loaders: {} as Record<string, ComponentType<unknown>>,
  businessNames: new Set<string>(),
}))

vi.mock("@/components/component-previews", () => ({
  componentPreviews: mocks.previews,
}))

vi.mock("@/components/component-story-previews", () => ({
  componentStoryPreviews: mocks.storyPreviews,
}))

vi.mock("@/components/component-loader", () => ({
  componentLoaders: mocks.loaders,
  businessComponentNames: mocks.businessNames,
}))

function resetMocks() {
  for (const key of Object.keys(mocks.previews)) delete mocks.previews[key]
  for (const key of Object.keys(mocks.storyPreviews)) delete mocks.storyPreviews[key]
  for (const key of Object.keys(mocks.loaders)) delete mocks.loaders[key]
  mocks.businessNames.clear()
}

function assertPreviewFallback(name: string) {
  expect(screen.getByText(/No live preview available for/i)).toBeInTheDocument()
  expect(screen.getByText(name)).toBeInTheDocument()
}

function assertMissingPreview() {
  expect(screen.getByText("请前往 Storybook 查看完整示例。")).toBeInTheDocument()
}

describe("ComponentPreviewImpl", () => {
  afterEach(() => {
    resetMocks()
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it("renders the no-live-preview fallback when no loader exists", () => {
    render(<ComponentPreviewImpl name="Ghost" />)

    assertPreviewFallback("Ghost")
  })

  it("renders the business-component fallback when bare instantiation is unsafe", () => {
    const Preview: ComponentType<unknown> = () => <div>Alert preview</div>
    mocks.loaders.Alert = Preview
    mocks.businessNames.add("Alert")

    render(<ComponentPreviewImpl name="Alert" />)

    assertPreviewFallback("Alert")
  })

  it("prefers hand-authored previews over story previews and bare loaders", () => {
    mocks.previews.Button = () => <div>Hand preview</div>
    mocks.storyPreviews.Button = () => <div>Story preview</div>
    mocks.loaders.Button = () => <div>Bare loader</div>

    render(<ComponentPreviewImpl name="Button" />)

    expect(screen.getByText("Hand preview")).toBeInTheDocument()
    expect(screen.queryByText("Story preview")).not.toBeInTheDocument()
    expect(screen.queryByText("Bare loader")).not.toBeInTheDocument()
  })

  it("uses story previews before bare loaders", () => {
    mocks.storyPreviews.Alert = () => <div>Story alert</div>
    mocks.loaders.Alert = () => <div>Bare alert</div>

    render(<ComponentPreviewImpl name="Alert" />)

    expect(screen.getByText("Story alert")).toBeInTheDocument()
    expect(screen.queryByText("Bare alert")).not.toBeInTheDocument()
  })

  it("uses story previews for business components instead of skipping them", () => {
    mocks.storyPreviews.DataTable = () => <div>Rows preview</div>
    mocks.loaders.DataTable = () => <div>Bare table</div>
    mocks.businessNames.add("DataTable")

    render(<ComponentPreviewImpl name="DataTable" />)

    expect(screen.getByText("Rows preview")).toBeInTheDocument()
    expect(screen.queryByText(/No live preview available for/i)).not.toBeInTheDocument()
  })

  it("waits for delayed bare-loader content before showing the empty fallback", async () => {
    vi.useFakeTimers()

    const DelayedPreview: ComponentType<unknown> = () => {
      const [ready, setReady] = useState(false)

      useEffect(() => {
        const id = window.setTimeout(() => setReady(true), 50)
        return () => window.clearTimeout(id)
      }, [])

      return ready ? <div>Loaded preview</div> : null
    }

    mocks.loaders.Result = DelayedPreview

    render(<ComponentPreviewImpl name="Result" />)

    expect(screen.getByText("Loading preview…")).toBeInTheDocument()
    expect(screen.queryByText("请前往 Storybook 查看完整示例。")).not.toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(50)
    })

    expect(screen.getByText("Loaded preview")).toBeInTheDocument()
    expect(screen.queryByText("请前往 Storybook 查看完整示例。")).not.toBeInTheDocument()
  })

  it("shows the empty fallback when a bare loader never renders content", async () => {
    vi.useFakeTimers()

    mocks.loaders.EmptyShell = () => null

    render(<ComponentPreviewImpl name="EmptyShell" />)

    expect(screen.getByText("Loading preview…")).toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(900)
    })

    assertMissingPreview()
  })
})
