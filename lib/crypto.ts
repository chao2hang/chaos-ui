/**
 * @module crypto
 * @category Utility
 * @since 1.0.0-beta.0
 * @description Cryptographic helpers — non-secret hashing (djb2/fnv1a), Base64/Hex encoding, random id/token generation, and a thin wrapper over the Web Crypto API for HMAC. None of these are for secrets-at-rest; use the Web Crypto `SubtleCrypto` API (exposed via `subtle`) for signed/hashed security-sensitive operations.
 * @example
 * hashString("abc");        // djb2 numeric hash
 * randomId();               // "k3j8a..."
 * toBase64("hello");        // "aGVsbG8="
 */

/**
 * djb2 string hash — fast, non-cryptographic. Stable across runs.
 * @returns 32-bit unsigned integer.
 */
export function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

/** FNV-1a 32-bit hash — alternative non-cryptographic hash. */
export function hashFnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** Generate a random id of the given length using a URL-safe alphabet. */
export function randomId(length = 12): string {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += alphabet[bytes[i]! % alphabet.length];
  }
  return out;
}

/** Generate a random hex token of the given byte length (default 16 bytes → 32 hex chars). */
export function randomToken(byteLength = 16): string {
  return toHex(randomBytes(byteLength));
}

/** Cryptographically-strong random byte array via Web Crypto (falls back to Math.random). */
export function randomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < length; i++) arr[i] = Math.floor(Math.random() * 256);
  }
  return arr;
}

/** Encode a UTF-8 string to Base64 (browser-safe). */
export function toBase64(input: string): string {
  if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
    return globalThis.btoa(unescape(encodeURIComponent(input)));
  }
  return Buffer.from(input, "utf-8").toString("base64");
}

/** Decode a Base64 string to UTF-8. */
export function fromBase64(input: string): string {
  if (typeof globalThis !== "undefined" && typeof globalThis.atob === "function") {
    return decodeURIComponent(escape(globalThis.atob(input)));
  }
  return Buffer.from(input, "base64").toString("utf-8");
}

/** Encode a byte array / string to lowercase hex. */
export function toHex(input: Uint8Array | string): string {
  const bytes =
    typeof input === "string"
      ? Array.from(input, (c) => c.charCodeAt(0))
      : Array.from(input);
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Decode a hex string to a byte array. */
export function fromHex(input: string): Uint8Array {
  const clean = input.replace(/^0x/, "");
  const out = new Uint8Array(Math.floor(clean.length / 2));
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

/** Access to the Web Crypto `SubtleCrypto` API, or `undefined` when unavailable. */
export const subtle: SubtleCrypto | undefined =
  typeof globalThis !== "undefined" && globalThis.crypto?.subtle
    ? globalThis.crypto.subtle
    : undefined;

/**
 * Backward-compat default export name. Returns the module's helper bag so that
 * `import { crypto } from "@/lib/crypto"` keeps working; it is NOT the global
 * `crypto` (Web Crypto). Prefer the named helpers above.
 */
export function crypto() {
  return {
    hashString,
    hashFnv1a,
    randomId,
    randomToken,
    randomBytes,
    toBase64,
    fromBase64,
    toHex,
    fromHex,
    subtle,
  };
}
