"use client";

import * as React from "react";
import { useDict } from "@/hooks/use-dict";
import { ExampleTemplatePage } from "./example-template-page";
import { AdminTemplateDemo, type AdminSceneId } from "./admin-template-demo";

const ADMIN_CODE = `import { AdminShell } from "@chaos_team/chaos-ui/layout";
import {
  ListPageShell,
  PageChrome,
  SearchTable,
  UserMenu,
} from "@chaos_team/chaos-ui/business";

export function App() {
  return (
    <AdminShell
      menuItems={[
        { key: "dashboard", label: "工作台" },
        {
          key: "expenses",
          label: "费用管理",
          children: [{ key: "reconciliation", label: "对账签认" }],
        },
      ]}
      userMenu={<UserMenu user={{ name: "运营管理员" }} />}
      selectedMenuKey="reconciliation"
    >
      <PageChrome variant="list">
        <ListPageShell
          filterFields={[{ key: "period", label: "账期" }]}
          onSearch={() => {}}
        >
          <SearchTable
            columns={[{ key: "period", title: "账期" }]}
            dataSource={[]}
          />
        </ListPageShell>
      </PageChrome>
    </AdminShell>
  );
}`;

export function AdminExamplePage() {
  const dict = useDict();
  const [scene, setScene] = React.useState<AdminSceneId>("list");
  const [resetToken, setResetToken] = React.useState(0);

  const scenes = [
    {
      id: "login",
      label: dict.examples.sceneLogin,
      description: dict.examples.sceneLoginDesc,
    },
    {
      id: "dashboard",
      label: dict.examples.sceneDashboard,
      description: dict.examples.sceneDashboardDesc,
    },
    {
      id: "list",
      label: dict.examples.sceneList,
      description: dict.examples.sceneListDesc,
    },
    {
      id: "detail",
      label: dict.examples.sceneDetail,
      description: dict.examples.sceneDetailDesc,
    },
  ];

  return (
    <ExampleTemplatePage
      title={dict.examples.adminTitle}
      description={dict.examples.adminDesc}
      breadcrumbs={[
        { label: dict.examples.breadcrumbRoot, href: "/examples" },
        { label: dict.examples.adminTitle },
      ]}
      relatedLabel={dict.examples.relatedComponents}
      relatedComponents={[
        {
          name: "AdminShell",
          href: "/components/system-layout/admin-shell",
        },
        {
          name: "AuthLayout",
          href: "/components/system-layout/auth-layout",
        },
        {
          name: "ListPageShell",
          href: "/components/business/list-page-shell",
        },
        {
          name: "SearchTable",
          href: "/components/business/search-table",
        },
        {
          name: "PageChrome",
          href: "/components/business/page-chrome",
        },
      ]}
      scenes={scenes}
      activeScene={scene}
      onSceneChange={(id) => setScene(id as AdminSceneId)}
      onReset={() => {
        setResetToken((n) => n + 1);
        setScene("list");
      }}
      preview={
        <AdminTemplateDemo
          scene={scene}
          onSceneChange={setScene}
          resetToken={resetToken}
        />
      }
      code={ADMIN_CODE}
      codeTitle={dict.examples.keyCode}
      fullscreenLabel={dict.examples.fullscreen}
      exitFullscreenLabel={dict.examples.exitFullscreen}
      resetLabel={dict.examples.reset}
    />
  );
}
