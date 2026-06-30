"use client";
import * as React from "react";

/**
 * @hook useWebsocket
 * @category Data
 * @since 1.0.0-beta.0
 * @description Manage a WebSocket connection with auto-reconnect, send helper, and last-message state.
 * @param url WebSocket URL. Falsy disables.
 * @param options onOpen/onMessage/onClose/onError callbacks, protocols, retry interval.
 * @example
 * const { send, readyState, lastMessage } = useWebsocket("wss://echo.example");
 */
export interface UseWebsocketOptions {
  onOpen?: (e: Event) => void;
  onMessage?: (data: string, e: MessageEvent) => void;
  onClose?: (e: CloseEvent) => void;
  onError?: (e: Event) => void;
  protocols?: string | string[];
  retryInterval?: number;
  autoConnect?: boolean;
}

export interface UseWebsocketState {
  readyState: number;
  lastMessage: string | undefined;
  send: (data: string | ArrayBuffer) => void;
  close: () => void;
}

export function useWebsocket(
  url: string | null,
  options: UseWebsocketOptions = {},
): UseWebsocketState {
  const {
    onOpen,
    onMessage,
    onClose,
    onError,
    protocols,
    retryInterval = 3000,
    autoConnect = true,
  } = options;
  const [readyState, setReadyState] = React.useState(0);
  const [lastMessage, setLastMessage] = React.useState<string | undefined>(undefined);
  const wsRef = React.useRef<WebSocket | null>(null);
  const handlersRef = React.useRef({ onOpen, onMessage, onClose, onError });
  handlersRef.current = { onOpen, onMessage, onClose, onError };
  const retryRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const connect = React.useCallback(() => {
    if (!url || typeof WebSocket === "undefined") return;
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;
    setReadyState(ws.readyState);
    ws.onopen = (e) => {
      setReadyState(ws.readyState);
      handlersRef.current.onOpen?.(e);
    };
    ws.onmessage = (e) => {
      const data = typeof e.data === "string" ? e.data : "";
      setLastMessage(data);
      handlersRef.current.onMessage?.(data, e);
    };
    ws.onclose = (e) => {
      setReadyState(ws.readyState);
      handlersRef.current.onClose?.(e);
      if (autoConnect && retryInterval > 0) {
        retryRef.current = setTimeout(connect, retryInterval);
      }
    };
    ws.onerror = (e) => {
      handlersRef.current.onError?.(e);
    };
  }, [url, protocols, autoConnect, retryInterval]);

  React.useEffect(() => {
    if (autoConnect) connect();
    return () => {
      if (retryRef.current) clearTimeout(retryRef.current);
      wsRef.current?.close();
    };
  }, [autoConnect, connect]);

  const send = React.useCallback((data: string | ArrayBuffer) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);

  const close = React.useCallback(() => {
    if (retryRef.current) clearTimeout(retryRef.current);
    wsRef.current?.close();
  }, []);

  return { readyState, lastMessage, send, close };
}
