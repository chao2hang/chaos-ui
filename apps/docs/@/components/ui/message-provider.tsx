"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "info" | "success" | "warning" | "error";
  content: React.ReactNode;
  duration?: number;
}

interface MessageContextValue {
  messages: Message[];
  addMessage: (msg: Omit<Message, "id">) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
}

const MessageContext = React.createContext<MessageContextValue | null>(null);

function useMessage(): MessageContextValue {
  const ctx = React.useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return ctx;
}

interface MessageProviderProps extends React.ComponentProps<"div"> {
  /** Max messages visible at once */
  max?: number;
}

function MessageProvider({
  children,
  max = 5,
  className,
  ...props
}: MessageProviderProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);

  const addMessage = React.useCallback(
    (msg: Omit<Message, "id">) => {
      const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const newMsg: Message = { ...msg, id };
      setMessages((prev) => [...prev.slice(-(max - 1)), newMsg]);

      if (msg.duration !== 0) {
        const duration = msg.duration ?? 3000;
        setTimeout(() => {
          setMessages((prev) => prev.filter((m) => m.id !== id));
        }, duration);
      }
    },
    [max],
  );

  const removeMessage = React.useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const clearMessages = React.useCallback(() => {
    setMessages([]);
  }, []);

  const contextValue = React.useMemo(
    () => ({ messages, addMessage, removeMessage, clearMessages }),
    [messages, addMessage, removeMessage, clearMessages],
  );

  const iconMap: Record<Message["type"], React.ReactNode> = {
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="16" y2="12" />
        <line x1="12" x2="12.01" y1="8" y2="8" />
      </svg>
    ),
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" x2="12" y1="9" y2="13" />
        <line x1="12" x2="12.01" y1="17" y2="17" />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" x2="9" y1="9" y2="15" />
        <line x1="9" x2="15" y1="9" y2="15" />
      </svg>
    ),
  };

  const colorMap: Record<Message["type"], string> = {
    info: "border-primary bg-primary/10 text-primary",
    success: "border-success bg-success/10 text-success",
    warning: "border-warning bg-warning/10 text-warning",
    error: "border-destructive bg-destructive/10 text-destructive",
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
      <div
        data-slot="message-provider"
        className={cn(
          "pointer-events-none fixed top-4 right-4 z-[100] flex flex-col gap-2",
          className,
        )}
        aria-live="polite"
        {...props}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            data-slot="message"
            role="alert"
            className={cn(
              "animate-in slide-in-from-right-full pointer-events-auto flex w-80 items-start gap-2 rounded-md border p-3 shadow-lg",
              colorMap[msg.type],
            )}
          >
            <span className="mt-0.5 shrink-0">{iconMap[msg.type]}</span>
            <span className="flex-1 text-sm">{msg.content}</span>
            <button
              type="button"
              onClick={() => removeMessage(msg.id)}
              className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100"
              aria-label="Dismiss"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </MessageContext.Provider>
  );
}

export { MessageProvider, useMessage, MessageContext };
