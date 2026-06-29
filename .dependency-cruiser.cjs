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
