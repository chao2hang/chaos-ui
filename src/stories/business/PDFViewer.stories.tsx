import type { Meta, StoryObj } from "@storybook/react"
import { PDFViewer } from "@/components/business/pdf-viewer"

const meta = {
  title: "Business/PDFViewer",
  component: PDFViewer,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof PDFViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    title: "示例文档.pdf",
    initialScale: 100,
  },
}

export const WithTitle: Story = {
  args: {
    src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    title: "2024年度财务报告.pdf",
    initialScale: 120,
  },
}

export const SmallScale: Story = {
  args: {
    src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    initialScale: 50,
  },
}
