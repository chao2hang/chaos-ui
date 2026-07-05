"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { SearchIcon, XIcon, BuildingIcon, ChevronRightIcon } from "lucide-react"

interface Department {
  id: string
  name: string
  code?: string
  parentId?: string
  children?: Department[]
  level?: number
}

interface DepartmentBrowseProps {
  value?: Department | Department[]
  defaultValue?: Department | Department[]
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  maxCount?: number
  departments?: Department[]
  onChange?: (value: Department | Department[] | undefined) => void
  className?: string
}

const defaultDepartments: Department[] = [
  {
    id: "1",
    name: "Head Office",
    code: "HQ",
    children: [
      {
        id: "1-1",
        name: "Engineering",
        code: "ENG",
        parentId: "1",
        children: [
          { id: "1-1-1", name: "Frontend", code: "FE", parentId: "1-1" },
          { id: "1-1-2", name: "Backend", code: "BE", parentId: "1-1" },
          { id: "1-1-3", name: "DevOps", code: "DO", parentId: "1-1" },
        ],
      },
      {
        id: "1-2",
        name: "Design",
        code: "DES",
        parentId: "1",
        children: [
          { id: "1-2-1", name: "UI Design", code: "UI", parentId: "1-2" },
          { id: "1-2-2", name: "UX Research", code: "UX", parentId: "1-2" },
        ],
      },
      {
        id: "1-3",
        name: "Marketing",
        code: "MKT",
        parentId: "1",
      },
      {
        id: "1-4",
        name: "Sales",
        code: "SAL",
        parentId: "1",
      },
    ],
  },
]

const DepartmentTreeItem = React.memo(function DepartmentTreeItem({
  department,
  selectedIds,
  onSelect,
  level = 0,
}: {
  department: Department
  selectedIds: Set<string>
  onSelect: (dept: Department) => void
  level?: number
}) {
  const [expanded, setExpanded] = React.useState(level < 2)
  const hasChildren = Boolean(department.children?.length)
  const isSelected = selectedIds.has(department.id)

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer hover:bg-muted",
          isSelected && "bg-muted"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(department)}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation()
              setExpanded((prev) => !prev)
            }}
            className="shrink-0"
          >
            <ChevronRightIcon
              className={cn("size-3 transition-transform", expanded && "rotate-90")}
            />
          </Button>
        ) : (
          <div className="size-4" />
        )}
        <Checkbox checked={isSelected} />
        <BuildingIcon className="size-4 text-muted-foreground" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{department.name}</p>
          {department.code && (
            <p className="text-xs text-muted-foreground">{department.code}</p>
          )}
        </div>
      </div>
      {hasChildren && expanded && (
        <div>
          {department.children!.map((child) => (
            <DepartmentTreeItem
              key={child.id}
              department={child}
              selectedIds={selectedIds}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
})

function DepartmentBrowse({
  value: controlledValue,
  defaultValue,
  placeholder = "Select department...",
  disabled,
  multiple = false,
  maxCount,
  departments = defaultDepartments,
  onChange,
  className,
}: DepartmentBrowseProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Department[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  )
  const value = controlledValue
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : uncontrolledValue

  const selectedIds = React.useMemo(
    () => new Set(value.map((d) => d.id)),
    [value]
  )

  const filteredDepartments = React.useMemo(() => {
    if (!search) return departments
    const q = search.toLowerCase()
    const filter = (depts: Department[]): Department[] => {
      return depts.reduce<Department[]>((acc, dept) => {
        const matches =
          dept.name.toLowerCase().includes(q) ||
          Boolean(dept.code?.toLowerCase().includes(q))
        const filteredChildren = dept.children ? filter(dept.children) : []
        if (matches || filteredChildren.length > 0) {
          acc.push({
            ...dept,
            children: filteredChildren.length > 0 ? filteredChildren : undefined,
          })
        }
        return acc
      }, [])
    }
    return filter(departments)
  }, [departments, search])

  const handleSelect = React.useCallback(
    (dept: Department) => {
      let newValue: Department[]
      if (multiple) {
        const isSelected = value.some((d) => d.id === dept.id)
        if (isSelected) {
          newValue = value.filter((d) => d.id !== dept.id)
        } else {
          if (maxCount && value.length >= maxCount) return
          newValue = [...value, dept]
        }
      } else {
        newValue = [dept]
        setOpen(false)
      }
      setUncontrolledValue(newValue)
      onChange?.(multiple ? newValue : newValue[0])
    },
    [multiple, value, maxCount, onChange],
  )

  const handleRemove = React.useCallback(
    (deptId: string) => {
      const newValue = value.filter((d) => d.id !== deptId)
      setUncontrolledValue(newValue)
      onChange?.(multiple ? newValue : newValue[0])
    },
    [value, multiple, onChange],
  )

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setUncontrolledValue([])
      onChange?.(multiple ? [] : undefined)
    },
    [multiple, onChange],
  )

  return (
    <div data-slot="department-browse" className={cn("w-full", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <button
              className={cn(
                "flex min-h-8 w-full items-center gap-1 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors",
                "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:bg-input/30",
                disabled && "cursor-not-allowed opacity-50"
              )}
            />
          }
          disabled={disabled}
        >
          {value.length > 0 ? (
            <div className="flex flex-1 flex-wrap gap-1">
              {value.map((dept) => (
                <Badge key={dept.id} variant="secondary" className="gap-1">
                  <BuildingIcon className="size-3" />
                  <span>{dept.name}</span>
                  {!disabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemove(dept.id)
                      }}
                      className="ml-0.5 rounded-full hover:bg-muted"
                    >
                      <XIcon className="size-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="flex-1 text-muted-foreground">{placeholder}</span>
          )}
          {value.length > 0 && !disabled && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleClear}
              className="shrink-0"
            >
              <XIcon className="size-3" />
              <span className="sr-only">Clear all</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Department</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search departments..."
              className="pl-8"
            />
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {filteredDepartments.map((dept) => (
                <DepartmentTreeItem
                  key={dept.id}
                  department={dept}
                  selectedIds={selectedIds}
                  onSelect={handleSelect}
                />
              ))}
              {filteredDepartments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <BuildingIcon className="size-8 mb-2" />
                  <p className="text-sm">No departments found</p>
                </div>
              )}
            </div>
          </ScrollArea>
          {multiple && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{value.length} department(s) selected</span>
              {maxCount && <span>Max: {maxCount}</span>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { DepartmentBrowse }
export type { Department, DepartmentBrowseProps }
