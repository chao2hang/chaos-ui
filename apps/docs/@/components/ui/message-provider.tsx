"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/sonner";

/**
 * Context for message API — allows child components to access
 * the message provider's show/dismiss methods.
 */
const MessageContext = React.createContext<{
  show?: (opts: { content: React.ReactNode; type?: string }) => void;
} | null>(null);

export interface MessageProviderProps {
  /** Position of the toaster. Defaults to 'top-right'. */
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  /** Maximum number of toasts visible at once. Defaults to 5. */
  visibleToasts?: number;
}

export function MessageProvider(props: MessageProviderProps = {}) {
  const { position = "top-right", visibleToasts = 5 } = props;

  return (
    <div data-slot="message-provider">
      <Toaster position={position} visibleToasts={visibleToasts} />
    </div>
  );
}

export { MessageContext };
