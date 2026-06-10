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
      { title: "Button", href: "/styleguide/components/button" },
      { title: "Input", href: "/styleguide/components/input" },
      { title: "Select", href: "/styleguide/components/select" },
      { title: "Checkbox & Radio", href: "/styleguide/components/checkbox-radio" },
      { title: "Switch", href: "/styleguide/components/switch" },
      { title: "Textarea", href: "/styleguide/components/textarea" },
      { title: "Badge", href: "/styleguide/components/badge" },
      { title: "Avatar", href: "/styleguide/components/avatar" },
      { title: "Card", href: "/styleguide/components/card" },
      { title: "Table", href: "/styleguide/components/table" },
      { title: "Tabs", href: "/styleguide/components/tabs" },
      { title: "Dialog", href: "/styleguide/components/dialog" },
      { title: "Sheet", href: "/styleguide/components/sheet" },
      { title: "Tooltip", href: "/styleguide/components/tooltip" },
      { title: "Toast", href: "/styleguide/components/toast" },
      { title: "Skeleton", href: "/styleguide/components/skeleton" },
      { title: "Progress", href: "/styleguide/components/progress" },
      { title: "Pagination", href: "/styleguide/components/pagination" },
      { title: "Separator", href: "/styleguide/components/separator" },
      { title: "Accordion", href: "/styleguide/components/accordion" },
      { title: "Dropdown Menu", href: "/styleguide/components/dropdown-menu" },
      { title: "Toggle", href: "/styleguide/components/toggle" },
    ],
  },
  {
    title: "Business",
    items: [
      { title: "StatusTag", href: "/styleguide/business/status-tag" },
      { title: "PageHeader", href: "/styleguide/business/page-header" },
      { title: "EmptyState", href: "/styleguide/business/empty-state" },
      { title: "FormField", href: "/styleguide/business/form-field" },
      { title: "DataTable", href: "/styleguide/business/data-table" },
      { title: "StatCard", href: "/styleguide/business/stat-card" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { title: "List Page", href: "/styleguide/patterns/list-page" },
      { title: "Detail Page", href: "/styleguide/patterns/detail-page" },
      { title: "Form Page", href: "/styleguide/patterns/form-page" },
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
