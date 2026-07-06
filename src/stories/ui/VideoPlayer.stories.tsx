import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "@/components/ui/video-player";

const meta = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_POSTER =
  "https://placehold.co/640x360/1f2937/ffffff?text=Big+Buck+Bunny";

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default video player with controls. */
export const Default: Story = {
  args: {
    src: SAMPLE_VIDEO,
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
  },
};

/** Player with a poster frame shown before playback. */
export const WithPoster: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
  },
};

/** Auto-playing video (muted not enforced by component — browser policy applies). */
export const AutoPlay: Story = {
  args: {
    src: SAMPLE_VIDEO,
    autoPlay: true,
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
  },
};

/** Controls hidden — relies on consumer-side playback management. */
export const NoControls: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    showControls: false,
  },
};

/** Short clip to exercise the progress bar quickly. */
export const ShortClip: Story = {
  args: {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
  },
};
