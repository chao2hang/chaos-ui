export type LogLevel = "debug" | "info" | "warn" | "error"

const LEVEL_RANK: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

let currentLevel: LogLevel =
  typeof process !== "undefined" && process.env.NODE_ENV === "production"
    ? "warn"
    : "debug"

function shouldLog(level: LogLevel): boolean {
  return LEVEL_RANK[level] >= LEVEL_RANK[currentLevel]
}

function emit(level: LogLevel, fn: (...a: unknown[]) => void, args: unknown[]) {
  if (!shouldLog(level)) return
  const ts = new Date().toISOString()
  fn(`[${ts}] [${level.toUpperCase()}]`, ...args)
}

export const logger = {
  level: currentLevel as LogLevel,
  setLevel(level: LogLevel) {
    currentLevel = level
    this.level = level
  },
  debug: (...args: unknown[]) => emit("debug", console.debug, args),
  info: (...args: unknown[]) => emit("info", console.info, args),
  warn: (...args: unknown[]) => emit("warn", console.warn, args),
  error: (...args: unknown[]) => emit("error", console.error, args),
}
