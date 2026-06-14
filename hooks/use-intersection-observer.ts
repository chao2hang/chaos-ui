"use client";
import * as React from "react";

interface Options {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  enabled?: boolean;
}

export function useIntersectionObserver<T extends Element>(
  ref: React.RefObject<T | null>,
  options: Options = {},
): IntersectionObserverEntry | null {
  const {
    enabled = true,
    triggerOnce = false,
    root,
    rootMargin,
    threshold,
  } = options;
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(
    null,
  );
  const frozen = React.useRef(false);

  React.useEffect(() => {
    if (!enabled || frozen.current) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setEntry({
        isIntersecting: true,
        target: node,
        boundingClientRect: node.getBoundingClientRect(),
        intersectionRatio: 1,
        intersectionRect: node.getBoundingClientRect(),
        rootBounds: null,
        time: Date.now(),
      } as IntersectionObserverEntry);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        setEntry(e);
        if (triggerOnce && e.isIntersecting) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      (() => {
        const init: IntersectionObserverInit = {};
        if (root !== undefined) init.root = root;
        if (rootMargin !== undefined) init.rootMargin = rootMargin;
        if (threshold !== undefined) init.threshold = threshold;
        return init;
      })(),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, enabled, triggerOnce, root, rootMargin, threshold]);

  return entry;
}

export function useInView<T extends Element>(
  ref: React.RefObject<T | null>,
  options: Omit<Options, "enabled"> = {},
): boolean {
  return !!useIntersectionObserver(ref, options)?.isIntersecting;
}
