import { createRequire } from "node:module";
import "@testing-library/jest-dom/vitest";

const require = createRequire(import.meta.url);

// jsdom's StorageEvent constructor validates that `storageArea` is a genuine
// jsdom Storage (`Storage.is()` checks `value[implSymbol] instanceof
// StorageImpl`). Import jsdom's StorageImpl + implSymbol so our in-memory
// polyfill instances carry a real impl marker and pass that check when tests
// do `new StorageEvent("storage", { storageArea: localStorage })`.
let StorageImpl: { new (...args: unknown[]): object };
try {
  StorageImpl =
    require("jsdom/lib/jsdom/living/webstorage/Storage-impl.js").implementation;
} catch {
  StorageImpl = class DummyStorageImpl {};
}
let implSymbol: symbol;
try {
  implSymbol = require("jsdom/lib/jsdom/living/generated/utils.js").implSymbol;
} catch {
  implSymbol = Symbol("impl");
}

// Provide a working localStorage/sessionStorage (jsdom under some Node versions
// leaves `window.localStorage` undefined, which breaks storage hooks and the
// lib/storage tests). Implement a small in-memory Storage backed by a Map and
// exposed via a Proxy so that `Object.keys(storage)` / `for...in` only enumerate
// the stored data keys (mirroring the Web Storage spec where Storage behaves
// like a plain record of key/value pairs, not a normal object with methods).
function createMemoryStorage(): Storage {
  const store = new Map<string, string>();
  // Stamp a real jsdom StorageImpl so `new StorageEvent("storage", {
  // storageArea: localStorage })` passes jsdom's `Storage.is()` validation.
  const impl = new StorageImpl(
    { _currentOriginData: { windowsInSameOrigin: [] } },
    [],
    {
      associatedWindow: null,
      storageArea: store,
      url: "https://localhost/",
      type: "localStorage",
      storageQuota: 5_000_000,
    },
  );
  const target: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => {
      store.delete(key);
    },
    setItem: (key: string, value: string) => {
      store.set(key, String(value));
    },
  } as Storage;
  // Expose the jsdom impl marker so `Storage.is(polyfill)` returns true.
  Object.defineProperty(target, implSymbol, {
    value: impl,
    enumerable: false,
    configurable: true,
    writable: true,
  });

  // Mirror the Web Storage spec: `Object.keys(storage)`, `for...in`, and
  // `[...storage]` enumerate ONLY stored data keys (methods live on the
  // prototype, exactly like a real browser Storage). Data-key access and
  // bracket assignment (`storage["foo"]`) read/write the underlying Map.
  const methods = new Set([
    "length",
    "clear",
    "getItem",
    "setItem",
    "removeItem",
    "key",
  ]);
  return new Proxy(target, {
    ownKeys() {
      return [...store.keys()];
    },
    getOwnPropertyDescriptor(target, prop) {
      if (methods.has(prop as string)) return undefined;
      if ((prop as symbol) === implSymbol) {
        const d = Object.getOwnPropertyDescriptor(target, implSymbol);
        return d ? { ...d, enumerable: false } : undefined;
      }
      if (store.has(prop as string)) {
        return {
          enumerable: true,
          configurable: true,
          writable: true,
          value: store.get(prop as string)!,
        };
      }
      return undefined;
    },
    has(_target, prop) {
      if (methods.has(prop as string)) return true;
      if ((prop as symbol) === implSymbol) return true;
      return store.has(prop as string);
    },
    get(target, prop: string | symbol) {
      if (typeof prop === "symbol") return Reflect.get(target, prop, target);
      if (methods.has(prop)) return Reflect.get(target, prop, target);
      return store.has(prop) ? store.get(prop)! : undefined;
    },
    set(_target, prop: string | symbol, value: string) {
      if (typeof prop === "symbol") return false;
      if (methods.has(prop)) return false;
      store.set(prop, String(value));
      return true;
    },
    deleteProperty(_target, prop: string | symbol) {
      if (typeof prop === "symbol") return false;
      if (methods.has(prop)) return false;
      return store.delete(prop);
    },
  }) as unknown as Storage;
}

if (typeof window !== "undefined") {
  if (!window.localStorage) {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      writable: true,
      value: createMemoryStorage(),
    });
  }
  if (!window.sessionStorage) {
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      writable: true,
      value: createMemoryStorage(),
    });
  }
}

// Expose on the global object so bare `localStorage`/`sessionStorage` references
// in tests resolve (jsdom normally does this, but guard for robustness).
if (typeof globalThis.localStorage === "undefined") {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    writable: true,
    value: (typeof window !== "undefined"
      ? window.localStorage
      : undefined) as Storage,
  });
}
if (typeof globalThis.sessionStorage === "undefined") {
  Object.defineProperty(globalThis, "sessionStorage", {
    configurable: true,
    writable: true,
    value: (typeof window !== "undefined"
      ? window.sessionStorage
      : undefined) as Storage,
  });
}

// Mock PointerEvent (jsdom does not ship a PointerEvent constructor, but
// @base-ui/react constructs one on pointer interactions like radio clicks).
if (
  typeof window !== "undefined" &&
  typeof window.PointerEvent === "undefined"
) {
  class PointerEventPolyfill extends MouseEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    width: number;
    height: number;
    pressure: number;
    tangentialPressure: number;
    tiltX: number;
    tiltY: number;
    twist: number;
    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerId = init.pointerId ?? 0;
      this.pointerType = init.pointerType ?? "";
      this.isPrimary = init.isPrimary ?? false;
      this.width = init.width ?? 1;
      this.height = init.height ?? 1;
      this.pressure = init.pressure ?? 0;
      this.tangentialPressure = init.tangentialPressure ?? 0;
      this.tiltX = init.tiltX ?? 0;
      this.tiltY = init.tiltY ?? 0;
      this.twist = init.twist ?? 0;
    }
  }
  Object.defineProperty(window, "PointerEvent", {
    writable: true,
    configurable: true,
    value: PointerEventPolyfill,
  });
  if (typeof globalThis.PointerEvent === "undefined") {
    Object.defineProperty(globalThis, "PointerEvent", {
      writable: true,
      configurable: true,
      value: PointerEventPolyfill,
    });
  }
}

// Mock window.matchMedia (required by many UI components)
if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// Mock ResizeObserver (required by some UI components)
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

// Mock IntersectionObserver
if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
}

// Mock scrollTo
if (typeof window !== "undefined" && !window.scrollTo) {
  Object.defineProperty(window, "scrollTo", {
    writable: true,
    configurable: true,
    value: () => {},
  });
}

// Polyfill Element.prototype.getAnimations (jsdom does not implement the Web
// Animations API). Base UI's Popover/Tooltip/Collapsible call
// `viewport.getAnimations()` during teardown; without this they log a
// `TypeError: viewport.getAnimations is not a function` on every unmount.
if (
  typeof Element !== "undefined" &&
  typeof Element.prototype.getAnimations !== "function"
) {
  Object.defineProperty(Element.prototype, "getAnimations", {
    configurable: true,
    writable: true,
    value: () => [] as Animation[],
  });
}

// (Prior attempt at blocking jsdom anchor navigation was landed here, but the
// real Vitest hang was an infinite `useEffect([value])` re-render loop in
// components/business/form-designer-runtime.tsx — fixed at source. The global
// `HTMLAnchorElement.prototype.click` no-op below instead broke tests that
// deliberately stub `HTMLElement.prototype.click` (export-button.test.tsx);
// see commit history if a similar hang recurs.)

// Mock getComputedStyle for jsdom.
// NOTE: a naive `{ ...style, getPropertyValue }` spread loses the
// CSSStyleDeclaration prototype, so property getters like `animationName`
// and `transitionDuration` become undefined — which crashes Base UI's
// Collapsible/Popover panels (`getAnimationType` calls `.split(',')` on
// `animationName`). Wrap the real style object in a Proxy that delegates
// every access to the original (preserving prototype getters) and only
// overrides `getPropertyValue` so CSS custom properties resolve to "".
if (typeof window !== "undefined") {
  const originalGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
    const style = originalGetComputedStyle(elt, pseudoElt);
    return new Proxy(style, {
      get(target, prop, receiver) {
        if (prop === "getPropertyValue") {
          return (property: string) => {
            if (property.startsWith("--")) return "";
            return target.getPropertyValue(property);
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  };
}
