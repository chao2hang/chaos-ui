import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Palette, Component, Layers, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Chaos UI</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enterprise component library for the Marketing Platform.
          Built with Next.js, Tailwind CSS 4, and shadcn/ui.
        </p>
        <div className="mt-8">
          <Link href="/styleguide">
            <Button size="lg" className="gap-2">
              Open Styleguide <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <Palette className="h-8 w-8 text-brand-500" />
            <CardTitle className="text-base">Design Tokens</CardTitle>
            <CardDescription>
              Colors, typography, spacing, radius, shadows, and motion system.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Component className="h-8 w-8 text-brand-500" />
            <CardTitle className="text-base">Components</CardTitle>
            <CardDescription>
              22+ UI components with all variants, sizes, and states documented.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Layers className="h-8 w-8 text-brand-500" />
            <CardTitle className="text-base">Patterns</CardTitle>
            <CardDescription>
              List, detail, form page patterns and error state templates.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-brand-500" />
            <CardTitle className="text-base">Specification</CardTitle>
            <CardDescription>
              component-spec.md with naming, conventions, and guidelines.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
