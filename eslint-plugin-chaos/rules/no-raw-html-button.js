const noRawHtmlButton = {
  meta: {
    type: "problem",
    docs: {
      description: "禁止使用原生 HTML button/input/select/textarea，必须使用 Chaos UI 组件",
    },
    messages: {
      noNativeElement:
        "禁止使用原生 <{{name}}>，请使用 @/components/ui 中的对应 Chaos UI 组件",
    },
    schema: [],
  },
  create(context) {
    const forbiddenElements = new Set(["button", "input", "select", "textarea", "dialog", "table", "a"]);

    return {
      JSXOpeningElement(node) {
        const name =
          node.name.type === "JSXIdentifier" ? node.name.name : null;
        if (!name) return;
        if (forbiddenElements.has(name)) {
          context.report({
            node,
            messageId: "noNativeElement",
            data: { name },
          });
        }
      },
    };
  },
};

module.exports = { "no-raw-html-button": noRawHtmlButton };
