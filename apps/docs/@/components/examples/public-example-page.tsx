"use client";

import * as React from "react";
import { useDict } from "@/hooks/use-dict";
import { ExampleTemplatePage } from "./example-template-page";
import {
  PublicTemplateDemo,
  type PublicSceneId,
} from "./public-template-demo";

const PUBLIC_CODE = `import { PublicLayout } from "@chaos_team/chaos-ui/layout";

export function MarketingSite() {
  return (
    <PublicLayout
      logo={<span>Chaos Site</span>}
      nav={[
        { label: "Home", href: "/" },
        { label: "Docs", href: "/docs" },
      ]}
    >
      {/* Hero / features / CTA */}
    </PublicLayout>
  );
}`;

export function PublicExamplePage() {
  const dict = useDict();
  const [scene, setScene] = React.useState<PublicSceneId>("home");

  const scenes = [
    {
      id: "home",
      label: dict.examples.sceneHome,
      description: dict.examples.sceneHomeDesc,
    },
    {
      id: "article",
      label: dict.examples.sceneArticle,
      description: dict.examples.sceneArticleDesc,
    },
    {
      id: "auth",
      label: dict.examples.sceneAuth,
      description: dict.examples.sceneAuthDesc,
    },
  ];

  return (
    <ExampleTemplatePage
      title={dict.examples.publicTitle}
      description={dict.examples.publicDesc}
      breadcrumbs={[
        { label: dict.examples.breadcrumbRoot, href: "/examples" },
        { label: dict.examples.publicTitle },
      ]}
      relatedLabel={dict.examples.relatedComponents}
      relatedComponents={[
        {
          name: "PublicLayout",
          href: "/components/system-layout/public-layout",
        },
        {
          name: "ArticleLayout",
          href: "/components/system-layout/article-layout",
        },
        {
          name: "AuthLayout",
          href: "/components/system-layout/auth-layout",
        },
      ]}
      scenes={scenes}
      activeScene={scene}
      onSceneChange={(id) => setScene(id as PublicSceneId)}
      onReset={() => setScene("home")}
      preview={
        <PublicTemplateDemo scene={scene} onSceneChange={setScene} />
      }
      code={PUBLIC_CODE}
      codeTitle={dict.examples.keyCode}
      fullscreenLabel={dict.examples.fullscreen}
      exitFullscreenLabel={dict.examples.exitFullscreen}
      resetLabel={dict.examples.reset}
    />
  );
}
