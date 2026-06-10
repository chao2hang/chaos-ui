import Link from "next/link";
import { styleguideNav } from "@/lib/nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StyleguidePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Chaos UI</h1>
        <p className="mt-2 text-muted-foreground">
          Enterprise component library, design tokens, and usage patterns.
        </p>
      </div>

      {styleguideNav.map((group) => (
        <section key={group.title} className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{group.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  {item.description && (
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
