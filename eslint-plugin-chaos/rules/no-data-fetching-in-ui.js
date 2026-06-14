const DEFAULT_OPTIONS = {
  uiDir: "components/ui",
  forbiddenModules: [
    "@tanstack/react-query",
    "react-query",
    "swr",
    "axios",
    "ky",
    "node-fetch",
    "cross-fetch",
    "whatwg-fetch",
  ],
};

const noDataFetchingInUi = {
  meta: {
    type: "problem",
    docs: {
      description:
        "components/ui/** 内禁止直接引入数据获取 / HTTP 客户端库 —— UI 组件应通过 props 注入数据",
    },
    messages: {
      forbiddenDataImport:
        "components/ui/** 内禁止引入 {{module}}，数据应通过 props 注入或在 business 组件中获取",
    },
    schema: [
      {
        type: "object",
        properties: {
          uiDir: { type: "string" },
          forbiddenModules: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = Object.assign({}, DEFAULT_OPTIONS, context.options[0] || {});
    const forbidden = new Set(options.forbiddenModules);

    const filename = context.filename || context.getFilename();
    const normalized = filename.replace(/\\/g, "/");
    const uiDirNormalized = options.uiDir.replace(/\\/g, "/").replace(/^\.\//, "");

    const segments = normalized.split("/");
    const idx = segments.indexOf(uiDirNormalized);
    const isInUiDir = idx !== -1;

    function checkModuleName(rawSource) {
      if (!rawSource) return null;
      for (const mod of forbidden) {
        if (rawSource === mod) return mod;
        if (rawSource.startsWith(mod + "/")) return mod;
      }
      if (rawSource.startsWith("@tanstack/")) return "@tanstack/*";
      return null;
    }

    return {
      ImportDeclaration(node) {
        if (!isInUiDir) return;
        if (!node.source || typeof node.source.value !== "string") return;
        const matched = checkModuleName(node.source.value);
        if (matched) {
          context.report({
            node,
            messageId: "forbiddenDataImport",
            data: { module: matched },
          });
        }
      },
      CallExpression(node) {
        if (!isInUiDir) return;
        const callee = node.callee;
        if (!callee || callee.type !== "Identifier" || callee.name !== "fetch") {
          return;
        }
        context.report({
          node,
          messageId: "forbiddenDataImport",
          data: { module: "fetch" },
        });
      },
    };
  },
};

module.exports = { "no-data-fetching-in-ui": noDataFetchingInUi };
