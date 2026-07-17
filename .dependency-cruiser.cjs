/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-third-party-ui-libraries",
      severity: "error",
      from: {
        path: "^src/|^components/|^app/",
      },
      to: {
        path: [
          "antd",
          "@ant-design",
          "@mui/material",
          "@mui/icons-material",
          "@mui/lab",
          "@emotion/react",
          "@emotion/styled",
          "element-plus",
          "arco-design",
          "@arco-design/web-react",
          "bootstrap",
          "react-bootstrap",
          "semantic-ui-react",
          "chakra-ui",
          "@chakra-ui/react",
          "mantine",
          "@mantine/core",
          "nextui",
          "@nextui-org/react",
          "fluentui",
          "@fluentui/react",
        ],
      },
    },
    {
      name: "no-business-imported-by-ui",
      severity: "error",
      from: {
        path: "^components/ui/",
      },
      to: {
        path: "^components/business/",
      },
    },
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "no-ui-importing-layout",
      severity: "error",
      from: {
        path: "^components/ui/",
      },
      to: {
        path: "^components/layout/",
      },
    },
    // Layer hygiene (warn until remaining known facades are unpicked):
    // - layout/admin-shell still composes business UserMenu/NotificationCenter
    // - business/index re-exports mobile for discoverability
    {
      name: "no-layout-importing-business",
      severity: "warn",
      comment:
        "Layout should stay shell-only; inject business chrome via slots. Known: admin-shell.",
      from: {
        path: "^components/layout/",
      },
      to: {
        path: "^components/business/",
      },
    },
    {
      name: "no-business-importing-mobile",
      severity: "warn",
      comment:
        "Prefer @chaos_team/chaos-ui/mobile; business barrel re-exports mobile temporarily.",
      from: {
        path: "^components/business/",
      },
      to: {
        path: "^components/mobile/",
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.json",
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
      mainFields: ["main", "types"],
    },
    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/(?:@[^/]+/[^/]+|[^/]+)",
      },
      archi: {
        collapsePattern: "node_modules/(?:@[^/]+/[^/]+|[^/]+)",
      },
      text: {
        highlightFocused: true,
      },
    },
  },
};
