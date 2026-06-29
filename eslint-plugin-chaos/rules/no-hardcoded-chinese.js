const noHardcodedChinese = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "组件中不应硬编码中文字符串，应通过 i18n、props 或常量引入",
    },
    messages: {
      hardcodedChinese:
        "检测到硬编码中文字符串 \"{{text}}\"。请使用 react-i18next (useTranslation hook + lib/i18n 资源) 或通过 props/常量引入，以便支持多语言。",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowInStories: { type: "boolean", default: true },
          allowInTestFiles: { type: "boolean", default: true },
          allowedPatterns: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {};
    const allowInStories = options.allowInStories !== false;
    const allowInTestFiles = options.allowInTestFiles !== false;
    const filename = context.filename || context.getFilename();

    // 跳过 stories 和 test 文件
    if (allowInStories && /\.stories\.(tsx?|jsx?)$/.test(filename)) return {};
    if (allowInTestFiles && /\.(test|spec)\.(tsx?|jsx?)$/.test(filename)) return {};

    return {
      Literal(node) {
        if (typeof node.value !== "string") return;
        // 检测中文字符
        if (/[\u4e00-\u9fff]/.test(node.value)) {
          // 跳过注释中的（注释不在 AST 的 Literal 节点中）
          // 跳过 import/require 语句（路径）
          if (node.parent?.type === "ImportDeclaration") return;
          if (
            node.parent?.type === "CallExpression" &&
            node.parent.callee?.name === "require"
          )
            return;
          context.report({
            node,
            messageId: "hardcodedChinese",
            data: { text: node.value.length > 20 ? node.value.slice(0, 20) + "..." : node.value },
          });
        }
      },
      TemplateElement(node) {
        const value =
          node.value.raw !== undefined ? node.value.raw : node.value.cooked;
        if (!value) return;
        if (/[\u4e00-\u9fff]/.test(value)) {
          context.report({
            node,
            messageId: "hardcodedChinese",
            data: { text: value.length > 20 ? value.slice(0, 20) + "..." : value },
          });
        }
      },
      JSXText(node) {
        const value = node.value.trim();
        if (!value) return;
        if (/[\u4e00-\u9fff]/.test(value)) {
          context.report({
            node,
            messageId: "hardcodedChinese",
            data: { text: value.length > 20 ? value.slice(0, 20) + "..." : value },
          });
        }
      },
    };
  },
};

module.exports = { "no-hardcoded-chinese": noHardcodedChinese };
