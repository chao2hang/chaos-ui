"use client";

import * as React from "react";
import {
  HomeIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MenuIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  LinkIcon,
  PlusIcon,
  MinusIcon,
  XIcon,
  CheckIcon,
  EditIcon,
  Trash2Icon,
  CopyIcon,
  DownloadIcon,
  UploadIcon,
  ShareIcon,
  RefreshCcwIcon,
  SearchIcon,
  FilterIcon,
  SettingsIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XCircleIcon,
  HelpCircleIcon,
  ClockIcon,
  TimerIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  ImagePlusIcon,
  ArchiveIcon,
  BarChart3Icon,
  PieChartIcon,
  LineChartIcon,
  TableIcon,
  DatabaseIcon,
  LayersIcon,
  UserIcon,
  UsersIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserCheckIcon,
  ShieldIcon,
  LockIcon,
  UnlockIcon,
  MailIcon,
  MessageSquareIcon,
  PhoneIcon,
  BellIcon,
  SendIcon,
  AtSignIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  WalletIcon,
  TagIcon,
  DollarSignIcon,
  PackageIcon,
  TruckIcon,
  BookOpenIcon,
  PenIcon,
  StampIcon,
  BookmarkIcon,
  FlagIcon,
  StarIcon,
  HeartIcon,
  SlidersIcon,
  MonitorIcon,
  SmartphoneIcon,
  PrinterIcon,
  WifiIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Represents a single icon entry in the picker.
 */
interface IconItem {
  /** Icon name (kebab-case or PascalCase) */
  name: string;
  /** React icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Category for grouping */
  category?: string;
  /** Search keywords */
  keywords?: string[];
}

/**
 * Props for the IconPicker component.
 */
interface IconPickerProps {
  /** Currently selected icon name */
  value?: string;
  /** Selection change handler */
  onChange?: (iconName: string) => void;
  /** Dialog open state (controlled) */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Custom icon set (defaults to a curated subset of lucide-react) */
  icons?: IconItem[];
  /** Trigger element (defaults to an icon button) */
  trigger?: React.ReactNode;
  /** Dialog title */
  title?: string;
  /** Search placeholder */
  placeholder?: string;
  /** Maximum recent icons to track */
  maxRecent?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
}

// ---------------------------------------------------------------------------
// Default icon set (~80 icons organised by category)
// ---------------------------------------------------------------------------

const defaultIcons: IconItem[] = [
  // Navigation
  { name: "Home", icon: HomeIcon, category: "Navigation", keywords: ["house", "main"] },
  { name: "ArrowLeft", icon: ArrowLeftIcon, category: "Navigation", keywords: ["back", "previous"] },
  { name: "ArrowRight", icon: ArrowRightIcon, category: "Navigation", keywords: ["forward", "next"] },
  { name: "ChevronRight", icon: ChevronRightIcon, category: "Navigation", keywords: ["caret", "expand"] },
  { name: "ChevronLeft", icon: ChevronLeftIcon, category: "Navigation", keywords: ["caret", "collapse"] },
  { name: "ChevronDown", icon: ChevronDownIcon, category: "Navigation", keywords: ["caret", "expand", "dropdown"] },
  { name: "ChevronUp", icon: ChevronUpIcon, category: "Navigation", keywords: ["caret", "collapse"] },
  { name: "Menu", icon: MenuIcon, category: "Navigation", keywords: ["hamburger", "nav"] },
  { name: "MoreHorizontal", icon: MoreHorizontalIcon, category: "Navigation", keywords: ["ellipsis", "dots", "overflow"] },
  { name: "MoreVertical", icon: MoreVerticalIcon, category: "Navigation", keywords: ["ellipsis", "dots", "overflow", "kebab"] },
  { name: "ExternalLink", icon: ExternalLinkIcon, category: "Navigation", keywords: ["outbound", "open", "new tab"] },
  { name: "Link", icon: LinkIcon, category: "Navigation", keywords: ["chain", "url", "hyperlink"] },

  // Action
  { name: "Plus", icon: PlusIcon, category: "Action", keywords: ["add", "create", "new"] },
  { name: "Minus", icon: MinusIcon, category: "Action", keywords: ["remove", "subtract"] },
  { name: "X", icon: XIcon, category: "Action", keywords: ["close", "cancel", "delete", "cross"] },
  { name: "Check", icon: CheckIcon, category: "Action", keywords: ["confirm", "done", "tick", "approve"] },
  { name: "Edit", icon: EditIcon, category: "Action", keywords: ["pencil", "modify", "update"] },
  { name: "Trash2", icon: Trash2Icon, category: "Action", keywords: ["delete", "remove", "bin"] },
  { name: "Copy", icon: CopyIcon, category: "Action", keywords: ["duplicate", "clipboard"] },
  { name: "Download", icon: DownloadIcon, category: "Action", keywords: ["save", "export"] },
  { name: "Upload", icon: UploadIcon, category: "Action", keywords: ["import", "send"] },
  { name: "Share", icon: ShareIcon, category: "Action", keywords: ["forward", "distribute"] },
  { name: "RefreshCcw", icon: RefreshCcwIcon, category: "Action", keywords: ["reload", "retry", "sync"] },
  { name: "Search", icon: SearchIcon, category: "Action", keywords: ["find", "lookup", "magnifying"] },
  { name: "Filter", icon: FilterIcon, category: "Action", keywords: ["funnel", "sort"] },
  { name: "Settings", icon: SettingsIcon, category: "Action", keywords: ["gear", "cog", "preferences", "config"] },

  // Status
  { name: "AlertCircle", icon: AlertCircleIcon, category: "Status", keywords: ["warning", "error", "danger"] },
  { name: "AlertTriangle", icon: AlertTriangleIcon, category: "Status", keywords: ["warning", "caution"] },
  { name: "CheckCircle", icon: CheckCircleIcon, category: "Status", keywords: ["success", "complete", "done"] },
  { name: "Info", icon: InfoIcon, category: "Status", keywords: ["information", "help", "about"] },
  { name: "XCircle", icon: XCircleIcon, category: "Status", keywords: ["error", "fail", "cancel"] },
  { name: "HelpCircle", icon: HelpCircleIcon, category: "Status", keywords: ["question", "support", "faq"] },
  { name: "Clock", icon: ClockIcon, category: "Status", keywords: ["time", "schedule", "pending"] },
  { name: "Timer", icon: TimerIcon, category: "Status", keywords: ["stopwatch", "countdown", "duration"] },

  // File
  { name: "File", icon: FileIcon, category: "File", keywords: ["document", "page"] },
  { name: "FileText", icon: FileTextIcon, category: "File", keywords: ["document", "text", "report"] },
  { name: "Folder", icon: FolderIcon, category: "File", keywords: ["directory", "collection"] },
  { name: "FolderOpen", icon: FolderOpenIcon, category: "File", keywords: ["directory", "browse"] },
  { name: "ImagePlus", icon: ImagePlusIcon, category: "File", keywords: ["photo", "picture", "add image"] },
  { name: "Archive", icon: ArchiveIcon, category: "File", keywords: ["zip", "compress", "storage"] },

  // Data
  { name: "BarChart3", icon: BarChart3Icon, category: "Data", keywords: ["graph", "analytics", "statistics"] },
  { name: "PieChart", icon: PieChartIcon, category: "Data", keywords: ["graph", "analytics", "proportion"] },
  { name: "LineChart", icon: LineChartIcon, category: "Data", keywords: ["graph", "analytics", "trend"] },
  { name: "Table", icon: TableIcon, category: "Data", keywords: ["grid", "spreadsheet", "rows"] },
  { name: "Database", icon: DatabaseIcon, category: "Data", keywords: ["storage", "server", "data"] },
  { name: "Layers", icon: LayersIcon, category: "Data", keywords: ["stack", "overlap", "hierarchy"] },

  // User
  { name: "User", icon: UserIcon, category: "User", keywords: ["person", "account", "profile"] },
  { name: "Users", icon: UsersIcon, category: "User", keywords: ["people", "group", "team"] },
  { name: "UserPlus", icon: UserPlusIcon, category: "User", keywords: ["add person", "invite"] },
  { name: "UserMinus", icon: UserMinusIcon, category: "User", keywords: ["remove person"] },
  { name: "UserCheck", icon: UserCheckIcon, category: "User", keywords: ["verified", "approved"] },
  { name: "Shield", icon: ShieldIcon, category: "User", keywords: ["security", "protect"] },
  { name: "Lock", icon: LockIcon, category: "User", keywords: ["secure", "private", "password"] },
  { name: "Unlock", icon: UnlockIcon, category: "User", keywords: ["open", "public", "unsecure"] },

  // Communication
  { name: "Mail", icon: MailIcon, category: "Communication", keywords: ["email", "envelope", "letter"] },
  { name: "MessageSquare", icon: MessageSquareIcon, category: "Communication", keywords: ["chat", "comment", "bubble"] },
  { name: "Phone", icon: PhoneIcon, category: "Communication", keywords: ["call", "telephone", "contact"] },
  { name: "Bell", icon: BellIcon, category: "Communication", keywords: ["notification", "alert", "ring"] },
  { name: "Send", icon: SendIcon, category: "Communication", keywords: ["message", "submit", "paper plane"] },
  { name: "AtSign", icon: AtSignIcon, category: "Communication", keywords: ["mention", "email", "address"] },

  // Commerce
  { name: "ShoppingCart", icon: ShoppingCartIcon, category: "Commerce", keywords: ["cart", "buy", "purchase"] },
  { name: "CreditCard", icon: CreditCardIcon, category: "Commerce", keywords: ["payment", "card", "billing"] },
  { name: "Wallet", icon: WalletIcon, category: "Commerce", keywords: ["money", "purse", "finance"] },
  { name: "Tag", icon: TagIcon, category: "Commerce", keywords: ["label", "price", "category"] },
  { name: "DollarSign", icon: DollarSignIcon, category: "Commerce", keywords: ["money", "currency", "price"] },
  { name: "Package", icon: PackageIcon, category: "Commerce", keywords: ["box", "shipping", "product"] },
  { name: "Truck", icon: TruckIcon, category: "Commerce", keywords: ["delivery", "shipping", "transport"] },

  // Content
  { name: "BookOpen", icon: BookOpenIcon, category: "Content", keywords: ["read", "documentation", "guide"] },
  { name: "Pen", icon: PenIcon, category: "Content", keywords: ["write", "compose", "draft"] },
  { name: "Stamp", icon: StampIcon, category: "Content", keywords: ["seal", "approve", "official"] },
  { name: "Bookmark", icon: BookmarkIcon, category: "Content", keywords: ["save", "favorite", "mark"] },
  { name: "Flag", icon: FlagIcon, category: "Content", keywords: ["report", "mark", "important"] },
  { name: "Star", icon: StarIcon, category: "Content", keywords: ["favorite", "rating", "review"] },
  { name: "Heart", icon: HeartIcon, category: "Content", keywords: ["like", "love", "favorite"] },

  // System
  { name: "Sliders", icon: SlidersIcon, category: "System", keywords: ["adjust", "controls", "equalizer"] },
  { name: "Monitor", icon: MonitorIcon, category: "System", keywords: ["screen", "desktop", "display"] },
  { name: "Smartphone", icon: SmartphoneIcon, category: "System", keywords: ["mobile", "phone", "device"] },
  { name: "Printer", icon: PrinterIcon, category: "System", keywords: ["print", "output"] },
  { name: "Wifi", icon: WifiIcon, category: "System", keywords: ["network", "wireless", "internet"] },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Group an array of IconItem entries by their `category` field. */
function groupByCategory(icons: IconItem[]): Map<string, IconItem[]> {
  const groups = new Map<string, IconItem[]>();
  for (const item of icons) {
    const cat = item.category ?? "Other";
    const list = groups.get(cat);
    if (list) {
      list.push(item);
    } else {
      groups.set(cat, [item]);
    }
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * @component IconPicker
 * @category ui
 * @since 1.0.0
 * @description A searchable icon selection dialog with category grouping and
 * recent selections. Renders a trigger button that opens a Command-powered
 * dialog where icons can be filtered, browsed by category, and selected.
 * @keywords icon, picker, dialog, search, lucide, selector
 * @example
 * <IconPicker value={icon} onChange={setIcon} />
 */
function IconPicker({
  value,
  onChange,
  open: controlledOpen,
  onOpenChange,
  icons = defaultIcons,
  trigger,
  title = "Select Icon",
  placeholder = "Search icons...",
  maxRecent = 8,
  disabled = false,
  className,
}: IconPickerProps) {
  // ---- internal uncontrolled state ----
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const [recent, setRecent] = React.useState<string[]>([]);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  // ---- icon lookup map ----
  const iconMap = React.useMemo(() => {
    const map = new Map<string, IconItem>();
    for (const item of icons) {
      map.set(item.name, item);
    }
    return map;
  }, [icons]);

  // ---- handlers ----
  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (disabled && nextOpen) return;
      onOpenChange?.(nextOpen);
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
    },
    [disabled, isControlled, onOpenChange],
  );

  const handleSelect = React.useCallback(
    (iconName: string) => {
      onChange?.(iconName);
      handleOpenChange(false);
      setRecent((prev) => {
        const filtered = prev.filter((n) => n !== iconName);
        return [iconName, ...filtered].slice(0, maxRecent);
      });
    },
    [onChange, handleOpenChange, maxRecent],
  );

  // ---- grouped icons ----
  const groupedIcons = React.useMemo(() => groupByCategory(icons), [icons]);

  const recentIcons = React.useMemo(() => {
    return recent
      .map((name) => iconMap.get(name))
      .filter((item): item is IconItem => item !== undefined);
  }, [recent, iconMap]);

  // ---- custom cmdk filter that also checks keywords ----
  const filter = React.useCallback(
    (val: string, search: string, keywords?: string[]) => {
      const lower = search.toLowerCase();
      if (val.toLowerCase().includes(lower)) return 1;
      if (keywords?.some((kw) => kw.toLowerCase().includes(lower))) return 1;
      return 0;
    },
    [],
  );

  // ---- selected icon for trigger display ----
  const selectedItem = value ? iconMap.get(value) : undefined;

  return (
    <div data-slot="icon-picker" className={cn("inline-flex", className)}>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {trigger !== undefined ? (
          <DialogTrigger render={trigger as React.ReactElement} />
        ) : (
          <DialogTrigger
            render={
              <Button variant="outline" disabled={disabled} className="gap-2" />
            }
          >
            {selectedItem ? (
              <selectedItem.icon className="size-4 shrink-0" />
            ) : (
              <SearchIcon className="size-4 shrink-0" />
            )}
            {selectedItem ? selectedItem.name : "Select Icon"}
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-lg" showCloseButton>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <Command filter={filter} loop>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No icons found.</CommandEmpty>

              {recentIcons.length > 0 && (
                <CommandGroup heading="Recent">
                  {recentIcons.map((item) => (
                    <CommandItem
                      key={`recent-${item.name}`}
                      value={`recent:${item.name}`}
                      {...(item.keywords ? { keywords: item.keywords } : {})}
                      {...(item.name === value ? { "data-checked": "true" } : {})}
                      onSelect={() => handleSelect(item.name)}
                    >
                      <item.icon className="size-5 shrink-0" />
                      <span>{item.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {Array.from(groupedIcons.entries()).map(
                ([category, items]) => (
                  <CommandGroup key={category} heading={category}>
                    {items.map((item) => (
                      <CommandItem
                        key={item.name}
                        value={item.name}
                        {...(item.keywords ? { keywords: item.keywords } : {})}
                        {...(item.name === value ? { "data-checked": "true" } : {})}
                        onSelect={() => handleSelect(item.name)}
                      >
                        <item.icon className="size-5 shrink-0" />
                        <span>{item.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ),
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { IconPicker, defaultIcons };
export type { IconItem, IconPickerProps };
