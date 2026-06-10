import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { ComponentIcon, PaletteIcon, BookOpenIcon, LayersIcon } from "lucide-react"
export default function NavigationMenuPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Navigation Menu</h1>
      <p className="mt-2 text-muted-foreground">Horizontal navigation with dropdown menus.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Dropdowns</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-80 p-3 space-y-2">
                  <NavigationMenuLink href="#" className="flex gap-3"><BookOpenIcon className="size-5 text-brand-500" /><div><div className="text-sm font-medium">Documentation</div><p className="text-xs text-muted-foreground">Learn how to use components.</p></div></NavigationMenuLink>
                  <NavigationMenuLink href="#" className="flex gap-3"><ComponentIcon className="size-5 text-brand-500" /><div><div className="text-sm font-medium">Components</div><p className="text-xs text-muted-foreground">Browse all components.</p></div></NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Design</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-80 p-3 space-y-2">
                  <NavigationMenuLink href="#" className="flex gap-3"><PaletteIcon className="size-5 text-brand-500" /><div><div className="text-sm font-medium">Tokens</div><p className="text-xs text-muted-foreground">Colors, typography, spacing.</p></div></NavigationMenuLink>
                  <NavigationMenuLink href="#" className="flex gap-3"><LayersIcon className="size-5 text-brand-500" /><div><div className="text-sm font-medium">Patterns</div><p className="text-xs text-muted-foreground">Common page patterns.</p></div></NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#">Pricing</NavigationMenuLink></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Simple Links</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem><NavigationMenuLink href="#">Home</NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#">Products</NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#">About</NavigationMenuLink></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </div>
  )
}
