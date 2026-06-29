import type { Meta, StoryObj } from "@storybook/react"
import { ImageGallery } from "@/components/business/image-gallery"
import { VideoPlayer } from "@/components/business/video-player"
import { AudioPlayer } from "@/components/business/audio-player"
import { PDFViewer } from "@/components/business/pdf-viewer"

const DEMO_VIDEO = "https://files.vidstack.io/sprite-fight/720p.mp4"

const sampleImages = [
  { id: "1", src: "https://picsum.photos/seed/1/600/600", alt: "风景 1", caption: "山脉与湖泊" },
  { id: "2", src: "https://picsum.photos/seed/2/600/600", alt: "风景 2", caption: "森林" },
  { id: "3", src: "https://picsum.photos/seed/3/600/600", alt: "风景 3", caption: "沙漠" },
  { id: "4", src: "https://picsum.photos/seed/4/600/600", alt: "风景 4", caption: "海洋" },
  { id: "5", src: "https://picsum.photos/seed/5/600/600", alt: "风景 5", caption: "城市" },
  { id: "6", src: "https://picsum.photos/seed/6/600/600", alt: "风景 6", caption: "星空" },
  { id: "7", src: "https://picsum.photos/seed/7/600/600", alt: "风景 7", caption: "极光" },
  { id: "8", src: "https://picsum.photos/seed/8/600/600", alt: "风景 8", caption: "日落" },
  { id: "9", src: "https://picsum.photos/seed/9/600/600", alt: "风景 9", caption: "夜空" },
]

const moreImages = [
  ...sampleImages,
  { id: "10", src: "https://picsum.photos/seed/10/600/600", alt: "风景 10", caption: "黎明" },
  { id: "11", src: "https://picsum.photos/seed/11/600/600", alt: "风景 11", caption: "黄昏" },
  { id: "12", src: "https://picsum.photos/seed/12/600/600", alt: "风景 12", caption: "彩虹" },
]

const meta = {
  title: "Business/Media",
  parameters: { layout: "padded" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const GalleryExample: Story = {
  render: () => (
    <div className="max-w-3xl space-y-3">
      <h3 className="text-sm font-medium">Image Gallery 3 列</h3>
      <ImageGallery images={moreImages} columns={3} />
    </div>
  ),
}

export const GalleryFiveCol: Story = {
  render: () => (
    <div className="max-w-4xl space-y-3">
      <h3 className="text-sm font-medium">Image Gallery 5 列</h3>
      <ImageGallery images={sampleImages} columns={5} />
    </div>
  ),
}

export const VideoExample: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h3 className="mb-3 text-sm font-medium">VideoPlayer — 基础播放</h3>
      <VideoPlayer
        src={DEMO_VIDEO}
        title="Sprite Fight"
        crossOrigin="anonymous"
      />
    </div>
  ),
}

export const VideoWithCaptions: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <h3 className="text-sm font-medium">VideoPlayer — 带字幕</h3>
      <VideoPlayer
        src={DEMO_VIDEO}
        title="Sprite Fight (带字幕)"
      />
    </div>
  ),
}

export const VideoAutoplayMuted: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <h3 className="text-sm font-medium">VideoPlayer — 自动播放（静音）</h3>
      <VideoPlayer
        src={DEMO_VIDEO}
        title="Sprite Fight"
        crossOrigin="anonymous"
        autoplay
      />
    </div>
  ),
}

export const VideoWithPoster: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <h3 className="text-sm font-medium">VideoPlayer — 封面图</h3>
      <VideoPlayer
        src={DEMO_VIDEO}
        title="Sprite Fight"
        crossOrigin="anonymous"
      />
    </div>
  ),
}

export const AudioExample: Story = {
  render: () => (
    <div className="max-w-xl space-y-4">
      <h3 className="text-sm font-medium">AudioPlayer</h3>
      <AudioPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        title="For Bigger Blazes"
        artist="Various Artists"
        cover="https://picsum.photos/seed/audio/200/200"
      />
    </div>
  ),
}

export const PDFExample: Story = {
  render: () => (
    <div className="h-[500px]">
      <PDFViewer
        src="/sample.pdf"
        title="产品白皮书 2026"
        height={500}
      />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-5xl space-y-8">
      <section>
        <h3 className="mb-3 text-base font-semibold">Image Gallery</h3>
        <ImageGallery images={sampleImages} columns={4} />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Audio Player</h3>
        <div className="max-w-xl">
          <AudioPlayer
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            title="Sample Track"
            artist="Demo Artist"
            cover="https://picsum.photos/seed/audio2/200/200"
          />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">PDF Viewer</h3>
        <div className="h-96">
          <PDFViewer src="/sample.pdf" title="文档" height={384} />
        </div>
      </section>
    </div>
  ),
}
