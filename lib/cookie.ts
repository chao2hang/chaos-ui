/**
 * @lib cookie
 * @category lib/storage
 * @since 0.2.0
 * @description Cookie 读写工具 / Cookie read/write utilities
 * @example
 * cookie.set('token', 'abc123', { expires: 7, secure: true });
 * const token = cookie.get('token');
 * cookie.remove('token');
 */

interface CookieOptions {
  /** Expiry in days / 过期天数 */
  expires?: number;
  /** Expiry date / 过期日期 */
  expiresDate?: Date;
  /** Path (default: '/') / 路径 */
  path?: string;
  /** Domain / 域名 */
  domain?: string;
  /** Secure flag / 安全标志 */
  secure?: boolean;
  /** SameSite policy / SameSite 策略 */
  sameSite?: "strict" | "lax" | "none";
  /**
   * HttpOnly cannot be set from browser JS. Accepted for API symmetry with
   * server-side cookie helpers but silently ignored in this client implementation.
   * / 浏览器 JS 无法设置 HttpOnly；仅 API 对称，客户端实现会忽略
   */
  httpOnly?: boolean;
}

function isBrowser(): boolean {
  return typeof document !== "undefined";
}

function encodeValue(value: string): string {
  try {
    return encodeURIComponent(value);
  } catch {
    return value;
  }
}

function decodeValue(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export const cookie = {
  /**
   * Set a cookie / 设置 Cookie
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    if (!isBrowser()) return;

    const parts: string[] = [`${encodeValue(name)}=${encodeValue(value)}`];

    if (options.expires !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      parts.push(`expires=${date.toUTCString()}`);
    } else if (options.expiresDate) {
      parts.push(`expires=${options.expiresDate.toUTCString()}`);
    }

    if (options.path) parts.push(`path=${options.path}`);
    else parts.push("path=/");

    if (options.domain) parts.push(`domain=${options.domain}`);
    if (options.secure) parts.push("secure");
    if (options.sameSite) parts.push(`samesite=${options.sameSite}`);

    document.cookie = parts.join("; ");
  },

  /**
   * Get a cookie value / 获取 Cookie
   */
  get(name: string): string | null {
    if (!isBrowser()) return null;

    const cookies = document.cookie ? document.cookie.split("; ") : [];
    for (const cookieStr of cookies) {
      const idx = cookieStr.indexOf("=");
      if (idx === -1) continue;
      const key = decodeValue(cookieStr.slice(0, idx));
      if (key === name) {
        return decodeValue(cookieStr.slice(idx + 1));
      }
    }
    return null;
  },

  /**
   * Remove a cookie / 删除 Cookie
   */
  remove(
    name: string,
    options: Pick<CookieOptions, "path" | "domain"> = {},
  ): void {
    this.set(name, "", {
      ...options,
      expires: -1,
      path: options.path ?? "/",
    });
  },

  /**
   * Get all cookies as an object / 获取所有 Cookie
   */
  getAll(): Record<string, string> {
    if (!isBrowser()) return {};

    const result: Record<string, string> = {};
    const cookies = document.cookie ? document.cookie.split("; ") : [];

    for (const cookieStr of cookies) {
      const idx = cookieStr.indexOf("=");
      if (idx === -1) continue;
      const key = decodeValue(cookieStr.slice(0, idx));
      const value = decodeValue(cookieStr.slice(idx + 1));
      result[key] = value;
    }

    return result;
  },

  /**
   * Check if a cookie exists / 检查 Cookie 是否存在
   */
  has(name: string): boolean {
    return this.get(name) !== null;
  },
};
