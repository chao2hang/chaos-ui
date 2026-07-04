"use client";

export { useBreakpoint, useIsBreakpoint } from "./use-breakpoint";
export type { Breakpoint } from "./use-breakpoint";
export { useEventListener } from "./use-event-listener";
export { useKey, useKeyCombo } from "./use-key";
export type { KeyFilter, KeyHandler, UseKeyOptions } from "./use-key";
export { useMessage } from "./use-message";
export type { MessageInstance, MessageOptions } from "./use-message";
export { useNotification } from "./use-notification";
export type {
  NotificationInstance,
  NotificationOptions,
} from "./use-notification";
export { useModal, ModalRenderer } from "./use-modal";
export type { ModalInstance, ModalOptions } from "./use-modal";
export { useAsync } from "./use-async";
export { useClickOutside } from "./use-click-outside";
export { useCopyToClipboard } from "./use-copy-to-clipboard";
export { useCountdown } from "./use-countdown";
export { useDebounce } from "./use-debounce";
export { useHotkeys } from "./use-hotkeys";
export { useInfiniteScroll } from "./use-infinite-scroll";
export {
  useIntersectionObserver,
  useInView,
} from "./use-intersection-observer";
export { useLocalStorage } from "./use-local-storage";
export { useMediaQuery, useIsDesktop, useIsTablet } from "./use-media-query";
export { useIsMobile } from "./use-mobile";
export { usePagination } from "./use-pagination";
export { usePrevious } from "./use-previous";
export { useStep } from "./use-step";
export { useThrottle } from "./use-throttle";
export { useToggle } from "./use-toggle";
export {
  useLocale,
  LocaleProvider,
  supportedLocales,
  getStoredLocale,
} from "./use-locale";
export type { SupportedLocale } from "./use-locale";
export { useCrud } from "./use-crud";
export type { UseCrudConfig, UseCrudReturn } from "./use-crud";
export { usePageTitle } from "./use-page-title";
export type { UsePageTitleOptions } from "./use-page-title";

export {
  useConfirmAsync,
  ConfirmProvider,
  confirmAsync,
  useConfirmContext,
} from "./use-confirm-async";
export type { ConfirmOptions, ConfirmProviderProps } from "./use-confirm-async";
export { useFieldValidation } from "./use-field-validation";
export type {
  ValidationRule,
  UseFieldValidationOptions,
} from "./use-field-validation";

// P1 hooks — network, visibility, orientation, clipboard, form, fetch
export { useNetworkStatus } from "./use-network-status";
export { useVisibilityChange } from "./use-visibility-change";
export { useWindowSize } from "./use-window-size";
export { useScroll, useScrollDirection } from "./use-scroll";
export { useOrientation } from "./use-orientation";
export { useClipboard } from "./use-clipboard";
export { useForm } from "./use-form";
export { useFormSchema, zodResolverAdapter } from "./use-form-schema";
export type { UseFormSchemaOptions } from "./use-form-schema";

// P0 hooks — auth/permission
export {
  PermissionProvider,
  usePermission,
  PermissionContext,
} from "./use-permission";
export type {
  PermissionProviderProps,
  PermissionContextValue,
} from "./use-permission";

export { useApproval } from "./use-approval";
export { useAsyncTask } from "./use-async-task";
export { useBill } from "./use-bill";
export { useDataScope } from "./use-data-scope";
export { useDict } from "./use-dict";
export { useExport } from "./use-export";
export { useFetch } from "./use-fetch";
export { useFormTable } from "./use-form-table";
export { useIdle } from "./use-idle";
export { useImport } from "./use-import";
export { useLineEditor } from "./use-line-editor";
export { useNetworkQuality } from "./use-network-quality";
export { usePrint } from "./use-print";
export { useRedo } from "./use-redo";
export { useSse } from "./use-sse";
export { useSwr } from "./use-swr";
export { useTable } from "./use-table";
export { useUndo } from "./use-undo";
export { useWebsocket } from "./use-websocket";
