"use client"
import * as React from "react"
import {
  MediaPlayer,
  MediaOutlet,
  MediaPlayButton,
  MediaMuteButton,
  MediaTimeSlider,
  MediaVolumeSlider,
  MediaFullscreenButton,
  MediaPIPButton,
  MediaTime,
  MediaCaptionButton,
  MediaCaptions,
  MediaPlaybackRateMenuButton,
  MediaPlaybackRateMenuItems,
  MediaMenu,
  MediaBufferingIndicator,
  MediaPoster,
  useMediaStore,
} from "@vidstack/react"
import { PlayIcon, PauseIcon, Volume2Icon, VolumeXIcon, MaximizeIcon, MinimizeIcon, PictureInPicture2Icon, SubtitlesIcon, SkipForwardIcon, SkipBackIcon, GaugeIcon, Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  autoplay?: boolean
  crossOrigin?: "" | "anonymous" | "use-credentials"
  className?: string
  captions?: Array<{ src: string; label: string; lang: string }>
}

const vidstackButtons = ["media-play-button", "media-mute-button", "media-fullscreen-button", "media-pip-button", "media-caption-button"]

export function VideoPlayer({ src, poster, title, autoplay, crossOrigin, className, captions }: VideoPlayerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const player = container.querySelector("media-player")
    if (!player) return

    const onPointerDown = (e: Event) => {
      const target = (e.target as HTMLElement).closest(
        "media-play-button, media-mute-button, media-fullscreen-button, media-pip-button, media-caption-button, media-playback-rate-menu-button"
      )
      if (!target) return
      e.preventDefault()
      e.stopPropagation()

      const tag = target.tagName.toLowerCase()
      const p = player as any
      const state = p.state

      if (tag === "media-play-button") {
        if (p.paused) p.play()
        else p.pause()
      } else if (tag === "media-mute-button") {
        p.muted = !p.muted
      } else if (tag === "media-fullscreen-button") {
        if (state.fullscreen) p.exitFullscreen()
        else p.enterFullscreen()
      } else if (tag === "media-pip-button") {
        if (state.pictureInPicture) p.exitPictureInPicture()
        else p.enterPictureInPicture()
      } else if (tag === "media-caption-button") {
        const tracks = p.textTracks
        const activeTrack = tracks._items?.find((t: any) => t.mode === 'showing')
        if (activeTrack) {
          activeTrack.mode = 'disabled'
        } else {
          const first = tracks._items?.[0]
          if (first) first.mode = 'showing'
        }
      } else if (tag === "media-playback-rate-menu-button") {
        const menuItems = target.parentElement?.querySelector("media-playback-rate-menu-items")
        if (menuItems) {
          const isOpen = menuItems.getAttribute("aria-hidden") !== "true"
          if (isOpen) {
            menuItems.setAttribute("aria-hidden", "true")
            target.setAttribute("aria-expanded", "false")
          } else {
            menuItems.removeAttribute("aria-hidden")
            target.setAttribute("aria-expanded", "true")
          }
        }
      }
    }

    const onPointerUp = (e: Event) => {
      const target = (e.target as HTMLElement).closest("[data-part='radio']")
      if (!target) return
      e.preventDefault()
      e.stopPropagation()

      const rate = parseFloat(target.getAttribute("data-value") ?? "1")
      if (!isNaN(rate)) {
        (player as any).playbackRate = rate
        const menuItems = target.closest("media-playback-rate-menu-items")
        if (menuItems) {
          menuItems.setAttribute("aria-hidden", "true")
          const btn = target.closest(".relative")?.querySelector("media-playback-rate-menu-button")
          if (btn) btn.setAttribute("aria-expanded", "false")
        }
      }
    }

    player.addEventListener("pointerdown", onPointerDown)
    player.addEventListener("pointerup", onPointerUp)
    return () => {
      player.removeEventListener("pointerdown", onPointerDown)
      player.removeEventListener("pointerup", onPointerUp)
    }
  }, [])

  return (
    <div ref={containerRef} data-slot="video-player" className={cn("relative overflow-visible rounded-md bg-black", className)}>
      <MediaPlayer
        src={src}
        autoplay={autoplay}
        crossOrigin={crossOrigin}
        className="group relative aspect-video w-full [&_[data-part~='controls']]:opacity-0 [&_[data-part~='controls']]:transition-opacity [&:hover_[data-part~='controls']]:opacity-100 [&[data-user-idle]_[data-part~='controls']]:opacity-0"
      >
        <MediaOutlet className="block h-full w-full">
          {captions?.map((track) => (
            <track key={track.src} kind="subtitles" src={track.src} label={track.label} srcLang={track.lang} />
          ))}
        </MediaOutlet>

        {poster && <MediaPoster className="absolute inset-0 block h-full w-full object-cover" alt={title ?? ""} src={poster} />}

        <MediaBufferingIndicator className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2Icon className="size-8 animate-spin text-white/70" />
        </MediaBufferingIndicator>

        <CenterPlayButton />

        <MediaCaptions className="pointer-events-none absolute inset-x-0 bottom-14 z-10 mx-auto max-w-2xl select-none rounded bg-black/70 px-3 py-1 text-center text-sm text-white" />

        <div data-part="controls" className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6">
          <MediaTimeSlider className="group/slider relative mb-1 flex h-5 w-full cursor-pointer items-center">
            <div className="relative h-1 w-full rounded-full bg-white/30 group-hover/slider:h-1.5 transition-[height]">
              <div className="absolute inset-y-0 left-0 rounded-full bg-primary h-full" style={{ width: "var(--slider-fill-percent)" }} />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3 rounded-full bg-primary opacity-0 group-hover/slider:opacity-100 shadow" style={{ left: "var(--slider-pointer-percent)" }} />
            </div>
          </MediaTimeSlider>

          <div className="flex items-center justify-between gap-2 text-white">
            <div className="flex items-center gap-1">
              <MediaSeekBackButton />
              <MediaPlayButton className="flex size-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors">
                <PlayIcon className="size-4 group-data-[paused]:block hidden" />
                <PauseIcon className="size-4 group-data-[paused]:hidden" />
              </MediaPlayButton>
              <MediaSeekForwardButton />

              <MediaMuteButton className="flex size-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors">
                <Volume2Icon className="size-4 group-data-[muted]:hidden" />
                <VolumeXIcon className="size-4 hidden group-data-[muted]:block" />
              </MediaMuteButton>

              <MediaVolumeSlider className="group/vol relative flex h-8 w-20 cursor-pointer items-center">
                <div className="relative h-1 w-full rounded-full bg-white/30">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-white h-full" style={{ width: "var(--slider-fill-percent)" }} />
                  <div className="absolute top-1/2 size-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white opacity-0 group-hover/vol:opacity-100 shadow" style={{ left: "var(--slider-pointer-percent)" }} />
                </div>
              </MediaVolumeSlider>

              <span className="ml-1 flex items-center gap-1 text-xs tabular-nums">
                <MediaTime type="current" />
                <span className="text-white/50">/</span>
                <MediaTime type="duration" />
              </span>
            </div>

            {title && <span className="truncate text-xs font-medium">{title}</span>}

            <div className="flex items-center gap-0.5">
              <MediaCaptionButton className="flex size-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors">
                <SubtitlesIcon className="size-4" />
              </MediaCaptionButton>

              <SpeedMenu />

              <MediaPIPButton className="flex size-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors">
                <PictureInPicture2Icon className="size-4" />
              </MediaPIPButton>

              <MediaFullscreenButton className="flex size-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors">
                <MaximizeIcon className="size-4 group-data-[fullscreen]:hidden" />
                <MinimizeIcon className="size-4 hidden group-data-[fullscreen]:block" />
              </MediaFullscreenButton>
            </div>
          </div>
        </div>
      </MediaPlayer>
    </div>
  )
}

const RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

function SpeedMenu() {
  const { playbackRate } = useMediaStore()
  return (
    <MediaMenu className="relative">
      <MediaPlaybackRateMenuButton className="flex size-8 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors">
        <GaugeIcon className="size-4" />
        <span className="ml-1 text-[0.625rem] tabular-nums">{playbackRate === 1 ? "" : `${playbackRate}x`}</span>
      </MediaPlaybackRateMenuButton>
      <MediaPlaybackRateMenuItems className="absolute bottom-full right-0 mb-2 min-w-[6rem] overflow-hidden rounded-md border border-white/10 bg-black/90 p-1 text-white shadow-lg backdrop-blur data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out data-[open]:fade-in">
        {RATES.map((rate) => (
          <div
            key={rate}
            className="flex cursor-pointer items-center rounded-sm px-3 py-1.5 text-xs hover:bg-white/10 data-[focus]:bg-white/10"
            data-part="radio"
            data-value={rate}
          >
            {rate === 1 ? "Normal" : `${rate}x`}
          </div>
        ))}
      </MediaPlaybackRateMenuItems>
    </MediaMenu>
  )
}

function CenterPlayButton() {
  return (
    <MediaPlayButton className="absolute inset-0 z-10 flex items-center justify-center opacity-100 transition-opacity group-data-[paused]:opacity-100 group-data-[playing]:pointer-events-none group-data-[playing]:opacity-0 group-hover:group-data-[playing]:pointer-events-auto group-hover:group-data-[playing]:opacity-100">
      <div className="flex size-14 items-center justify-center rounded-full bg-black/50 backdrop-blur text-white transition-transform hover:scale-110">
        <PlayIcon className="size-7 group-data-[paused]:block hidden" />
        <PauseIcon className="size-7 group-data-[paused]:hidden" />
      </div>
    </MediaPlayButton>
  )
}

function MediaSeekBackButton() {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className="text-white hover:bg-white/20"
      onClick={(e) => {
        const player = (e.currentTarget as HTMLElement).closest("media-player") as HTMLElement & { currentTime: number }
        if (player) player.currentTime = Math.max(0, player.currentTime - 10)
      }}
      aria-label="后退 10 秒"
    >
      <SkipBackIcon />
    </Button>
  )
}

function MediaSeekForwardButton() {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className="text-white hover:bg-white/20"
      onClick={(e) => {
        const player = (e.currentTarget as HTMLElement).closest("media-player") as HTMLElement & { currentTime: number; duration: number }
        if (player) player.currentTime = Math.min(player.currentTime + 10, player.duration || Infinity)
      }}
      aria-label="前进 10 秒"
    >
      <SkipForwardIcon />
    </Button>
  )
}
