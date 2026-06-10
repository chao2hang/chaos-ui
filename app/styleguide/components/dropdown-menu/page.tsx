"use client"

import * as React from "react"
import {
  DropdownMenu,
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
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  CreditCardIcon,
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  CopyIcon,
  ChevronDownIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react"

export default function DropdownMenuPage() {
  const [showBookmarks, setShowBookmarks] = React.useState(true)
  const [showUrls, setShowUrls] = React.useState(false)
  const [person, setPerson] = React.useState("pedro")

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Dropdown Menu</h1>
        <p className="mt-2 text-muted-foreground">
          A menu displayed in a portal when triggered, offering a list of actions or options.
        </p>
      </div>

      {/* Basic Menu */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Basic</h2>
          <p className="text-sm text-muted-foreground">Simple dropdown menu with action items.</p>
        </div>
        <Card>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Open Menu
                <ChevronDownIcon data-icon="inline-end" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Icons</h2>
          <p className="text-sm text-muted-foreground">Menu items with icons and keyboard shortcuts.</p>
        </div>
        <Card>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Actions
                <ChevronDownIcon data-icon="inline-end" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserIcon />
                    Profile
                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon />
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon />
                  New Team
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon />
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </section>

      {/* With Checkbox Items */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Checkbox Items</h2>
          <p className="text-sm text-muted-foreground">Menu with toggleable checkbox options.</p>
        </div>
        <Card>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                View Options
                <ChevronDownIcon data-icon="inline-end" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showBookmarks}
                  onCheckedChange={setShowBookmarks}
                >
                  Show Bookmarks Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showUrls}
                  onCheckedChange={setShowUrls}
                >
                  Show Full URLs
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PencilIcon />
                  Edit...
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </section>

      {/* With Radio Items */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Radio Items</h2>
          <p className="text-sm text-muted-foreground">Menu with mutually exclusive radio options.</p>
        </div>
        <Card>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Assign to
                <ChevronDownIcon data-icon="inline-end" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>People</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={person} onValueChange={setPerson}>
                  <DropdownMenuRadioItem value="pedro">
                    Pedro Duarte
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="colm">
                    Colm Tuite
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="sarah">
                    Sarah Chen
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </section>

      {/* With Sub-Menu */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Sub-Menu</h2>
          <p className="text-sm text-muted-foreground">Menu with nested sub-menus for grouped options.</p>
        </div>
        <Card>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Format
                <ChevronDownIcon data-icon="inline-end" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>
                  <PencilIcon />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CopyIcon />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Text Format
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <BoldIcon />
                      Bold
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ItalicIcon />
                      Italic
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UnderlineIcon />
                      Underline
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
