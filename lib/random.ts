/**
 * Random number and ID generation utilities.
 * @since 0.2.0
 */

/**
 * Random integer in [min, max] (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Random float in [min, max).
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Generate a UUID v4 string.
 */
export function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Generate a non-repeating sequence of integers in [0, n-1] (Fisher-Yates).
 */
export function uniqueSequence(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
  }
  return arr
}

/**
 * Pick a random element from an array.
 */
export function randomPick<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Pick n random elements from an array (without replacement).
 */
export function randomSample<T>(arr: T[], n: number): T[] {
  const indices = uniqueSequence(arr.length).slice(0, Math.min(n, arr.length))
  return indices.map((i) => arr[i]!)
}

/**
 * Random string of given length (alphanumeric).
 */
export function randomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from({ length }, () => chars[randomInt(0, chars.length - 1)]).join("")
}

/**
 * Random hex color.
 */
export function randomColor(): string {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`
}
