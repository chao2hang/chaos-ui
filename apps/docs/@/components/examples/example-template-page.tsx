"use client";

import type * as React from "react";
import Link from "next/link";
import { PreviewChrome } from "./preview-chrome";

export type RelatedComponent = { name: string; href: string };

export type ExampleTemplatePageProps = {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  relatedComponents: RelatedComponent[];
  relatedLabel: string;
  scenes: { id: string; label: string; description: string }[];
  activeScene: string;
  onSceneChange: (id: string) => void;
  onReset?: () => void;
  preview: React.ReactNode;
  code: string;
  codeTitle: string;
  fullscreenLabel: string;
  exitFullscreenLabel: string;
  resetLabel: string;
  storybookUrl?: string;
  storybookLinkLabel?: string;
};

export function ExampleTemplatePage(props: ExampleTemplatePageProps) {
  const sceneMeta = props.scenes.find((s) => s.id === props.activeScene);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
          {props.breadcrumbs.map((crumb, index) => {
            const isLast = index === props.breadcrumbs.length - 1;
            return (
              <li
                key={`${crumb.label}-${index}`}
                className="flex items-center gap-1.5"
              >
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast ? "text-foreground font-medium" : undefined
                    }
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{props.title}</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl text-base">
          {props.description}
        </p>
      </header>

      {props.relatedComponents.length > 0 ? (
        <div className="mb-6">
          <p className="text-muted-foreground mb-2 text-sm font-medium">
            {props.relatedLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {props.relatedComponents.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-muted hover:bg-muted/80 text-foreground rounded-full px-3 py-1 text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <PreviewChrome
        scenes={props.scenes.map(({ id, label }) => ({ id, label }))}
        activeScene={props.activeScene}
        onSceneChange={props.onSceneChange}
        onReset={props.onReset}
        fullscreenLabel={props.fullscreenLabel}
        exitFullscreenLabel={props.exitFullscreenLabel}
        resetLabel={props.resetLabel}
      >
        {props.preview}
      </PreviewChrome>

      {sceneMeta ? (
        <p className="text-muted-foreground mt-4 text-sm">
          {sceneMeta.description}
        </p>
      ) : null}

      <div className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">{props.codeTitle}</h2>
        {/* Client-safe plain code frame (docs CodeBlock is an async RSC). */}
        <div className="bg-muted/50 group relative my-4 overflow-hidden rounded-lg border">
          <span className="text-muted-foreground absolute top-2 right-3 z-10 text-[10px] uppercase">
            tsx
          </span>
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
            <code>{props.code}</code>
          </pre>
        </div>
        {props.storybookUrl ? (
          <p className="mt-3 text-sm">
            <a
              href={props.storybookUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              {props.storybookLinkLabel ?? "Open in Storybook"}
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
