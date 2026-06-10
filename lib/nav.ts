export interface NavItem {
  title: string;
  href: string;
  description?: string;
  items?: NavItem[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const styleguideNav: NavGroup[] = [
  {
    title: "Design Tokens",
    items: [
      { title: "Colors", href: "/styleguide/tokens/colors", description: "Brand, semantic, and neutral color palettes" },
      { title: "Typography", href: "/styleguide/tokens/typography", description: "Font families, sizes, weights, and line heights" },
      { title: "Spacing", href: "/styleguide/tokens/spacing", description: "Spacing scale and layout grid" },
      { title: "Radius", href: "/styleguide/tokens/radius", description: "Border radius tokens" },
      { title: "Shadow", href: "/styleguide/tokens/shadow", description: "Elevation and shadow system" },
      { title: "Motion", href: "/styleguide/tokens/motion", description: "Animation curves and durations" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Alert", href: "/styleguide/components/alert" },
      { title: "Alert Dialog", href: "/styleguide/components/alert-dialog" },
      { title: "Accordion", href: "/styleguide/components/accordion" },
      { title: "Avatar", href: "/styleguide/components/avatar" },
      { title: "Badge", href: "/styleguide/components/badge" },
      { title: "Breadcrumb", href: "/styleguide/components/breadcrumb" },
      { title: "Button", href: "/styleguide/components/button" },
      { title: "Calendar", href: "/styleguide/components/calendar" },
      { title: "Card", href: "/styleguide/components/card" },
      { title: "Checkbox & Radio", href: "/styleguide/components/checkbox-radio" },
      { title: "Collapsible", href: "/styleguide/components/collapsible" },
      { title: "Color Picker", href: "/styleguide/components/color-picker" },
      { title: "Command", href: "/styleguide/components/command" },
      { title: "Dialog", href: "/styleguide/components/dialog" },
      { title: "Drawer", href: "/styleguide/components/drawer" },
      { title: "Dropdown Menu", href: "/styleguide/components/dropdown-menu" },
      { title: "File Upload", href: "/styleguide/components/file-upload" },
      { title: "Hover Card", href: "/styleguide/components/hover-card" },
      { title: "Input", href: "/styleguide/components/input" },
      { title: "Input Group", href: "/styleguide/components/input-group" },
      { title: "Label", href: "/styleguide/components/label" },
      { title: "Navigation Menu", href: "/styleguide/components/navigation-menu" },
      { title: "Pagination", href: "/styleguide/components/pagination" },
      { title: "Popover", href: "/styleguide/components/popover" },
      { title: "Progress", href: "/styleguide/components/progress" },
      { title: "Scroll Area", href: "/styleguide/components/scroll-area" },
      { title: "Select", href: "/styleguide/components/select" },
      { title: "Separator", href: "/styleguide/components/separator" },
      { title: "Sheet", href: "/styleguide/components/sheet" },
      { title: "Sidebar", href: "/styleguide/components/sidebar" },
      { title: "Skeleton", href: "/styleguide/components/skeleton" },
      { title: "Stepper", href: "/styleguide/components/stepper" },
      { title: "Switch", href: "/styleguide/components/switch" },
      { title: "Table", href: "/styleguide/components/table" },
      { title: "Tabs", href: "/styleguide/components/tabs" },
      { title: "Tags Input", href: "/styleguide/components/tags-input" },
      { title: "Textarea", href: "/styleguide/components/textarea" },
      { title: "Timeline", href: "/styleguide/components/timeline" },
      { title: "Toast", href: "/styleguide/components/toast" },
      { title: "Toggle", href: "/styleguide/components/toggle" },
      { title: "Tooltip", href: "/styleguide/components/tooltip" },
    ],
  },
  {
    title: "Business",
    items: [
      { title: "Activity Feed", href: "/styleguide/business/activity-feed" },
      { title: "Advanced Data Table", href: "/styleguide/business/advanced-data-table" },
      { title: "Chart", href: "/styleguide/business/chart" },
      { title: "Data Table", href: "/styleguide/business/data-table" },
      { title: "Empty State", href: "/styleguide/business/empty-state" },
      { title: "File Upload Manager", href: "/styleguide/business/file-upload-manager" },
      { title: "Filter Builder", href: "/styleguide/business/filter-builder" },
      { title: "Form Field", href: "/styleguide/business/form-field" },
      { title: "Form Wizard", href: "/styleguide/business/form-wizard" },
      { title: "Kanban Board", href: "/styleguide/business/kanban-board" },
      { title: "KPI Card", href: "/styleguide/business/kpi-card" },
      { title: "Page Header", href: "/styleguide/business/page-header" },
      { title: "Stat Card", href: "/styleguide/business/stat-card" },
      { title: "Status Tag", href: "/styleguide/business/status-tag" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { title: "Dashboard", href: "/styleguide/patterns/dashboard" },
      { title: "Kanban", href: "/styleguide/patterns/kanban" },
      { title: "List Page", href: "/styleguide/patterns/list-page" },
      { title: "Detail Page", href: "/styleguide/patterns/detail-page" },
      { title: "Form Page", href: "/styleguide/patterns/form-page" },
      { title: "Settings", href: "/styleguide/patterns/settings" },
      { title: "Wizard", href: "/styleguide/patterns/wizard" },
      { title: "Error States", href: "/styleguide/patterns/error-states" },
    ],
  },
  {
    title: "Layouts",
    items: [
      { title: "Dashboard", href: "/styleguide/layouts/dashboard" },
      { title: "Auth", href: "/styleguide/layouts/auth" },
      { title: "Detail", href: "/styleguide/layouts/detail" },
    ],
  },
];

export function findNavItem(href: string): NavItem | undefined {
  for (const group of styleguideNav) {
    for (const item of group.items) {
      if (item.href === href) return item;
      if (item.items) {
        const found = item.items.find((sub) => sub.href === href);
        if (found) return found;
      }
    }
  }
  return undefined;
}
