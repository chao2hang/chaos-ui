"use client";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";
export { Alert, AlertTitle, AlertDescription, alertVariants } from "./alert";
export type { AlertProps, AlertVariant } from "./alert";
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";
export { AspectRatio } from "./aspect-ratio";
export { AudioPlayer } from "./audio-player";
export type { AudioPlayerProps } from "./audio-player";
export { VideoPlayer } from "./video-player";
export type { VideoPlayerProps } from "./video-player";
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "./avatar";
export { Badge, badgeVariants } from "./badge";
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb";
export { BarcodeDisplay } from "./barcode-display";
export type { BarcodeDisplayProps } from "./barcode-display";
export { BrowseInput, browseInputVariants } from "./browse-input";
export type { BrowseInputProps } from "./browse-input";
export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";
export { Calendar, CalendarDayButton } from "./calendar";
export { Captcha, generateCode } from "./captcha";
export type { CaptchaProps, CaptchaVisualOptions } from "./captcha";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardSection,
} from "./card";
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "./carousel";
export { Checkbox } from "./checkbox";
export type { CheckboxProps } from "./checkbox";
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";
export { ColorPicker } from "./color-picker";
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./command";
export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu";
export { DepartmentBrowse } from "./department-browse";
export type { Department, DepartmentBrowseProps } from "./department-browse";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
export type {
  DialogProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogBodyProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from "./dialog";
export { Dot, dotVariants } from "./dot";
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";
export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";
export { FileUpload, FileList } from "./file-upload";
export { FormGrid, FormGridItem, formGridVariants } from "./form-grid";
export type { FormGridProps, FormGridItemProps } from "./form-grid";
export { FormList } from "./form-list";
export type { FormListItem, FormListProps } from "./form-list";
export { FormSection, formSectionVariants } from "./form-section";
export type { FormSectionProps } from "./form-section";
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./form";
export type {
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
} from "./form";
export { SchemaForm } from "./schema-form";
export type {
  SchemaFormProps,
  SchemaFormFieldOverride,
  SchemaFormFieldType,
  SchemaFormFieldOption,
} from "./schema-form";
export { FullscreenToggle } from "./fullscreen-toggle";
export type { FullscreenToggleProps } from "./fullscreen-toggle";
export { GridLayout, GridItem, gridLayoutVariants } from "./grid-layout";
export type { GridLayoutProps, GridItemProps } from "./grid-layout";
export { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
export { ImageViewer } from "./image-viewer";
export type { ImageViewerProps, ImageViewerImage } from "./image-viewer";
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "./input-group";
export { Input } from "./input";
export type { InputProps } from "./input";
export { KeyboardShortcut } from "./keyboard-shortcut";
export type { KeyboardShortcutProps } from "./keyboard-shortcut";
export { Kbd, KbdGroup, kbdVariants } from "./kbd";
import { KPIPanel as _KPIPanel, KPICard as _KPICard } from "./kpi-panel";
export { KPIPanel, KPICard } from "./kpi-panel";
/** @deprecated Use KPIPanel */
export const KpiPanel = _KPIPanel;
/** @deprecated Use KPICard */
export const KpiCard = _KPICard;
export type { KPIItem, KPIPanelProps } from "./kpi-panel";
export { Label } from "./label";
export { Menubar } from "./menubar";
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
} from "./navigation-menu";
import { OTPField as _OTPField } from "./otp-field";
export { OTPField, OTPFieldSeparator } from "./otp-field";
export { OfficeDocPreview, detectDocType } from "./office-doc-preview";
export type { OfficeDocPreviewProps, DocType } from "./office-doc-preview";
export { OrgTree } from "./org-tree";
export type { OrgTreeProps, OrgTreeNode } from "./org-tree";
/** @deprecated Use OTPField */
export const OtpField = _OTPField;
export {
  PageContainer,
  PageHeader,
  PageContent,
  pageContainerVariants,
} from "./page-container";
export type {
  PageContainerProps,
  PageHeaderProps,
  PageContentProps,
} from "./page-container";
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";
export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
} from "./progress";
import { QrCodeDisplay as _QrCodeDisplay } from "./qrcode-display";
export { QrCodeDisplay } from "./qrcode-display";
/** Alias for QrCodeDisplay (capital R variant for consumer compatibility) */
export { QrCodeDisplay as QRCodeDisplay } from "./qrcode-display";
/** @deprecated Use QrCodeDisplay */
export const QrcodeDisplay = _QrCodeDisplay;
export type { QrCodeDisplayProps } from "./qrcode-display";
export { RadioGroup, RadioGroupItem } from "./radio-group";
import { ResizablePanelGroup as _Resizable } from "./resizable";
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable";
/** @deprecated Use ResizablePanelGroup / ResizablePanel / ResizableHandle */
export const Resizable = _Resizable;
export { ScrollArea, ScrollBar } from "./scroll-area";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
export type {
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectValueProps,
} from "./select";
export { SequenceInput } from "./sequence-input";
export type { SequenceInputProps } from "./sequence-input";
export { SequencePreview } from "./sequence-preview";
export type { SequencePreviewProps } from "./sequence-preview";
export { Separator } from "./separator";
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./sidebar";
export { Skeleton } from "./skeleton";
export {
  Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
} from "./slider";
export { SplitPane } from "./split-pane";
export type { SplitPaneProps } from "./split-pane";
export { Stepper, Step } from "./stepper";
export { Switch } from "./switch";
export type { SwitchProps } from "./switch";
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from "./table";
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
} from "./tabs";
export { TagsInput } from "./tags-input";
export { Textarea } from "./textarea";
export type { TextareaProps } from "./textarea";
export {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  timelineDotVariants,
} from "./timeline";
export { Toggle, toggleVariants } from "./toggle";
export { ToggleGroup, ToggleGroupItem } from "./toggle-group";
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
export { TreeSelect } from "./tree-select";
export type { TreeNode, TreeSelectProps } from "./tree-select";
export { TreeView } from "./tree-view";
export type { TreeNode as TreeViewNode, TreeViewProps } from "./tree-view";
export { UserBrowse } from "./user-browse";
export type { User, UserBrowseProps } from "./user-browse";
export { VirtualList } from "./virtual-list";
export type { VirtualListProps } from "./virtual-list";
export { VirtualTable } from "./virtual-table";
export type { ColumnDef, VirtualTableProps } from "./virtual-table";
export { Space } from "./space";
export type { SpaceProps } from "./space";
export { Flex } from "./flex";
export type { FlexProps } from "./flex";
export { Divider } from "./divider";
export type { DividerProps } from "./divider";
export {
  Typography,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Text,
  Paragraph,
  Blockquote,
  InlineCode,
  Lead,
  Large,
  Small,
  Muted,
  List,
} from "./typography";
export type { TextProps, ParagraphProps } from "./typography";
export { Spinner } from "./spinner";
export type { SpinnerProps } from "./spinner";
export { SpreadsheetEditor } from "./spreadsheet-editor";
export type {
  SpreadsheetEditorProps,
  SpreadsheetColumnDef,
  RowData,
  CellCoords,
} from "./spreadsheet-editor";
export { InputSearch } from "./input-search";
export type { InputSearchProps } from "./input-search";
export { InputNumber } from "./input-number";
export type { InputNumberProps } from "./input-number";
export { InputNumberWithUnit } from "./input-number-with-unit";
export type { InputNumberWithUnitProps } from "./input-number-with-unit";
export { DatePicker } from "./date-picker";
export type { DatePickerProps } from "./date-picker";
export { Descriptions, DescriptionsItem } from "./descriptions";
export type { DescriptionsProps, DescriptionItem } from "./descriptions";
export { Popconfirm } from "./popconfirm";
export type { PopconfirmProps } from "./popconfirm";
export { Spin } from "./spin";
export type { SpinProps } from "./spin";
export { Affix } from "./affix";
export type { AffixProps } from "./affix";
export { BackTop } from "./back-top";
export type { BackTopProps } from "./back-top";
export { ConfigProvider, useConfig, ConfigContext } from "./config-provider";
export type { ConfigContextValue, ThemeConfig } from "./config-provider";
// Retained in main barrel — note that it depends on sonner/next-themes (optional peer).
export { ModalProvider } from "./modal-provider";
export {
  Menu,
  MenuItem,
  MenuSubMenu,
  MenuDivider,
  MenuItemGroup,
} from "./menu";
export type {
  MenuProps,
  MenuItemConfig,
  MenuClickInfo,
  MenuMode,
  MenuTheme,
  MenuSize,
  MenuItemProps,
} from "./menu";
export * from "./icons";
export { Cascader } from "./cascader";
export type { CascaderProps, CascaderOption } from "./cascader";
export { Image, ImageGroup } from "./image";
export type { ImageProps } from "./image";
export { Tag, TagGroup } from "./tag";
export type { TagProps, TagColor } from "./tag";
export { Result } from "./result";
export type { ResultProps, ResultStatus } from "./result";
export { Statistic } from "./statistic";
export type { StatisticProps } from "./statistic";
import { QRCode as _QRCode } from "./qrcode";
export { QRCode } from "./qrcode";
/** @deprecated Use QRCode */
export const Qrcode = _QRCode;
export type { QRCodeProps } from "./qrcode";
import { AutoComplete as _AutoComplete } from "./autocomplete";
export { AutoComplete } from "./autocomplete";
/** @deprecated Use AutoComplete */
export const Autocomplete = _AutoComplete;
export type { AutoCompleteProps, AutoCompleteOption } from "./autocomplete";
export { Mentions } from "./mentions";
export type { MentionsProps, MentionOption } from "./mentions";
export { Countdown } from "./countdown";
export type { CountdownProps, CountdownFormat } from "./countdown";

// Promoted from business/
export { Rating } from "./rating";
export { EmptyState } from "./empty-state";

export { SegmentedControl } from "./segmented-control";

export { Tour, type TourStep } from "./tour";

export { Watermark } from "./watermark";

export { Combobox, type ComboboxOption } from "./combobox";

export { Fab, FabSpeedDial } from "./fab";

// New UI components
export { Anchor } from "./anchor";
export type { AnchorItem, AnchorProps } from "./anchor";
export { List as DataList, ListHeader, ListItem, ListFooter } from "./list";
export type { ListProps as DataListProps, ListItemProps } from "./list";
export { Notification } from "./notification";
export type {
  NotificationType as NotificationVariant,
  NotificationProps,
} from "./notification";

// Sonner toast (Toaster)
import { Toaster as _Toaster } from "./sonner";
export { Toaster } from "./sonner";
/** @deprecated Use Toaster */
export const Sonner = _Toaster;

// Grid system
export { Row, Col } from "./grid";
export type { RowProps, ColProps, ColSpan, ResponsiveCol } from "./grid";

export { ChatInput } from "./chat-input";
export type { ChatInputProps } from "./chat-input";
export { ChatMessage } from "./chat-message";
export type { ChatMessageProps } from "./chat-message";
export { MessageProvider } from "./message-provider";
export type { MessageProviderProps } from "./message-provider";
export { MobilePullRefresh } from "./mobile-pull-refresh";
export type { MobilePullRefreshProps } from "./mobile-pull-refresh";
export { MobileSwipeAction } from "./mobile-swipe-action";
export type { MobileSwipeActionProps } from "./mobile-swipe-action";
export { WithPermission } from "./with-permission";
export type { WithPermissionProps } from "./with-permission";

// ─── P0/P1 new components (0.8.0) ────────────────────────────────
export { Icon } from "./icon";
export type { IconProps, IconSize } from "./icon";
export { Transfer } from "./transfer";
export type { TransferItem } from "./transfer";
export { TimePicker, formatTimeInput } from "./time-picker";
export { PictureWall, PictureCard } from "./file-upload";
export type { UploadFile } from "./file-upload";
export { InfiniteScroll } from "./infinite-scroll";
export type { InfiniteScrollProps } from "./infinite-scroll";
export { Masonry } from "./masonry";
export type { MasonryProps, ColumnConfig } from "./masonry";
export { NativeSelect } from "./native-select";
export type {
  NativeSelectProps,
  NativeSelectOption,
  NativeSelectGroup,
} from "./native-select";
export { Message } from "./message";
export type { MessageProps, MessageVariant } from "./message";
export { Direction } from "./direction";
export type { DirectionProps, DirectionValue } from "./direction";

// ─── P0/P1 new UI components ─────────────────────────────────────
export { SplitButton } from "./split-button";
export type { SplitButtonProps } from "./split-button";
export { SignaturePad } from "./signature-pad";
export type { SignaturePadProps, SignaturePadHandle } from "./signature-pad";
export { IconPicker } from "./icon-picker";
export type { IconPickerProps, IconItem } from "./icon-picker";
export { NumberTicker } from "./number-ticker";
export type { NumberTickerProps } from "./number-ticker";
export { KeyboardShortcutDialog } from "./keyboard-shortcut-dialog";
export type {
  KeyboardShortcutDialogProps,
  ShortcutGroup,
  ShortcutItem,
} from "./keyboard-shortcut-dialog";
export { TwoFactorAuth, generateDefaultBackupCodes } from "./two-factor-auth";
export type { TwoFactorAuthProps } from "./two-factor-auth";
export { Scheduler } from "./scheduler";
export type { SchedulerProps, SchedulerEvent, ViewMode } from "./scheduler";
export { FileManager } from "./file-manager";
export type { FileManagerProps, FileNode } from "./file-manager";
export { GlobalSearch } from "./global-search";
export type { GlobalSearchProps, SearchResult } from "./global-search";
export { FeedbackSurvey } from "./feedback-survey";
export type { FeedbackSurveyProps } from "./feedback-survey";
export { KnowledgeBase } from "./knowledge-base";
export type {
  KnowledgeBaseProps,
  WikiArticle,
  WikiCategory,
} from "./knowledge-base";
export { HelpDesk } from "./help-desk";
export type {
  HelpDeskProps,
  Ticket,
  TicketStatus,
  TicketPriority,
  TicketReply,
} from "./help-desk";

// ─── Enterprise UI 底座补齐 — P0/P1/P2 组件 ───────────────────────
export { PasswordInput, PasswordStrengthMeter } from "./password-input";
export type { PasswordInputProps } from "./password-input";
export { PhoneInput } from "./phone-input";
export type { PhoneInputProps, CountryOption } from "./phone-input";
export { MaskedInput } from "./masked-input";
export type { MaskedInputProps } from "./masked-input";
export { DateRangePicker } from "./date-range-picker";
export type { DateRangePickerProps } from "./date-range-picker";
export { MonthPicker } from "./month-picker";
export type { MonthPickerProps } from "./month-picker";
export { YearPicker } from "./year-picker";
export type { YearPickerProps } from "./year-picker";
export { QuarterPicker } from "./quarter-picker";
export type { QuarterPickerProps, QuarterValue } from "./quarter-picker";
export { RangeSlider } from "./range-slider";
export type { RangeSliderProps } from "./range-slider";
export { CountdownButton } from "./countdown-button";
export type { CountdownButtonProps } from "./countdown-button";
export { AmountInput } from "./amount-input";
export type { AmountInputProps } from "./amount-input";
export { SortableList } from "./sortable-list";
export type { SortableListProps } from "./sortable-list";
export { CopyButton } from "./copy-button";
export type { CopyButtonProps } from "./copy-button";
export { EditableTable } from "./editable-table";
export type { EditableTableProps, EditableColumn } from "./editable-table";
export { EditableDescriptions } from "./editable-descriptions";
export type {
  EditableDescriptionsProps,
  EditableDescriptionItem,
} from "./editable-descriptions";
export { FilterChips } from "./filter-chips";
export type { FilterChipsProps, FilterChip } from "./filter-chips";
export { SavedViewSwitcher } from "./saved-view";
export type { SavedViewProps, SavedView } from "./saved-view";
export { SkeletonTable } from "./skeleton-table";
export type { SkeletonTableProps } from "./skeleton-table";
export { SkeletonForm } from "./skeleton-form";
export type { SkeletonFormProps } from "./skeleton-form";
export { CodeDiffViewer } from "./diff-viewer-code";
export type { CodeDiffViewerProps } from "./diff-viewer-code";
export { MarkdownViewer } from "./markdown-viewer";
export type { MarkdownViewerProps } from "./markdown-viewer";
export { RichTextDisplay } from "./rich-text-display";
export type { RichTextDisplayProps } from "./rich-text-display";
export { LazyImage } from "./lazy-image";
export type { LazyImageProps } from "./lazy-image";
export { KeepAlive, useKeepAlive } from "./keep-alive";
export type { KeepAliveProps } from "./keep-alive";
export { NotificationBadge } from "./notification-badge";
export type { NotificationBadgeProps } from "./notification-badge";
export { NotificationDropdown } from "./notification-dropdown";
export type {
  NotificationDropdownProps,
  NotificationItem,
} from "./notification-dropdown";
export { GlobalLoading } from "./global-loading";
export type { GlobalLoadingProps } from "./global-loading";
export { ErrorBoundaryUI } from "./error-boundary-ui";
export type { ErrorBoundaryUIProps } from "./error-boundary-ui";
export { I18nProvider, useI18n } from "./i18n-provider";
export type { I18nProviderProps } from "./i18n-provider";
export { RTLProvider, useRTL } from "./rtl-provider";
export type { RTLProviderProps } from "./rtl-provider";
export {
  KeyboardShortcutsManager,
  useKeyboardShortcuts,
} from "./keyboard-shortcuts-manager";
export type {
  KeyboardShortcutsManagerProps,
  ShortcutDef,
} from "./keyboard-shortcuts-manager";
export { JSONViewerUI } from "./json-viewer-ui";
export type { JSONViewerUIProps } from "./json-viewer-ui";
export { Heatmap } from "./heatmap";
export type { HeatmapProps, HeatmapPoint } from "./heatmap";
export { SegmentedFilter } from "./segmented-filter";
export type {
  SegmentedFilterProps,
  SegmentFilterOption,
} from "./segmented-filter";
export { StatGrid } from "./stat-grid";
export type { StatGridProps, StatItem } from "./stat-grid";
export { RowContextMenu } from "./row-context-menu";
export type { RowContextMenuProps, RowMenuItem } from "./row-context-menu";
export { ProgressiveImage } from "./progressive-image";
export type { ProgressiveImageProps } from "./progressive-image";
export { PasswordPolicyValidator } from "./password-policy-validator";
export type {
  PasswordPolicyValidatorProps,
  PolicyRule,
} from "./password-policy-validator";

// Theme provider (re-exports next-themes with typed context)
export { ThemeProvider, useTheme } from "./theme-provider";
export type {
  Theme,
  ThemeContextValue,
  ThemeProviderProps,
} from "./theme-provider";

// P3-8: Top-level convenience re-exports of lib utilities so consumers can
// import message / formatCurrency from the main entry without going to /business.
// / 顶层便捷导出：消费方可直接从主入口引入 message / format* 工具函数
export {
  message,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatRelativeTime,
} from "../../lib";
export type { MessageOptions, MessageType } from "../../lib";
