"use client";

/**
 * @component MessageProvider
 * @category ui/feedback
 * @since 0.3.0
 * @description Mounts the global message/notification host at app root. Required for `message.*` static API to work.
 * @keywords message, toast, feedback, provider
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { MessageProvider } from '@qxyfoods/chaos-ui/next';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <MessageProvider />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

import { Toaster } from "@/components/ui/sonner";

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
  const {
    position = "top-right",
    visibleToasts = 5,
  } = props;

  return (
    <Toaster
      position={position}
      visibleToasts={visibleToasts}
    />
  );
}
