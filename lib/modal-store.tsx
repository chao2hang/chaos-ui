"use client";

/**
 * @lib modal-store
 * @category lib/feedback
 * @since 0.3.0
 * @description Global store for imperative modals / 命令式弹窗的全局状态
 */

import { useSyncExternalStore } from "react";

export type ModalKind = "confirm" | "info" | "warning" | "success" | "error";

export interface ImperativeModalConfig {
  id: string;
  kind: ModalKind;
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okVariant?: "default" | "destructive";
  width?: string | number;
  closable?: boolean;
  maskClosable?: boolean;
  icon?: React.ReactNode;
  /** Resolve the promise with true on OK, false on cancel, undefined on dismiss */
  resolve?: (value: boolean | undefined) => void;
}

let modals: ImperativeModalConfig[] = [];
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ImperativeModalConfig[] {
  return modals;
}

/** Stable reference to empty array for SSR */
const EMPTY: ImperativeModalConfig[] = [];
function getServerSnapshot(): ImperativeModalConfig[] {
  return EMPTY;
}

let nextId = 0;
function generateId(): string {
  nextId += 1;
  return `imperative-modal-${Date.now()}-${nextId}`;
}

const _thenHandlers = new Map<
  string,
  Array<(v: boolean | undefined) => void>
>();

export const modalStore = {
  push(config: Omit<ImperativeModalConfig, "id">): string {
    const id = generateId();
    modals = [...modals, { ...config, id }];
    _thenHandlers.set(id, []);
    emit();
    return id;
  },

  close(id: string, value: boolean | undefined) {
    const target = modals.find((m) => m.id === id);
    if (target?.resolve) target.resolve(value);
    const handlers = _thenHandlers.get(id) ?? [];
    for (const h of handlers) h(value);
    _thenHandlers.delete(id);
    modals = modals.filter((m) => m.id !== id);
    emit();
  },

  closeAll() {
    for (const m of modals) {
      if (m.resolve) m.resolve(undefined);
      const handlers = _thenHandlers.get(m.id) ?? [];
      for (const h of handlers) h(undefined);
      _thenHandlers.delete(m.id);
    }
    modals = [];
    emit();
  },

  subscribe,
  getSnapshot,
  getServerSnapshot,
};

export function useImperativeModals(): ImperativeModalConfig[] {
  return useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
    modalStore.getServerSnapshot,
  );
}
