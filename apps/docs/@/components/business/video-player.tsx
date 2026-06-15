"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Loader2,
  RotateCcw,
  Gauge,
  PictureInPicture,
  Zap,
} from "lucide-react"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  const hours = Math.floor(mins / 60)
  const displayMins = hours > 0 ? (mins % 60).toString().padStart(2, "0") : mins
  return `${hours > 0 ? hours + ":" : ""}${displayMins}:${secs.toString().padStart(2, "0")}`
}

export function VideoPlayer({
  src,
  poster,
  title,
  autoplay = false,
  loop = false,
  muted = false,
  className,
}: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const progressRef = React.useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [volume, setVolume] = React.useState(muted ? 0 : 1)
  const [isMuted, setIsMuted] = React.useState(muted)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [contextMenu, setContextMenu] = React.useState<{ x: number; y: number } | null>(null)
  const [playbackRate, setPlaybackRate] = React.useState(1)
  const [isLongPress, setIsLongPress] = React.useState(false)
  const [dragPreview, setDragPreview] = React.useState<{ time: number; percent: number } | null>(null)

  const hideTimeoutRef = React.useRef<number | null>(null)
  const longPressTimerRef = React.useRef<number | null>(null)
  const touchStartRef = React.useRef<{ x: number; y: number; time: number } | null>(null)
  const isDraggingRef = React.useRef(false)

  // 清理隐藏计时器
  const clearHideTimer = React.useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }, [])

  const startHideTimer = React.useCallback(() => {
    clearHideTimer()
    if (isPlaying) {
      hideTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [isPlaying, clearHideTimer])

  const resetHideTimer = React.useCallback(() => {
    setShowControls(true)
    startHideTimer()
  }, [startHideTimer])

  React.useEffect(() => {
    return () => {
      clearHideTimer()
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [clearHideTimer])

  // 播放/暂停
  const togglePlay = React.useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused || video.ended) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [])

  // 静音
  const toggleMute = React.useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
  }, [])

  // 全屏
  const toggleFullscreen = React.useCallback(async () => {
    const container = containerRef.current
    if (!container) return
    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // ignore
    }
  }, [])

  // 快进/快退
  const seek = React.useCallback((seconds: number) => {
    const video = videoRef.current
    if (!video) return
    const maxTime = duration || video.duration || Infinity
    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, maxTime))
  }, [duration])

  // 跳转到指定比例
  const seekTo = React.useCallback((ratio: number) => {
    const video = videoRef.current
    if (!video) return
    const maxTime = duration || video.duration || 0
    if (maxTime > 0) {
      video.currentTime = ratio * maxTime
    }
  }, [duration])

  // 音量变化
  const handleVolumeChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return
    const v = parseFloat(e.target.value)
    video.volume = v
    if (v > 0 && video.muted) {
      video.muted = false
    }
  }, [])

  // 视频事件监听
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => {
      setIsPlaying(true)
      setIsLoading(false)
    }
    const onPause = () => {
      setIsPlaying(false)
      setShowControls(true)
      clearHideTimer()
    }
    const onEnded = () => {
      setIsPlaying(false)
      setShowControls(true)
      clearHideTimer()
    }
    const onTimeUpdate = () => setCurrentTime(video.currentTime)
    const onLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }
    const onVolumeChange = () => {
      setVolume(video.volume)
      setIsMuted(video.muted)
    }
    const onRateChange = () => setPlaybackRate(video.playbackRate)
    const onWaiting = () => setIsLoading(true)
    const onCanPlay = () => setIsLoading(false)
    const onError = () => setError("视频加载失败")
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("ended", onEnded)
    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("volumechange", onVolumeChange)
    video.addEventListener("ratechange", onRateChange)
    video.addEventListener("waiting", onWaiting)
    video.addEventListener("canplay", onCanPlay)
    video.addEventListener("error", onError)
    document.addEventListener("fullscreenchange", onFullscreenChange)

    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("volumechange", onVolumeChange)
      video.removeEventListener("ratechange", onRateChange)
      video.removeEventListener("waiting", onWaiting)
      video.removeEventListener("canplay", onCanPlay)
      video.removeEventListener("error", onError)
      document.removeEventListener("fullscreenchange", onFullscreenChange)
    }
  }, [clearHideTimer])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  // 获取进度条比例（支持鼠标和触摸）
  const getProgressRatio = React.useCallback((clientX: number) => {
    const rect = progressRef.current?.getBoundingClientRect()
    if (!rect) return 0
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  }, [])

  // 进度条点击
  const handleProgressClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const ratio = getProgressRatio(e.clientX)
    seekTo(ratio)
  }, [getProgressRatio, seekTo])

  // 触摸开始 - 进度条拖动
  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    const target = e.target as HTMLElement

    // 如果触摸的是进度条区域
    if (target.closest("[data-progress]")) {
      isDraggingRef.current = true
      const ratio = getProgressRatio(touch.clientX)
      const previewTime = ratio * (duration || 0)
      setDragPreview({ time: previewTime, percent: ratio * 100 })
      seekTo(ratio)
      e.preventDefault()
      return
    }

    // 记录触摸起始位置（用于判断长按）
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }

    // 启动长按计时器（500ms 后触发倍速）
    longPressTimerRef.current = window.setTimeout(() => {
      const video = videoRef.current
      if (video && isPlaying) {
        video.playbackRate = 3
        setIsLongPress(true)
      }
    }, 500)
  }, [getProgressRatio, seekTo, isPlaying, duration])

  // 触摸移动
  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]

    // 如果正在拖动进度条
    if (isDraggingRef.current) {
      const ratio = getProgressRatio(touch.clientX)
      const previewTime = ratio * (duration || 0)
      setDragPreview({ time: previewTime, percent: ratio * 100 })
      seekTo(ratio)
      e.preventDefault()
      return
    }

    // 如果移动距离超过 10px，取消长按
    if (touchStartRef.current) {
      const dx = Math.abs(touch.clientX - touchStartRef.current.x)
      const dy = Math.abs(touch.clientY - touchStartRef.current.y)
      if (dx > 10 || dy > 10) {
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current)
          longPressTimerRef.current = null
        }
      }
    }
  }, [getProgressRatio, seekTo, duration])

  // 触摸结束
  const handleTouchEnd = React.useCallback(() => {
    // 清除长按计时器
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }

    // 如果正在长按倍速，恢复原速
    if (isLongPress) {
      const video = videoRef.current
      if (video) {
        video.playbackRate = 1
      }
      setIsLongPress(false)
    }

    // 结束拖动，清除预览
    isDraggingRef.current = false
    touchStartRef.current = null
    setDragPreview(null)
  }, [isLongPress])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault()
        togglePlay()
        break
      case "ArrowLeft":
        e.preventDefault()
        seek(-5)
        break
      case "ArrowRight":
        e.preventDefault()
        seek(5)
        break
      case "ArrowUp":
        e.preventDefault()
        if (videoRef.current) {
          videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1)
        }
        break
      case "ArrowDown":
        e.preventDefault()
        if (videoRef.current) {
          videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1)
        }
        break
      case "f":
        e.preventDefault()
        toggleFullscreen()
        break
      case "m":
        e.preventDefault()
        toggleMute()
        break
    }
  }, [togglePlay, seek, toggleFullscreen, toggleMute])

  // 处理容器点击
  const handleContainerClick = React.useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("[data-controls]") || target.closest("button") || target.closest("input")) {
      return
    }
    togglePlay()
  }, [togglePlay])

  // 关闭右键菜单
  const closeContextMenu = React.useCallback(() => {
    setContextMenu(null)
  }, [])

  // 点击外部关闭右键菜单
  React.useEffect(() => {
    if (!contextMenu) return
    const handleClick = () => closeContextMenu()
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContextMenu()
    }
    document.addEventListener("click", handleClick)
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("click", handleClick)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [contextMenu, closeContextMenu])

  if (error) {
    return (
      <div
        data-slot="video-player"
        className={cn(
          "relative flex aspect-video w-full items-center justify-center rounded-lg bg-black",
          className,
        )}
      >
        <div className="flex flex-col items-center gap-3 text-white/60">
          <div className="text-sm">{error}</div>
          <button
            onClick={() => {
              setError(null)
              setIsLoading(true)
              videoRef.current?.load()
            }}
            className="rounded bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      data-slot="video-player"
      className={cn("group relative overflow-hidden rounded-lg bg-black outline-none", className)}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => {
        if (isPlaying) {
          startHideTimer()
        }
      }}
      onClick={handleContainerClick}
      onKeyDown={handleKeyDown}
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu({ x: e.clientX, y: e.clientY })
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="application"
      aria-label={title || "视频播放器"}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="block h-full w-full"
        preload="metadata"
        playsInline
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
      />

      {isLoading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-white/70" />
        </div>
      )}

      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            className="flex size-16 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-transform hover:scale-110"
            aria-label="播放"
          >
            <Play className="size-8 ml-1" fill="currentColor" />
          </button>
        </div>
      )}

      {/* 长按倍速提示 */}
      {isLongPress && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-white backdrop-blur">
            <Zap className="size-5 text-yellow-400" />
            <span className="text-sm font-medium">3x 倍速播放中</span>
          </div>
        </div>
      )}

      {/* 拖动进度预览 */}
      {dragPreview && (
        <div className="pointer-events-none absolute inset-x-0 bottom-16 flex justify-center">
          <div className="rounded-full bg-black/70 px-3 py-1.5 text-sm text-white backdrop-blur">
            {formatTime(dragPreview.time)}
          </div>
        </div>
      )}

      <div
        data-controls
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300",
          showControls || !isPlaying ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          ref={progressRef}
          data-progress
          className="group/progress relative mb-3 h-5 cursor-pointer select-none"
          onClick={handleProgressClick}
        >
          <div className="absolute inset-y-0 left-0 right-0 flex items-center">
            <div className="relative h-1 w-full rounded-full bg-white/30 group-hover/progress:h-1.5 transition-[height]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="absolute top-1/2 size-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary opacity-0 shadow transition-opacity group-hover/progress:opacity-100"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                seek(-10)
              }}
              className="flex size-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="后退 10 秒"
            >
              <SkipBack className="size-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePlay()
              }}
              className="flex size-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label={isPlaying ? "暂停" : "播放"}
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                seek(10)
              }}
              className="flex size-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="前进 10 秒"
            >
              <SkipForward className="size-4" />
            </button>

            <div className="group/volume relative flex h-8 items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleMute()
                }}
                className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label={isMuted ? "取消静音" : "静音"}
              >
                {isMuted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
              <div className="h-8 w-0 overflow-hidden transition-all duration-200 group-hover/volume:w-[5.5rem]">
                <div className="flex h-full items-center px-1">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                    className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/30 accent-primary"
                    aria-label="音量"
                  />
                </div>
              </div>
            </div>

            <span className="ml-1 flex items-center gap-1 text-xs tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span className="text-white/50">/</span>
              <span>{formatTime(duration)}</span>
            </span>
          </div>

          {title && (
            <span className="hidden truncate text-xs font-medium sm:block">{title}</span>
          )}

          <div className="flex items-center gap-0.5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFullscreen()
              }}
              className="flex size-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label={isFullscreen ? "退出全屏" : "全屏"}
            >
              {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {contextMenu && (
        <div
          className="fixed z-[300] min-w-[10rem] overflow-hidden rounded-lg border border-white/10 bg-black/90 py-1 text-sm text-white shadow-xl backdrop-blur"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-white/10"
            onClick={() => {
              togglePlay()
              closeContextMenu()
            }}
          >
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            <span>{isPlaying ? "暂停" : "播放"}</span>
          </button>
          <button
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-white/10"
            onClick={() => {
              toggleMute()
              closeContextMenu()
            }}
          >
            {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            <span>{isMuted ? "取消静音" : "静音"}</span>
          </button>
          <div className="my-1 h-px bg-white/10" />
          <button
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-white/10"
            onClick={() => {
              seek(-10)
              closeContextMenu()
            }}
          >
            <RotateCcw className="size-4" />
            <span>后退 10 秒</span>
          </button>
          <button
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-white/10"
            onClick={() => {
              if (videoRef.current) {
                const newRate = playbackRate === 1 ? 2 : 1
                videoRef.current.playbackRate = newRate
              }
              closeContextMenu()
            }}
          >
            <Gauge className="size-4" />
            <span>{playbackRate === 1 ? "2x 倍速" : "1x 正常"}</span>
          </button>
          <div className="my-1 h-px bg-white/10" />
          <button
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-white/10"
            onClick={() => {
              toggleFullscreen()
              closeContextMenu()
            }}
          >
            {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
            <span>{isFullscreen ? "退出全屏" : "全屏"}</span>
          </button>
          <button
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-white/10"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.requestPictureInPicture?.().catch(() => {})
              }
              closeContextMenu()
            }}
          >
            <PictureInPicture className="size-4" />
            <span>画中画</span>
          </button>
        </div>
      )}
    </div>
  )
}
