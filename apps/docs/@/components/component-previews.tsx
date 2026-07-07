"use client";

/**
 * Hand-authored demos for compound / headless components that don't render
 * anything visible on their own (e.g. `<Dialog />` with no children renders
 * nothing). Keyed by the component `name` from `components.meta.ts`.
 *
 * Each export is a self-contained JSX fragment — no props, no external state.
 * Keep demos small and dependency-light so they can be code-split per page.
 */

import * as React from "react";
import { RocketIcon, SettingsIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { KPIPanel } from "@/components/ui/kpi-panel";
import { Menu } from "@/components/ui/menu";
import { Menubar } from "@/components/ui/menubar";
import { Popconfirm } from "@/components/ui/popconfirm";
import {
  MessageProvider,
  MessageContext,
} from "@/components/ui/message-provider";
import { ModalProvider, ModalContext } from "@/components/ui/modal-provider";
import { KeyboardShortcutDialog } from "@/components/ui/keyboard-shortcut-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Result } from "@/components/ui/result";

/* Business components ----------------------------------------------------- */
import {
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  FilterIcon,
  StarIcon,
} from "lucide-react";
import { ProfileHeader, ProfileForm } from "@/components/business/profile";
import { StatCard } from "@/components/business/stat-card";
import { AuditLog } from "@/components/business/audit-log";
import { CampaignCard } from "@/components/business/campaign-card";
import { AvatarGroup } from "@/components/business/avatar-group";
import { ActivityFeed } from "@/components/business/activity-feed";
import { AnimatedNumber } from "@/components/business/animated-number";
import { Banner } from "@/components/business/banner";
import { AnnouncementBanner } from "@/components/business/announcement-banner";
import { BarcodeDisplay } from "@/components/business/barcode-display";
import { Chip } from "@/components/business/chip";
import { EmptyState } from "@/components/business/empty-state";
import { Rating } from "@/components/business/rating";
import { BillStatusBar } from "@/components/business/bill-status-bar";
import { BizStatusTag } from "@/components/business/biz-status-tag";

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                             */
/* -------------------------------------------------------------------------- */

const stack = "flex flex-wrap items-center justify-center gap-3";

/* -------------------------------------------------------------------------- */
/*  Per-component demos                                                       */
/* -------------------------------------------------------------------------- */

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            打开对话框
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>提示</DialogTitle>
          <DialogDescription>
            这是一个 Dialog 预览示例,可以在这里放置表单或确认信息。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="ghost" size="sm">
                取消
              </Button>
            }
          />
          <DialogClose render={<Button size="sm">确认</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" size="sm">
            删除
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除?</AlertDialogTitle>
          <AlertDialogDescription>
            此操作不可撤销,将永久删除该项。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction>确认删除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm">
            打开气泡
          </Button>
        }
      />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>气泡内容</PopoverTitle>
        </PopoverHeader>
        <p className="text-muted-foreground text-sm">
          Popover 用于承载轻量的临时信息或快捷操作。
        </p>
      </PopoverContent>
    </Popover>
  );
}

function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <Button variant="link" size="sm">
            @chaos-ui
          </Button>
        }
      />
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium">Chaos UI</p>
            <p className="text-muted-foreground text-xs">
              一个基于 Base UI 的 React 组件库。
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="outline" size="sm">
              悬停查看
            </Button>
          }
        />
        <TooltipContent>这是一个提示信息</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[360px]">
      <TabsList>
        <TabsTrigger value="account">账户</TabsTrigger>
        <TabsTrigger value="password">密码</TabsTrigger>
      </TabsList>
      <TabsContent
        value="account"
        className="text-muted-foreground p-3 text-sm"
      >
        账户设置项。
      </TabsContent>
      <TabsContent
        value="password"
        className="text-muted-foreground p-3 text-sm"
      >
        密码设置项。
      </TabsContent>
    </Tabs>
  );
}

function AccordionDemo() {
  return (
    <Accordion className="w-[360px]">
      <AccordionItem value="a">
        <AccordionTrigger>什么是 Chaos UI?</AccordionTrigger>
        <AccordionContent>
          基于 Base UI 与 Tailwind 的企业级 React 组件库。
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>是否支持 SSR?</AccordionTrigger>
        <AccordionContent>支持,所有组件均兼容服务端渲染。</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            打开抽屉
          </Button>
        }
      />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>侧边面板</SheetTitle>
          <SheetDescription>
            Sheet 从侧边滑出,适合放置导航或表单。
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          打开 Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>底部抽屉</DrawerTitle>
          <DrawerDescription>
            Drawer 从底部滑出,常用于移动端操作。
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}

function CollapsibleDemo() {
  const [open, setOpen] = React.useState(true);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-[360px]">
      <div className="flex items-center gap-2">
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="sm">
              {open ? "收起" : "展开"}
            </Button>
          }
        />
        <span className="text-muted-foreground text-sm">可折叠内容</span>
      </div>
      <CollapsibleContent className="text-muted-foreground mt-2 text-sm">
        这里是折叠后的内容区域。
      </CollapsibleContent>
    </Collapsible>
  );
}

function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm">
            菜单
          </Button>
        }
      />
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>账户</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SettingsIcon className="size-4" /> 设置
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserIcon className="size-4" /> 个人资料
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={
          <div className="border-border text-muted-foreground flex h-24 w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
            右键点击此区域
          </div>
        }
      />
      <ContextMenuContent>
        <ContextMenuItem>复制</ContextMenuItem>
        <ContextMenuItem>粘贴</ContextMenuItem>
        <ContextMenuItem>删除</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>组件</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[260px] gap-2 p-2">
              <li>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  通用
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  反馈
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function CommandDemo() {
  return (
    <Command className="border-border w-[360px] rounded-md border">
      <CommandInput placeholder="搜索组件…" />
      <CommandList>
        <CommandEmpty>未找到结果。</CommandEmpty>
        <CommandGroup heading="通用">
          <CommandItem>
            <RocketIcon className="size-4" /> Button
          </CommandItem>
          <CommandItem>
            <RocketIcon className="size-4" /> Input
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="请选择" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">选项 A</SelectItem>
        <SelectItem value="b">选项 B</SelectItem>
        <SelectItem value="c">选项 C</SelectItem>
      </SelectContent>
    </Select>
  );
}

function AvatarDemo() {
  return (
    <div className={stack}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
    </div>
  );
}

function SwitchDemo() {
  return (
    <div className={stack}>
      <Switch defaultChecked />
      <Switch />
    </div>
  );
}

function CheckboxDemo() {
  return (
    <div className={stack}>
      <Label className="flex items-center gap-2">
        <Checkbox defaultChecked /> 已同意
      </Label>
      <Label className="flex items-center gap-2">
        <Checkbox /> 未选中
      </Label>
    </div>
  );
}

function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="a" className="gap-2">
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="a" /> 选项 A
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="b" /> 选项 B
      </Label>
    </RadioGroup>
  );
}

function BadgeDemo() {
  return (
    <div className={stack}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}

function ButtonDemo() {
  return (
    <div className={stack}>
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Business component demos                                                  */
/*                                                                            */
/*  Business components need concrete data props (users, rows, …) to render.  */
/*  Below are minimal, hand-curated fixtures that exercise the happy path.    */
/* -------------------------------------------------------------------------- */

function KPIPanelDemo() {
  return (
    <div className="w-full max-w-3xl">
      <KPIPanel
        columns={4}
        items={[
          {
            label: "Total Revenue",
            value: "$45,231.89",
            change: 20.1,
            changeLabel: "from last month",
            icon: <TrendingUpIcon className="size-4" />,
            trend: "up",
          },
          {
            label: "Active Users",
            value: "12,450",
            change: 8.4,
            changeLabel: "from last week",
            icon: <UsersIcon className="size-4" />,
            trend: "up",
          },
          {
            label: "Conversion Rate",
            value: "4.8%",
            change: -1.2,
            changeLabel: "from last month",
            icon: <FilterIcon className="size-4" />,
            trend: "down",
          },
          {
            label: "Customer Satisfaction",
            value: "98%",
            change: 2.1,
            changeLabel: "from last quarter",
            icon: <StarIcon className="size-4" />,
            trend: "up",
          },
        ]}
      />
    </div>
  );
}

function MenuDemo() {
  return (
    <div className="w-full max-w-sm rounded-lg border p-2">
      <Menu
        mode="inline"
        selectedKeys={["dashboard"]}
        items={[
          { key: "dashboard", label: "Dashboard", shortcut: "⌘D" },
          {
            key: "analytics",
            label: "Analytics",
            children: [
              { key: "overview", label: "Overview", shortcut: "⌘1" },
              { key: "reports", label: "Reports", shortcut: "⌘2" },
            ],
          },
          { key: "settings", label: "Settings" },
          {
            key: "danger",
            label: "Delete workspace",
            danger: true,
            shortcut: "⌘⌫",
          },
          { key: "disabled", label: "Archived", disabled: true },
        ]}
      />
    </div>
  );
}

function ProfileDemo() {
  return (
    <div className="w-full max-w-2xl">
      <ProfileHeader
        user={{
          name: "李雷",
          email: "li.lei@chaos.com",
          role: "高级前端工程师",
          department: "设计系统组",
          bio: "设计系统构建者,喜欢用代码创造美好的用户体验。",
          location: "上海 · 中国",
        }}
        stats={[
          { label: "项目", value: 24 },
          { label: "关注者", value: 1234 },
          { label: "获赞", value: 5678 },
          { label: "贡献", value: 89 },
        ]}
        actions={<Button>关注</Button>}
      />
    </div>
  );
}

function StatCardDemo() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
      <StatCard
        title="总销售额"
        value="¥125,430"
        icon={TrendingUpIcon}
        changeType="positive"
        change="+12.5%"
      />
      <StatCard
        title="退款"
        value="¥3,200"
        icon={TrendingDownIcon}
        changeType="negative"
        change="-5.2%"
      />
      <StatCard
        title="客户"
        value="1,234"
        icon={UsersIcon}
        changeType="neutral"
      />
    </div>
  );
}

function AuditLogDemo() {
  const entries = [
    {
      id: "1",
      actor: { name: "Alice" },
      action: "create",
      target: "Order #1234",
      timestamp: Date.now() - 3600_000,
      changes: [{ field: "amount", before: "0", after: "1000" }],
    },
    {
      id: "2",
      actor: { name: "Bob" },
      action: "update",
      target: "Order #1234",
      timestamp: Date.now() - 1800_000,
      changes: [{ field: "status", before: "pending", after: "approved" }],
    },
    {
      id: "3",
      actor: { name: "Charlie" },
      action: "delete",
      target: "Old Order #567",
      timestamp: Date.now() - 600_000,
    },
  ];
  return (
    <div className="w-full max-w-xl">
      <AuditLog entries={entries} />
    </div>
  );
}

function CampaignCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <CampaignCard
        name="春季新品上线"
        status="active"
        startDate="2026-03-01"
        endDate="2026-03-31"
        budget={42000}
        location="华东"
        reachCount={124000}
      />
    </div>
  );
}

function AvatarGroupDemo() {
  const users = [
    { name: "Lina Chen" },
    { name: "Marco Silva" },
    { name: "Avery Stone" },
    { name: "Noah Patel" },
    { name: "Mia Wong" },
    { name: "Iris Kim" },
  ];
  return (
    <div className={stack}>
      <AvatarGroup users={users} />
      <AvatarGroup users={users.slice(0, 3)} showOverflow={false} size="lg" />
    </div>
  );
}

function ActivityFeedDemo() {
  const items = [
    {
      id: "1",
      user: "John Doe",
      action: "创建了",
      target: "网站改版项目",
      time: "2 小时前",
      avatarFallback: "JD",
      variant: "success" as const,
    },
    {
      id: "2",
      user: "Jane Smith",
      action: "评论了",
      target: "Bug #123",
      time: "3 小时前",
      avatarFallback: "JS",
      variant: "info" as const,
    },
    {
      id: "3",
      user: "Bob Wilson",
      action: "完成了任务",
      target: "更新文档",
      time: "昨天",
      avatarFallback: "BW",
      variant: "default" as const,
    },
  ];
  return (
    <div className="w-full max-w-md">
      <ActivityFeed items={items} />
    </div>
  );
}

function AnimatedNumberDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <AnimatedNumber value={1234567} duration={2000} prefix="¥" />
      <AnimatedNumber value={42.7} decimals={1} suffix="%" duration={1500} />
      <AnimatedNumber value={9805} duration={1800} />
    </div>
  );
}

function BannerDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Banner
        variant="info"
        title="通知"
        description="这是一个信息提示横幅。"
      />
      <Banner
        variant="warning"
        title="警告"
        description="此操作可能会影响线上数据,请谨慎。"
        closable={false}
      />
    </div>
  );
}

function AnnouncementBannerDemo() {
  return (
    <div className="w-full max-w-xl">
      <AnnouncementBanner message="🎉 Chaos UI v1.0 已发布,欢迎升级体验。" />
    </div>
  );
}

function BarcodeDisplayDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <BarcodeDisplay value="123456789012" />
      <BarcodeDisplay value="5901234123457" format="EAN13" />
    </div>
  );
}

function ChipDemo() {
  return (
    <div className={stack}>
      <Chip>默认</Chip>
      <Chip variant="primary">主要</Chip>
      <Chip variant="success">成功</Chip>
      <Chip variant="warning">警告</Chip>
      <Chip variant="destructive">错误</Chip>
      <Chip icon={<FilterIcon className="size-3" />} removable>
        筛选条件
      </Chip>
    </div>
  );
}

function EmptyStateDemo() {
  return (
    <div className="w-full max-w-md">
      <EmptyState variant="default" />
    </div>
  );
}

function RatingDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating defaultValue={4} />
      <Rating defaultValue={3.5} allowHalf size="lg" />
      <Rating defaultValue={2} readonly size="sm" />
    </div>
  );
}

function BillStatusBarDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <BillStatusBar currentStatus="pending" />
      <BillStatusBar currentStatus="approved" />
      <BillStatusBar currentStatus="rejected" />
    </div>
  );
}

function BizStatusTagDemo() {
  return (
    <div className={stack}>
      <BizStatusTag status="active" />
      <BizStatusTag status="pending" />
      <BizStatusTag status="processing" />
      <BizStatusTag status="completed" />
      <BizStatusTag status="error" />
      <BizStatusTag status="cancelled" />
    </div>
  );
}

function ResultDemo() {
  return (
    <Result
      status="success"
      title="提交成功"
      subtitle="你的配置已保存，可以继续下一步。"
      extra={<Button size="sm">继续</Button>}
    />
  );
}

function ProfileFormDemo() {
  return (
    <div className="bg-card w-full max-w-md rounded-md border p-6">
      <h3 className="mb-4 text-base font-semibold">编辑资料</h3>
      <ProfileForm
        fields={[
          { name: "name", label: "姓名", defaultValue: "李雷" },
          {
            name: "email",
            label: "邮箱",
            defaultValue: "li.lei@chaos.com",
            type: "email",
          },
          { name: "bio", label: "简介", defaultValue: "设计系统构建者" },
        ]}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Compound / headless component demos                                        */
/* -------------------------------------------------------------------------- */

function MenubarDemo() {
  return (
    <Menubar>
      <div className="flex items-center gap-1 px-2">
        <span className="bg-accent cursor-default rounded px-3 py-1 text-sm font-medium">
          File
        </span>
        <span className="text-muted-foreground hover:text-foreground cursor-pointer px-3 py-1 text-sm">
          Edit
        </span>
        <span className="text-muted-foreground hover:text-foreground cursor-pointer px-3 py-1 text-sm">
          View
        </span>
        <span className="text-muted-foreground hover:text-foreground cursor-pointer px-3 py-1 text-sm">
          Help
        </span>
      </div>
    </Menubar>
  );
}

function PopconfirmDemo() {
  return (
    <div className="flex items-center gap-4">
      <Popconfirm title="确认删除？" description="此操作不可撤销。">
        <Button variant="destructive" size="sm">
          删除
        </Button>
      </Popconfirm>
    </div>
  );
}

function MessageProviderDemo() {
  return (
    <MessageProvider>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const ctx = React.useContext(MessageContext);
            ctx?.show({ content: "操作成功！", type: "success" });
          }}
        >
          成功消息
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const ctx = React.useContext(MessageContext);
            ctx?.show({ content: "操作失败", type: "error" });
          }}
        >
          错误消息
        </Button>
      </div>
    </MessageProvider>
  );
}

function ModalProviderDemo() {
  return (
    <ModalProvider>
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground text-sm">
          ModalProvider 提供全局弹窗上下文
        </p>
        <Button
          size="sm"
          onClick={() => {
            const ctx = React.useContext(ModalContext);
            ctx?.openModal({
              title: "示例弹窗",
              content: <p className="text-sm">管理的弹窗</p>,
            });
          }}
        >
          打开弹窗
        </Button>
      </div>
    </ModalProvider>
  );
}

function KeyboardShortcutDialogDemo() {
  return (
    <KeyboardShortcutDialog
      groups={[
        {
          title: "通用",
          shortcuts: [
            { keys: ["⌘", "K"], description: "快速搜索" },
            { keys: ["⌘", "N"], description: "新建" },
          ],
        },
        {
          title: "编辑",
          shortcuts: [
            { keys: ["⌘", "Z"], description: "撤销" },
            { keys: ["⌘", "F"], description: "查找" },
          ],
        },
      ]}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Registry                                                                  */
/* -------------------------------------------------------------------------- */

export const componentPreviews: Record<string, React.ComponentType> = {
  Dialog: DialogDemo,
  AlertDialog: AlertDialogDemo,
  Popover: PopoverDemo,
  HoverCard: HoverCardDemo,
  Tooltip: TooltipDemo,
  Tabs: TabsDemo,
  Accordion: AccordionDemo,
  Sheet: SheetDemo,
  Drawer: DrawerDemo,
  Collapsible: CollapsibleDemo,
  DropdownMenu: DropdownMenuDemo,
  ContextMenu: ContextMenuDemo,
  NavigationMenu: NavigationMenuDemo,
  Command: CommandDemo,
  Select: SelectDemo,
  Menu: MenuDemo,
  Menubar: MenubarDemo,
  Popconfirm: PopconfirmDemo,
  MessageProvider: MessageProviderDemo,
  ModalProvider: ModalProviderDemo,
  KeyboardShortcutDialog: KeyboardShortcutDialogDemo,
  Avatar: AvatarDemo,
  Switch: SwitchDemo,
  Checkbox: CheckboxDemo,
  RadioGroup: RadioGroupDemo,
  Badge: BadgeDemo,
  Button: ButtonDemo,
  Result: ResultDemo,

  /* Business components */
  KpiPanel: KPIPanelDemo,
  Profile: ProfileDemo,
  ProfileHeader: ProfileDemo,
  ProfileForm: ProfileFormDemo,
  StatCard: StatCardDemo,
  AuditLog: AuditLogDemo,
  CampaignCard: CampaignCardDemo,
  AvatarGroup: AvatarGroupDemo,
  ActivityFeed: ActivityFeedDemo,
  AnimatedNumber: AnimatedNumberDemo,
  Banner: BannerDemo,
  AnnouncementBanner: AnnouncementBannerDemo,
  BarcodeDisplay: BarcodeDisplayDemo,
  Chip: ChipDemo,
  EmptyState: EmptyStateDemo,
  Rating: RatingDemo,
  BillStatusBar: BillStatusBarDemo,
  BizStatusTag: BizStatusTagDemo,
};
