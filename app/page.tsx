/* eslint-disable @chaos/no-raw-html-button, @chaos/no-raw-html-elements */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  GalleryHorizontalEnd,
  ShieldCheck,
  Sparkles,
} from "@/components/ui/icons";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Chaos UI Storybook
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The primary surface for exploring components, checking variants, and
          reviewing UI states in isolation.
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            render={
              <a
                href="http://localhost:6006"
                target="_blank"
                rel="noreferrer"
              />
            }
            className="gap-2"
          >
            Open Storybook <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Start it with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">npm run dev</code>{" "}
          and visit{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">
            http://localhost:6006
          </code>
          .
        </p>
      </div>

      <div className="mt-16 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <GalleryHorizontalEnd className="h-8 w-8 text-brand-500" />
            <CardTitle className="text-base">Component Stories</CardTitle>
            <CardDescription>
              Each component should have a story for its base state, variants,
              and important edge cases.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Sparkles className="h-8 w-8 text-brand-500" />
            <CardTitle className="text-base">Controls & States</CardTitle>
            <CardDescription>
              Use Storybook controls to validate props, sizes, interaction
              states, and responsive behavior.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <ShieldCheck className="h-8 w-8 text-brand-500" />
            <CardTitle className="text-base">Accessibility Checks</CardTitle>
            <CardDescription>
              Use the a11y addon and interaction testing to catch regressions
              before they reach the app.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-brand-500" />
            <CardTitle className="text-base">Documentation</CardTitle>
            <CardDescription>
              Keep component-spec.md for conventions, but treat Storybook as the
              main browser for component review.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
