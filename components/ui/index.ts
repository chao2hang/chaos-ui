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
export { KPIPanel, KPICard } from "./kpi-panel";
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
export { OTPField, OTPFieldSeparator } from "./otp-field";
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
export { QrCodeDisplay } from "./qrcode-display";
export type { QrCodeDisplayProps } from "./qrcode-display";
export { RadioGroup, RadioGroupItem } from "./radio-group";
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable";
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
export { InputSearch } from "./input-search";
export type { InputSearchProps } from "./input-search";
export { InputNumber } from "./input-number";
export type { InputNumberProps } from "./input-number";
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
// MessageProvider 移至 ./next 入口：它依赖 Toaster(sonner) → next-themes，
// 而 next-themes 是 optional peer，留在主入口会让非 Next 项目 import 即崩。
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
export { QRCode } from "./qrcode";
export type { QRCodeProps } from "./qrcode";
export { AutoComplete } from "./autocomplete";
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
