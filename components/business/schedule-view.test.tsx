import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { ScheduleView } from "./schedule-view"
import type { ScheduleEvent } from "./schedule-view"

function makeEvent(id: string, title: string, hour: number): ScheduleEvent {
  const start = new Date()
  const day = start.getDay()
  const diff = day === 0 ? -6 : 1 - day
  start.setDate(start.getDate() + diff)
  start.setHours(hour, 0, 0, 0)
  const end = new Date(start)
  end.setHours(hour + 1)
  return { id, title, start, end }
}

const events: ScheduleEvent[] = [
  makeEvent("1", "Standup", 9),
  makeEvent("2", "Lunch", 12),
]

describe("ScheduleView", () => {
  it("renders without crashing", () => {
    const { container } = render(<ScheduleView events={events} />)
    expect(container.querySelector('[data-slot="schedule-view"]')).toBeTruthy()
  })

  it("renders day labels", () => {
    render(<ScheduleView events={events} />)
    expect(screen.getByText("Mon")).toBeInTheDocument()
    expect(screen.getByText("Sun")).toBeInTheDocument()
  })

  it("renders event titles", () => {
    render(<ScheduleView events={events} />)
    expect(screen.getByText("Standup")).toBeInTheDocument()
    expect(screen.getByText("Lunch")).toBeInTheDocument()
  })

  it("calls onEventClick when an event is clicked", async () => {
    const handleClick = vi.fn()
    render(<ScheduleView events={events} onEventClick={handleClick} />)
    const btn = screen.getByText("Standup")
    btn.click()
    expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ id: "1", title: "Standup" }))
  })

  it("applies custom className", () => {
    const { container } = render(<ScheduleView events={events} className="custom-sched" />)
    const el = container.querySelector('[data-slot="schedule-view"]') as HTMLElement
    expect(el.className).toContain("custom-sched")
  })
})
