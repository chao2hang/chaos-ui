/**
 * Common validation utilities for forms and data processing.
 * @since 0.2.0
 */

const patterns = {
  /** Chinese mobile phone (11 digits, starts with 1) */
  phone: /^1[3-9]\d{9}$/,
  /** Email address */
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  /** Chinese ID card (18 digits with check digit) */
  idCard: /^\d{17}[\dXx]$/,
  /** Bank card number (16-19 digits) */
  bankCard: /^\d{16,19}$/,
  /** Unified Social Credit Code (18 chars, alphanumeric) */
  uscc: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
  /** URL */
  url: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
  /** IPv4 */
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
}

export const validators = {
  /** Test against a regex pattern */
  pattern: (value: string, pattern: RegExp) => pattern.test(value),

  /** Required field — not null, not undefined, not empty string, not whitespace-only */
  required: (value: unknown) => {
    if (value == null) return false
    if (typeof value === "string") return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return true
  },

  /** Minimum string length */
  minLength: (value: string, min: number) => value.length >= min,

  /** Maximum string length */
  maxLength: (value: string, max: number) => value.length <= max,

  /** Number range (inclusive) */
  range: (value: number, min: number, max: number) => value >= min && value <= max,

  /** Matches a specific value (e.g. password confirm) */
  matches: <T>(value: T, target: T) => value === target,

  /** Phone number */
  phone: (value: string) => patterns.phone.test(value),

  /** Email */
  email: (value: string) => patterns.email.test(value),

  /** Chinese ID card */
  idCard: (value: string) => {
    if (!patterns.idCard.test(value)) return false
    // Checksum validation
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const checkCodes = "10X98765432"
    const sum = weights.reduce(
      (acc, w, i) => acc + w * parseInt(value[i]!, 10),
      0,
    )
    return checkCodes[sum % 11] === value[17]!.toUpperCase()
  },

  /** Bank card */
  bankCard: (value: string) => patterns.bankCard.test(value),

  /** Unified Social Credit Code */
  uscc: (value: string) => patterns.uscc.test(value),

  /** URL */
  url: (value: string) => patterns.url.test(value),

  /** IPv4 */
  ipv4: (value: string) => patterns.ipv4.test(value),

  /** Positive integer */
  positiveInteger: (value: number) => Number.isInteger(value) && value > 0,

  /** Non-negative integer */
  nonNegativeInteger: (value: number) => Number.isInteger(value) && value >= 0,

  /** Decimal with precision */
  decimal:
    (precision: number) =>
    (value: number) => {
      const str = value.toString()
      const parts = str.split(".")
      return parts.length === 1 || (parts[1]?.length ?? 0) <= precision
    },
}

export { patterns }
export type {  }
