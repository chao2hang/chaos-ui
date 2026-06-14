const noDeepImports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "禁止 deep import Chaos UI 内部子路径（如 @/components/ui/button），必须从入口统一导出",
    },
    messages: {
      noDeepImport:
        "禁止 deep import {{source}}，请从 @/components/ui 入口统一导入",
      noDirectUiFileImport:
        "禁止直接 import Chaos UI 内部文件 {{source}}，请使用 @/components/ui 入口",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowedPaths: {
            type: "array",
            items: { type: "string" },
          },
          forbiddenUiFiles: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const allowedPaths = new Set(options.allowedPaths || []);
    const forbiddenUiFiles = new Set(
      options.forbiddenUiFiles || [
        "@/components/ui/button",
        "@/components/ui/dialog",
        "@/components/ui/select",
        "@/components/ui/dropdown-menu",
        "@/components/ui/sidebar",
        "@/components/ui/calendar",
        "@/components/ui/command",
        "@/components/ui/form",
      ]
    );

    const filename = (context.filename || context.getFilename() || "").replace(
      /\\/g,
      "/"
    );
    const isStory = /\.(stories|test|spec)\.(tsx?|jsx?)$/.test(filename);
    const isInsideUi = filename.includes("/components/ui/");

    function isRelativeOrAliasPath(source) {
      return (
        typeof source === "string" &&
        (source.startsWith("@/") ||
          source.startsWith("./") ||
          source.startsWith("../") ||
          source.startsWith("/"))
      );
    }

    return {
      ImportDeclaration(node) {
        if (!node.source || typeof node.source.value !== "string") return;
        const source = node.source.value;

        if (isStory || isInsideUi) return;
        if (allowedPaths.has(source)) return;

        if (forbiddenUiFiles.has(source)) {
          context.report({
            node,
            messageId: "noDeepImport",
            data: { source },
          });
          return;
        }

        if (
          isRelativeOrAliasPath(source) &&
          /\/components\/ui\/[a-z0-9-]+(\.[a-z]+)?$/i.test(source)
        ) {
          context.report({
            node,
            messageId: "noDirectUiFileImport",
            data: { source },
          });
        }
      },
    };
  },
};

module.exports = { "no-deep-imports": noDeepImports };
