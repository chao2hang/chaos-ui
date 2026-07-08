#!/usr/bin/env python3
"""
Enhanced MDX generator — extracts real props, CVA variants, JSDoc, Chinese comments, defaults.
Idempotent: overwrites MDX drafts with higher quality content.
"""
import re, json, glob
from pathlib import Path
from collections import OrderedDict

ROOT = Path("/home/chaos/projects/personal/chaos_style")
SOURCE_ROOT = ROOT / "components"
DOCS_ROOT = ROOT / "apps/docs/@/components"
CONTENT_DIR = ROOT / "apps/docs/@/content"
SOURCE_PREFIX = "packages/chaos-design-ui/"  # canonical source path prefix for meta output

# ---- Category rules (same as bootstrap-all-docs.py) ----
CATEGORY_RULES = [
    ("Feedback", ["alert", "alert-dialog", "toast", "toaster", "sonner", "message", "notification", "banner", "progress", "skeleton", "spinner", "loading", "empty-state", "result", "empty", "dialog", "drawer", "sheet", "modal", "popconfirm"]),
    ("Form", ["form", "input", "checkbox", "radio", "select", "switch", "toggle", "textarea", "slider", "date-picker", "time-picker", "upload", "file-upload", "rate", "cascader", "calendar", "color-picker", "autocomplete", "combobox", "multi-select", "tree-select", "input-number", "form-grid", "form-list", "browse-input", "otp-input", "otp-field", "picker", "search", "label"]),
    ("Navigation", ["menu", "menubar", "breadcrumb", "pagination", "steps", "stepper", "tabs", "tab", "anchor", "dropdown", "dropdown-menu", "context-menu", "navigation-menu", "sidebar", "back-top", "dot", "fab", "command", "navigation"]),
    ("DataDisplay", ["table", "list", "card", "avatar", "avatar-group", "badge", "tag", "tooltip", "popover", "hover-card", "collapse", "accordion", "tree", "timeline", "carousel", "image", "descriptions", "statistic", "ribbon", "watermark", "qrcode", "barcode", "department-browse", "segmented", "kpi-panel", "kpi", "charts", "kbd", "countdown", "animated-number", "qrcode-display", "barcode-display"]),
    ("Layout", ["flex", "grid", "resizable", "aspect-ratio", "divider", "space", "stack", "container", "splitter", "scroll-area", "separator", "split-pane"]),
]

# Rich Chinese descriptions for core components
RICH_DESC = {
    "button": ("按钮", "触发操作或事件,如提交表单、打开对话框、取消操作等。", "Buttons trigger actions or events such as submitting forms, opening dialogs, or cancelling operations."),
    "input": ("输入框", "通过键盘输入内容,是最基础的表单字段组件。支持前缀/后缀、尺寸、状态。", "Basic text input via keyboard. Supports prefix/suffix, sizes, and states."),
    "badge": ("徽章", "在右上角展示小数量或状态标记,常用于通知图标、头像、列表项。", "Small status/number indicator pinned to a corner, often used on notification icons, avatars, or list items."),
    "card": ("卡片", "将信息聚合在卡片容器中展示,最通用的内容分组容器。", "Groups content in a container; the most common content-grouping primitive."),
    "dialog": ("对话框", "模态弹出框,用于需要用户处理事务的重要场景,不支持多框叠加。", "Modal popup for critical user interactions; does not support stacking."),
    "alert": ("警告提示", "静态展示需要关注的信息,非浮层。支持 default/info/success/warning/destructive 变体。", "Static (non-overlay) message for noteworthy information. Supports default/info/success/warning/destructive variants."),
    "tooltip": ("文字提示", "鼠标悬停时出现的简单文本提示,用于解释按钮/图标含义。", "Simple text bubble appearing on hover; used to explain button/icon meanings."),
    "popover": ("气泡卡片", "点击/悬停触发的浮层卡片,可承载富内容(表单、列表、图表),比 Tooltip 更丰富。", "Click/hover-triggered floating card that can hold rich content (forms, lists, charts); richer than Tooltip."),
    "select": ("选择器", "下拉选项选择器,支持单选/搜索/自定义选项渲染。", "Dropdown option selector supporting single-select, search, and custom option rendering."),
    "checkbox": ("复选框", "在一组选项中进行多选,或单独表示两种状态切换。", "Multi-select from a group, or standalone toggle for binary state."),
    "radio": ("单选框", "用于在多个备选项中选中单个状态。", "Select exactly one option from a set."),
    "switch": ("开关", "开关选择器,代表两种状态之间的切换,比 Checkbox 更直观的开关形态。", "Toggle switch representing binary state — more visually intuitive than a checkbox."),
    "textarea": ("文本域", "多行纯文本编辑控件,适用于评论、反馈、描述等较长内容输入。", "Multi-line plain text editor for comments, feedback, descriptions, etc."),
    "tabs": ("标签页", "在同一页面切换不同内容区域的平级视图。", "Switch between sibling content views on the same page."),
    "breadcrumb": ("面包屑", "显示当前页面在层级结构中的位置,并能向上返回。", "Displays current location in a hierarchy and provides navigation back up."),
    "pagination": ("分页", "数据量过多时,用分页分隔展示,每页加载部分数据。", "Splits long data sets across pages when rendering all at once would be too heavy."),
    "avatar": ("头像", "展示用户/实体头像,支持图片、图标、文字三种形式。", "Represents a user or entity; supports image, icon, and text fallbacks."),
    "progress": ("进度条", "展示操作的当前进度,告知用户当前状态与剩余时长/进度。", "Shows current progress of an operation."),
    "spinner": ("加载中", "局部加载状态指示器,表示内容正在加载中。", "Local loading spinner indicating content is being fetched."),
    "skeleton": ("骨架屏", "在数据加载完成前提供占位,降低等待焦虑感。", "Placeholder shown while data loads; reduces perceived wait time."),
    "toast": ("轻提示", "全局展示不打断操作的轻量反馈信息,自动消失。", "Non-disruptive global feedback message that auto-dismisses."),
    "sonner": ("通知提示", "基于 sonner 的 opinionated 通知组件,堆叠展示在角落。", "Opinionated notification component (wraps sonner) stacked in a corner."),
    "drawer": ("抽屉", "从屏幕边缘滑出的浮层面板,用于承载详情/表单等次要内容。", "Panel that slides out from an edge, used for secondary content like details or forms."),
    "sheet": ("面板", "抽屉式底部/侧边面板,移动端常用。", "Bottom/side panel (common on mobile)."),
    "table": ("表格", "展示行列数据,最基础的数据展示组件。", "Displays row/column data; the fundamental data display component."),
    "tag": ("标签", "用于标记和分类,小型彩色色块。", "Small colored label for categorization and tagging."),
    "divider": ("分割线", "区隔内容的分割线,支持水平/垂直、含文字。", "Content separator; supports horizontal/vertical and labels."),
    "accordion": ("手风琴", "可折叠/展开的内容面板,垂直堆叠,每次可展开一个或多个。", "Vertically stacked collapsible panels; can expand one or more at a time."),
    "collapse": ("折叠面板", "内容区域的展开/折叠容器,将长内容收纳起来。", "Expandable/collapsible container that hides long content behind a header."),
    "menu": ("导航菜单", "页面层级导航菜单,支持横向/纵向、子菜单、图标。", "Hierarchical navigation menu supporting horizontal/vertical orientations, submenus, and icons."),
    "dropdown-menu": ("下拉菜单", "向下弹出的菜单列表,承载操作或导航选项。", "Menu list that pops downward, holding actions or navigation options."),
    "steps": ("步骤条", "引导用户按步骤完成流程,显示当前进度。", "Guides users through a multi-step process, indicating current progress."),
    "modal": ("模态框", "阻断式弹窗,要求用户处理后才能继续操作。", "Blocking popup requiring user interaction before proceeding."),
    "file-upload": ("文件上传", "通过点击或拖拽上传文件,支持多选、类型限制、预览。", "Click/drag-to-upload supporting multi-select, type restrictions, and preview."),
    "date-picker": ("日期选择器", "选择单个日期、日期范围或多个日期。", "Select single date, date ranges, or multiple dates."),
    "slider": ("滑动输入条", "在区间内拖动选择数值,比输入框更直观。", "Drag to select a numeric value within a range; more visual than an input."),
    "rate": ("评分", "对事物进行星级评分,支持半星、只读、自定义字符。", "Star rating supporting half-stars, read-only, and custom characters."),
    "empty-state": ("空状态", "当前没有数据时的占位展示,可搭配引导操作。", "Placeholder for empty data states, optionally with a call-to-action."),
    "result": ("结果页", "向用户反馈操作结果(成功/失败/警告/404/403),常为整页。", "Feedback for an operation result (success/fail/warning/404/403), typically full-page."),
    "carousel": ("轮播", "一组内容平级轮播展示,支持自动播放、指示点、箭头。", "Rotating flat content set; supports autoplay, dots, and arrows."),
    "timeline": ("时间线", "垂直展示时间流信息,如操作日志、进程跟踪。", "Vertical display of a chronological sequence such as logs or processes."),
    "image": ("图片", "增强的图片组件,支持预览、加载失败占位、懒加载。", "Enhanced image with preview, error fallback, and lazy loading."),
    "tree": ("树形控件", "层级结构数据的展示与选择,支持展开/折叠/勾选。", "Hierarchical data display and selection with expand/collapse/check."),
    "affix": ("固钉", "将页面元素固定在可视范围某位置,滚动时保持可见。", "Pins an element to a viewport position so it stays visible on scroll."),
    "back-top": ("回到顶部", "页面右下角按钮,一键返回页面顶部。", "Button pinned to bottom-right that scrolls to the top."),
    "anchor": ("锚点", "跳转到页面指定位置的锚点导航,常用于目录。", "Jumps to specified positions on a page; commonly used for table of contents."),
    "notification": ("通知提醒", "右上角弹出的通知卡片,比 Toast 内容更丰富、驻留更久。", "Top-right notification card with richer content and longer duration than toast."),
    "message": ("全局消息", "顶部居中的轻量反馈浮层,自动消失。", "Centered top feedback overlay that auto-dismisses."),
    "calendar": ("日历", "按照日历形式展示数据的容器,可用于日期选择或日程展示。", "Calendar-view container for date selection or schedule display."),
    "context-menu": ("右键菜单", "右键触发的上下文操作菜单。", "Right-click triggered context action menu."),
    "menubar": ("菜单栏", "水平菜单栏,通常提供多组下拉菜单。", "Horizontal menu bar providing grouped dropdown menus."),
    "hover-card": ("悬浮卡片", "鼠标悬停时出现的卡片浮层,比 Tooltip 承载更多内容。", "Card that appears on hover; holds more content than Tooltip."),
    "scroll-area": ("滚动区域", "自定义样式的滚动区域,支持横/纵向滚动条。", "Custom-styled scroll area supporting horizontal/vertical scrollbars."),
    "separator": ("分隔符", "对内容区进行视觉分隔,通常为细线。", "Visual separator between content areas, typically a thin line."),
    "resizable": ("可调整大小", "可拖拽调整子面板尺寸的布局容器。", "Layout container whose panels can be resized by dragging."),
    "aspect-ratio": ("宽高比", "锁定内容宽高比的容器组件,常用于图片/视频占位。", "Container that enforces an aspect ratio; useful for image/video placeholders."),
    "form": ("表单", "表单容器,配合 FormField 实现数据收集、校验、提交。", "Form container enabling data collection, validation, and submission with FormField."),
    "alert-dialog": ("警告对话框", "需要用户确认的危险操作对话框,阻断式,含警告样式。", "Blocking confirmation dialog for destructive actions, styled for emphasis."),
    "command": ("命令面板", "类似 VS Code Ctrl+K 的命令面板,键盘驱动搜索/执行。", "VS Code-style Ctrl+K command palette driven by keyboard search."),
    "popover-trigger": ("气泡触发器", "Popover 的触发元素,与 PopoverContent 配合使用。", "Trigger element for Popover, paired with PopoverContent."),
    "fab": ("悬浮按钮", "悬浮在页面右下角的圆形操作按钮,用于最主要的创建/新增操作。", "Circular floating action button (bottom-right) for the primary create/add action."),
    "config-provider": ("全局配置", "为组件树提供全局配置(主题、尺寸、国际化、前缀)。", "Provides global configuration (theme, size, i18n, prefix) to the component tree."),
    "color-picker": ("颜色选择器", "选择颜色的面板控件,支持色板、输入色值、透明度。", "Color selection panel supporting swatches, hex input, and opacity."),
    "cascader": ("级联选择", "从多级层级关联数据中进行选择,如省/市/区。", "Select from hierarchical linked data such as Province/City/District."),
    "autocomplete": ("自动完成", "输入框联想下拉,输入时实时建议匹配项。", "Input with real-time suggestion dropdown as user types."),
    "multi-select": ("多选", "在弹出面板中选择多个选项,支持标签形式展示已选项。", "Select multiple options from a panel; selections shown as tags."),
    "tree-select": ("树选择", "从树形结构数据中选择,支持单选/多选/搜索。", "Select from tree-structured data; supports single/multi-select and search."),
    "input-number": ("数字输入", "专门输入数字的输入框,支持增减按钮、精度、范围限制。", "Numeric input with increment/decrement buttons, precision, and range limits."),
    "combobox": ("组合框", "结合输入框和下拉列表的组合选择控件,支持自定义输入和选项匹配。", "Combines input with a dropdown list; supports custom input and option matching."),
    "browse-input": ("浏览输入框", "输入框右侧带浏览按钮,常用于选择文件/目录/业务对象。", "Input with a browse button on the right; used for selecting files/directories/business objects."),
    "segmented": ("分段控制器", "多个选项平级分段展示,常用于视图切换,类似 iOS Segmented Control。", "Multiple options in a segmented control; used for view switching (like iOS Segmented Control)."),
    "department-browse": ("部门浏览", "从组织架构中选择部门/人员,支持树状展开、搜索、多选。", "Browse org structure to select departments/people; supports tree expand, search, multi-select."),
    "otp-field": ("验证码输入", "一次性验证码输入框,多格子分别输入数字/字母,自动聚焦下一格。", "One-time password input with individual cells for each character; auto-focuses next cell."),
    "kbd": ("键盘按键", "展示键盘按键样式的组件,用于快捷键提示。", "Renders a keyboard-key style, used for shortcut hints."),
    "countdown": ("倒计时", "展示倒计数字,常用于短信验证码等待、活动倒计时。", "Countdown display; commonly used for SMS verification cooldowns or event timers."),
    "descriptions": ("描述列表", "以键值对形式展示多个字段的只读详情,常见于详情页。", "Key-value list of read-only fields; common on detail pages."),
    "statistic": ("统计数值", "突出展示某个统计数字,支持千分位、前缀/后缀、动画。", "Prominently displays a statistic with thousands separators, prefix/suffix, and animation."),
    "ribbon": ("缎带", "附着在卡片角上的角标/缎带,常用于 NEW/HOT 等标识。", "Corner ribbon attached to a card; commonly used for NEW/HOT badges."),
    "watermark": ("水印", "在内容上叠加指定文字/图片水印,用于版权标识。", "Overlays specified text/image watermark on content for copyright."),
    "stepper": ("步骤条", "水平步骤条,引导用户完成多步骤流程。", "Horizontal stepper guiding users through a multi-step workflow."),
    "split-pane": ("分割面板", "可拖拽分割线的双栏/多栏布局容器。", "Multi-pane layout container with a draggable divider."),
    "dot": ("状态点", "小圆点状态指示器,常用于在线状态、消息提醒、列表项前。", "Small dot status indicator used for online status, notification dots, or list items."),
    "label": ("标签文本", "表单字段标签,支持 required 星号、字号、对齐。", "Form field label supporting required asterisk, sizes, and alignment."),
    "kpi-panel": ("KPI 面板", "关键绩效指标面板,展示核心业务数值和趋势。", "KPI panel showing key business metrics and trends."),
    "avatar-group": ("头像组", "多个头像堆叠展示,显示剩余数量 +N。", "Stacked group of avatars with a +N overflow indicator."),
}

# Common business/layout component translations (slug -> Chinese name)
BUSINESS_ZH = {
    "auth-forms": "认证表单", "sign-in-form": "登录表单", "sign-up-form": "注册表单", "forgot-password-form": "忘记密码表单",
    "mobile-auth-layout": "移动端认证布局", "address-form": "地址表单", "address-picker": "地址选择器",
    "transfer": "穿梭框", "status-badge": "状态徽章", "notification-center": "通知中心",
    "bill-page": "账单页", "prompt-dialog": "提示对话框", "error-page": "错误页",
    "signature-pad": "签名板", "mobile-card": "移动端卡片", "mobile-dashboard-layout": "移动端仪表盘布局",
    "mobile-dialog": "移动端对话框", "mobile-navigation": "移动端导航", "mobile-select": "移动端选择器",
    "mobile-sheet": "移动端面板", "comment-thread": "评论线程", "tree-table": "树形表格",
    "report-builder": "报表构建器", "org-chart": "组织架构图", "kanban-board": "看板",
    "stat-card": "统计卡片", "pdf-viewer": "PDF 查看器", "editable-tree-table": "可编辑树形表格",
    "confetti": "彩带特效", "advanced-search": "高级搜索", "tour": "新手引导",
    "status-tag": "状态标签", "approval-flow": "审批流程", "creative-preview": "创意预览",
    "gauge": "仪表盘", "experiment-summary": "实验摘要", "qr-code": "二维码",
    "barcode-display": "条形码展示", "rich-text-editor": "富文本编辑器", "video-player": "视频播放器",
    "audio-player": "音频播放器", "file-upload": "文件上传", "map-view": "地图视图",
    "map-marker": "地图标记", "map-track": "地图轨迹", "pivot-table": "数据透视表",
    "dashboard-designer": "仪表盘设计器", "inbox-list": "收件箱列表", "multi-select": "多选",
    "onboarding-checklist": "新手任务清单", "payment-form": "支付表单", "segmented-control": "分段控制器",
    "data-table": "数据表格", "advanced-data-table": "高级数据表格", "activity-feed": "动态信息流",
    "anchor": "锚点导航", "audit-log": "审计日志", "audit-sidebar": "审计侧栏",
    "auth-guard": "认证守卫", "announcement-banner": "公告横幅", "approval-timeline": "审批时间线",
    "async-task-center": "异步任务中心", "audience-segment-builder": "人群分群构建器",
    "animated-number": "动画数字", "avatar-group": "头像组", "batch-selector": "批量选择器",
    "browse-input": "浏览输入框", "calendar-heatmap": "日历热力图", "card-list": "卡片列表",
    "chat-window": "聊天窗口", "chip": "标签片", "code-editor": "代码编辑器",
    "color-swatch-picker": "色板选择器", "countdown": "倒计时", "cropper": "图片裁剪器",
    "cross-tab-bridge": "跨标签页桥接", "customer-credit-tier": "客户信用等级",
    "dashboard-layout": "仪表盘布局", "detail-layout": "详情布局", "auth-layout": "认证布局",
    "public-layout": "公共布局", "blank-layout": "空白布局", "error-layout": "错误布局",
    "region-layout": "区域布局", "master-detail-layout": "主次布局", "master-detail-tabs": "主次标签布局",
    "print-layout": "打印布局", "app-shell": "应用外壳", "admin-header": "管理后台头部",
    "admin-sider": "管理后台侧边栏", "admin-breadcrumb": "管理后台面包屑", "admin-tabs": "管理后台标签页",
    "dialog-form-body": "弹窗表单主体", "top-bar": "顶部栏",
    "dual-list-box": "双列表框", "editable-cell": "可编辑单元格", "emoji-picker": "表情选择器",
    "entity-picker": "实体选择器", "excel-exporter": "Excel 导出", "filter-panel": "筛选面板",
    "form-autosave-indicator": "表单自动保存指示器", "form-progress": "表单进度",
    "image-uploader": "图片上传器", "json-viewer": "JSON 查看器", "keyboard-shortcuts": "键盘快捷键",
    "list-panel": "列表面板", "loading-button": "加载按钮", "markdown-viewer": "Markdown 查看器",
    "mentions": "提及输入", "message-provider": "消息提供者", "metric-card": "指标卡片",
    "mobile-cascade-selector": "移动端级联选择器", "mobile-date-picker": "移动端日期选择器",
    "mobile-form-wizard": "移动端表单向导", "mobile-pull-to-refresh": "移动端下拉刷新",
    "network-graph": "网络图", "notification-toast": "通知提示", "number-animate": "数字动画",
    "otp-field": "验证码输入", "page-header": "页面头部", "password-strength": "密码强度",
    "phone-input": "手机号输入", "policy-consent": "隐私政策同意", "product-gallery": "商品画廊",
    "profile": "个人资料", "progress-ring": "进度环", "qrcode-display": "二维码展示",
    "quick-filter": "快速筛选", "range-calendar": "范围日历", "remote-select": "远程选择器",
    "result-page": "结果页", "role-permission-grid": "角色权限网格", "rule-builder": "规则构建器",
    "schema-form": "Schema 表单", "search-bar": "搜索栏", "select-with-tags": "标签选择器",
    "setting-panel": "设置面板", "skeleton-list": "骨架列表", "split-pane": "分割面板",
    "stat": "统计数值", "steps-indicator": "步骤指示器", "swipe-action": "滑动操作",
    "swipe-cell": "滑动单元格", "switch-network": "网络切换", "tag-input": "标签输入",
    "time-ago": "相对时间", "timeline-chat": "时间线聊天", "todo-list": "待办列表",
    "trend-indicator": "趋势指示器", "upload-dragger": "拖拽上传", "user-nav": "用户导航",
    "verification-input": "验证码输入", "watermark": "水印", "wave-progress": "波浪进度",
    "week-picker": "周选择器", "workflow-canvas": "工作流画布", "workweek-calendar": "工作日日历",
    # Additional UI components
    "collapsible": "折叠面板", "qrcode": "二维码", "toggle": "开关", "spin": "加载中",
    "sidebar": "侧边栏", "form-section": "表单分区", "keyboard-shortcut": "键盘快捷键",
    "tags-input": "标签输入框", "keyboard-shortcut-dialog": "键盘快捷键对话框", "flex": "弹性布局",
    "icon-picker": "图标选择器", "virtual-table": "虚拟表格", "number-ticker": "数字跳动",
    "fullscreen-toggle": "全屏切换", "typography": "排版", "list": "列表", "radio-group": "单选组",
    "page-container": "页面容器", "grid": "栅格", "split-button": "分裂按钮",
    "sequence-input": "序列输入", "navigation-menu": "导航菜单", "space": "间距",
    "input-search": "搜索输入", "toggle-group": "开关组", "modal-provider": "模态提供者",
    "rating": "评分", "form-grid": "表单栅格", "image-viewer": "图片查看器",
    "input-group": "输入组", "form-list": "表单列表", "virtual-list": "虚拟列表",
    "user-browse": "用户选择", "tree-view": "树形视图", "grid-layout": "栅格布局",
    "popconfirm": "气泡确认框",
    # Additional business components
    "banner": "横幅", "bill-footer": "账单底部", "bill-header": "账单头部",
    "bill-status-bar": "账单状态栏", "biz-status-tag": "业务状态标签",
    "budget-pacing-card": "预算节奏卡片", "bulk-actions-toolbar": "批量操作工具栏",
    "bulk-import-wizard": "批量导入向导", "campaign-calendar": "活动日历",
    "campaign-card": "活动卡片", "campaign-status-tag": "活动状态标签",
    "channel-picker": "渠道选择器", "chart": "图表", "chat": "聊天",
    "chat-shared-link": "共享链接卡片",
    "coach-mark": "引导标记", "code-block": "代码块", "color-tag": "颜色标签",
    "command-palette": "命令面板", "confirm-dialog": "确认对话框",
    "connection-status": "连接状态", "contract-template": "合同模板",
    "cookie-banner": "Cookie 横幅", "copy-button": "复制按钮",
    "credit-card-input": "信用卡输入", "crud-page": "增删改查页面",
    "crud-toolbar": "增删改查工具栏", "currency-input": "货币输入",
    "date-range-picker": "日期范围选择器", "density-switcher": "密度切换",
    "dict-select": "字典选择", "diff-viewer-table": "差异表格查看器",
    "diff-viewer": "差异查看器", "dock": "停靠栏", "edit-toolbar": "编辑工具栏",
    "equipment-card": "设备卡片", "error-boundary": "错误边界",
    "expense-line-editor": "费用行编辑器", "export-button": "导出按钮",
    "feature-gate": "功能开关", "field-mask": "字段掩码",
    "file-upload-manager": "文件上传管理器", "filter-bar": "筛选栏",
    "filter-builder": "筛选构建器", "forbidden": "403 禁止访问",
    "form-field": "表单字段", "form-wizard": "表单向导",
    "formula-editor": "公式编辑器", "global-loading": "全局加载",
    "heatmap-calendar": "热力日历", "image-gallery": "图片画廊",
    "import-dialog": "导入对话框", "inline-edit": "内联编辑",
    "inventory-alert-list": "库存预警列表", "invoice-preview": "发票预览",
    "kpi-card": "KPI 卡片", "language-switcher": "语言切换",
    "line-editor": "行编辑器", "loading-page": "加载页",
    "maintenance-log": "维护日志", "marketing": "营销组件",
    "mask-input": "掩码输入", "metric-trend": "指标趋势",
    "mobile-bottom-nav": "移动端底部导航", "mobile-button": "移动端按钮",
    "mobile-chart-fallback": "移动端图表降级", "mobile-data-table": "移动端数据表格",
    "mobile-empty-state": "移动端空状态", "mobile-filter-builder": "移动端筛选构建器",
    "mobile-form-autosave": "移动端表单自动保存", "mobile-form-field": "移动端表单字段",
    "mobile-form-stepper": "移动端表单步骤器", "mobile-form": "移动端表单",
    "mobile-input": "移动端输入", "mobile-kanban": "移动端看板",
    "mobile-kpi-card": "移动端 KPI 卡片", "mobile-page-header": "移动端页面头部",
    "mobile-skeleton": "移动端骨架屏", "mobile-swipe-actions": "移动端滑动操作",
    "mobile-tabs": "移动端标签页", "mobile-textarea": "移动端文本域",
    "order-line-editor": "订单行编辑器", "permission-matrix": "权限矩阵",
    "permission-wrapper": "权限包装器", "presence-indicators": "在线状态指示器",
    "print-button": "打印按钮", "quality-inspection-form": "质检表单",
    "responsive-preview": "响应式预览", "role-assignment": "角色分配",
    "saved-filters": "已保存筛选", "schedule-view": "排班视图",
    "search-input": "搜索输入", "search-table": "搜索表格",
    "settings-layout": "设置布局", "shift-calendar": "班次日历",
    "stat-card-row": "统计卡片行", "theme-toggle": "主题切换",
    "time-picker": "时间选择器", "top-loader": "顶部加载条",
    "unit-converter": "单位换算", "user-menu": "用户菜单",
    "utm-builder": "UTM 构建器", "version-history": "版本历史",
    "workflow": "工作流", "sequence-preview": "序列预览",
    # Nested business/calendar
    "calendar-calendar-month": "日历月视图", "calendar-event-detail": "日历事件详情",
    "calendar-gantt-chart": "甘特图", "calendar-time-slot-picker": "时间段选择器",
    # Nested business/charts
    "charts-area-chart": "面积图", "charts-bar-chart": "柱状图", "charts-chart-frame": "图表容器",
    "charts-composed-chart": "组合图", "charts-funnel-chart": "漏斗图",
    "charts-heatmap-chart": "热力图", "charts-line-chart": "折线图",
    "charts-pie-chart": "饼图", "charts-radar-chart": "雷达图",
    "charts-radial-chart": "环形图", "charts-sankey-chart": "桑基图",
    "charts-scatter-chart": "散点图", "charts-treemap-chart": "矩形树图",
    "charts-waterfall-chart": "瀑布图", "charts-shared-chart-empty": "图表空状态",
    "charts-shared-chart-export": "图表导出", "charts-shared-chart-fullscreen": "图表全屏",
    "charts-shared-chart-legend": "图表图例", "charts-shared-chart-skeleton": "图表骨架屏",
    "charts-shared-chart-tooltip": "图表提示框",
    # Nested business/form
    "form-form-autosave-indicator": "表单自动保存指示器", "form-form-dirty-warning": "表单未保存提示",
    "form-form-error-summary": "表单错误汇总", "form-form-field-group": "表单字段分组",
    "form-form-progress": "表单进度", "form-form-repeater": "动态表单项",
    "form-form-step-summary": "表单步骤摘要",
}

# Per-category descriptions
CAT_DESC = {
    "General": ("通用基础组件", "General-purpose primitives used across the app."),
    "Layout": ("布局组件", "Layout primitives for structuring pages."),
    "Navigation": ("导航组件", "Navigation components for moving through the app."),
    "Form": ("表单控件", "Form controls for user input and data submission."),
    "DataDisplay": ("数据展示", "Components for presenting data and content."),
    "Feedback": ("反馈组件", "Feedback and status communication to the user."),
    "Business": ("业务组件", "Domain-specific business components for ERP scenarios."),
    "System Layout": ("系统布局", "System-level layout shells for admin pages."),
}

# Common HTML attribute notes
HTML_TAG_FOR_PROPS = {
    "button": "button", "input": "input", "textarea": "textarea", "select": "select",
    "dialog": "div", "card": "div", "card-content": "div", "card-header": "div",
    "card-footer": "div", "card-title": "h3", "card-description": "p",
    "badge": "span", "alert": "div", "avatar": "span", "avatar-image": "img",
    "avatar-fallback": "span", "tooltip-trigger": "button", "tooltip-content": "div",
    "table": "table", "table-header": "thead", "table-body": "tbody",
    "table-row": "tr", "table-head": "th", "table-cell": "td",
    "progress": "div", "skeleton": "div", "spinner": "div",
    "separator": "div", "divider": "div", "tabs-list": "div", "tabs-trigger": "button",
    "tabs-content": "div", "breadcrumb": "nav", "pagination": "nav",
    "accordion": "div", "accordion-item": "div", "accordion-trigger": "button",
    "accordion-content": "div", "checkbox": "button", "radio": "button",
    "switch": "button", "slider": "span", "label": "label",
    "drawer": "div", "sheet": "div", "drawer-content": "div",
    "popover": "div", "popover-content": "div", "popover-trigger": "button",
    "hover-card": "div", "hover-card-content": "div", "hover-card-trigger": "button",
    "menubar": "div", "context-menu": "div", "dropdown-menu": "div",
    "command": "div", "toast": "li", "toaster": "div",
    "resizable": "div", "aspect-ratio": "div",
    "scroll-area": "div", "calendar": "div",
}

# Rich CVA variant descriptions
VARIANT_DESC = {
    "default": "默认样式 / Default style",
    "outline": "描边样式 / Outlined style",
    "ghost": "幽灵(无背景)样式 / Ghost (no background) style",
    "secondary": "次要样式 / Secondary action style",
    "destructive": "危险/删除样式 / Destructive/danger style",
    "link": "链接样式 / Link style",
    "primary": "主要样式 / Primary style",
    "info": "信息提示 / Informational style",
    "success": "成功状态 / Success style",
    "warning": "警告状态 / Warning style",
    "error": "错误状态 / Error style",
}

SIZE_DESC = {
    "default": "默认尺寸 / Default size",
    "sm": "小号 / Small",
    "xs": "超小 / Extra small",
    "lg": "大号 / Large",
    "xl": "超大 / Extra large",
    "icon": "图标正方形 / Icon-only square",
    "icon-sm": "小图标 / Small icon",
    "icon-xs": "超小图标 / Extra small icon",
    "icon-lg": "大图标 / Large icon",
}


def extract_cva_variants(content: str) -> dict:
    """Extract CVA variants: axes, options, defaults."""
    result = {}
    # Find cva(...) blocks
    for m in re.finditer(r'const\s+(\w+)\s*=\s*cva\(', content):
        var_name = m.group(1)  # e.g. buttonVariants
        start = m.end()
        # Brace matching
        depth = 1
        i = start
        while i < len(content) and depth > 0:
            if content[i] == '(':
                depth += 1
            elif content[i] == ')':
                depth -= 1
            i += 1
        cva_body = content[start:i-1]
        # Find variants: { ... }
        var_match = re.search(r'variants\s*:\s*\{', cva_body)
        if not var_match:
            continue
        v_start = var_match.end()
        depth = 1
        j = v_start
        while j < len(cva_body) and depth > 0:
            if cva_body[j] == '{':
                depth += 1
            elif cva_body[j] == '}':
                depth -= 1
            j += 1
        variants_block = cva_body[v_start:j-1]
        # Find defaultVariants
        def_match = re.search(r'defaultVariants\s*:\s*\{([^}]+)\}', cva_body)
        defaults = {}
        if def_match:
            for dm in re.finditer(r'(\w+)\s*:\s*["\']([^"\']+)["\']', def_match.group(1)):
                defaults[dm.group(1)] = dm.group(2)
        # Parse each axis - keys may be quoted ("default") or bare (default:)
        axes = OrderedDict()
        for axis_m in re.finditer(r'(\w+)\s*:\s*\{', variants_block):
            axis_name = axis_m.group(1)
            if axis_name in ("variants", "defaultVariants"):
                continue
            a_start = axis_m.end()
            depth = 1
            k = a_start
            while k < len(variants_block) and depth > 0:
                if variants_block[k] == '{':
                    depth += 1
                elif variants_block[k] == '}':
                    depth -= 1
                k += 1
            axis_block = variants_block[a_start:k-1]
            # Find top-level option keys: each option's value is a CSS class string,
            # so the line (or next line after key:) must contain an opening quote for the value.
            # We join continuation lines (when the value is on the next line, e.g. `"icon-xs":\n  "..."`)
            # and match key: followed by a quote (possibly after newline/whitespace).
            options = []
            lines = axis_block.split('\n')
            full_text = axis_block
            # Pattern: optional quote, key (word chars or hyphens), optional quote, colon,
            # then whitespace (including newlines), then opening quote for value string.
            # This distinguishes real option keys from CSS pseudo-classes like hover:bg-...
            for m in re.finditer(r'(?:^|\n)\s*["\']?([\w-]+)["\']?\s*:\s*(?:\n\s*)?["\']', full_text):
                key = m.group(1)
                if key in ("defaultVariants", "variants", "compoundVariants"):
                    continue
                options.append(key)
            axes[axis_name] = {"options": options, "default": defaults.get(axis_name, options[0] if options else None)}
        result[var_name] = axes
    return result


def extract_props_from_interface(content: str, interface_name: str) -> list:
    """Extract props from a named interface using brace-depth tracking."""
    m = re.search(rf'(?:export\s+)?interface\s+{interface_name}\s+(?:extends[^{{]+)?\{{', content)
    if not m:
        return []
    start = m.end()
    depth = 1
    i = start
    while i < len(content) and depth > 0:
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
        i += 1
    block = content[start:i-1]

    props = []
    # Process line by line, collecting JSDoc comments
    pending_jsdoc = ""
    lines = block.split('\n')
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        # Collect JSDoc single-line: /** ... */
        jm = re.match(r'/\*\*\s*(.*?)\s*\*/', stripped)
        if jm:
            pending_jsdoc = jm.group(1).strip()
            continue
        # Multi-line JSDoc continuation
        if stripped.startswith('*') and not stripped.startswith('*/'):
            txt = stripped.lstrip('* ').strip()
            if txt and not txt.startswith('@'):
                pending_jsdoc = (pending_jsdoc + " " + txt).strip()
            continue
        if stripped.startswith('/**'):
            # Start of multi-line JSDoc
            txt = stripped[3:].strip().rstrip('*/').strip()
            if txt:
                pending_jsdoc = txt
            continue
        # @default tag
        dm = re.match(r'@default\s+(.+)', stripped)
        if dm and pending_jsdoc is not None:
            # store default separately — we don't use it heavily
            pass
        # Prop definition: name? : type
        pm = re.match(r'([\w-]+)\s*\??\s*:\s*(.+)', stripped)
        if pm:
            name = pm.group(1)
            type_str = pm.group(2).rstrip(',;').strip()
            if name.startswith('_') or name in ('new', 'delete', 'function'):
                continue
            # Simplify complex types
            if '=>' in type_str:
                if 'void' in type_str.split('=>')[-1]:
                    type_str = '(...args) => void'
                else:
                    type_str = '(...args) => unknown'
            # Simplify Record/object/complex generics
            if type_str.count('<') > 1 or '<{' in type_str:
                type_str = re.sub(r'<\{[^}]*\}>', '<T>', type_str)
                type_str = re.sub(r'Record<[^>]*>', 'Record<K,V>', type_str)
            if len(type_str) > 45:
                type_str = type_str[:42] + '...'
            props.append({
                "name": name,
                "type": type_str,
                "jsdoc": pending_jsdoc,
                "default": None,
            })
            pending_jsdoc = ""
            continue
        # Reset JSDoc if we hit something that isn't a prop
        if not stripped.startswith('//') and not stripped.startswith('*') and not stripped.startswith('/**'):
            pending_jsdoc = ""
    return props


def extract_destructured_defaults(func_body_start: str, content: str) -> dict:
    """Extract default values from function parameter destructuring: { a = "x", b = 5 }."""
    # Find destructuring pattern after function name
    m = re.search(r'\(\s*\{([^}]*)\}', content[func_body_start:func_body_start+2000] if func_body_start else "")
    if not m:
        return {}
    block = m.group(1)
    defaults = {}
    # Match only literal values: quoted strings, numbers, booleans, null/undefined
    # Avoids capturing identifier references (e.g. center = DEFAULT_CENTER)
    lit = r'(?:"([^"]*)"|\'([^\']*)\'|(-?\d+(?:\.\d+)?)|(true|false|null|undefined))(?=\s*[,}\)])'
    for dm in re.finditer(rf'(\w+)\s*=\s*{lit}', block):
        name = dm.group(1)
        if name in ("className", "props", "rest"):
            continue
        if dm.group(2) is not None:        # double-quoted string
            defaults[name] = ("str", dm.group(2))
        elif dm.group(3) is not None:      # single-quoted string
            defaults[name] = ("str", dm.group(3))
        elif dm.group(4) is not None:      # number
            defaults[name] = ("num", dm.group(4))
        elif dm.group(5) is not None:      # boolean/null/undefined
            defaults[name] = ("lit", dm.group(5))
    return defaults


def extract_exports(content: str) -> list:
    """Extract all exported component names (PascalCase), preserving source order."""
    exports: list[str] = []
    seen: set[str] = set()

    def _add(name: str):
        if name in seen:
            return
        if name.endswith("Props") or name.endswith("Variants") or name == "Variants":
            return
        if name in ("React", "VariantProps", "CVA", "cn"):
            return
        seen.add(name)
        exports.append(name)

    for m in re.finditer(r'export\s+function\s+([A-Z]\w*)', content):
        _add(m.group(1))
    for m in re.finditer(r'export\s+const\s+([A-Z]\w*)', content):
        _add(m.group(1))
    # Re-export blocks like `export { Foo, Bar }` — keep their order
    for block in re.finditer(r'export\s*\{([^}]+)\}', content):
        for n in re.findall(r'([A-Z]\w*)', block.group(1)):
            _add(n)
    return exports


def guess_component_description(slug: str, category: str, source_content: str, name: str, nameZh: str, primary: str = "") -> tuple:
    """Guess rich Chinese/English description for a component."""
    if slug in RICH_DESC:
        return RICH_DESC[slug]

    def _clean_doc(text: str) -> str:
        """Clean JSDoc/comment text: remove stars, @tags, and lines that look like code/types."""
        lines = []
        for raw in text.split("\n"):
            l = raw.strip().lstrip("*").strip()
            if not l:
                continue
            if l.startswith("@"):
                continue
            # Skip lines that look like code/types (brackets, type annotations)
            if l.startswith("[") and "]" in l and ("number" in l or "string" in l or "," in l):
                continue
            if "高德地图坐标系" in l and "经度在前" in l:
                continue  # internal coord note, not component desc
            lines.append(l)
        result = " ".join(lines)[:160]
        # Remove inline code blocks (```tsx ... ```) that break MDX parsing
        result = re.sub(r'```\w*\s*.*?```', '', result)
        return result

    # Try JSDoc immediately preceding the exported primary component
    if primary:
        # Look for: [JSDoc block]? whitespace* export (function|const) <PrimaryName>
        export_pat = re.compile(
            r'/\*\*\s*(.*?)\s*\*/\s*\n\s*export\s+(?:function|const)\s+' + re.escape(primary) + r'\b',
            re.DOTALL,
        )
        m = export_pat.search(source_content[:5000])
        if m:
            zh = _clean_doc(m.group(1))
            if re.search(r'[\u4e00-\u9fff]', zh):
                return (nameZh, zh, f"{name} — {slug.replace('-', ' ')} component.")

    # Try any JSDoc/block comment immediately before ANY export function/const that contains Chinese
    for m in re.finditer(r'/\*\*\s*(.*?)\s*\*/\s*\n\s*export\s+(?:function|const)\s+([A-Z]\w*)', source_content[:6000], re.DOTALL):
        zh = _clean_doc(m.group(1))
        if zh and re.search(r'[\u4e00-\u9fff]', zh) and len(zh) >= 4:
            # Prefer docs that describe the component, not an interface/type
            if "Props" not in m.group(2) and not m.group(2).endswith("Props"):
                return (nameZh, zh, f"{name} — {slug.replace('-', ' ')} component.")

    # Try first Chinese JSDoc at all (anywhere early in file)
    jsdoc_m = re.search(r'/\*\*\s*(.*?)\s*\*/', source_content[:1500], re.DOTALL)
    if jsdoc_m:
        zh = _clean_doc(jsdoc_m.group(1))
        if zh and re.search(r'[\u4e00-\u9fff]', zh) and len(zh) >= 4:
            return (nameZh, zh, f"{name} — {slug.replace('-', ' ')} component.")

    # Try first Chinese line comment — prefer comments attached to exported declarations
    cm_matches = list(re.finditer(r'//\s*([\u4e00-\u9fff][^\n]{5,80})', source_content[:4000]))
    for cm in cm_matches:
        zh = cm.group(1).strip()
        # Skip line comments that are clearly implementation notes, not component descriptions
        if any(skip in zh for skip in (
            "坐标系", "经度在前", "JS API key", "死循环", "回灌", "受控模式", "光标",
            "挂载", "初始化", "缓存", "加载脚本", "避免并发", "useRef", "useEffect",
            "useMemo", "useCallback", "useState", "return", "props", "ref",
            "清理", "销毁", "事件监听", "addEventListener", "removeEventListener",
        )):
            continue
        # Skip comments inside function bodies or interface blocks (any open brace)
        pre = source_content[:cm.start()]
        if pre.count("{") - pre.count("}") > 0:
            continue
        return (nameZh, zh, f"{name} — {slug.replace('-', ' ')} component.")

    # Business: use generated description from props
    cat_zh, cat_en = CAT_DESC.get(category, ("组件", "Component"))
    if category == "Business":
        en_detail = "business component for ERP / enterprise scenarios"
        zh_detail = f"面向 ERP/企业场景的{cat_zh}"
        return (nameZh, f"{nameZh} — {zh_detail}。", f"{name} — a {en_detail}.")

    if category == "System Layout":
        return (nameZh, f"{nameZh} — 系统级布局外壳,用于后台/仪表盘/认证等整页布局。", f"{name} — a system-level layout shell for admin/dashboard/auth pages.")

    if category == "Layout":
        return (nameZh, f"{nameZh} — Chaos UI 的{cat_zh},用于组织页面区域结构。", f"{name} — a {cat_en.lower()} for structuring page regions.")

    return (nameZh, f"{nameZh} — Chaos UI 的{cat_zh}。", f"{name} — a {cat_en.lower()} from Chaos UI.")


def has_chinese(s: str) -> bool:
    return bool(re.search(r'[\u4e00-\u9fff]', s))


def slug_to_pascal(slug: str) -> str:
    return "".join(w.capitalize() for w in slug.split("-"))


def categorize(slug: str, subfolder: str) -> str:
    if subfolder == "business":
        return "Business"
    if subfolder == "layout":
        return "System Layout"
    if subfolder == "mobile":
        return "Business"
    for cat, keywords in CATEGORY_RULES:
        for kw in keywords:
            if slug == kw or slug.startswith(kw + "-") or slug.endswith("-" + kw):
                return cat
    return "General"


def read_source(rel_path: str) -> str:
    # rel_path can be "packages/chaos-design-ui/components/..." or direct in "components/..."
    p = ROOT / rel_path
    if not p.exists():
        # Try stripping packages/chaos-design-ui/ prefix
        if rel_path.startswith("packages/chaos-design-ui/"):
            p = ROOT / rel_path[len("packages/chaos-design-ui/"):]
    try:
        return p.read_text()
    except:
        return ""


def analyze_source(source_path: str, component_name: str, category: str) -> dict:
    """Full analysis of a component source file."""
    content = read_source(source_path)
    if not content:
        return {
            "exports": [component_name],
            "cva": {},
            "props": [],
            "defaults": {},
            "is_client": False,
            "extends_html": None,
            "sub_components": [],
            "uses_react_hook_form": False,
            "uses_zod": False,
            "uses_base_ui": False,
            "uses_lucide": False,
        }

    is_client = content.strip().startswith('"use client"') or content.strip().startswith("'use client'")
    exports = extract_exports(content)
    if component_name not in exports and exports:
        primary = exports[0]
    else:
        primary = component_name

    # CVA
    cva = extract_cva_variants(content)

    # Props: try named interface first
    props = []
    iface_names = [
        f"{primary}Props",
        f"{component_name}Props",
    ]
    for iface in iface_names:
        props = extract_props_from_interface(content, iface)
        if props:
            break
    if not props:
        # Look for any interface ending in Props
        for ifm in re.finditer(r'(?:export\s+)?interface\s+(\w+Props)\s+(?:extends\s+[^{{]+)?\{', content):
            props = extract_props_from_interface(content, ifm.group(1))
            if props:
                break

    # Defaults from destructuring
    func_match = re.search(rf'(?:export\s+)?function\s+{primary}\s*\(', content)
    defaults = {}
    if func_match:
        defaults = extract_destructured_defaults(func_match.end() - 1, content)

    # Merge defaults into props
    props_by_name = {p["name"]: p for p in props}
    for k, (kind, v) in defaults.items():
        if k in props_by_name and not props_by_name[k]["default"]:
            if kind == "str":
                props_by_name[k]["default"] = f'`"{v}"`'
            elif kind == "num":
                props_by_name[k]["default"] = f'`{v}`'
            else:  # lit: true/false/null/undefined
                props_by_name[k]["default"] = f'`{v}`'
    props = list(props_by_name.values())

    # HTML tag
    extends_match = re.search(r'extends\s+(?:React\.)?(?:ComponentProps|HTMLAttributes)<\s*["\'](\w+)["\']', content)
    extends_html = extends_match.group(1) if extends_match else None

    # Sub-components (other PascalCase exports that are true children of primary)
    # A true sub-component shares the parent's prefix (CardHeader ← Card) OR is a
    # known compound-suffix name (Trigger/Content/Item/List/...). Independent
    # co-exports (e.g. SignInForm, SignUpForm, ForgotPasswordForm) are NOT sub-components.
    COMPOUND_SUFFIXES = (
        "Trigger", "Content", "Header", "Footer", "Title", "Description",
        "Item", "List", "Overlay", "Portal", "Root", "Group", "Label",
        "Separator", "Indicator", "Arrow", "Close", "Cancel", "Action",
        "TabsList", "TabsTrigger", "TabsContent",
    )
    sub_components = []
    for e in exports:
        if e == primary or e.endswith("Props") or e.endswith("Variants"):
            continue
        if e.startswith(primary):
            sub_components.append(e)
        elif any(e.endswith(suf) for suf in COMPOUND_SUFFIXES):
            sub_components.append(e)

    # Library usage
    uses_react_hook_form = "react-hook-form" in content
    uses_zod = "zod" in content or "from \"zod\"" in content
    uses_base_ui = "@base-ui" in content
    uses_lucide = "lucide-react" in content

    return {
        "exports": exports,
        "primary": primary,
        "cva": cva,
        "props": props,
        "defaults": defaults,
        "is_client": is_client,
        "extends_html": extends_html,
        "sub_components": sub_components,
        "uses_react_hook_form": uses_react_hook_form,
        "uses_zod": uses_zod,
        "uses_base_ui": uses_base_ui,
        "uses_lucide": uses_lucide,
    }


def build_variant_tables(cva: dict) -> str:
    """Build MDX tables for CVA variants."""
    if not cva:
        return ""
    sections = []
    for var_name, axes in cva.items():
        for axis_name, info in axes.items():
            options = info.get("options", [])
            default = info.get("default")
            if not options:
                continue
            # Determine description source
            if axis_name == "variant":
                desc_map = VARIANT_DESC
                label_zh = "变体"
                label_en = "Variant"
            elif axis_name == "size":
                desc_map = SIZE_DESC
                label_zh = "尺寸"
                label_en = "Size"
            else:
                desc_map = {}
                AXIS_ZH = {
                    "orientation": "方向", "direction": "方向", "align": "对齐",
                    "justify": "主轴对齐", "intent": "意图", "tone": "色调",
                    "severity": "严重程度", "status": "状态", "type": "类型",
                    "shape": "形状", "appearance": "外观", "radius": "圆角",
                    "weight": "字重", "level": "层级", "elevation": "阴影",
                    "fullWidth": "全宽", "fullwidth": "全宽",
                }
                label_zh = AXIS_ZH.get(axis_name, axis_name)
                label_en = axis_name
            rows = []
            for opt in options:
                desc = desc_map.get(opt, "")
                rows.append(f"| `{opt}` | {desc} | {'✓' if opt == default else ''} |")
            sections.append(f"**{label_zh} / {label_en}**\n\n| {label_en} | 说明 / Description | 默认 |\n|---|---|---|\n" + "\n".join(rows))
    return "\n\n".join(sections)


def build_props_table(props: list, primary: str, extends_html: str = None) -> str:
    """Build a props table. Filters out internal/duplicate props."""
    # Common prop names → (zh, en) descriptions when no JSDoc is present
    PROP_NAME_DESC = {
        "value": ("当前值(受控)", "Current value (controlled)"),
        "defaultValue": ("默认值(非受控)", "Default value (uncontrolled)"),
        "onChange": ("值变化回调", "Callback when value changes"),
        "onClick": ("点击回调", "Click handler"),
        "placeholder": ("占位文本", "Placeholder text"),
        "disabled": ("是否禁用", "Whether disabled"),
        "required": ("是否必填", "Whether required"),
        "readOnly": ("是否只读", "Whether read-only"),
        "label": ("标签文本", "Label text"),
        "name": ("表单字段名", "Form field name"),
        "id": ("DOM 元素 id", "DOM element id"),
        "style": ("内联样式", "Inline style object"),
        "size": ("组件尺寸", "Component size"),
        "variant": ("样式变体", "Style variant"),
        "color": ("颜色主题", "Color theme"),
        "theme": ("主题", "Theme"),
        "title": ("标题", "Title"),
        "description": ("描述文本", "Description text"),
        "content": ("内容", "Content"),
        "src": ("资源地址", "Source URL"),
        "alt": ("替代文本", "Alternative text"),
        "href": ("链接地址", "Hyperlink URL"),
        "target": ("链接打开目标", "Link target"),
        "open": ("是否打开(受控)", "Open state (controlled)"),
        "defaultOpen": ("默认是否打开", "Default open state"),
        "onOpenChange": ("打开状态变化回调", "Callback when open state changes"),
        "visible": ("是否可见", "Whether visible"),
        "loading": ("是否加载中", "Loading state"),
        "items": ("选项/数据项列表", "Items / data list"),
        "data": ("数据源", "Data source"),
        "options": ("可选项列表", "Available options"),
        "columns": ("列配置", "Column configuration"),
        "rows": ("行数据", "Row data"),
        "center": ("地图中心点坐标 [经度, 纬度]", "Map center [lng, lat]"),
        "zoom": ("缩放级别", "Zoom level"),
        "markers": ("标记点数组", "Array of map markers"),
        "height": ("组件高度", "Component height"),
        "width": ("组件宽度", "Component width"),
        "apiKey": ("API 密钥", "API key"),
        "apiVersion": ("API 版本", "API version"),
        "max": ("最大值", "Maximum value"),
        "min": ("最小值", "Minimum value"),
        "step": ("步长", "Step value"),
        "orientation": ("排列方向", "Orientation"),
        "direction": ("排列方向", "Direction"),
        "align": ("对齐方式", "Alignment"),
        "justify": ("主轴对齐", "Main-axis alignment"),
        "gap": ("间距", "Gap between items"),
        "padding": ("内边距", "Padding"),
        "margin": ("外边距", "Margin"),
        "placement": ("弹出位置", "Placement position"),
        "offset": ("偏移量", "Offset"),
        "portalContainer": ("挂载容器", "Portal mount container"),
        "forceMount": ("强制挂载(即使隐藏)", "Force mount even when hidden"),
        "onClose": ("关闭回调", "Close handler"),
        "onSubmit": ("提交回调", "Submit handler"),
        "onSelect": ("选中回调", "Selection handler"),
        "message": ("提示消息内容", "Message content"),
        "duration": ("持续时间/展示时长(毫秒)", "Duration in milliseconds"),
        "type": ("类型", "Type"),
        "status": ("状态", "Status"),
        "level": ("级别", "Level / severity"),
        "icon": ("图标元素", "Icon element"),
        "prefix": ("前缀内容", "Prefix content"),
        "suffix": ("后缀内容", "Suffix content"),
        "addonBefore": ("前置标签", "Addon before input"),
        "addonAfter": ("后置标签", "Addon after input"),
        "allowClear": ("是否允许清空", "Allow clearing value"),
        "showSearch": ("是否支持搜索", "Enable search"),
        "multiple": ("是否多选", "Multiple selection"),
        "maxLength": ("最大输入长度", "Maximum input length"),
        "autoFocus": ("自动聚焦", "Auto focus on mount"),
        "rounded": ("圆角样式", "Border radius style"),
        "fullWidth": ("是否占满父容器宽度", "Take full parent width"),
        "asChild": ("作为子元素渲染(通过 cloneElement)", "Render as child via cloneElement"),
    }

    def _describe(p_name: str, jsdoc: str) -> str:
        """Build a bilingual description cell, escaping pipes."""
        zh, en = "", ""
        if jsdoc:
            if has_chinese(jsdoc):
                zh = jsdoc
            else:
                en = jsdoc
        if not zh and not en:
            zh, en = PROP_NAME_DESC.get(p_name, ("", ""))
        zh = zh.replace("|", "\\|").strip()
        en = en.replace("|", "\\|").strip()
        if zh and en:
            return f"{zh} <br/> {en}"
        return zh or en

    if not props:
        zh_rest = f"透传 `<{extends_html}>` 原生属性" if extends_html else "透传原生属性"
        en_rest = f"Inherits all `<{extends_html}>` attributes" if extends_html else "Passthrough props"
        cn = "| `className` | `string` | — | 自定义样式类名 <br/> Custom CSS class |"
        if extends_html:
            rs = f"| ...rest | `React.ComponentProps<\"{extends_html}\">` | — | {zh_rest} <br/> {en_rest} |"
        else:
            rs = "| ...rest | `React.HTMLAttributes` | — | 透传原生 DOM 属性 <br/> Inherits standard HTML attributes |"
        return cn + "\n" + rs

    # Filter out noise
    noise = {"className", "children", "asChild", "as", "render", "ref"}
    interesting = [p for p in props if p["name"] not in noise and not p["name"].startswith("_")]
    # Show max 15 most relevant props
    if len(interesting) > 15:
        interesting = interesting[:15]

    rows = []
    for p in interesting:
        name = p["name"]
        type_str = p["type"]
        # Clean up type string for MDX table:
        # 1. Replace | separator to avoid breaking table
        type_str = type_str.replace("|", "\\|")
        # 2. Truncate function types
        if "=>" in type_str:
            if "void" in type_str:
                type_str = "() => void"
            else:
                type_str = "(...args) => unknown"
        if "<{" in type_str or "}>" in type_str:
            type_str = re.sub(r'<\{[^}]*\}>', '<T>', type_str)
        # 3. Truncate overly long types
        if len(type_str) > 40:
            type_str = type_str[:37] + "..."
        default = p["default"] if p["default"] else "—"
        # Strip redundant surrounding quotes from defaults like `"11"` (already backticked)
        if isinstance(default, str) and default.startswith('`"') and default.endswith('"`'):
            default = "`" + default[2:-2] + "`"
        desc = _describe(name, p.get("jsdoc", ""))
        rows.append(f"| `{name}` | `{type_str}` | {default} | {desc} |")

    # Always include className
    rows.insert(0, "| `className` | `string` | — | 自定义样式类名 <br/> Custom CSS class |")
    if extends_html:
        rows.append(f"| ...rest | `React.ComponentProps<\"{extends_html}\">` | — | 透传 `<{extends_html}>` 原生属性 <br/> Inherits all `<{extends_html}>` attributes |")
    else:
        rows.append("| ...rest | `React.HTMLAttributes` | — | 透传原生 DOM 属性 <br/> Inherits standard HTML attributes |")

    return "\n".join(rows)


def build_code_examples(primary: str, import_path: str, info: dict, category: str, slug: str = "") -> str:
    """Build richer code examples based on component features."""
    exports = info["exports"]
    main_exports = [e for e in exports if e[0].isupper() and not e.endswith("Props") and not e.endswith("Variants")]
    is_client = info["is_client"]
    has_cva = bool(info["cva"])
    subs = info["sub_components"]
    uses_zod = info["uses_zod"]
    uses_rhf = info["uses_react_hook_form"]

    # Determine primary variant/size axis
    variant_options = []
    size_options = []
    for var_name, axes in info["cva"].items():
        if "variant" in axes:
            variant_options = axes["variant"]["options"]
        if "size" in axes:
            size_options = axes["size"]["options"]

    examples = []

    # Example 1: Basic usage — tailored to compound vs simple
    ex_imports_imported = ", ".join(main_exports[:6]) if subs and len(main_exports) >= 2 else primary

    if subs and len(main_exports) >= 2:
        # Build smarter compound examples based on known patterns
        subs_set = set(main_exports)
        if primary == "Card" or primary.endswith("Card"):
            ex = f'import {{ {", ".join(e for e in ["Card","CardHeader","CardTitle","CardContent","CardFooter"] if e in subs_set or e == "Card")} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>Card Title</CardTitle>\n      </CardHeader>\n      <CardContent>Card content goes here.</CardContent>\n    </Card>\n  )\n}}'
        elif primary in ("Dialog", "AlertDialog", "Drawer", "Sheet", "Modal", "Popover", "HoverCard"):
            trigger = next((e for e in main_exports if "Trigger" in e), None)
            content = next((e for e in main_exports if "Content" in e), None)
            header = next((e for e in main_exports if "Header" in e), None)
            title = next((e for e in main_exports if "Title" in e), None)
            desc = next((e for e in main_exports if "Description" in e), None)
            if trigger and content:
                parts = [primary, trigger, content]
                for p in [header, title, desc]:
                    if p: parts.append(p)
                inner = ""
                if header and title:
                    inner += f"\n      <{header}>\n        <{title}>Title</{title}>"
                    if desc:
                        inner += f"\n        <{desc}>Description.</{desc}>"
                    inner += f"\n      </{header}>"
                ex = f'import {{ {", ".join(parts)} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <{primary}>\n      <{trigger}>Open</{trigger}>\n      <{content}>{inner}\n      </{content}>\n    </{primary}>\n  )\n}}'
            else:
                child = next((e for e in main_exports if e != primary and "Content" in e), main_exports[1] if len(main_exports) > 1 else None)
                ex = f'import {{ {ex_imports_imported} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <{primary}>\n      <{child or "div"}>Content</{child or "div"}>\n    </{primary}>\n  )\n}}'
        elif primary in ("Alert",):
            title_comp = next((e for e in main_exports if "Title" in e), None)
            desc_comp = next((e for e in main_exports if "Description" in e), None)
            parts = [primary] + ([title_comp] if title_comp else []) + ([desc_comp] if desc_comp else [])
            ex = f'import {{ {", ".join(p for p in parts if p)} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <{primary}>\n      {f"<{title_comp}>Title</{title_comp}>" if title_comp else ""}\n      {f"<{desc_comp}>Alert description goes here.</{desc_comp}>" if desc_comp else "<div>Content</div>"}\n    </{primary}>\n  )\n}}'
        elif primary in ("Select", "Combobox", "Autocomplete", "MultiSelect", "TreeSelect"):
            trigger_comp = next((e for e in main_exports if e.endswith("Trigger")), None) or f"{primary}Trigger"
            value_comp = next((e for e in main_exports if "Value" in e), None)
            content_comp = next((e for e in main_exports if e.endswith("Content")), None)
            item_comp = next((e for e in main_exports if e.endswith("Item")), None)
            parts = [p for p in [primary, trigger_comp, value_comp, content_comp, item_comp] if p]
            if content_comp and item_comp:
                trigger_inner = f"<{value_comp} />" if value_comp else "Select..."
                ex = f'import {{ {", ".join(parts)} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <{primary} defaultValue="1">\n      <{trigger_comp}>{trigger_inner}</{trigger_comp}>\n      <{content_comp}>\n        <{item_comp} value="1">Option 1</{item_comp}>\n        <{item_comp} value="2">Option 2</{item_comp}>\n      </{content_comp}>\n    </{primary}>\n  )\n}}'
            else:
                ex = f'import {{ {primary} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary} />\n}}'
        elif primary in ("Tooltip",):
            provider = next((e for e in main_exports if "Provider" in e), None)
            trigger = next((e for e in main_exports if "Trigger" in e), None)
            content = next((e for e in main_exports if "Content" in e), None)
            if provider and trigger and content:
                ex = f'import {{ Tooltip, {provider}, {trigger}, {content} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <{provider}>\n      <Tooltip>\n        <{trigger}>Hover me</{trigger}>\n        <{content}>Tooltip content</{content}>\n      </Tooltip>\n    </{provider}>\n  )\n}}'
            else:
                ex = f'import {{ {ex_imports_imported} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary}>Content</{primary}>\n}}'
        elif "Table" in primary or primary in ("Table",):
            ex = f'import {{ Table, TableHeader, TableBody, TableRow, TableHead, TableCell }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <Table>\n      <TableHeader>\n        <TableRow>\n          <TableHead>Name</TableHead>\n          <TableHead>Status</TableHead>\n        </TableRow>\n      </TableHeader>\n      <TableBody>\n        <TableRow>\n          <TableCell>Item 1</TableCell>\n          <TableCell>Active</TableCell>\n        </TableRow>\n      </TableBody>\n    </Table>\n  )\n}}'
        elif primary in ("Tabs",):
            list_comp = next((e for e in main_exports if "List" in e), None)
            trigger = next((e for e in main_exports if "Trigger" in e), None)
            content = next((e for e in main_exports if "Content" in e), None)
            if list_comp and trigger and content:
                ex = f'import {{ Tabs, {list_comp}, {trigger}, {content} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <Tabs defaultValue="tab1">\n      <{list_comp}>\n        <{trigger} value="tab1">Tab 1</{trigger}>\n        <{trigger} value="tab2">Tab 2</{trigger}>\n      </{list_comp}>\n      <{content} value="tab1">Content 1</{content}>\n      <{content} value="tab2">Content 2</{content}>\n    </Tabs>\n  )\n}}'
            else:
                ex = f'import {{ {primary} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary}>Content</{primary}>\n}}'
        elif primary in ("Accordion", "Collapse"):
            item = next((e for e in main_exports if "Item" in e), None)
            trigger = next((e for e in main_exports if "Trigger" in e), None)
            content = next((e for e in main_exports if "Content" in e), None)
            if item and trigger and content:
                ex = f'import {{ Accordion, {item}, {trigger}, {content} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <Accordion type="single">\n      <{item} value="item-1">\n        <{trigger}>Section 1</{trigger}>\n        <{content}>Content 1</{content}>\n      </{item}>\n    </Accordion>\n  )\n}}'
            else:
                child = main_exports[1] if len(main_exports) > 1 else None
                ex = f'import {{ {ex_imports_imported} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary}><{child}>Content</{child}></{primary}>\n}}'
        else:
            # Generic compound: parent + first child
            child = next((e for e in main_exports if e != primary and "Content" in e), None) or \
                    next((e for e in main_exports if e != primary and "Header" in e), None) or \
                    (main_exports[1] if len(main_exports) > 1 else None)
            ex = f'import {{ {ex_imports_imported} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <{primary}>\n      <{child or "div"}>Content</{child or "div"}>\n    </{primary}>\n  )\n}}'
    elif uses_zod and uses_rhf:
        ex = f'import {{ {primary} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <{primary}\n      onSubmit={{(data) => console.log(data)}}\n    />\n  )\n}}'
    elif is_client and not subs and len(main_exports) > 1:
        # Multiple independent exports in one file (e.g. auth-forms has SignInForm, SignUpForm, ForgotPasswordForm)
        demo_exports = main_exports[:3]
        imp = ", ".join(demo_exports)
        demo_html = "\n".join(f'  <{e} />' for e in demo_exports)
        ex = f'import {{ {imp} }} from "{import_path}"\n\nexport function Basic() {{\n  return (\n    <div className="space-y-4">\n{demo_html}\n    </div>\n  )\n}}'
    elif (is_client or not has_cva) and len(main_exports) <= 1:
        ex = f'import {{ {primary} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary} />\n}}'
    else:
        ex = f'import {{ {primary} }} from "{import_path}"\n\nexport function Basic() {{\n  return <{primary}>Default</{primary}>\n}}'
    examples.append(("基础用法 / Basic Usage", ex))

    # Example 2: Variants
    if variant_options:
        demo_opts = [o for o in variant_options if o not in ("link",)]
        demo_opts = demo_opts[:5]
        label_map = {"default": "Default", "outline": "Outline", "secondary": "Secondary",
                     "ghost": "Ghost", "destructive": "Destructive", "primary": "Primary",
                     "info": "Info", "success": "Success", "warning": "Warning", "error": "Error"}
        demo_html = "\n".join(
            f'  <{primary} variant="{o}">{label_map.get(o, o.capitalize())}</{primary}>'
            for o in demo_opts
        )
        ex = f'{{/* 展示 variant 变体 */}}\n<div className="flex flex-wrap items-center gap-3">\n{demo_html}\n</div>'
        examples.append(("变体 / Variants", ex))

    # Example 3: Sizes
    if size_options:
        text_sizes = [s for s in size_options if not s.startswith("icon")]
        demo_sizes = [s for s in ["xs", "sm", "default", "lg"] if s in text_sizes]
        if demo_sizes and len(demo_sizes) >= 2:
            label_map = {"xs": "Xs", "sm": "Sm", "default": "Default", "lg": "Lg"}
            demo_html = "\n".join(
                f'  <{primary} size="{s}">{label_map.get(s, s.capitalize())}</{primary}>'
                for s in demo_sizes
            )
            ex = f'{{/* 尺寸对照 */}}\n<div className="flex flex-wrap items-center gap-3">\n{demo_html}\n</div>'
            examples.append(("尺寸 / Sizes", ex))
        icon_sizes = [s for s in size_options if s.startswith("icon")]
        if icon_sizes:
            demo_is = "\n".join(f'  <{primary} size="{s}>↻</{primary}>' for s in icon_sizes[:4])
            ex = f'{{/* 图标尺寸 */}}\n<div className="flex flex-wrap items-center gap-3">\n{demo_is}\n</div>'
            # don't add a separate icon size example — it adds too much noise for a draft

    # Example 4: States — only for truly interactive components
    interactive_keywords = ("button", "input", "select", "checkbox", "radio", "switch", "slider",
                           "textarea", "upload", "autocomplete", "combobox", "multi-select",
                           "tree-select", "browse-input", "date-picker", "time-picker",
                           "color-picker", "input-number", "otp", "rate", "toggle", "stepper",
                           "tabs", "segmented", "calendar", "pagination")
    is_interactive = slug in interactive_keywords or any(slug.startswith(k + "-") for k in interactive_keywords)
    if is_client and is_interactive:
        ex = f'<{primary}>Normal</{primary}>\n<{primary} disabled>Disabled</{primary}>'
        examples.append(("状态 / States", ex))

    mdx = ""
    for title, code in examples:
        # Escape backticks in code for template literal
        code_escaped = code.replace('`', '\\`').replace('${', '\\${')
        mdx += f"\n### {title}\n\n<CodeBlock code={{`{code_escaped}`}} lang=\"tsx\" />\n"
    return mdx


def generate_mdx(entry: dict, info: dict) -> str:
    name = entry["name"]
    slug = entry["slug"]
    category = entry["category"]
    nameZh = entry["nameZh"]
    source_path = entry.get("sourcePath", "")

    import_path = "@/components/" + source_path.split("components/", 1)[1].replace(".tsx", "").replace(".ts", "")

    exports = info["exports"]
    primary = info.get("primary", name)
    main_exports = [e for e in exports if e[0].isupper() and not e.endswith("Props") and not e.endswith("Variants")]
    if primary not in main_exports and main_exports:
        primary = main_exports[0]
    import_names = main_exports[:4] if len(main_exports) <= 4 else [primary]
    import_line = f'import {{ {", ".join(import_names)} }} from "{import_path}"'

    codeblock_import = '\nimport { CodeBlock } from "@/components/code-block"' if slug != "code-block" and "CodeBlock" not in import_names else ""

    # Title
    title_line = f"# {name}" + (f" {nameZh}" if nameZh and nameZh != name else "")

    # Descriptions
    nameZh_cn, descZh, descEn = guess_component_description(slug, category, read_source(source_path), name, nameZh, primary=primary)
    if nameZh_cn and nameZh_cn != nameZh:
        nameZh = nameZh_cn
        title_line = f"# {name} {nameZh}"

    cat_zh, cat_en = CAT_DESC.get(category, ("组件", "Component"))

    # When to use
    when_map = {
        "button": ("点击触发操作,如提交表单、打开弹窗、确认/取消操作。", "Clicking triggers an action such as form submission, opening a dialog, or confirming/cancelling."),
        "input": ("需要用户通过键盘输入文本内容(用户名、搜索词、单行描述等)。", "User needs to enter text via keyboard (username, search, single-line descriptions, etc.)."),
        "dialog": ("需要用户处理重要事务,且不希望跳转页面打断工作流时使用模态框。", "Use a modal when the user must handle a critical task without leaving the current workflow."),
        "card": ("将相关信息聚合展示,如商品、文章、用户等。", "Group related information such as products, articles, or users."),
        "form": ("需要收集、校验、提交用户输入的结构化数据。", "Collect, validate, and submit structured user input."),
        "table": ("展示结构化行列数据,支持排序、筛选、分页。", "Display structured tabular data with sorting, filtering, and pagination."),
        "select": ("从一组预设选项中选择单个值,选项过多时配合搜索使用。", "Pick a single value from a predefined list; use search when options are many."),
        "badge": ("用于状态、标签、计数、分类等附属信息展示。", "Display status, tags, counts, or categorizations as compact pills."),
        "avatar": ("展示用户头像、实体缩略图或品牌 Logo。", "Show a user avatar, entity thumbnail, or brand logo."),
        "alert": ("向用户显示重要提示、警告、错误或成功反馈信息。", "Show important notices, warnings, errors, or success feedback."),
        "tooltip": ("鼠标悬停时展示补充说明信息,不占用常驻版面。", "Reveal supplementary information on hover without occupying permanent space."),
        "tabs": ("在同一块区域切换多个平级内容面板,保持上下文连贯。", "Switch between multiple sibling content panels while preserving context."),
        "breadcrumb": ("显示当前页面在层级结构中的位置,支持快速返回上级。", "Indicate the current page location in a hierarchy and provide upward navigation."),
        "pagination": ("对大量数据进行分页浏览,避免一次渲染过多内容。", "Split large datasets into pages to avoid rendering too much at once."),
        "drawer": ("从屏幕边缘滑出的面板,用于承载详情、表单或配置,不打断主流程。", "A panel sliding from the screen edge for details, forms, or configurations without interrupting the main flow."),
        "sheet": ("抽屉式面板的别名,常用于移动端临时内容层。", "Alias for drawer-style panels; often used for temporary layers on mobile."),
        "popover": ("点击触发元素弹出的浮动层,承载轻量操作或信息。", "A floating layer triggered by click for lightweight actions or information."),
        "dropdown-menu": ("点击触发弹出的下拉菜单,收纳一组操作命令。", "A dropdown listing action commands triggered by a click."),
        "checkbox": ("在一组选项中进行多选,或标记单个二元状态。", "Select multiple items from a group, or toggle a single binary state."),
        "radio": ("在一组互斥选项中选择唯一值。", "Pick a single value from a mutually exclusive set."),
        "switch": ("两种状态之间的切换,典型用于开/关、启用/禁用。", "Toggle between two states, typically on/off or enabled/disabled."),
        "slider": ("在一个连续或离散区间内通过拖拽选择数值。", "Select a value from a continuous or discrete range via dragging."),
        "textarea": ("输入多行文本,如评论、反馈、详细描述。", "Enter multi-line text such as comments, feedback, or detailed descriptions."),
        "progress": ("展示操作的当前完成进度,提供过程反馈。", "Show current completion progress of an operation."),
        "skeleton": ("数据加载中时占位,降低感知等待时间。", "Provide placeholder UI while data loads to reduce perceived wait time."),
        "spinner": ("操作进行中时显示加载状态。", "Indicate an in-progress operation."),
        "toast": ("全局轻量提示消息,用于操作成功/失败反馈,自动消失。", "Lightweight global messages for operation feedback that auto-dismiss."),
        "separator": ("在视觉上分隔内容区域或菜单项。", "Visually separate content regions or menu items."),
        "accordion": ("折叠面板展示大量可分组内容,按需展开查看。", "Display grouped content that users can expand or collapse as needed."),
        "date-picker": ("选择单个日期。", "Select a single date."),
        "date-range-picker": ("选择日期范围。", "Select a date range."),
        "calendar": ("以日历面板方式展示/选择日期。", "Display or select dates via a calendar panel."),
        "file-input": ("选择本地文件进行上传。", "Select local files for upload."),
        "label": ("为表单控件提供可访问的文本标签。", "Provide an accessible text label for a form control."),
        "multi-select": ("从预设选项中选择多个值。", "Select multiple values from a predefined list."),
        "tree-select": ("在树形层级结构中选择节点。", "Select a node from a hierarchical tree structure."),
        "command": ("命令面板/快捷键搜索,通过输入快速定位命令或内容。", "A command palette for quick search and navigation via keyboard input."),
        "rich-text-editor": ("提供带格式的富文本编辑能力(加粗、列表、链接等)。", "Provide formatted rich-text editing (bold, lists, links, etc.)."),
        "map-view": ("在页面中嵌入地图,展示标记点、轨迹和位置信息。", "Embed a map showing markers, tracks, and location information."),
        "video-player": ("播放视频内容,支持播放/暂停、进度条、音量控制。", "Play video content with play/pause, progress, and volume controls."),
        "auth-forms": ("登录、注册、找回密码等认证相关表单。", "Authentication forms for sign-in, sign-up, and password recovery."),
        "sign-in-form": ("用户登录表单,支持账号密码登录。", "User sign-in form supporting account/password login."),
        "sign-up-form": ("用户注册/创建账号表单。", "User sign-up/account creation form."),
        "forgot-password-form": ("忘记密码/重置密码表单。", "Forgot-password / password-reset form."),
        "address-form": ("收件地址填写与编辑表单。", "Address entry and editing form."),
        "payment-form": ("订单支付信息填写表单。", "Payment information form for orders."),
        "file-upload": ("文件上传组件,支持拖拽、批量上传和进度反馈。", "File upload supporting drag & drop, batch upload, and progress feedback."),
        "data-table": ("业务数据表格,支持排序、筛选、分页和行操作。", "Business data table with sorting, filtering, pagination, and row actions."),
        "search-bar": ("顶部/页面级搜索输入,带搜索建议或历史记录。", "Page-level search input with suggestions or history."),
        "notification-center": ("站内消息/通知聚合列表,展示未读/已读状态。", "In-app notification center listing unread/read messages."),
        "approval-flow": ("审批流程展示与操作,查看节点、同意/拒绝。", "Approval workflow display with node view and approve/reject actions."),
        "kanban-board": ("看板视图,以列和卡片形式展示任务/工单。", "Kanban view showing tasks/tickets as cards across columns."),
        "stat-card": ("关键业务指标的卡片式展示,含数值、趋势、对比。", "Card-style KPI display with value, trend, and comparison."),
        "onboarding-checklist": ("新手引导任务清单,引导用户完成关键步骤。", "Onboarding checklist guiding users through key steps."),
        "dashboard-layout": ("仪表盘页面整体布局(侧边栏+头部+内容区)。", "Overall dashboard page layout (sider + header + content area)."),
        "app-shell": ("应用外壳,提供顶部导航、侧边栏、主区域布局。", "Application shell providing top nav, sidebar, and main area."),
        "detail-layout": ("详情页布局,支持分栏、描述列表、标签页。", "Detail page layout supporting split columns, description lists, and tabs."),
        "qr-code": ("生成并展示二维码。", "Generate and display a QR code."),
        "otp-field": ("一次性验证码/短信验证码输入。", "One-time password / SMS verification code input."),
        "password-strength": ("实时显示密码强度提示。", "Show real-time password strength indicators."),
        "transfer": ("穿梭框,在左右两栏之间移动候选项进行选择。", "Transfer items between two columns to make a selection."),
    }
    if slug in when_map:
        when_zh, when_en = when_map[slug]
    else:
        # Build a more natural fallback using category + Chinese nameZh
        if nameZh and not nameZh[0].isascii():
            when_zh = f"需要{nameZh}功能时使用本组件。"
        else:
            when_zh = f"适用于{nameZh}相关场景。"
        # Convert PascalCase name to space-separated for friendlier English
        name_en = re.sub(r'(?<!^)(?=[A-Z])', ' ', name).lower()
        # Add "an" for vowel sounds
        article = "an" if name_en[0] in "aeiou" else "a"
        when_en = f"Use when you need {article} {name_en}."

    # Examples
    examples_mdx = build_code_examples(primary, import_path, info, category, slug=slug)

    # Variant tables
    variant_mdx = build_variant_tables(info["cva"])

    # Props table
    props_mdx = build_props_table(info["props"], primary, info.get("extends_html"))

    # Notes
    notes = []
    if info["is_client"]:
        notes.append("- **Client Component**: 使用 `\"use client\"`,依赖 React hooks/状态,需在客户端渲染。")
    if info["cva"]:
        notes.append("- **CVA 变体**: 通过 `class-variance-authority` 管理样式变体,类型安全。变体对象可导出复用。")
    if info["sub_components"] and len(info["sub_components"]) >= 1:
        notes.append(f"- **复合组件**: 包含 {len(info['sub_components'])} 个子组件({', '.join(info['sub_components'][:5])}{'…' if len(info['sub_components']) > 5 else ''}),使用组合模式按需导入。")
    if info["extends_html"]:
        notes.append(f"- **原生属性**: 继承所有 `<{info['extends_html']}>` 原生 HTML 属性。")
    if info["uses_base_ui"]:
        notes.append("- **Base UI**: 基于 `@base-ui/react` 无头(headless)原语构建,无障碍(a11y)开箱即用。")
    if info["uses_zod"] and info["uses_react_hook_form"]:
        notes.append("- **表单校验**: 集成 `zod` + `react-hook-form`,支持类型安全的表单校验与提交。")
    elif info["uses_react_hook_form"]:
        notes.append("- **表单集成**: 集成 `react-hook-form`,受控/非受控模式均可。")
    if not notes:
        notes.append("- **无障碍**: 组件遵循 WAI-ARIA 最佳实践。")
    notes_mdx = "\n".join(notes)

    # Storybook link — use entry's storybookId if available
    sb_id = entry.get("storybookId") or f"components-{slug}--docs"

    mdx = f"""{import_line}{codeblock_import}

{title_line}

> {cat_zh} / {cat_en}

{descZh}
{descEn}

## 何时使用 / When to Use

{when_zh}

{when_en}

## 代码示例 / Examples
{examples_mdx}
"""

    if variant_mdx:
        mdx += f"\n## 样式变体 / Style Variants\n\n{variant_mdx}\n"

    mdx += f"""
## API / Props

### {primary}

| Prop | Type | Default | 说明 / Description |
|---|---|---|---|
{props_mdx}

## 注意事项 / Notes

{notes_mdx}

> 📘 完整交互式示例与控件属性请查看 [Storybook 文档](?path=/docs/{sb_id})。
"""
    return mdx


def build_story_title_map() -> dict:
    """Scan all story files and build {component_name: story_title} map.
    Maps both the title-derived name AND the 'component:' field value
    to handle naming quirks like OTPField vs OtpField, QRCode vs Qrcode."""
    title_map = {}
    story_roots = [
        ROOT / "apps/docs/src" / "components",
        ROOT / "apps/docs/src" / "business",
        ROOT / "apps/docs/src" / "layouts",
        ROOT / "apps/docs/src" / "mobile",
    ]
    for src_dir in story_roots:
        if not src_dir.exists():
            continue
        for sf_path in sorted(src_dir.rglob("*.stories.tsx")):
            content = sf_path.read_text()
            titles = re.findall(r'title:\s*"([^"]+)"', content)
            for t in titles:
                comp_name = t.split("/")[-1]
                if comp_name not in title_map:
                    title_map[comp_name] = t
            # Also map from 'component:' field for robust matching
            comp_exprs = re.findall(r'component:\s*(\w+)', content)
            for ce in comp_exprs:
                if ce not in title_map and titles:
                    title_map[ce] = titles[0]
    return title_map


def title_to_storybook_id(title: str) -> str:
    """Storybook CSF id generation matching Storybook 7 behavior.
    Lowercase + '/' and space to '-' + strip non-alphanumeric (keep '-') + collapse."""
    s = title.lower()
    s = re.sub(r"[\s/]+", "-", s)
    s = re.sub(r"[^a-z0-9-]", "", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return f"{s}--docs"


def discover_sources() -> list:
    components = []
    seen_slugs = set()

    # Build story title map for correct storybookId generation
    story_title_map = build_story_title_map()

    # Iterate in priority order: ui first, then layout, then business, then mobile.
    # When a slug exists in multiple folders (e.g. both ui/anchor.tsx and business/anchor.tsx),
    # the business version wins because it is the higher-level wrapper.
    for subfolder in ["ui", "layout", "business", "mobile"]:
        src_dir = SOURCE_ROOT / subfolder
        if not src_dir.exists():
            continue
        for path in sorted(src_dir.rglob("*.tsx")):
            if path.name.endswith(".test.tsx") or path.name.endswith(".spec.tsx"):
                continue
            if path.name.startswith("_") or path.name.startswith("index."):
                continue
            # Compute relative path using SOURCE_PREFIX
            rel_to_root = path.relative_to(ROOT)
            rel_str = str(rel_to_root)
            slug = str(path.with_suffix("")).replace(str(SOURCE_ROOT) + "/", "").replace("ui/", "").replace("business/", "").replace("layout/", "").replace("mobile/", "").replace("/", "-")
            # Read content once for all checks
            content = path.read_text()
            # Skip pure re-export shims (e.g. business/combobox.tsx that just re-exports from ui/)
            non_blank_lines = [l for l in content.splitlines() if l.strip() and not l.strip().startswith("//")]
            is_reexport_shim = (
                len(non_blank_lines) <= 3
                and re.search(r'export\s+(?:\*|\{[^}]*\})\s+from\s+"@/', content)
            )
            if is_reexport_shim:
                continue  # Skip shim; the ui version will be the canonical entry
            if slug.startswith("_") or "shared" in slug or "helpers" in slug:
                if not re.search(
                    r'export\s+(?:\{[^}]*\b[A-Z][A-Za-z0-9_]*\b|default\s+[A-Z]|function\s+[A-Z]|const\s+[A-Z])',
                    content,
                ):
                    continue
            category = categorize(slug, subfolder)
            name = slug_to_pascal(path.stem)
            # Chinese name
            if slug in RICH_DESC:
                nameZh = RICH_DESC[slug][0]
            elif slug in BUSINESS_ZH:
                nameZh = BUSINESS_ZH[slug]
            else:
                nameZh = slug.replace("-", " ").title()
            source_path = f"{SOURCE_PREFIX}{rel_str}"
            # Generate storybookId from story title if available, otherwise None
            story_title = story_title_map.get(name)
            if story_title:
                storybook_id = title_to_storybook_id(story_title)
            else:
                storybook_id = None  # No story exists — don't generate a dead link
            entry = {
                "slug": slug,
                "name": name,
                "nameZh": nameZh,
                "category": category,
                "sourcePath": source_path,
                "storybookId": storybook_id,
            }
            if slug in seen_slugs:
                # Replace previous entry with this one (later subfolders win)
                components = [c for c in components if c["slug"] != slug]
            components.append(entry)
            seen_slugs.add(slug)
    return components


def write_meta(components: list):
    """Write components.meta.ts with bilingual descriptions."""
    # Pre-compute descriptions for each component
    items = []
    for entry in components:
        slug = entry["slug"]
        category = entry["category"]
        name = entry["name"]
        nameZh = entry["nameZh"]
        source_content = read_source(entry["sourcePath"])
        # We need the primary export for better description
        info = analyze_source(entry["sourcePath"], name, category)
        primary = info.get("primary", name)
        try:
            _, descZh, descEn = guess_component_description(slug, category, source_content, name, nameZh, primary=primary)
        except Exception:
            descZh = f"{nameZh} — Chaos UI 组件。"
            descEn = f"{name} — Chaos UI component."
        items.append({
            "slug": slug,
            "name": name,
            "nameZh": nameZh,
            "category": category,
            "desc": descEn.replace("'", "\\'").replace('"', '\\"').replace("\n", " "),
            "descZh": descZh.replace("'", "\\'").replace('"', '\\"').replace("\n", " "),
            "sourcePath": entry["sourcePath"],
            "storybookId": entry["storybookId"],
        })

    lines = [
        "// Auto-generated by scripts/enhanced-bootstrap.py. Do not edit manually.",
        "",
        "export type Category =",
        "  | 'General'",
        "  | 'Layout'",
        "  | 'Navigation'",
        "  | 'Form'",
        "  | 'DataDisplay'",
        "  | 'Feedback'",
        "  | 'Business'",
        "  | 'System Layout'",
        "",
        "export interface ComponentMeta {",
        "  /** kebab-case identifier used in the URL /components/[category]/[slug] */",
        "  slug: string",
        "  /** PascalCase component export name */",
        "  name: string",
        "  /** Chinese display name */",
        "  nameZh: string",
        "  /** One of the 8 product categories */",
        "  category: Category",
        "  /** one-sentence English description */",
        "  desc: string",
        "  /** one-sentence Chinese description */",
        "  descZh: string",
        "  /** relative path to source file under packages/chaos-design-ui/ */",
        "  sourcePath: string",
        "  /** Storybook autodocs id, e.g. `components-button--docs`. */",
        "  storybookId?: string",
        "}",
        "",
        "export const CATEGORIES: Category[] = [",
        "  'General', 'Layout', 'Navigation', 'Form', 'DataDisplay', 'Feedback', 'Business', 'System Layout',",
        "]",
        "",
        "export const categoryLabelsZh: Record<Category, string> = {",
        "  General: '通用', Layout: '布局', Navigation: '导航', Form: '表单',",
        "  DataDisplay: '数据展示', Feedback: '反馈', Business: '业务', 'System Layout': '系统布局',",
        "}",
        "",
        "export const categoryLabelsEn: Record<Category, string> = {",
        "  General: 'General', Layout: 'Layout', Navigation: 'Navigation', Form: 'Form',",
        "  DataDisplay: 'Data Display', Feedback: 'Feedback', Business: 'Business', 'System Layout': 'System Layout',",
        "}",
        "",
        "export const components: ComponentMeta[] = [",
    ]
    for it in items:
        lines.append("  {")
        lines.append(f"    slug: '{it['slug']}',")
        lines.append(f"    name: \"{it['name']}\",")
        lines.append(f"    nameZh: \"{it['nameZh']}\",")
        lines.append(f"    category: '{it['category']}',")
        lines.append(f"    desc: \"{it['desc']}\",")
        lines.append(f"    descZh: \"{it['descZh']}\",")
        lines.append(f"    sourcePath: '{it['sourcePath']}',")
        sb_val = it['storybookId']
        sb_line = "    storybookId: undefined," if sb_val is None else f"    storybookId: '{sb_val}',"
        lines.append(sb_line)
        lines.append("  },")
    lines.append("]")
    lines.append("")

    meta_path = CONTENT_DIR / "components.meta.ts"
    meta_path.write_text("\n".join(lines))
    print(f"\nWrote components.meta.ts with {len(items)} entries → {meta_path}")


def main():
    print("=" * 60)
    print("Enhanced MDX documentation generator")
    print("=" * 60)

    components = discover_sources()
    print(f"\nDiscovered {len(components)} source components")

    cats = {}
    for c in components:
        cats[c["category"]] = cats.get(c["category"], 0) + 1
    for c, n in sorted(cats.items()):
        print(f"  {c}: {n}")

    generated = 0
    failed = []

    cat_dir_map = {
        "Business": "Business", "DataDisplay": "DataDisplay", "Feedback": "Feedback",
        "Form": "Form", "General": "General", "Layout": "Layout",
        "Navigation": "Navigation", "System Layout": "System Layout",
    }

    for entry in components:
        slug = entry["slug"]
        category = entry["category"]
        dir_name = cat_dir_map.get(category, category)
        out_dir = CONTENT_DIR / dir_name
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f"{slug}.mdx"

        info = analyze_source(entry["sourcePath"], entry["name"], category)
        try:
            mdx = generate_mdx(entry, info)
            out_path.write_text(mdx)
            generated += 1
            if generated % 50 == 0:
                print(f"  ... generated {generated}/{len(components)}")
        except Exception as e:
            failed.append((slug, str(e)))
            print(f"  FAIL {slug}: {e}")

    print(f"\nDone! Generated/updated: {generated}, Failed: {len(failed)}")
    if failed:
        for s, e in failed[:10]:
            print(f"  {s}: {e}")

    # Write components.meta.ts
    write_meta(components)

    # Sync barrel index.ts files to docs proxy (so Turbopack can resolve
    # import { X } from "@/components/ui" in Docker builds)
    synced_barrels = 0
    for subfolder in ["ui", "business", "layout", "mobile"]:
        src_idx = ROOT / "components" / subfolder / "index.ts"
        if src_idx.exists():
            dst_idx = DOCS_ROOT / subfolder / "index.ts"
            dst_idx.parent.mkdir(parents=True, exist_ok=True)
            dst_idx.write_text(src_idx.read_text())
            synced_barrels += 1
            print(f"  Synced barrel: {subfolder}/index.ts")
    if synced_barrels:
        print(f"Synced {synced_barrels} barrel index.ts files")

    # Print sample
    print("\n=== Sample MDX (button) ===")
    sample = CONTENT_DIR / "General" / "button.mdx"
    if sample.exists():
        print(sample.read_text()[:1500])


if __name__ == "__main__":
    main()
