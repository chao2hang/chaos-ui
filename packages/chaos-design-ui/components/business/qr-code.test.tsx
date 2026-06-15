import { describe, it, expect, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { QRCode } from "./qr-code"

describe("QRCode", () => {
  it("renders an image when value is provided", async () => {
    render(<QRCode value="https://example.com" />)
    await waitFor(() => {
      const img = screen.getByRole("img")
      expect(img).toBeInTheDocument()
    })
  })

  it("renders nothing when value is empty", () => {
    const { container } = render(<QRCode value="" />)
    expect(container.querySelector("img")).not.toBeInTheDocument()
  })

  it("sets correct alt text", async () => {
    render(<QRCode value="https://test.com" />)
    await waitFor(() => {
      expect(
        screen.getByAltText("QR code for https://test.com"),
      ).toBeInTheDocument()
    })
  })

  it("applies custom className", async () => {
    render(<QRCode value="https://example.com" className="custom-qr" />)
    await waitFor(() => {
      const img = screen.getByRole("img")
      expect(img.className).toContain("custom-qr")
    })
  })
})
