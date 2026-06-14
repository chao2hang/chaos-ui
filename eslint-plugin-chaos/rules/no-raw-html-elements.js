const noRawHtmlElements = {
  meta: {
    type: "problem",
    docs: {
      description:
        "禁止使用需要交互 / a11y 语义的原生 HTML 元素（button / a / input / img / iframe 等），必须使用 Chaos UI 组件",
    },
    messages: {
      noNativeElement:
        "禁止使用原生 <{{name}}>，请使用 @/components/ui 中的对应 Chaos UI 组件",
    },
    schema: [],
  },
  create(context) {
    const forbiddenElements = new Set([
      "button",
      "input",
      "select",
      "textarea",
      "dialog",
      "table",
      "a",
      "img",
      "iframe",
    ]);

    function getIdentifierName(node) {
      return node.name && node.name.type === "JSXIdentifier"
        ? node.name.name
        : null;
    }

    function hasHandlerAttribute(node, handlerNames) {
      if (!node.attributes) return false;
      for (const attr of node.attributes) {
        if (attr.type !== "JSXAttribute") continue;
        const attrName =
          attr.name && attr.name.type === "JSXIdentifier"
            ? attr.name.name
            : null;
        if (attrName && handlerNames.includes(attrName)) return true;
      }
      return false;
    }

    function getAttributeValue(node, attrCandidates) {
      if (!node.attributes) return null;
      for (const attr of node.attributes) {
        if (attr.type !== "JSXAttribute") continue;
        const attrName =
          attr.name && attr.name.type === "JSXIdentifier"
            ? attr.name.name
            : null;
        if (!attrName || !attrCandidates.includes(attrName)) continue;
        if (
          attr.value &&
          attr.value.type === "Literal" &&
          typeof attr.value.value === "string"
        ) {
          return attr.value.value;
        }
      }
      return null;
    }

    return {
      JSXOpeningElement(node) {
        const name = getIdentifierName(node);
        if (!name || !forbiddenElements.has(name)) return;

        if (name === "a") {
          const hasHandler = hasHandlerAttribute(node, ["onClick"]);
          const target = getAttributeValue(node, ["target"]);
          const rel = getAttributeValue(node, ["rel"]);
          const href = getAttributeValue(node, ["href"]);
          if (!hasHandler && !target && !rel && href && href.startsWith("#")) {
            return;
          }
        }

        context.report({
          node,
          messageId: "noNativeElement",
          data: { name },
        });
      },
    };
  },
};

module.exports = { "no-raw-html-elements": noRawHtmlElements };
