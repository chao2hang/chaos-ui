import "@testing-library/jest-dom/vitest";

// Mock PointerEvent (jsdom does not ship a PointerEvent constructor, but
// @base-ui/react constructs one on pointer interactions like radio clicks).
if (typeof window !== "undefined" && typeof window.PointerEvent === "undefined") {
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
