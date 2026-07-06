# Migration Guide

## Migrating from antd to Chaos UI

### Component Mapping

| antd                       | Chaos UI                          | Notes                            |
| -------------------------- | --------------------------------- | -------------------------------- |
| `Button`                   | `Button`                          | Direct replacement               |
| `Input` / `Input.TextArea` | `Input` / `Textarea`              | Direct replacement               |
| `Select`                   | `Select`                          | Use `options` prop               |
| `Modal`                    | `Dialog`                          | Different API                    |
| `Form` / `Form.Item`       | `Form` / `FormField`              | react-hook-form based            |
| `Table`                    | `DataTable` / `AdvancedDataTable` | @tanstack/react-table            |
| `Tabs`                     | `Tabs`                            | Direct replacement               |
| `Drawer`                   | `Drawer`                          | Direct replacement               |
| `message`                  | `toast` (sonner)                  | `import { toast } from "sonner"` |
| `notification`             | `NotificationCenter`              | Component-based                  |
| `Upload`                   | `FileUpload`                      | react-dropzone based             |
| `DatePicker`               | `DatePicker` / `DateRangePicker`  | react-day-picker                 |
| `Steps`                    | `Stepper`                         | Direct replacement               |
| `Spin`                     | `Spin`                            | Direct replacement               |
| `Tag`                      | `Chip` / `Badge`                  | Use `Chip` for removable tags    |
| `Avatar`                   | `Avatar`                          | Direct replacement               |
| `Breadcrumb`               | `Breadcrumb`                      | Direct replacement               |
| `Tooltip`                  | `Tooltip`                         | Direct replacement               |
| `Popover`                  | `Popover`                         | Direct replacement               |
| `Progress`                 | `Progress`                        | Direct replacement               |
| `Timeline`                 | `Timeline`                        | Direct replacement               |
| `Tree`                     | `TreeView`                        | Direct replacement               |
| `Transfer`                 | `Transfer`                        | Direct replacement               |
| `Rate`                     | `Rating`                          | Direct replacement               |
| `Switch`                   | `Switch`                          | Direct replacement               |
| `Slider`                   | `Slider`                          | Direct replacement               |
| `Space`                    | `Space`                           | Direct replacement               |
| `Row` / `Col`              | `Row` / `Col` / `Grid`            | Direct replacement               |
| `Divider`                  | `Divider`                         | Direct replacement               |
| `Empty`                    | `EmptyState`                      | Different API                    |
| `Result`                   | `ErrorPage`                       | Different API                    |
| `ConfigProvider`           | `ConfigProvider`                  | Direct replacement               |

### Key API Differences

1. **Forms**: antd uses `Form.useForm()`, Chaos UI uses `react-hook-form` with `Form` + `FormField`
2. **Messages**: antd uses `message.success()`, Chaos UI uses `toast.success()` from sonner
3. **Theme**: antd uses `ConfigProvider` with `theme` prop, Chaos UI uses CSS custom properties
4. **Icons**: antd uses `@ant-design/icons`, Chaos UI uses `lucide-react` (wrapped in `@/components/ui/icons`)

### Migration Steps

1. Install `@chaos_team/chaos-ui` and import `styles.css`
2. Replace component imports one by one
3. Replace `message.*` with `toast.*`
4. Replace antd `Form` with `react-hook-form` + `Form` / `FormField`
5. Test each page after migration
6. Remove antd dependency when fully migrated
