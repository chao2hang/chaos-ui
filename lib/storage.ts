/**
 * @lib storage
 * @category lib/storage
 * @since 0.2.0
 * @description localStorage/sessionStorage 包装(过期/序列化) / Storage wrapper with expiry and serialization (no encryption)
 * @example
 * storage.set('key', { foo: 'bar' }, { expires: 3600 });
 * const data = storage.get<{ foo: string }>('key');
 */

interface StorageOptions {
  /** Expiry in seconds / 过期时间(秒) */
  expires?: number;
  /** Whether to use sessionStorage instead of localStorage / 是否使用 sessionStorage */
  session?: boolean;
}

interface StorageItem<T> {
  value: T;
  expiry?: number | undefined;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getStorage(session = false): Storage | null {
  if (!isBrowser()) return null;
  try {
    return session ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

export const storage = {
  /**
   * Set a value in storage / 设置存储值
   * @param key Storage key
   * @param value Value to store
   * @param options Storage options (expiry, session)
   */
  set<T>(key: string, value: T, options: StorageOptions = {}): void {
    const store = getStorage(options.session);
    if (!store) return;

    const item: StorageItem<T> = {
      value,
      expiry: options.expires ? Date.now() + options.expires * 1000 : undefined,
    };

    try {
      store.setItem(key, JSON.stringify(item));
    } catch {
      // QuotaExceededError or similar
    }
  },

  /**
   * Get a value from storage / 获取存储值
   * @param key Storage key
   * @param options Storage options (session)
   * @returns The stored value or null if not found or expired
   */
  get<T>(key: string, options: StorageOptions = {}): T | null {
    const store = getStorage(options.session);
    if (!store) return null;

    try {
      const raw = store.getItem(key);
      if (!raw) return null;

      const item: StorageItem<T> = JSON.parse(raw);

      // Check expiry
      if (item.expiry && Date.now() > item.expiry) {
        store.removeItem(key);
        return null;
      }

      return item.value;
    } catch {
      return null;
    }
  },

  /**
   * Remove a value from storage / 移除存储值
   */
  remove(key: string, options: StorageOptions = {}): void {
    const store = getStorage(options.session);
    if (!store) return;
    store.removeItem(key);
  },

  /**
   * Clear all storage / 清空存储
   */
  clear(options: StorageOptions = {}): void {
    const store = getStorage(options.session);
    if (!store) return;
    store.clear();
  },

  /**
   * Check if a key exists and is not expired / 检查键是否存在
   */
  has(key: string, options: StorageOptions = {}): boolean {
    return this.get(key, options) !== null;
  },

  /**
   * Get all keys / 获取所有键
   */
  keys(options: StorageOptions = {}): string[] {
    const store = getStorage(options.session);
    if (!store) return [];
    return Object.keys(store);
  },

  /**
   * Get storage size (approximate in bytes) / 获取存储大小(近似字节)
   */
  size(options: StorageOptions = {}): number {
    const store = getStorage(options.session);
    if (!store) return 0;
    let total = 0;
    for (let i = 0; i < store.length; i++) {
      const key = store.key(i);
      if (key) {
        const value = store.getItem(key);
        total += key.length + (value?.length ?? 0);
      }
    }
    return total * 2; // UTF-16 characters are 2 bytes
  },
};

/** SessionStorage convenience wrapper / sessionStorage 便捷包装 */
export const sessionStorage = {
  set: <T>(key: string, value: T, options?: Omit<StorageOptions, "session">) =>
    storage.set(key, value, { ...options, session: true }),
  get: <T>(key: string) => storage.get<T>(key, { session: true }),
  remove: (key: string) => storage.remove(key, { session: true }),
  clear: () => storage.clear({ session: true }),
  has: (key: string) => storage.has(key, { session: true }),
  keys: () => storage.keys({ session: true }),
};
