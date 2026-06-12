import type { Meta, StoryObj } from "@storybook/react"
import { CalendarMonth } from "@/components/business/calendar/calendar-month"
import { TimeSlotPicker } from "@/components/business/calendar/time-slot-picker"
import { GanttChart } from "@/components/business/calendar/gantt-chart"
import { EventDetail } from "@/components/business/calendar/event-detail"
import { useState } from "react"

const today = new Date()
const events = [
  { id: "1", title: "团队周会", start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0), end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30), color: "#3b82f6" },
  { id: "2", title: "产品评审", start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0), end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 16, 0), color: "#10b981" },
  { id: "3", title: "一对一", start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 9, 0), end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 9, 30), color: "#f59e0b" },
  { id: "4", title: "已取消会议", start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 15, 0), end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 16, 0), color: "#6b7280", status: "cancelled" as const },
  { id: "5", title: "项目截止", start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 0, 0), end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 23, 59), color: "#ef4444" },
]

const ganttTasks = [
  { id: "1", name: "需求分析", start: new Date(2026, 0, 1), end: new Date(2026, 0, 5), progress: 100, color: "#10b981" },
  { id: "2", name: "UI 设计", start: new Date(2026, 0, 4), end: new Date(2026, 0, 12), progress: 80, color: "#3b82f6" },
  { id: "3", name: "前端开发", start: new Date(2026, 0, 8), end: new Date(2026, 0, 22), progress: 50, color: "#8b5cf6" },
  { id: "4", name: "后端开发", start: new Date(2026, 0, 10), end: new Date(2026, 0, 25), progress: 30, color: "#f59e0b" },
  { id: "5", name: "测试与发布", start: new Date(2026, 0, 22), end: new Date(2026, 0, 30), progress: 0, color: "#ec4899" },
]

const meta = {
  title: "Business/Calendar",
  parameters: { layout: "padded" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const MonthExample: Story = {
  render: () => (
    <div className="max-w-3xl">
      <CalendarMonth
        events={events}
        onEventClick={(e) => console.info("event click", e.title, e.start)}
        onDayClick={(d) => console.info("day click", d.toDateString())}
      />
    </div>
  ),
}

export const TimeSlotsExample: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(undefined)
    return (
      <div className="max-w-2xl space-y-3">
        <div className="text-sm font-medium">选择时间</div>
        <TimeSlotPicker
          date={today}
          selected={selected}
          onSelect={(slot) => setSelected(slot)}
          startHour={9}
          endHour={18}
          stepMinutes={30}
        />
        {selected && <div className="text-xs text-muted-foreground">已选择：{selected.toLocaleString()}</div>}
      </div>
    )
  },
}

export const GanttExample: Story = {
  render: () => (
    <div className="max-w-4xl">
      <GanttChart tasks={ganttTasks} onTaskClick={(t) => console.info("task click", t.name)} />
    </div>
  ),
}

export const EventDetailExample: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <EventDetail
        event={{
          id: "1",
          title: "产品季度规划会",
          description: "讨论 Q2 的产品路线图、关键里程碑与资源分配。",
          start: new Date(2026, 0, 15, 14, 0),
          end: new Date(2026, 0, 15, 17, 0),
          location: "上海办公室 · 5F 会议室",
          organizer: "李雷",
          attendees: [
            { name: "李雷" },
            { name: "韩梅梅" },
            { name: "张伟" },
            { name: "王芳" },
            { name: "刘洋" },
          ],
          rsvp: "accepted",
        }}
        onRsvp={(s) => console.info("RSVP", s)}
      />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-5xl space-y-8">
      <section>
        <h3 className="mb-3 text-base font-semibold">Calendar Month</h3>
        <CalendarMonth events={events} />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">TimeSlotPicker</h3>
        <TimeSlotPicker date={today} startHour={9} endHour={18} stepMinutes={30} />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Gantt Chart</h3>
        <GanttChart tasks={ganttTasks} />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Event Detail</h3>
        <div className="max-w-md">
          <EventDetail
            event={{
              id: "1",
              title: "产品季度规划会",
              description: "讨论 Q2 的产品路线图、关键里程碑与资源分配。",
              start: new Date(2026, 0, 15, 14, 0),
              end: new Date(2026, 0, 15, 17, 0),
              location: "上海办公室 · 5F 会议室",
              attendees: [{ name: "李雷" }, { name: "韩梅梅" }, { name: "张伟" }],
              rsvp: "accepted",
            }}
          />
        </div>
      </section>
    </div>
  ),
}
