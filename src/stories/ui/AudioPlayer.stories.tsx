import type { Meta, StoryObj } from "@storybook/react";
import { AudioPlayer } from "@/components/ui/audio-player";

const meta = {
  title: "Components/AudioPlayer",
  component: AudioPlayer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AudioPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

const SAMPLE_AUDIO =
  "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3";

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default player with volume control. */
export const Default: Story = {
  args: {
    src: SAMPLE_AUDIO,
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
  },
};

/** Player with playback speed selector enabled. */
export const WithSpeed: Story = {
  args: {
    src: SAMPLE_AUDIO,
    showSpeed: true,
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
  },
};

/** Volume control hidden — playback-only surface. */
export const NoVolume: Story = {
  args: {
    src: SAMPLE_AUDIO,
    showVolume: false,
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
  },
};

/** Full-featured player — speed + volume + callbacks. */
export const FullFeatured: Story = {
  args: {
    src: SAMPLE_AUDIO,
    showSpeed: true,
    showVolume: true,
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
  },
};
