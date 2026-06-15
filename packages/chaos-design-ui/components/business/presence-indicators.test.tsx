import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PresenceIndicators, type PresenceUser } from "./presence-indicators"

const users: PresenceUser[] = [
  { id: "1", name: "李雷", status: "online" },
  { id: "2", name: "韩梅梅", status: "online" },
  { id: "3", name: "张伟", status: "typing" },
  { id: "4", name: "王芳", status: "away" },
  { id: "5", name: "刘洋", status: "busy" },
  { id: "6", name: "陈晨", status: "offline", lastSeen: Date.now() - 86_400_000 },
  { id: "7", name: "周晓", status: "online" },
]

describe("PresenceIndicators", () => {
  it("renders avatars for all users within max", () => {
    const { container } = render(<PresenceIndicators users={users} max={3} />)
    const root = container.querySelector('[data-slot="presence-indicators"]')
    expect(root).toBeInTheDocument()
    const avatarWrappers = root?.querySelectorAll(":scope > div") ?? []
    expect(avatarWrappers.length).toBe(4)
  })

  it("shows overflow indicator when users exceed max", () => {
    render(<PresenceIndicators users={users} max={3} />)
    expect(screen.getByText("+4")).toBeInTheDocument()
  })

  it("does not show overflow when users <= max", () => {
    render(<PresenceIndicators users={users} max={20} />)
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument()
  })

  it("uses default max=5 when not provided", () => {
    render(<PresenceIndicators users={users} />)
    expect(screen.getByText("+2")).toBeInTheDocument()
  })

  it("renders avatar fallbacks with user initials", () => {
    const { container } = render(<PresenceIndicators users={users} max={2} />)
    expect(container.textContent).toContain("李")
    expect(container.textContent).toContain("韩")
  })

  it("renders avatar image when avatar url is provided", () => {
    const usersWithAvatar: PresenceUser[] = [
      { id: "1", name: "张三", avatar: "https://example.com/avatar.png", status: "online" },
    ]
    const { container } = render(<PresenceIndicators users={usersWithAvatar} />)
    const img = container.querySelector("img")
    expect(img).toBeInTheDocument()
    expect(img?.getAttribute("src")).toBe("https://example.com/avatar.png")
  })

  it("applies custom className", () => {
    const { container } = render(
      <PresenceIndicators users={users} max={2} className="custom-presence" />,
    )
    const root = container.querySelector('[data-slot="presence-indicators"]')
    expect(root?.className).toContain("custom-presence")
  })

  it("renders empty when no users", () => {
    const { container } = render(<PresenceIndicators users={[]} />)
    const root = container.querySelector('[data-slot="presence-indicators"]')
    expect(root?.children.length).toBe(0)
  })
})
