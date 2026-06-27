/**
 * @lib url
 * @category lib/url
 * @since 0.2.0
 * @description URL 参数解析/序列化工具 / URL parameter parse/serialize utilities
 * @example
 * const params = url.parse('https://example.com?a=1&b=2');
 * url.stringify({ a: 1, b: [2, 3] });
 * url.getQuery('key');
 * url.setQuery('key', 'value');
 */

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue | QueryValue[]>;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export const url = {
  /**
   * Parse a query string into an object / 解析查询字符串
   * @param search Query string (e.g., '?a=1&b=2' or 'a=1&b=2')
   * @returns Parsed parameters object
   */
  parse(search?: string): Record<string, string> {
    const queryStr = search ?? (isBrowser() ? window.location.search : "");
    const cleanStr = queryStr.startsWith("?") ? queryStr.slice(1) : queryStr;
    if (!cleanStr) return {};

    const params: Record<string, string> = {};
    const urlSearchParams = new URLSearchParams(cleanStr);
    urlSearchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  },

  /**
   * Serialize an object into a query string / 序列化为查询字符串
   * @param params Parameters object
   * @returns Query string (without leading '?')
   */
  stringify(params: QueryParams): string {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined) continue;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v !== null && v !== undefined) {
            searchParams.append(key, String(v));
          }
        });
      } else {
        searchParams.set(key, String(value));
      }
    }

    return searchParams.toString();
  },

  /**
   * Get a specific query parameter / 获取特定查询参数
   */
  getQuery(key: string, search?: string): string | null {
    const params = this.parse(search);
    return params[key] ?? null;
  },

  /**
   * Set query parameters (updates URL in browser) / 设置查询参数
   */
  setQuery(params: QueryParams, options: { push?: boolean } = {}): void {
    if (!isBrowser()) return;

    const urlObj = new URL(window.location.href);
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined) {
        urlObj.searchParams.delete(key);
      } else if (Array.isArray(value)) {
        urlObj.searchParams.delete(key);
        value.forEach((v) => {
          if (v !== null && v !== undefined) {
            urlObj.searchParams.append(key, String(v));
          }
        });
      } else {
        urlObj.searchParams.set(key, String(value));
      }
    }

    const newUrl = urlObj.toString();
    if (options.push) {
      window.history.pushState({}, "", newUrl);
    } else {
      window.history.replaceState({}, "", newUrl);
    }
  },

  /**
   * Remove query parameters / 移除查询参数
   */
  removeQuery(keys: string | string[]): void {
    if (!isBrowser()) return;

    const urlObj = new URL(window.location.href);
    const keyArray = Array.isArray(keys) ? keys : [keys];
    keyArray.forEach((key) => urlObj.searchParams.delete(key));
    window.history.replaceState({}, "", urlObj.toString());
  },

  /**
   * Parse a full URL into parts / 解析完整 URL
   */
  parseUrl(fullUrl: string): {
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    params: Record<string, string>;
  } {
    try {
      const urlObj = new URL(fullUrl);
      return {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        params: this.parse(urlObj.search),
      };
    } catch {
      return {
        protocol: "",
        hostname: "",
        port: "",
        pathname: "",
        search: "",
        hash: "",
        params: {},
      };
    }
  },

  /**
   * Build a URL with query parameters / 构建带参数的 URL
   */
  buildUrl(base: string, params?: QueryParams): string {
    if (!params || Object.keys(params).length === 0) return base;
    const queryString = this.stringify(params);
    const separator = base.includes("?") ? "&" : "?";
    return `${base}${separator}${queryString}`;
  },

  /**
   * Check if URL is external / 检查是否外部链接
   */
  isExternal(link: string): boolean {
    if (!isBrowser()) return false;
    try {
      const urlObj = new URL(link, window.location.href);
      return urlObj.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  },
};
